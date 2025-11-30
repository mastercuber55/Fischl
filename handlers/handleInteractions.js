import { ComponentType } from "discord.js"
import discord from "./discord.js"
import categories from "../cache/categories.json" with { type: "json" }

/** @param {APIInteraction} body */
export async function handleCommands(body, user) {

    const { data } = body;
    const cmd = await import(`../interactions/commands/${categories[data.name]}/${data.name}.js`)

    const json = {
        type: 4,
        data: {
            ...await cmd.default.run({ data, user, discord }),
            flags: cmd.default.ephemeral ? 64 : 0
        }
    }

    if(
        data.name != "reel" &&
        Object.keys(json.data).length == 2 
        && Object.prototype.hasOwnProperty.call(json.data, "content")
    ) { 
        const rand = Math.random();

        if(rand < 0.05)
            json.data.content += "\n-# Fischl’s in early development, consider joining our [server](https://discord.gg/7zvpWnE7QV) to share ideas and help us improve! <33"
        else if(rand < 0.10) {
            const amount = Math.round(Math.random() * 100);
            json.data.content += `\n-# Hehe~ The Prinzessin bestows upon thee ${amount} Mora! Spend it wisely, lest fate mock thy thrift!`
            redis.hincrby(`${user.id}`, "mora", amount);
        }
    }

    return json;
}

/** @param {APIInteraction} body */
export async function handleComponents(body, user) {
    const args = body.data.custom_id.split("|")
    
    const isButton = body.data.component_type == ComponentType.Button;
    const { message } = body;
    const values = body.data.values || [];

    const folder = `../interactions/${isButton ? "buttons" : "selectmenus"}/${args[0]}`

    const index = await import(`${folder}/index.js`);

    let json;
    // Early handler to throw off random people or if it requries simple handling.
    json = await index.default({ args, values, message, user, discord });

    if (!json) {
        const btn = await import(`${folder}/${args[1]}.js`);
        json = await btn.default({ args, message, user, values, discord });
    }

    return json;
}