import { EmbedBuilder, InteractionResponseType } from "discord.js"
import commands from "../../../cache/commands.json" with { type: "json" }
import categories from "../../../cache/categories.json" with { type: "json" }

export default async ({ args, values, user, message }) => {

    // shu shu away non command users.
    if (user.id != args[1]) {
        return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: "🌙 *This choice was not meant for you.* Perhaps **/help** will guide your steps elsewhere ✨",
                flags: 64
            },
        }
    }
    
    let embed = new EmbedBuilder(message.embeds[0]);

    embed.setFields([])

    commands.forEach(cmd => {
        if (categories[cmd.name] == values[0])
            embed.addFields({ name: cmd.name, value: cmd.description })
    })

    return {
        type: InteractionResponseType.UpdateMessage,
        data: {
            components: message.components,
            embeds: [embed]
        },
    }
}