import dotenv from "dotenv"
import { SlashCommandBuilder } from "discord.js";

dotenv.config()


export async function DiscordRequest(endpoint, options) {
// append endpoint to root API URL
const url = 'https://discord.com/api/v10/' + endpoint;
// Stringify payloads
if (options.body) options.body = JSON.stringify(options.body);
const res = await fetch(url, {
    headers: {
    Authorization: `Bot ${process.env.TOKEN}`,
    'Content-Type': 'application/json; charset=UTF-8',
    'User-Agent': 'Marina',
    },
    ...options,
});
if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
}
return res;
}

export async function InstallGuildCommands(guildId, commands) {
    // Change the endpoint for guild-specific commands
    const endpoint = `applications/${process.env.CLIENT_ID}/guilds/${guildId}/commands`;

    try {
        const res = await DiscordRequest(endpoint, { method: 'PUT', body: commands });
        console.log(await res.json())
    } catch (err) {
        console.error(err);
    }
}

export async function InstallGlobalCommands(commands) {
    // API endpoint to overwrite global commands
    const endpoint = `applications/${process.env.CLIENT_ID}/commands`;

    try {
        const res = await DiscordRequest(endpoint, { method: 'PUT', body: commands });
        console.log(await res.json())
    } catch (err) {
        console.error(err);
    }
}

const commands = [
    new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!')
    .setContexts(1)
    .setIntegrationTypes(1)
    .toJSON()
];

// Call the function to install the command
// InstallGuildCommands('1359903358781227038', commands);
InstallGlobalCommands(commands)