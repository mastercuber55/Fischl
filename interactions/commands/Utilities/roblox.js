import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import fetch from "node-fetch";

async function jfetch(url, opts) {
    const r = await fetch(url, opts);
    return r.json();
}

export default {
    data: new SlashCommandBuilder()
        .setName("a")
        .setDescription("Get someone's Roblox profile")
        .addStringOption(opt => opt
            .setName("username")
            .setDescription("The username of the Roblox user")
            .setRequired(true)
        ),
    ephemeral: false,
    run: async ({ data }) => {

        const username = data.options?.find(opt => opt.name === "username")?.value

        const res = await fetch("https://users.roblox.com/v1/usernames/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usernames: [username] }),
        });
        const robloxData = await res.json();
        if (!robloxData.data || robloxData.data.length === 0) {
            return {
                content: "User not found :("
            }
        }
        const userId = robloxData.data[0].id;
        

        const avatar = await jfetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png&isCircular=false`)
        const user = await jfetch(`https://users.roblox.com/v1/users/${userId}`)

        const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`${user.displayName} - ${username}`)
            .setDescription(user.description || "Nothing in Bio :<")
            .setImage(avatar.data[0].imageUrl)
            .setFooter({ text: 'Joined Roblox' })
            .setTimestamp(new Date(user.created));
        
        return {
            embeds: [embed]
        };

    },
};