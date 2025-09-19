import fs from "fs"

const manifest = JSON.parse(fs.readFileSync("./manifest.json", "utf-8"));

export async function handleCmds(data, user, channel) {
    const cmd = await import(manifest[data.name])

    const json = { 
        type: 4,
        data: {
            ...await cmd.default.run({ data, user, channel }),
            flags: cmd.default.ephemeral ? 64 : 0
        } 
    }

    return json;
}