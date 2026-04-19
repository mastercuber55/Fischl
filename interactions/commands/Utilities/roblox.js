import { SlashCommandBuilder, EmbedBuilder } from "@discordjs/builders";

async function jfetch(url, opts) {
  const r = await fetch(url, opts);
  return r.json();
}

export default {
  data: new SlashCommandBuilder()
    .setName("roblox")
    .setDescription("Peer into a Roblox profile through the veil of fate ✨")
    .addStringOption(opt =>
      opt
        .setName("username")
        .setDescription("The name you wish to present before destiny 🌙")
        .setRequired(true)
    ),
  ephemeral: false,
  run: async ({ data, DCutils }) => {
    const username = data.options?.find(opt => opt.name === "username")?.value;

    const res = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernames: [username] }),
    });

    const robloxData = await res.json();
    if (!robloxData.data || robloxData.data.length === 0) {
      return {
        content: "🌫️ *The search yields nothing…* That soul could not be found 🥀"
      };
    }

    const userId = robloxData.data[0].id;

    const avatar = await jfetch(
      `https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png&isCircular=false`
    );
    const user = await jfetch(`https://users.roblox.com/v1/users/${userId}`);

    const embed = new EmbedBuilder()
      .setColor(DCutils.getRandomColor())
      .setTitle(`✨ ${user.displayName} (${username})`)
      .setDescription(user.description || "🌙 This traveler has left no words behind…")
      .setImage(avatar.data[0]?.imageUrl || null)
      .setFooter({ text: "🕯️ Joined Roblox" })
      .setTimestamp(new Date(user.created));

    return {
      embeds: [embed]
    };
  },
};