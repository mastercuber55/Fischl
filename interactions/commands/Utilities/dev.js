import { codeBlock, SlashCommandBuilder } from "@discordjs/builders"
import { get } from "@vercel/edge-config"
import { ApplicationCommandOptionType } from "discord-api-types/v10"

export const data = new SlashCommandBuilder()
	.setName("dev")
	.setDescription("Few commands for the bot dev to quickly do things")
	.addSubcommand(cmd => cmd
		.setName("set-name")
		.setDescription("Change one's name")
		.addStringOption(opt => opt
			.setName("name")
			.setDescription("one's new name")
			.setRequired(true)
		)
	)

/**
 * @param {object} ctx
 * @param {import("discord-api-types/v10").APIChatInputApplicationCommandInteractionData} ctx.data
 * @param {import("discord-api-types/v10").APIUser} ctx.user
 */
export async function run({ data, user }) {

	const ownerID = await get("BOT-developer-ID")

	if (ownerID !== user.id) {
		return { content: "Thou lack the authority to rename me." }
	}

	const subcommand = data.options?.find(
		opt => opt.type === ApplicationCommandOptionType.Subcommand
	)

	const displayName = subcommand?.options?.find(
		opt => opt.type === ApplicationCommandOptionType.String
	)?.value

	if (!displayName) {
		return { content: "No display name provided." }
	}

	if (displayName.length > 32) {
		return { content: "Display name must be 32 characters or fewer." }
	}

	const res = await fetch("https://discord.com/api/v10/users/@me", {
		method: "PATCH",
		headers: {
			"Authorization": `Bot ${process.env.DISCORD_TOKEN}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			global_name: displayName
		})
	})

	if (!res.ok) {
		const err = await res.text()
		console.error("Failed to set display name:", err)
		return { content: "Discord rejected the display name change." }
	}

	return {
		content: `Display name updated ✅`
	}
}

export default {
	data, run
}