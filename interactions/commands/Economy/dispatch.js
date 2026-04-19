import { SlashCommandBuilder } from "@discordjs/builders"


export default {
  data: new SlashCommandBuilder()
    .setName("dispatch")
    .setDescription("Dispatch Oz to survey the lands and gather spoils ✨"),
  ephemeral: false,
  cooldown: 60,
  allowEvents: true,
  run: async ({ data, user }) => {

    const amount = Math.floor(Math.random() * (300 - 150 + 1)) + 150

    const messages = [
      `Oz has returned from the shadows with **${amount} Mora**. "A meager find, Mein Fräulein, but gold nonetheless."`,
      `Thou hast cleared a camp of unruly hilichurls! They left behind **${amount} Mora**.`,
      `Through the violet haze, thou didst find a hidden cache containing **${amount} Mora**.`,
      `The Gaze of the Deep reveals hidden treasures! Thou hast secured **${amount} Mora**.`
    ];
    
    await redis.hincrby(user.id, "mora", amount)

    return { content: messages[Math.floor(Math.random() * messages.length)] }
  },
};