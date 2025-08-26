export async function handleCmds(data) {
    console.log("[handleCmds] received data:", data);

    const cmd = await import(`../cmds/${data.name}.js`);
    console.log("[handleCmds] imported command:", data.name, "defer =", cmd.default.defer);

    let json;

    if (cmd.default.defer) {
        console.log("[handleCmds] deferring command:", data.name);

        await fetch(`https://marina-six.vercel.app/api/defer`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data })
        })
        .then(r => console.log("[handleCmds] defer fetch status:", r.status))
        .catch(e => console.error("[handleCmds] defer fetch error:", e));

        json = { type: 5, data: {} };
    } else {
        console.log("[handleCmds] running immediately:", data.name);
        json = { type: 4, data: await cmd.default.run(data) };
    }

    if (cmd.ephemeral) {
        console.log("[handleCmds] ephemeral set for:", data.name);
        json.data.flags = 64;
    }

    console.log("[handleCmds] returning json:", json);
    return json;
}
