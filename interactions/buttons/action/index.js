import { 
    EmbedBuilder, 
    ButtonBuilder, 
    ActionRowBuilder, 
} from "@discordjs/builders"
import { InteractionResponseType, ButtonStyle } from "discord-api-types/v10"

export default async ({ args, user }) => {

    if (user.global_name != args[1] && user.global_name != args[2]) {
        return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: "You look lonely. **/action** can fix that, hopefully...",
                flags: 64
            },
        }
    }

    const res = await fetch(`https://nekos.best/api/v2/${args[3]}`);
    const json = await res.json();
    const resData = json.results[0];

    const embed = new EmbedBuilder()
        .setImage(resData?.url)
        // .setColor("Random")

    const back = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId(`action|${args[1]}|${args[2]}|${args[3]}`)
        .setLabel(`${args[3]} back`)

    const row = new ActionRowBuilder()
        .addComponents(back)

    // What if the slash command user presses the button?
    if (user.global_name == args[1]) { 
        embed.setDescription(`***${args[1]}** ${args[3]}s **${args[2]} again***`);
    } else if (user.global_name == args[2]) {
        embed.setDescription(`***${args[2]}** ${args[3]}s **${args[1]} back***`);
    }

    return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            embeds: [embed],
            components: [row]
        }
    };

}