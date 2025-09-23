function avatarURL(user, {format = "png", size="1024" } = {}) {
    if(!user.avatar) {
        const defaultIndex = BigInt(user.id) % 6n;
        return `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
    }

    const isGif = user.avatar.startsWith("a_");
    if (isGif) format = "gif";

    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${format}?size=${size}`
}

function disableComponents(components) {
  return components.map(row => ({
    type: row.type,
    components: row.components.map(comp => ({
      ...comp,
      disabled: true  
    }))
  }));
}

async function sendMessage(data, channelId = process.env.LOG_CHANNEL) {
  const res = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
    method: "POST",
    headers: {
      "Authorization": `Bot ${process.env.DISCORD_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  console.log(res)
}

async function botUser() {
  const res = await fetch("https://discord.com/api/v10/users/@me", {
    headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
  });
  return res.json();
}
export default { 
    avatarURL,
    sendMessage,
    disableComponents,
    botUser
}