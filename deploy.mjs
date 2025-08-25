
// const template = {
//     id: '1360945709553287339',
//     application_id: '1360871728770846733',
//     default_member_permissions: null,
//     type: 1,
//     name: 'ping',
//     name_localizations: null,
//     description: 'Replies with Pong!',
//     description_localizations: null,
//     dm_permission: true,
//     contexts: [ 1 ],
//     integration_types: [ 1 ],
//     nsfw: false
// }

// deploy.mjs
import fetch from "node-fetch";
import 'dotenv/config';

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;

const url = `https://discord.com/api/v10/applications/${CLIENT_ID}/commands`;

const command = {
  name: "echo",
  description: "Repeats what you say",
  contexts: [2],
  options: [
    {
      name: "msg",
      description: "What to echo back",
      type: 3, // STRING
      required: true,
    },
  ],

  dm_permission: true,
};

const res = await fetch(url, {
  method: "POST",
  headers: {
    "Authorization": `Bot ${DISCORD_TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(command),
});

const result = await res.json()
console.log(result)