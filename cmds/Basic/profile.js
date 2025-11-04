import { SlashCommandBuilder } from "discord.js"

export default {
    data: new SlashCommandBuilder()
        .setName("a")
        .setDescription("See a traveler's profile.")
        .addUserOption(opt => opt
            .setName("traveler")
            .setDescription("Which traveler's profile you wish to see?")
        )
        .toJSON(),
    ephemeral: false,
    async run({ data, user }) {
        const targetId = data.options?.find(opt => opt.name === "user")?.value || user.id

        return {
            content: `<@${targetId}> has **${await redis.hget(targetId, "mora")}** moras.`
        }
    }
}