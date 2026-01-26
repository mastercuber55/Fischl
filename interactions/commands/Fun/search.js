import { EmbedBuilder, SlashCommandBuilder } from "discord.js"

const root = "https://gsi.fly.dev"

export default {
	data: new SlashCommandBuilder()
		.setName("search")
		.setDescription("Peer into the threads of fate to find a soul of Teyvat ✨")
		.addStringOption(option => option
			.setName("name")
			.setDescription("The true name by which they are known")
		)
		.addStringOption(option => option
			.setName("region")
			.setDescription("The nation that claims their allegiance")
		)
		.addStringOption(option => option
			.setName("vision")
			.setDescription("The element that answers their call")
		)
		.addStringOption(option => option
			.setName("rarity")
			.setDescription("The brilliance of their constellation")
		)
		.addStringOption(option => option
			.setName("weapon")
			.setDescription("The weapon they wield")
		)
		.addStringOption(option => option
			.setName("model_type")
			.setDescription("The form their vessel takes")
		),

	async run({ data }) {
		const rawOptions = data.options || []
		const params = new URLSearchParams()

		rawOptions.forEach(option => {
			if (option.value) params.append(option.name, option.value)
		})

		const res = await fetch(`${root}/characters/search?${params.toString()}`)
		const result = await res.json()

		const embed = new EmbedBuilder()
			.setColor("Random")
			.setTitle("📜 Codex of Teyvat")
			.setFooter({ text: "Knowledge drawn from the threads of fate" })
			.setTimestamp()

		// 🔍 Search summary
		if (params.toString()) {
			embed.setDescription(
				`🌙 **Search Conditions**\n` +
				rawOptions
					.filter(o => o.value)
					.map(o => `• **${o.name.replace("_", " ")}**: ${o.value}`)
					.join("\n")
			)
		} else {
			embed.setDescription("✨ No filters applied. All souls answer the call.")
		}

		// ❌ No results
		if (!result.results || result.results.length === 0) {
			embed.addFields({
				name: "🌫️ Silence…",
				value: "No characters answered your call. "
			})

			return { embeds: [embed] }
		}

		// ✅ Results
		result.results.forEach(char => {
			embed.addFields({
				name: `${char.name} ⭐`,
				value:
					`🗡️ **Weapon:** ${char.weapon}\n` +
					`🌈 **Vision:** ${char.vision}\n` +
					`⭐ **Rarity:** ${char.rarity}`
			})
		})

		return { embeds: [embed] }
	},
}