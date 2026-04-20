import { SlashCommandBuilder } from "@discordjs/builders";

export default {
    data: new SlashCommandBuilder()
        .setName("transfer")
        .setDescription("Transfer thy Mora to another soul within the realm ✨")
        .addUserOption(option => option
            .setName("traveler")
            .setDescription("The soul who shall receive thy tribute")
            .setRequired(true)
        )
        .addIntegerOption(option => option
          .setName("amount")
          .setDescription("The sum of Mora to be moved through the threads of fate")
          .setRequired(true)
        // .setMinValue(1) , yeah i know we got tihs but enabling it means missing out on custom message
        ),
    
    run: async ({ data, user }) => {

        const targetId = data.options?.find(opt => opt.name === "traveler")?.value
        const amount = data.options?.find(opt => opt.name === "amount")?.value

        const target = data?.resolved?.users?.[targetId] || user;

        if (amount <= 0) {
            return { content: "Such trickery! Thou cannot transfer a void or negative sum of Mora." }
        }

        if (target.id === user.id) {
            return { content: `Thou movest **${amount} Mora** from thy left hand to thy right... A truly profound display of cosmic redistribution! The Prinzessin finds thy dedication to "balance" most... amusing.` };
        }

        if (target.bot) {
            return { content: "Mechanical constructs and higher beings have no use for thy mortal currency." };
        }

        const senderMoraRaw = await redis.hget(user.id, "mora") || "0";
        const senderMora = parseInt(senderMoraRaw);

        if (senderMora < amount) {
            return { 
                content: `Alas, thy coffers are too shallow! Thou possessest but **${senderMora} Mora**, yet thou triest to give **${amount}**. Thy ambition outstrips thy means.` 
            };
        }

        await redis.hincrby(user.id, "mora", -amount);
        await redis.hincrby(target.id, "mora", amount);

        return { 
            content: `By royal decree, **${amount} Mora** has been moved from <@${user.id}> to <@${target.id}>. May the threads of fate remain ever entwined!` 
        };  
    },
};