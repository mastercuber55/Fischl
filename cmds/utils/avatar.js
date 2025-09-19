export default {
  data: {
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

  async run({data, user, utils}) {

    const targetId = data.options?.find(opt => opt.name === "user")?.value || user.id
    const targetUser = data?.resolved?.users?.[targetId] || user
    const url = utils.avatarURL(targetUser)

    return {
      content: url
    };
  }
}
