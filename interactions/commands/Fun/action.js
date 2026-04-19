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

    if (user.id == targetId) {
      if (["punch", "kick", "yeet", "slap", "bite"].includes(type)) {

        const selfHarmLines = [
          "The Prinzessin der Verurteilung proclaims with utmost conviction that self-inflicted suffering is an act most unbefitting of one’s destined grandeur!",
          "To strike at oneself? Such folly is beneath even the most forsaken soul!",
          "The Prinzessin forbids this absurd display—thou art not thy own enemy!",
        ]

        return {
          content: selfHarmLines[Math.floor(Math.random() * selfHarmLines.length)]
        }

      } else {

        const lonelyLines = [
          "Bro can't be THAT lonely—!? I-I mean… one cannot begin to fathom how alone thou might be.",
          "Bro there's no way you are THIS lonely—!? Ahem… such solitude defies comprehension.",
          "Bro… THAT lonely? *ahem*… one cannot begin to fathom such isolation.",
        ]

        return {
          content: lonelyLines[Math.floor(Math.random() * lonelyLines.length)]
        }
      }
    } else if (targetUser.bot) {
      if (["kiss", "hug", "poke", "tickle", "peck", "feed", "cuddle", "handhold"].includes(type)) {

        const botAffectionLines = [
          "Bro is flirting with code—!? Ahem… such affection directed toward an automaton is… unexpected.",
          "At this rate thou shalt romance the very wires themselves—!? *ahem*… a curious choice indeed.",
          "The Prinzessin observes… thou art showing tenderness to a machine—!? How… intriguing.",
        ];

        return {
          content: botAffectionLines[Math.floor(Math.random() * botAffectionLines.length)]
        };

      } else {

        const botAttackLines = [
          "Had humankind truly fallen so far that thou must wage war upon a machine?",
          "To strike at mere code… what honor is there in such a deed?",
          "The Prinzessin questions thy motives—why battle an entity devoid of soul?",
          "To oppose even that which bears no life… such ambition whispers of a desire to stand as the last soul in existence—like Johan Liebert—!? Ahem… merely an observation."
        ];

        return {
          content: botAttackLines[Math.floor(Math.random() * botAttackLines.length)]
        };
      }
    }

    const res = await fetch(`https://nekos.best/api/v2/${type}`);
    const json = await res.json();
    const resData = json.results[0];

    const embed = new EmbedBuilder()
      .setDescription(`*<@${user.id}> ${type}s <@${targetUser.id}>*`)
      .setImage(resData?.url)
      // .setColor("Random")

    const back = new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setCustomId(`action|${user.id}|${targetUser.id}|${type}`)
      .setLabel(`${type} back`)

    const row = new ActionRowBuilder()
      .addComponents(back)

    return {
      embeds: [embed],
      components: [row]
    };
  },
};
