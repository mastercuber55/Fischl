import { 
    EmbedBuilder, 
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle, 
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} from "discord.js"

import commands from "../../../cache/commands.json" with { type: "json" }
import categories from "../../../cache/categories.json" with { type: "json" }
import images from "../../../cache/images.js"

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
	run: async ({ data, user, discord }) => {
        
        const me = await discord.getUser() 

        let embed = new EmbedBuilder()
            .setColor("Random")
            .setAuthor({ name: user.global_name, iconURL: discord.avatarURL(user) })
            .setFooter({ text: me.global_name, iconURL: discord.avatarURL(me)})
            .setTimestamp()
            .setImage(images.random("landscape"))
        
        const arg = data?.options?.[0]?.value
        
        if(arg) {
            const command = commands.find(cmd => cmd.name == arg)
            embed
                .setTitle(command.name[0].toUpperCase() + command.name.slice(1) + " Command")
                .setDescription(command.description)
                .addFields({ name: "Category", value: categories[command.name] })

            if(command.options) {
                command.options.forEach(option => {
                    embed.addFields({ name: `Option: ${option.name}`, value: option.description })
                })
            }
        } else {
            embed.setDescription(`I, Fischl, have manifested within this domain to aid thee! Choose the path thy heart desires, and may fate guide thy curiosity!`)
        }

        const menu = new StringSelectMenuBuilder()
            .setCustomId(`help|${user.id}`)
            .setPlaceholder("Select a command category!")
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel("Basic")
                    .setValue("Basic"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("Fun")
                    .setValue("Fun"),    
                new StringSelectMenuOptionBuilder()
                    .setLabel("Utilities")
                    .setValue("Utilities"),
            )

        const website = new ButtonBuilder()
            .setEmoji("🔗")
            .setLabel('Website')
            .setURL('https://github.com/mastercuber55/Fischl')
            .setStyle(ButtonStyle.Link)

        const invite = new ButtonBuilder()
            .setEmoji("👾")
            .setLabel("Invite")
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/oauth2/authorize?client_id=1360871728770846733`)
        
        const support = new ButtonBuilder()
            .setEmoji("💬")
            .setLabel("Support")
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.gg/7zvpWnE7QV`)

        const rowa = new ActionRowBuilder()
            .addComponents(menu)
        const rowb = new ActionRowBuilder()
            .addComponents(website, invite, support)

		return { embeds: [embed], components: [rowa, rowb] };
	},
};