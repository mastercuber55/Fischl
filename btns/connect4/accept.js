import { ActionRowBuilder, ButtonBuilder, ButtonStyle, InteractionResponseType } from "discord.js"

export default async({ args, message, user, utils }) => {
    if(user.id == args[2]) {
        return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: "Its not an invitation if you try forcing them 🥀.",
                flags: 64
            }
        }
    } else if (user.id == args[3]) {
        const embed = message.embeds[0]
        
        const emojis = [...`🍇🍊🍅🥭🍐🍉🫐`]

        embed.description = [
             emojis.join(""),
            `⬛⬛⬛⬛⬛⬛⬛`,
            `⬛⬛⬛⬛⬛⬛⬛`,
            `⬛⬛⬛⬛⬛⬛⬛`,
            `⬛⬛⬛⬛⬛⬛⬛`,
            `⬛⬛⬛⬛⬛⬛⬛`,
            `⬛⬛⬛⬛⬛⬛⬛`
        ].join("\n")

        embed.fields = [{name: "💠 Turn", value: `<@${args[2]}>`}]

        const row1 = new ActionRowBuilder()
        const row2 = new ActionRowBuilder()

        for(let i = 0; i < 7; i++) {
            const btn = new ButtonBuilder()
                .setEmoji(`${emojis[i]}`)
                .setCustomId(`connect4|play|${args[2]}|${args[3]}|${i}`)
                .setStyle(ButtonStyle.Primary)

            if(i < 4) {
                row1.addComponents(btn)
            } else {
                row2.addComponents(btn)
            }
        }

        const resign = new ButtonBuilder()
            .setCustomId(`connect4|play|${args[2]}|${args[3]}|resign`)
            .setEmoji(`🏃`)
            .setStyle(ButtonStyle.Danger)

        row2.addComponents(resign)

        return {
            type: InteractionResponseType.UpdateMessage,
            data: {
                embeds: [embed],
                components: [row1.toJSON(), row2.toJSON()]
            }
        }
    }
}