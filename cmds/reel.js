
export default {
  data: {
    name: "reel",
    description: "Send a instagram reel to your friend playable in discord!!",
    contexts: [2],
    options: [
      {
        name: "link",
        description: "Reel Share URL",
        type: 3, // STRING
        required: true,
      },
    ],

    dm_permission: true,
  },
  defer: true,
  ephemeral: false,
  run: async (data) => {

    const link = data.options[0].value
    const res = await reel(link)

    console.log(res)

    if(res.success == 1) 
      return { content: `[Reel](${res.data[0].url}.mp4)` }
    else
      return { content: `Issue on API end 🥀.`}
  },
};

async function reel(video_url, type = 'instagram') {

  console.log(video_url)
  const response = await fetch(`https://marina-six.vercel.app/api/reel?link=${video_url}`)
  const result = await response.json();
  return result
}