import { InteractionResponseType } from "discord.js";
import utils from "./functions.js"

export async function handleBtns(body, user) {

    try {
        const { message } = body
        const args = body.data.custom_id.split("|") 

        const index = await import(`../btns/${args[0]}/index.js`)

        let json;
        // Early handler to throw off random people.
        json = await index.default({ args, message, user, utils })

        if(!json) {
            const btn = await import(`../btns/${args[0]}/${args[1]}.js`)
            json = await btn.default({ args, message, user, utils })
        }

        return json;
    } catch(error) {

        utils.sendMessage({ content: error.stack || error.toString() })
        
        return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: "Something went wrong :(",
                flags: 64
            }
        }
    }
}