import { ComponentType } from "discord.js"
import discord from "./discord.js"
import categories from "../cache/categories.json" with { type: "json" }
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";

/** @param {APIInteraction} body */
export async function handleCommands(body, user) {

    const { data } = body;

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    
    const cmdPath = path.join(
        __dirname,
        "..",
        "interactions",
        "commands",
        categories[data.name],
        `${data.name}.js`
    );

    const cmd = await import(pathToFileURL(cmdPath).href);

    const json = {
        type: 4,
        data: {
            ...await cmd.default.run({ data, user, discord }),
            flags: cmd.default.ephemeral ? 64 : 0
        }
    }

    if(cmd.default.allowEvents) { 
        const rand = Math.random();

        if(rand < 0.05) {
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

    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    const index = await import(pathToFileURL(path.join(__dirname, "..", "interactions", isButton ? "buttons" : "selectmenus", args[0],"index.js")).href);

    let json;
    // Early handler for basic stuff
    json = await index.default({ args, values, message, user, discord });

    if (!json) {
        const component = await import(pathToFileURL(path.join(__dirname, "..", "interactions", isButton ? "buttons" : "selectmenus", args[0], `${args[1]}.js`)).href);
        json = await component.default({ args, message, user, values, discord });
    }

    return json;
}