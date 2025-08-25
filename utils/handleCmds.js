export async function handleCmds(data) {
    const cmd = await import(`../cmds/${data.name}`)
    const res = await cmd.run()

    const json = { type: 4, data: res }

    if(cmd.ephemeral)
        json.data.flags = 64

    return json;
}