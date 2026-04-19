import { SlashCommandBuilder } from "@discordjs/builders";

export default {
  data: new SlashCommandBuilder()
    .setName("monthly")
    .setDescription("An epochal tribute from the heart of the Immernachtreich ✨"),
  ephemeral: false,
  // 30 days * 24 hours * 60 minutes * 60 seconds
  cooldown: 30 * 24 * 60 * 60, 
  allowEvents: true,
  run: async ({ data, user }) => {
    // Massive rewards for the 30-day wait (e.g., 75,000 to 125,000 Mora)
    const amount = Math.floor(Math.random() * (125000 - 75000 + 1)) + 75000;

    const messages = [
      `A celestial alignment! After a full cycle of the moon, the Prinzessin grants thee **${amount} Mora**.`,
      `The Immernachtreich recognizes thy long-standing devotion! Take these **${amount} Mora** and let them pave thy path to glory.`,
      `Behold! A month of fate has passed, and the coffers of the Prinzessin overflow for thee: **${amount} Mora**!`,
      `Even the longest night eventually yields to the dawn of fortune. Thou hast received **${amount} Mora**!`,
    ];

    await redis.hincrby(user.id, "mora", amount);

    return { 
      content: messages[Math.floor(Math.random() * messages.length)] 
    };
  },
};