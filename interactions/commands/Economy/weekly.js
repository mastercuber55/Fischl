import { SlashCommandBuilder } from "@discordjs/builders";

export default {
  data: new SlashCommandBuilder()
    .setName("weekly")
    .setDescription("Receive a bountiful weekly tribute from the Immernachtreich ✨"),
  ephemeral: false,
  // 7 days * 24 hours * 60 minutes * 60 seconds
  cooldown: 7 * 24 * 60 * 60, 
  allowEvents: true,
  run: async ({ data, user }) => {
    // Increased rewards for the 7-day wait (e.g., 15,000 to 25,000 Mora)
    const amount = Math.floor(Math.random() * (25000 - 15000 + 1)) + 15000;

    const messages = [
      `A grand tribute from the Immernachtreich! The Prinzessin bestows upon thee **${amount} Mora** for thy continued loyalty.`,
      `The stars have aligned for thy weekly blessing... Receive **${amount} Mora** and let thy legend grow!`,
      `By royal decree, thy weekly coffers are filled with **${amount} Mora**. Oz, ensure they are recorded!`,
      `🕯Seven days of fate have culminated in this moment: **${amount} Mora** is now thine to command.`,
    ];

    await redis.hincrby(user.id, "mora", amount);

    return { 
      content: messages[Math.floor(Math.random() * messages.length)] 
    };
  },
};