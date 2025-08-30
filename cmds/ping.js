export default {
	data: {
    description: "AAAAAAA",
  },
  ephemeral: false,
	run: async ({ data }) => {
		return { content: `# 🏓 | PONG!` };
	},
};