
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

    const video_url = await reel(link)

    return { content: video_url };
  },
};

async function reel(video_url, type = 'instagram') {
const response = await fetch("https://apihut.in/api/download/videos", {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'X-Avatar-Key': 'avatarhubadmin'
    },
    body: JSON.stringify({
        video_url,
        type,
    })
});
    
    const result = await response.json();
    
    console.log(await fetch(video_url))
    
    return result
}