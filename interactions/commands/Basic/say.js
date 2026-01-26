import { SlashCommandBuilder } from "discord.js"


export default {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Hark! The Prinzessin echoes thy decree!")
    .addStringOption(option => option
      .setName("decree")
      .setDescription("Thy decree to be echoed.")
    ),
  ephemeral: false,
  allowEvents: true,
  run: async ({ data }) => {

    const msg = data.options[0].value

    return { content: msg };
  },
};