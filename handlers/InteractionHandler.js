import { ComponentType, InteractionResponseType, InteractionType } from "discord-api-types/v10"
import InteractionRegistry from "./InteractionRegistry.js";
import DCutils from "./DCutils.js"
import { Redis } from "@upstash/redis";

global.redis = Redis.fromEnv()
const redis = global.redis

/** 
 * @param {import("discord-api-types/v10").APIApplicationCommandInteraction} body 
 * @param {import("discord-api-types/v10").APIUser} user 
*/
async function commands(body, user) {

    function formatTime(ttl) {
        const h = Math.floor(ttl / 3600);
        const m = Math.floor((ttl % 3600) / 60);
        const s = ttl % 60;

        if (h > 0) return `${h}h ${m}m`;
        if (m > 0) return `${m}m ${s}s`;
        return `${s}s`;
    }

    const { data } = body;

    const loader = InteractionRegistry.commands[data.name]
    if (!loader)
        return {
            type: 4,
            data: {
                content: "Alas, the interaction thou seekest is absent from the sacred registry, as though it were never inscribed by the threads of destiny.",
                flags: 64
            }
        }
    const { default: command } = await loader()

    if (command.cooldown != undefined) {
        const key = `cooldown:${command.data.name}:${user.id}`;

        const result = await redis.set(key, "1", {
            nx: true,
            ex: command.cooldown
        });

        if (!result) {
            const ttl = await redis.ttl(key);
            
            const expiresAt = Math.floor(Date.now() / 1000) + ttl;

            return {
                type: 4,
                data: {
                    content: `⏳ The threads of fate are yet entwined… thy next opportunity shall arise <t:${expiresAt}:R>, as the Prinzessin decrees.`,
                    flags: 64
                }
            };
        }
    }

    const json = {
        type: 4,
        data: {
            ...await command.run({ data, user, DCutils }),
            flags: command.ephemeral ? 64 : 0
        }
    }

    if (command.allowEvents) { 
        const rand = Math.random();

        if (rand < 0.05) {
            const amount = Math.floor(Math.random() * (3000 - 1500 + 1)) + 1500;
            json.data.content += `\n-# Hehe~ The Prinzessin bestows upon thee ${amount} Mora! Spend it wisely, lest fate mock thy thrift!`
            redis.hincrby(user.id, "mora", amount);
        }
    }

    return json;
}

/** 
 * @param {import("discord-api-types/v10").APIMessageComponentInteraction} body 
 * @param {import("discord-api-types/v10").APIUser} user 
*/
async function components(body, user) {

    const args = body.data.custom_id.split("|")
    const { message, data } = body;
    const [key, action] = args

    const type = data.component_type === ComponentType.Button ? "buttons" : "selectMenus"
    const values = data.component_type === ComponentType.StringSelect ? data.values : []

    let group = InteractionRegistry[type][key];
    if (!group)
        return {
            data: {
                content: "Alas, the interaction thou seekest is absent from the sacred registry, as though it were never inscribed by the threads of destiny.", flags: 64
            }
        }

    if (group.index) {
        const { default: index } = await group.index();

        const preResult = await index({ args, message, user, values, DCutils })
        if (preResult) return preResult
    }

    if (action && group[action]) {
        const { default: component } = await group.index();
        return await component({ args, message, user, values, DCutils });
    }
}

/** 
 * @param {import("discord-api-types/v10").APIModalSubmitInteraction} body 
 * @param {import("discord-api-types/v10").APIUser} user 
*/
async function modals(body, user) {

    function getValues(components) {
        const values = {};
        for (const row of components) {
            for (const comp of row.components) {
                values[comp.custom_id] = comp.value;
            }
        }
        return values;
    }

    let loader = InteractionRegistry[body.data.custom_id];
    if (!loader)
        return {
            data: {
                type: InteractionResponseType.ChannelMessageWithSource,
                content: "Alas, the interaction thou seekest is absent from the sacred registry, as though it were never inscribed by the threads of destiny.", flags: 64
            }
        }

    const { default: modal } = await loader()
    const values = getValues(body.data.components);

    const result = await modal.run({ values, user });

    return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            ...result,
            flags: modal.ephemeral ? 64 : 0
        }
    };
}

export default { 
    commands, components, modals
}