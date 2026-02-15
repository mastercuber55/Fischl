import { ComponentType } from "discord-api-types/v10"
import categories from "../cache/categories.json" with { type: "json" }

import { fileURLToPath, pathToFileURL } from "url";
import path from "path";

/** 
 * @param {import("discord-api-types/v10").APIChatInputApplicationCommandInteraction} body 
 * @param {import("discord-api-types/v10").APIUser} user 
*/
export async function handleCommands(body, user) {

    const { data } = body;

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const cmdPath = path.join(__dirname, "..", "interactions", "commands", categories[data.name], `${data.name}.js`);
    const cmd = await import(pathToFileURL(cmdPath).href);

    const json = {
        type: 4,
        data: {
            ...await cmd.default.run({ data, user }),
            flags: cmd.default.ephemeral ? 64 : 0
        }
    }

    if(cmd.default.allowEvents) { 
        const rand = Math.random();

        if(rand < 0.05) {
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

    const folder = data.component_type === ComponentType.Button ? "buttons" : "selectmenus"
    const values = data.component_type === ComponentType.StringSelect ? data.values : []

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const baseDir = path.join(__dirname, "..", "interactions", folder, args[0])

    /** @param {string} fileName */
    const importFile = (fileName) => import(pathToFileURL(path.join(baseDir, fileName)).href)

    const index = await importFile("index.js")

    let json;
    // Early handler for basic stuff
    json = await index.default({ args, values, message, user});

    if (!json) {
        const component = await importFile(`${args[1]}.js`)
        json = await component.default({ args, message, user, values });
    }

    return json;
}