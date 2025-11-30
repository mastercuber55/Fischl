import { EmbedBuilder, InteractionResponseType } from "discord.js"
import commands from "../../../cache/commands.json" with { type: "json" }
import categories from "../../../cache/categories.json" with { type: "json" }

export default async({ args, values, user, message }) => {

    // Get lost if you aren't the command executor.
    if(user.id != args[1]) {
        return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: "You look lonely. **/help** can fix that, hopefully...",
                flags: 64
            },
        }
    }
    
    let embed = new EmbedBuilder(message.embeds[0]);

    embed.setFields([])

    commands.forEach(cmd => {
        if(categories[cmd.name] == values[0])
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