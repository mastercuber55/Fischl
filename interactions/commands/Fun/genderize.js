import { SlashCommandBuilder } from "@discordjs/builders";

export default {
    data: new SlashCommandBuilder()
        .setName("genderize")
        .setDescription("Consult fate to glimpse what the stars suggest ✨")
        .addStringOption(opt =>
            opt
                .setName("name")
                .setDescription("The name to present before destiny")
                .setRequired(true)
        ),
    ephemeral: false,
    allowEvents: true,
    async run({ data }) {
        const name = data.options?.find(opt => opt.name === "name")?.value;
        const r = await fetch(`https://api.genderize.io?name=${name}`);
        const result = await r.json();

        if (result.gender) {
            return {
                content:
                    `🌟 *The stars whisper…*\n\n` +
                    `The name **${result.name}** aligns most closely with **${result.gender}**, ` +
                    `with **${Math.round(result.probability * 100)}%** certainty ✨`
            };
        } else {
            return {
                content:
                    `🌫️ *The stars fall silent…*\n\n` +
                    `The name **${result.name}** eludes destiny’s grasp. Its truth remains unknown 🌙`
            };
        }
    }
};
