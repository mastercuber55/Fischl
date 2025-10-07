// import fetch from "node-fetch";
import 'dotenv/config';
import fs from "fs";

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;

const url = `https://discord.com/api/v10/applications/${CLIENT_ID}/commands`;

const commands = []
const manifest = {}

for(const cat of fs.readdirSync("./cmds")) {
  for(const file of fs.readdirSync(`./cmds/${cat}`)) {
    const cmd = await import(`./cmds/${cat}/${file}`)
  
    cmd.default.data.name = file.replace(/\.js$/, "")
    cmd.default.data.contexts = [0, 1, 2]
    cmd.default.data.dm_permission = true

    commands.push(cmd.default.data)
    manifest[cmd.default.data.name] = cat
  }
}

fs.writeFileSync("./utils/manifest.json", JSON.stringify(manifest, null, 2), "utf-8");
fs.writeFileSync("./utils/commands.json", JSON.stringify(commands, null, 2), "utf-8");
// Storing the commands as well as a cache for displaying in help command

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