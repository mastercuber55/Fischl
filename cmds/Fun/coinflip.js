export default {
	data: {
    	description: "Flip a coin, decide the destiny.",
  	},
  	ephemeral: false,
	run: async ({ data }) => {
        const content = Math.random() < 0.5 ? "🪙 Heads" : "🪙 Tails";
		return { content };
	},
};