import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("a")
    .setDescription("Get the avatar of a user.")
    .addUserOption(opt => opt
      .setName("user")
      .setDescription("Whose avatar ya wanna see??")
    )
    .toJSON(),
  ephemeral: false,

  async run({data, user, discord }) {

    const targetId = data.options?.find(opt => opt.name === "user")?.value || user.id
    const targetUser = data?.resolved?.users?.[targetId] || user
    const url = discord.avatarURL(targetUser)

    return {
      content: url
    };
  }
}
