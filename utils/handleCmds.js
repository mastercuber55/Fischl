export async function handleCmds(data) {
    const cmd = await import(`../cmds/${data.name}.js`)
    console.log(cmd)
    const res = await cmd.default.run(data)

    const json = { type: 4, data: res }

    if(cmd.ephemeral)
        json.data.flags = 64

    return json;
}