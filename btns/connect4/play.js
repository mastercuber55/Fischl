import { InteractionResponseType } from "discord.js"

export default async({ args, message, user, utils }) => {
    return {
        type: InteractionResponseType.DeferredChannelMessageWithSource,
    }
}