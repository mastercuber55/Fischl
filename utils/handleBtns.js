import utils from "./functions.js"

export async function handleBtns(body, user) {

    const { message } = body
    const args = body.data.custom_id.split("|") 

    const index = await import(`../btns/${args[0]}/index.js`)

    // Over here, the whole json returned is handled by the button to allow the button to see who can press it and stuff.
    let json;
    json = await index.default({ args, message, user, utils })

    if(!json) {
        const btn = await import(`../btns/${args[0]}/${args[1]}.js`)
        json = await btn.default({ args, message, user, utils })
    }

    return json;
}