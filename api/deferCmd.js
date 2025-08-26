export default async function handler(req, res) {

    const { data } = req.body
    const cmd = await import(`../cmds/${data.name}.js`)
    
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