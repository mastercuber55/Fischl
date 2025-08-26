export default {
  data: {
    "name": "avatar",
    "description": "Get the avatar of a user",
    "type": 1,
    "options": [
        {
        "name": "user",
        "description": "User to fetch avatar for",
        "type": 6,
        "required": false
        }
    ]
  },
  ephemeral: false,

  async run({data, user}) {

    const target = data.options?.find(opt => opt.name === "user")?.value || user.id;

    const url = `https://cdn.discordapp.com/avatars/${target}/${data?.resolved?.users[target]?.avatar || user.avatar}.png?size=1024`;

    return {
      content: url
    };
  }
}
