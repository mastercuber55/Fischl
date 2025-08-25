module.exports = {
	data: {
    name: "ping",
    description: "AAAAAAA",
    contexts: [2],
  },
  ephemeral: false,
	run: async (data) => {
		return { content: `# 🏓 | PONG!` };
	},
};