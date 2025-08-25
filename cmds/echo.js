export default {
  data: {
    name: "echo",
    description: "Repeats what you say",
    contexts: [2],
    options: [
        {
        name: "msg",
        description: "What to echo back",
        type: 3, // STRING
        required: true,
        },
    ],

    dm_permission: true,
  },
  ephemeral: false,
  run: async (data) => {

    const msg = body.data.options[0].value

    return { content: msg };
  },
};