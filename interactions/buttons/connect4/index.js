import { InteractionResponseType } from "discord-api-types/v10"

export default async({ args, user }) => {

    if(user.id != args[2] && user.id != args[3]) {
        return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: "Thou lack the authority for execution of tis' interaction.",
                flags: 64
            },
        }
    }

}