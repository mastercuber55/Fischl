import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("a")
    .setDescription("Can't cook? I'm good at cooking")
    .toJSON(),
  ephemeral: true,

  async run() {

    const res = await fetch(`https://evilinsult.com/generate_insult.php?lang=en&type=json`) 
    const json = await res.json()

    return {
      content: json.insult
    };
  }
}
