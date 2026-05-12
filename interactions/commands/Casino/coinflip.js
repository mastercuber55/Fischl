import { SlashCommandBuilder } from "@discordjs/builders";

export default {
	data: new SlashCommandBuilder()
		.setName("coinflip")
		.setDescription("Invoke fate and behold the coin’s revelation ✨")
		.addStringOption(option =>
			option
				.setName("side")
				.setDescription("Declare thy chosen face of the coin・Heads or Tails?")
				.setRequired(true)
				.addChoices(
					{ name: "Heads", value: "heads" },
					{ name: "Tails", value: "tails" }
				)
		)
		.addIntegerOption(option =>
			option
				.setName("bet")
				.setDescription("The amount of Mora thou dares to wager upon fate’s whim.")
				.setRequired(true)
		),
	ephemeral: false,
	allowEvents: true,
	run: async ({ data, user }) => {
		
		const side = data.options?.find(opt => opt.name === "side")?.value;
		const bet = data.options?.find(opt => opt.name === "bet")?.value
		const balance = parseInt(await redis.hget(user.id, "mora")) || 0;

		if (bet <= 0) {
			return { content: "Thou cannot wager nothing." };
		}

		if (bet > balance) {
			return { content: "Thou lackest the Mora to make such a bold wager." };
		}

		const jackpot = Math.random() < 0.01; // 1% chance

		let flip;
		let win;
		let payout = bet;

		if (jackpot) {
			// force win + triple reward
			flip = side;
			win = true;
			payout = bet * 3;
		} else {
			flip = Math.random() < 0.5 ? "heads" : "tails";
			win = flip === side;
		}

		await redis.hincrby(user.id, "mora", win ? payout : -payout);

		const face = flip === "heads" ? "Heads" : "Tails";

		const winMessages = [
			`**${face}**・Fortune smiles upon thee. Thou hast gained **${bet} Mora**.`,
			`**${face}**・Fate aligns in thy favor. **${bet} Mora** is now thine.`,
			`**${face}**・A favorable turn of destiny grants thee **${bet} Mora**.`,
			`**${face}**・The coin answers thy call. Thou earnest **${bet} Mora**.`,
			`**${face}**・Luck bends to thy will. **${bet} Mora** joins thy coffers.`,
		];

		const lossMessages = [
			`**${face}**・Fate turns away… thou hast lost **${bet} Mora**.`,
			`**${face}**・The coin betrays thee. **${bet} Mora** slips from thy grasp.`,
			`**${face}**・Destiny is unkind. Thou losest **${bet} Mora**.`,
			`**${face}**・A cruel twist of chance claims **${bet} Mora** from thee.`,
			`**${face}**・The gamble fails. **${bet} Mora** is forfeit.`,
		];

		const jackpotMessages = [
			`**${face}**・The coin defies fate itself. Thou art granted **${payout} Mora**.`,
			`**${face}**・A rare convergence of destiny bestows **${payout} Mora** upon thee.`,
			`**${face}**・The heavens align・**${payout} Mora** is thine by miracle.`,
		];

		let resultText;

		if (jackpot) {
			resultText = jackpotMessages[Math.floor(Math.random() * jackpotMessages.length)];
		} else if (win) {
			resultText = winMessages[Math.floor(Math.random() * winMessages.length)];
		} else {
			resultText = lossMessages[Math.floor(Math.random() * lossMessages.length)];
		}

		return { content: resultText };
	},
};
	