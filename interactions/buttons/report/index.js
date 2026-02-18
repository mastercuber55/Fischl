import { InteractionResponseType } from "discord-api-types/v10"

/** 
 * @param {object} ctx
 * @param {import("discord-api-types/v10").APIUser} ctx.user 
 * @param {Array} ctx.args 
 * @param {import("discord-api-types/v10").APIMessage} ctx.message
*/
export default async ({ user, args, message }) => {
	if(user.id != args[1]) 
		return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: "Thou lack the authority for execution of tis' interaction.",
                flags: 64
            },
        }

    const error = message.content
    const username = user.global_name || user.username
}