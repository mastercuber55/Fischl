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
        
        emojis = [...`🍇🍊🍅🥭🍐🍉🫐`]

        embed.description = [
            emojis.join(""),
            `⬛⬛⬛⬛⬛⬛⬛`,
            `⬛⬛⬛⬛⬛⬛⬛`,
            `⬛⬛⬛⬛⬛⬛⬛`,
            `⬛⬛⬛⬛⬛⬛⬛`,
            `⬛⬛⬛⬛⬛⬛⬛`,
            `⬛⬛⬛⬛⬛⬛⬛`
        ].join("\n")

        const btns = []

        for(let i = 0; i < 7; i++) {
            const btn = new ButtonBuilder()
                .setEmoji(`${emojis[i]}`)
                .setCustomId(`connect4|play|${i}|${args[2]}|${args[3]}`)
                .setStyle(ButtonStyle.Primary)

            btns.push(btn);
        }

        const row = new ActionRowBuilder()
            .addComponents(...btns)

        return {
            type: InteractionResponseType.UpdateMessage,
            data: {
                content: ``,
                embeds: [embed],
                components: [row]
            }
        }
    }
}