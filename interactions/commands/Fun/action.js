import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } from "discord.js";

const emojis = {
  kiss: "💋",
  hug: "🫂",
  punch: "👊",
  kick: "💥",
  poke: "👈",
  peck: "😙",
  tickle: "🤣",
  yeet: "💥",
  highfive: "🙏",
  feed: "😋",
  bite: "💢",
  cuddle: "🫂",
  slap: "🖐️",
  handshake: "🤝",
  handhold: "🤝"
};

export default {
  data: new SlashCommandBuilder()
    .setName("action")
    .setDescription("Do something to someone...😈")
    .addStringOption((opt) =>
      opt
        .setName("type")
        .setDescription("What do you wanna do with them 👾")
        .setRequired(true)
        .setChoices(
          { name: "Kiss 💋", value: "kiss" },
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

  async run({ data, user }) {
    const targetId = data.options?.find((opt) => opt.name == "friend")?.value;
    const targetUser = data?.resolved?.users?.[targetId];

    const type = data.options?.find(opt => opt.name == "type")

    const res = await fetch(`https://nekos.best/api/v2/${type.value}`);
    const json = await res.json();
    const resData = json.results[0];

    const embed = new EmbedBuilder()
      .setDescription(`***${user.global_name || user.username}** ${type.value}s **${targetUser.global_name || targetUser.username}***`)
      .setImage(resData?.url)
      .setColor("Random")

    const back = new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setCustomId(`action|${user.global_name || user.username}|${targetUser.global_name || targetUser.username}|${type.value}`)
      .setEmoji(emojis[type.value])
      .setLabel(`${type.value} back`)

    const row = new ActionRowBuilder()
      .addComponents(back)

    return {
      embeds: [embed],
      components: [row]
    };
  },
};
