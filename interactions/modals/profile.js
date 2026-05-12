export default {
  ephemeral: true,
  run: async ({ values, user }) => {

    console.log(values)

    return {
      content: `✨ Thy profile hath been rewritten, <@${user.id}>.`
    };
  },
};