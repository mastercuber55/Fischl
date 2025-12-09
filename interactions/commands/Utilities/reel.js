import { SlashCommandBuilder } from "discord.js"


export default {
  data: new SlashCommandBuilder()
    .setName("a")
    .setDescription("Send a instagram reel to your friend playable in discord!!")
    .addStringOption(option => option
      .setName("link")
      .setDescription("Reel share url")
      .setRequired(true)
    ),
  run: async ({ data }) => {

    const link = data.options[0].value
    const res = await reel(link)

    if(res.success == 1) {
      return { content: `[Instagram Reel](${res.data[0].url.replace(/(&dl=1)+$/, "")})` }
    }
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