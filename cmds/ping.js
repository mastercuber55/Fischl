export default {
	data: {
    name: "ping",
    description: "AAAAAAA",
    contexts: [2],
    dm_permission: true,
  },
  ephemeral: false,
	run: async (data) => {
		return { content: `# 🏓 | PONG!` };
	},
};