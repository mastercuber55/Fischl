export function avatarURL(user, { format = "png", size = "1024" } = {}) {
  if (!user.avatar) {
    const defaultIndex = BigInt(user.id) % 6n;
    return `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
  }

  const isGif = user.avatar.startsWith("a_");
  if (isGif) format = "gif";

  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${format}?size=${size}`
}

export function disableComponents(components) {
  return components.map(row => ({
    type: row.type,
    components: row.components.map(comp => ({
      ...comp,
      disabled: true
    }))
  }));
}

export function sendMessage(data, channelId = process.env.LOG_CHANNEL) {
  fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
    method: "POST",
    headers: {
      "Authorization": `Bot ${process.env.DISCORD_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
}

export async function getUser(id = "@me") {
  const res = await fetch(`https://discord.com/api/v10/users/${id}`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
  });
  return res.json();
}

export default {
  avatarURL,
  disableComponents,
  sendMessage,
  getUser
}