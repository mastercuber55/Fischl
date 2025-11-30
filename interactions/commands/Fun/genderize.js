import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("a")
        .setDescription("Guess gender of someone.")
        .addStringOption(opt => opt
            .setName("name")
            .setDescription("the name to guess the gender of!")
            .setRequired(true)
        )
        .toJSON(),
    ephemeral: false,

    async run({ data }) {

        const name = data.options?.find(opt => opt.name === "name")?.value
        const r = await fetch(`https://api.genderize.io?name=${name}`);
        const result = await r.json();
        
        if (result.gender) {
            return {
                content: `**${result.name}** is **${result.gender}** with **${result.probability * 100}%** certainty.`
            };
        } else {
            return {
                content: `Uh oh. **${result.name}** is unknown to us.`
            }
        }
    }
}
