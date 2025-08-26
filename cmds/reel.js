
export default {
  data: {
    name: "reel",
    description: "Send a instagram reel to your friend playable in discord!!",
    options: [
      {
        name: "link",
        description: "Reel Share URL",
        type: 3, // STRING
        required: true,
      },
    ],

  },
  ephemeral: false,
  run: async (data) => {

    const link = data.options[0].value
    const res = await reel(link)

    if(res.success == 1) 
      return { content: `[REEL](${res.data[0].url}.mp4)` }
    else
      return { content: `Issue on API end 🥀.`}
  },
};

async function reel(video_url) {
  
  const response = await fetch("https://apihut.in/api/download/videos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Avatar-Key": "avatarhubadmin"
    },
    body: JSON.stringify({
      video_url,
      type: "instagram"
    })
  })

  const result = await response.json();
  return result
}