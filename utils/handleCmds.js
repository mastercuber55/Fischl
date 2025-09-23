import manifest from "./manifest.json" with { type: "json" }
import utils from "./functions.js"

export async function handleCmds(body, user) {

    try {
        const { data } = body;
        const cmd = await import(`../cmds/${manifest[data.name]}/${data.name}.js`)

        const json = { 
            type: 4,
            data: {
                ...await cmd.default.run({ data, user, utils }),
                flags: cmd.default.ephemeral ? 64 : 0
            } 
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