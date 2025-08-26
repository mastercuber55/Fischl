export async function handleCmds(data) {
    const cmd = await import(`../cmds/${data.name}.js`)

    const json = { 
        type: 4,
        data: {
            ...await cmd.default.run(data),
            flags: cmd.default.ephemeral ? 64 : 0
        } 
    }

    return json;
}