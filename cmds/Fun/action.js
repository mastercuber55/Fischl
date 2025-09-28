import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("a")
    .setDescription("Do something to someone...😈")
    .addStringOption((opt) =>
      opt
        .setName("type")
        .setDescription("What do you wanna do with them 👾")
        .setRequired(true)
        .setChoices(
          { name: "Kiss 😽", value: "kiss" },
          { name: "Hug 🫂", value: "hug" },
          { name: "Punch 👊", value: "punch" },
          { name: "Kick 💥", value: "kick" },
          { name: "Poke 👈", value: "poke" },
          { name: "Peck 😙", value: "peck" },
          { name: "Tickle 🤣", value: "tickle" },
          { name: "Yeet 💥", value: "yeet" },
          { name: "High-five 🙏", value: "highfive" },
          { name: "Feed 😋", value: "feed" },
          { name: "Bite 💢", value: "bite" },
          { name: "Cuddle 🫂", value: "cuddle" },
          { name: "Slap 🖐️", value: "slap" },
          { name: "Handshake 🤝", value: "handshake" },
          { name: "Hold hand 🤝", value: "handhold" }          
        )
    )
    .addUserOption((opt) =>
      opt
        .setName("friend")
        .setDescription("Who do you wanna interact with?!!")
        .setRequired(true)
    )
    .toJSON(),
  ephemeral: false,

  async run({ data, user, utils }) {
    const targetId = data.options?.find((opt) => opt.name == "friend")?.value;
    const targetUser = data?.resolved?.users?.[targetId];

    const type = data.options?.find(opt => opt.name == "type")

    const res = await fetch(`https://nekos.best/api/v2/${type.value}`);
    const json = await res.json();
    const kiss = json.results[0];

    const embed = new EmbedBuilder()
      .setAuthor({ name: user.global_name, iconURL: utils.avatarURL(user) })
      .setTitle(`**${user.global_name}** ${type.value}s **${targetUser.global_name}**`)
      .setImage(kiss?.url)
      .setColor("Random")
      .addFields({ name: "Anime", value: kiss?.anime_name, inline: true })
      .setFooter({
        text: targetUser.global_name,
        iconURL: utils.avatarURL(targetUser),
      })
      .setTimestamp();

    return {
      content: `<@${targetId}>`,
      embeds: [embed],
    };
  },
};
