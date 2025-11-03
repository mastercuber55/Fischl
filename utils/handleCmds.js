import manifest from "./manifest.json" with { type: "json" }
import utils from "./functions.js"

export async function handleCmds(body, user) {
    const { data } = body;
    const cmd = await import(`../cmds/${manifest[data.name]}/${data.name}.js`)

    const json = { 
        type: 4,
        data: {
            ...await cmd.default.run({ data, user, utils }),
            flags: cmd.default.ephemeral ? 64 : 0
        } 
    }

    if (Math.random() < 5 / 100 && Object.keys(json.data).length == 2 && json.data.hasOwnProperty("content")) {
        json.data.content += "\n-# Fischl’s in early development, consider joining our [server](https://discord.gg/7zvpWnE7QV) to share ideas and help us improve! <33"
    }

    return json;
}