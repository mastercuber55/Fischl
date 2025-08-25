
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
  name: "hello",
  description: "Replies with hello world",
  dm_permission: true,
  default_member_permissions: null,
  contexts: [2]
};

const res = await fetch(url, {
  // method: "POST",
  headers: {
    "Authorization": `Bot ${DISCORD_TOKEN}`,
    // "Content-Type": "application/json",
  },
  // body: JSON.stringify(command),
});

const result = await res.json()
console.log(result)