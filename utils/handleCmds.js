async function handleDeferCmd(data, cmd) {
    const res = await cmd.default.run(data)
    
    await fetch(`https://discord.com/api/v10/webhooks/${data.application_id}/${data.token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...res,
            flags: cmd.ephemeral ? 64 : 0
        })
    })
}

export async function handleCmds(data) {
    const cmd = await import(`../cmds/${data.name}.js`)

    let json;

    if(!cmd.default.defer)
        json = { type: 4, data: await cmd.default.run(data) }
    else {
        handleDeferCmd(data, cmd)
        json = { type: 5, data: {} }
    }

    if(cmd.ephemeral)
        json.data.flags = 64

    return json;
}