import { SlashCommandBuilder } from "@discordjs/builders";

export default {
	data: new SlashCommandBuilder()
		.setName("coinflip")
		.setDescription("Invoke fate and behold the coin’s revelation ✨"),
	ephemeral: false,
	allowEvents: true,
	run: async () => {
		const content =
			Math.random() < 0.5
				? "🪙 **Heads** — ✨ The coin reveals its face."
				: "🪙 **Tails** — 🌙 The coin turns to shadow.";
		return { content };
	},
};
