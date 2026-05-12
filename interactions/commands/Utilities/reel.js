import { SlashCommandBuilder } from "@discordjs/builders"

export default {
  data: new SlashCommandBuilder()
    .setName("reel")
    .setDescription("Send an Instagram reel through the winds of fate ✨")
    .addStringOption(option =>
      option
        .setName("link")
        .setDescription("The reel link you wish to share 🌙")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("caption")
        .setDescription("A custom caption for the reel ✨")
        .setRequired(false)
    ),
  run: async ({ data }) => {
    const link = data.options.find(o => o.name === "link").value;
    const caption = data.options.find(o => o.name === "caption")?.value;

    const kkLink = link.replace(
      "instagram.com",
      "kkinstagram.com"
    )

    return {
      content: `\n\n[${caption || "📸✨ *A vision appears…*"}](${kkLink})`
    }
  },
};