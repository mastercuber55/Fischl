// @ts-nocheck
import { SlashCommandBuilder } from "@discordjs/builders";
import fetch from "node-fetch";

export default {
  data: new SlashCommandBuilder()
    .setName("instagram")
    .setDescription("Peer into an Instagram profile through the lens of fate ✨")
    .addStringOption(option =>
      option
        .setName("username")
        .setDescription("The username you wish to seek 🌙")
        .setRequired(true)
    ),
  ephemeral: false,
  run: async ({ data }) => {

    const username = data.options[0].value
    const res = await profile(username)

    if (res.success == 1) {

      const response = await fetch(res.profilePic);
      const arrayBuffer = await response.arrayBuffer();
      const pfp = Buffer.from(arrayBuffer);

      const embed = {
        color: 14741505,
        title: res.full_name,
        url: `https://instagram.com/${username}`,
        description: res.bio,
        image: {
          url: "attachment://pfp.jpg",
        },
        footer: {
          text: `Followers: ${res.followers} ● Following: ${res.following}`,
        },
      };

      return { embeds: [embed], files: [{ attachment: pfp, name: "pfp.jpg" }] }
    }
    else
      return { content: `Issue on API end 🥀.` }
  },
};

async function profile(username) {
  
  const response = await fetch("https://apihut.in/api/download/videos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Avatar-Key": "avatarhubadmin"
    },
    body: JSON.stringify({
      type: "profile_pic",
      user_id: username
    })
  })

  const result = await response.json();
  return result
}