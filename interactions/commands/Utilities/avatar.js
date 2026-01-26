import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Behold the visage of a user ✨")
    .addUserOption(opt =>
      opt
        .setName("traveler")
        .setDescription("Whose avatar do you seek?")
    )
    .toJSON(),
  ephemeral: false,

  async run({ data, user, discord }) {
    const targetId =
      data.options?.find(opt => opt.name === "traveler")?.value || user.id;

    const targetUser = data?.resolved?.users?.[targetId] || user;
    const url = discord.avatarURL(targetUser, { size: 1024 });

    const embed = new EmbedBuilder()
      .setTitle(`✨ ${targetUser.username}'s Avatar`)
      .setImage(url)
      .setColor("Random");

    return {
      embeds: [embed]
    };
  }
};
