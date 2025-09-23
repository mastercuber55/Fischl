import { 
    EmbedBuilder, 
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle 
} from "discord.js"

import commands from "../../utils/commands.json" with { type: "json" }
import manifest from "../../utils/manifest.json" with { type: "json" }

export default {
	data: new SlashCommandBuilder()
        .setName("a")
        .setDescription("Display list of all available commands.")
        .addStringOption(option => option
            .setName("cmd")
            .setDescription("The command you wanna know aboutt.")
        )
        .toJSON(),
  	ephemeral: false,
	run: async ({ data, user, utils }) => {
        
        const me = await utils.getUser() 

        let embed = new EmbedBuilder()
            .setColor("Random")
            .setAuthor({ name: user.global_name, iconURL: utils.avatarURL(user) })
            .setFooter({ text: me.global_name, iconURL: utils.avatarURL(me)})
            .setTimestamp()
            .setThumbnail(utils.avatarURL(me))
        
        const arg = data?.options?.[0]?.value
        
        if(arg) {
            const command = commands.find(cmd => cmd.name == arg)
            embed
                .setTitle(command.name[0].toUpperCase() + command.name.slice(1) + " Command")
                .setDescription(command.description)
                .addFields({ name: "Category", value: manifest[command.name] })

            if(command.options) {
                command.options.forEach(option => {
                    embed.addFields({ name: `Option: ${option.name}`, value: option.description })
                })
            }
        } else {
            commands.forEach(cmd => {
                embed.addFields({name: cmd.name, value: cmd.description})
            })
        }

        const website = new ButtonBuilder()
            .setEmoji("🔗")
            .setLabel('Website')
            .setURL('https://github.com/mastercuber55/Fischl')
            .setStyle(ButtonStyle.Link)

        const invite = new ButtonBuilder()
            .setEmoji("👾")
            .setLabel("Invite")
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/oauth2/authorize?client_id=1360871728770846733&permissions=2048&integration_type=0&scope=bot`)

        const row = new ActionRowBuilder()
            .addComponents(website, invite)

		return { embeds: [embed.toJSON()], components: [row.toJSON()] };
	},
};