import { SlashCommandBuilder, EmbedBuilder } from "@discordjs/builders"
import images from "../../../cache/images.js"
import DCutils from "../../../handlers/DCutils.js"

export default {
    data: new SlashCommandBuilder()
        .setName("profile")
        .setDescription("Gaze upon the illustrious record of a traveler.")
        .addUserOption(opt =>
            opt.setName("traveler")
               .setDescription("Whose noble deeds shall be revealed?")
        )
        .toJSON(),
    ephemeral: false,
    async run({ data, user }) {
        
        const targetId = data.options?.find(opt => opt.name === "traveler")?.value || user.id
        const targetUser = data?.resolved?.users?.[targetId] || user

        const avatarURL = DCutils.avatarURL(targetUser)

        const mora = String(await redis.hget(targetId, "mora") || 0)

        const embed = new EmbedBuilder()
            // .setColor("Random")
            .setAuthor({ name: targetUser.global_name || targetUser.username, iconURL: avatarURL })
            .setThumbnail(avatarURL)
            // .setDescription(`-# *Travelers will be able to add custom description here *`)
            .addFields(
                { name: "Mora Collected", value: `${mora} 💰` },
                { name: "Status", value: "The brave wanderer continues their sojourn through unknown lands…" },
                { name: "Note from Oz", value: "All deeds, great or small, are watched over by the Raven of Midnight." }
            )
            .setFooter({ text: "Prinzessin der Verurteilung", iconURL: images.random("square") })
            .setTimestamp()

        return {
            embeds: [embed]
        }
    }
}