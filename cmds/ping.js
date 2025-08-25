export default {
	data: {
    name: "ping",
    description: "AAAAAAA",
  },
  ephemeral: false,
	run: async (data) => {
		return { content: `# 🏓 | PONG!` };
	},
};