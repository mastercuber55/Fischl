	import { EmbedBuilder, SlashCommandBuilder } from "@discordjs/builders"
	import DCutils from "../../../handlers/DCutils.js";
	import images from "../../../cache/images.js";

	export default {
	  data: new SlashCommandBuilder()
	    .setName("leaderboard")
	    .setDescription("Witness the gathering of the world's riches beneath the twilight gaze! ✨"),
	  run: async ({ data, user }) => {
	  	const selfMora = await redis.hget(user.id, "mora")

	  	if(selfMora) {
	  		await redis.zadd("leaderboard", { score: parseInt(selfMora), member: user.id })
	  	}

	  	const topUsers = await redis.zrange("leaderboard", 0, 9, { rev: true, withScores: true });

	  	let description = ""

	  	for (var i = 0; i < topUsers.length; i += 2) {
	  		const userID = topUsers[i]
	  		const mora = topUsers[i + 1]
	  		const rank = (i/2)+1

	  		let prefix
		    if (rank === 1) prefix = "🥇"
		    else if (rank === 2) prefix = "🥈"
		    else if (rank === 3) prefix = "🥉"
		    else prefix = "🔹"

	  		description += `${prefix} <@${userID}> ・ ${parseInt(mora).toLocaleString()} Mora\n`
	  	}

	  	const embed = new EmbedBuilder()
	  		.setAuthor({ name: user.global_name || user.username, iconURL: DCutils.avatarURL(user) })
	  		.setTitle("🏆 Royal Treasury Standings")
	  		.setColor(DCutils.getRandomColor())
	  		.setDescription(description)
	  		.setFooter({ text: "Absent from the scrolls? Use /leaderboard", iconURL: images.random("square") })

	    return { embeds: [embed] }

	  } 
	}