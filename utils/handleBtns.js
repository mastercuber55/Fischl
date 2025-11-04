import { ComponentType } from "discord.js"
import utils from "./functions.js"

export async function handleBtns(body, user) {
    const { message } = body
    const args = body.data.custom_id.split("|") 

    const isMenu = body.data.component_type == ComponentType.StringSelect;
    const values = body.data.values || [];   

    const index = await import(`../btns/${args[0]}/index.js`);

    let json;
    // Early handler to throw off random people.
    json = await index.default({ args, values, message, user, utils });

    if(!json) {
        const btn = await import(`../btns/${args[0]}/${args[1]}.js`);
        json = await btn.default({ args, message, user, utils, values });
    }

    return json;
}