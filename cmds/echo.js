export default {
  data: {
    description: "Repeats what you say",
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
  run: async ({ data }) => {

    const msg = data.options[0].value

    return { content: msg };
  },
};