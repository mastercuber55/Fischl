import { InteractionResponseType } from "discord-api-types/v10"

export default async({ args, user }) => {

    // Get lost if you aren't either the host or the friend.
    if(user.id != args[2] && user.id != args[3]) {
        return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: "You look lonely. **/connect4** can fix that, hopefully...",
                flags: 64
            },
        }
    }

}