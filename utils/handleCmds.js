import manifest from "./manifest.json" with { type: "json" }

export async function handleCmds(data, user, channel) {

    const cmd = await import(`../cmds/${manifest[data.name]}/${data.name}.js`)

    const json = { 
        type: 4,
        data: {
            ...await cmd.default.run({ data, user, channel }),
            flags: cmd.default.ephemeral ? 64 : 0
        } 
    }

    return json;
}