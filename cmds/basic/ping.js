export default {
	data: {
    	description: "Classical command, won't you agree.",
  	},
  	ephemeral: false,
	run: async ({ data }) => {
		return { content: `🏓 | pong!` };
	},
};