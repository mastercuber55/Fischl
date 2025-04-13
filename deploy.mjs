import * as dotenv from 'dotenv';
import djs from "discord.js"

dotenv.config();

const { CLIENT_ID, TOKEN } = process.env;

const commands = [
  new djs.SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!').toJSON(),
];

const rest = new djs.REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(djs.Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    });

    console.log('Successfully registered slash commands.');
  } catch (error) {
    console.error('Error during registration:', error);
  }
})();