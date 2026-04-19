import { SlashCommandBuilder } from "@discordjs/builders"


export default {
  data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Claim thy daily blessing of Mora from the Prinzessin ✨"),
  ephemeral: false,
  cooldown: 1 * 24 * 60 * 60,
  allowEvents: true,
  run: async ({ data, user }) => {

    const amount = Math.floor(Math.random() * (3000 - 1500 + 1)) + 1500

    const messages = [
      `The Prinzessin der Verurteilung grants thee **${amount} Mora**… squander it not, lest destiny recoil in disdain.`,
      `A blessing from the Immernachtreich! Thou hast received **${amount} Mora**—use it with grace.`,
      `By decree of the Prinzessin, **${amount} Mora** is now thine. Pray thou spend it wisely.`,
      `The threads of fate entwine in thy favor… **${amount} Mora** has been bestowed upon thee.`,
      `Hehe~ even fate smiles upon thee today—**${amount} Mora** is yours to claim.`,
    ]
    
    await redis.hincrby(user.id, "mora", amount)

    return { content: messages[Math.floor(Math.random() * messages.length)] }
  },
};