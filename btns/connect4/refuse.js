import { InteractionResponseType } from "discord.js"

export default async({ args, message, user, utils }) => {
    
    const embed = message.embeds[0]

    if(user.id == args[2]) {
        embed.description += `\nWoops, NEVERMIND!. **${user.global_name}** doesn't wanna play with ya.`

        
    } else if(user.id == args[3]) {
        embed.description = `Uh oh... **${user.global_name}** doesn't wanna play with you...`
    }

    return {
        type: InteractionResponseType.UpdateMessage,
        data: {
            embeds: [embed],
            components: utils.disableComponents(message.components)
        }
    }
}