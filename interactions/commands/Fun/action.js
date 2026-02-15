import { 
  ActionRowBuilder, 
  ButtonBuilder, 
  EmbedBuilder, 
  SlashCommandBuilder 
} from "@discordjs/builders";
import { ButtonStyle } from 'discord-api-types/v10';
import { ApplicationCommandOptionType } from "discord-api-types/v10";

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
  /**
 * @param {object} ctx
 * @param {import("discord-api-types/v10").APIChatInputApplicationCommandInteractionData} ctx.data
 * @param {import("discord-api-types/v10").APIUser} ctx.user
 */
  async run({ data, user }) {
    const option1 = data.options?.find((opt) => opt.name == "friend");
    const targetId = option1?.type === ApplicationCommandOptionType.User ? option1.value : null;
    const targetUser = data?.resolved?.users?.[targetId];

    const option2 = data.options?.find(opt => opt.name == "type")
    const type = option2?.type === ApplicationCommandOptionType.String ? option2.value : null;

    const res = await fetch(`https://nekos.best/api/v2/${type}`);
    const json = await res.json();
    const resData = json.results[0];

    const embed = new EmbedBuilder()
      .setDescription(`***${user.global_name || user.username}** ${type}s **${targetUser.global_name || targetUser.username}***`)
      .setImage(resData?.url)
      // .setColor("Random")

    const back = new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setCustomId(`action|${user.global_name || user.username}|${targetUser.global_name || targetUser.username}|${type}`)
      .setLabel(`${type} back`)

    const row = new ActionRowBuilder()
      .addComponents(back)

    return {
      embeds: [embed],
      components: [row]
    };
  },
};
