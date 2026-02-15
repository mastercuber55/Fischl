import { 
    SlashCommandBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    EmbedBuilder 
} from "@discordjs/builders"
import DCutils from "../../../handlers/DCutils.js"
import { ApplicationCommandOptionType, ButtonStyle } from "discord-api-types/v10";

export default {
  data: new SlashCommandBuilder()
    .setName("connect4")
    .setDescription("Play a game of connect 4 with a friend :3")
    .addUserOption(opt => opt
      .setName("friend")
      .setDescription("Whooo doo youu wanna playy with?!!")
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

    const option = data.options?.find(opt => opt.name === "friend")
    const targetId = option?.type === ApplicationCommandOptionType.User ? option.value : null;

    const friend = data?.resolved?.users?.[targetId]

    if(!friend) { 
        return { content: "Unable to find the targetted friend :(" }
    }

    if(friend.bot) {
      return { content: "How lonely were you to even think of playing with bots 😭." }
    }

    const invite = new EmbedBuilder()
        .setAuthor({ name: user.global_name, iconURL: DCutils.avatarURL(user) })
        .setFooter({ text: friend.global_name, iconURL: DCutils.avatarURL(friend) })
        // .setColor("Random")
        .setTitle("Connect 4")
        .setDescription(`**${friend.global_name}**, Would you like to have a game of connect 4 with **${user.global_name}**??`)
        .setTimestamp()
    
    const accept = new ButtonBuilder()
        .setEmoji({ name: "✅" })
        .setCustomId(`connect4|accept|${user.id}|${targetId}`)
        .setLabel("Accept")
        .setStyle(ButtonStyle.Success)
    
    const refuse = new ButtonBuilder()
        .setEmoji({ name: "❌" })
        .setCustomId(`connect4|refuse|${user.id}|${targetId}`)
        .setLabel("Refuse")
        .setStyle(ButtonStyle.Danger)

    const row = new ActionRowBuilder()
        .addComponents(accept, refuse)

    return { content: `<@${targetId}>!!`, embeds: [invite.toJSON()], components: [row.toJSON()] }
  }
}