import commands from "../../utils/commands.json" with { type: "json" }
import { 
    EmbedBuilder, 
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle 
} from "discord.js"

export default {
	data: new SlashCommandBuilder()
        .setName("a")
        .setDescription("Display list of all available commands.")
        .toJSON(),
  	ephemeral: false,
	run: async ({ data, user, utils }) => {

        let embed = new EmbedBuilder()
            .setColor("Random")
            .setAuthor({ name: user.global_name, iconURL: utils.avatarURL(user) })
            // .setFooter({ text: }) use this to display bot's name and pfp later.
            .setTimestamp()
            // .setThumbnail(utils.avatarURL(utils.botUser()))

        commands.forEach(cmd => {
            embed.addFields({name: cmd.name, value: cmd.description})
        })

        const button = new ButtonBuilder()
            .setEmoji("🔗")
            .setLabel('Website')
            .setURL('https://github.com/mastercuber55/Fischl')
            .setStyle(ButtonStyle.Link)

        const row = new ActionRowBuilder()
            .addComponents(button)

		return { embeds: [embed.toJSON()], components: [row.toJSON()] };
	},
};