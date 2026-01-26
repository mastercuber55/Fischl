import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js"

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
  async run({data, user, discord}) {
    
    const targetId = data.options?.find(opt => opt.name === "friend")?.value
    const friend = data?.resolved?.users?.[targetId]

    if(!friend) { 
        return { content: "Unable to find the targetted friend :(" }
    }

    if(friend.bot) {
      return { content: "How lonely were you to even think of playing with bots 😭." }
    }

    const invite = new EmbedBuilder()
        .setAuthor({ name: user.global_name, iconURL: discord.avatarURL(user) })
        .setFooter({ text: friend.global_name, iconURL: discord.avatarURL(friend) })
        .setColor("Random")
        .setTitle("Connect 4")
        .setDescription(`**${friend.global_name}**, Would you like to have a game of connect 4 with **${user.global_name}**??`)
        .setTimestamp()
    
    const accept = new ButtonBuilder()
        .setEmoji("✅")
        .setCustomId(`connect4|accept|${user.id}|${targetId}`)
        .setLabel("Accept")
        .setStyle(ButtonStyle.Success)
    
    const refuse = new ButtonBuilder()
        .setEmoji("❌")
        .setCustomId(`connect4|refuse|${user.id}|${targetId}`)
        .setLabel("Refuse")
        .setStyle(ButtonStyle.Danger)

    const row = new ActionRowBuilder()
        .addComponents(accept, refuse)

    return { content: `<@${targetId}>!!`, embeds: [invite.toJSON()], components: [row.toJSON()] }
  }
}