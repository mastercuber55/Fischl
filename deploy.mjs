import fetch from "node-fetch";
import 'dotenv/config';
import { read, readdirSync } from "fs";

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;

const url = `https://discord.com/api/v10/applications/${CLIENT_ID}/commands`;

const commands = []

for(const file of readdirSync("./cmds")) {
  const cmd = await import(`./cmds/${file}`)

  cmd.default.data.name = file.replace(/\.js$/, "")
  cmd.default.data.contexts = [0, 1, 2]
  cmd.default.data.dm_permission = true

  commands.push(cmd.default.data)
}

console.log(JSON.stringify(commands))

const res = await fetch(url, {
  method: "PUT",
  headers: {
    "Authorization": `Bot ${DISCORD_TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(commands),
});

const result = await res.json()
console.log(result)