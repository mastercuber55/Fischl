import { ComponentType } from "discord-api-types/v10"
import interactionRegistry from "./interactionRegistry.js";
import { Redis } from "@upstash/redis";

global.redis = Redis.fromEnv()
const redis = global.redis

/** 
 * @param {import("discord-api-types/v10").APIChatInputApplicationCommandInteraction} body 
 * @param {import("discord-api-types/v10").APIUser} user 
*/
export async function handleCommands(body, user) {

    const { data } = body;

    const loader = interactionRegistry.commands[data.name]
    if (!loader)
        return {
            type: 4,
            data: {
                content: "The executed command does not exist in the registry.",
                flags: 64
            }
        }
    const { default: command } = await loader()

    const json = {
        type: 4,
        data: {
            ...await command.run({ data, user }),
            flags: command.ephemeral ? 64 : 0
        }
    }

    if (command.allowEvents) { 
        const rand = Math.random();

        if (rand < 0.05) {
            const amount = Math.floor(Math.random() * (3000 - 1500 + 1)) + 1500;
            json.data.content += `\n-# Hehe~ The Prinzessin bestows upon thee ${amount} Mora! Spend it wisely, lest fate mock thy thrift!`
            redis.hincrby(`${user.id}`, "mora", amount);
        }
    }

    return json;
}

/** 
 * @param {import("discord-api-types/v10").APIMessageComponentInteraction} body 
 * @param {import("discord-api-types/v10").APIUser} user 
*/
export async function handleComponents(body, user) {

    const args = body.data.custom_id.split("|")
    const { message, data } = body;
    const [key, action] = args

    const type = data.component_type === ComponentType.Button ? "buttons" : "selectMenus"
    const values = data.component_type === ComponentType.StringSelect ? data.values : []

    let group = interactionRegistry[type][key];
    if (!group)
        return {
            data: {
                content: "Unknown Interaction", flags: 64
            }
        }

    if (group.index) {
        const { default: index } = await group.index();

        const preResult = await index({ args, message, user, values })
        if (preResult) return preResult
    }

    if (action && group[action]) {
        const { default: component } = await group.index();
        return await component({ args, message, user, values });
    }
}