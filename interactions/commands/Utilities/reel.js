import { SlashCommandBuilder } from "discord.js"

export default {
  data: new SlashCommandBuilder()
    .setName("reel")
    .setDescription("Send an Instagram reel through the winds of fate ✨")
    .addStringOption(option =>
      option
        .setName("link")
        .setDescription("The reel link you wish to share 🌙")
        .setRequired(true)
    ),
  run: async ({ data }) => {
    const link = data.options[0].value
    const res = await reel(link)

    if (res.success == 1) {
      return {
        content: `📸✨ *A vision appears…*\n\n[Instagram Reel](${res.data[0].url.replace(/(&dl=1)+$/, "")})`
      }
    } else {
      return {
        content: `🌫️ *The winds falter…*\n\nSomething went wrong on our end 🥀`
      }
    }
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