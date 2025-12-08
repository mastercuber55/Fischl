import { InteractionType, InteractionResponseType } from "discord.js";
import { verifySignature } from "../handlers/verifySignature.js";
import { handleCommands, handleComponents } from "../handlers/handleInteractions.js"

import { Redis } from "@upstash/redis";
import discord from "../handlers/discord.js";

globalThis.redis = globalThis.redis || Redis.fromEnv();

async function getRawBody(req) {
  let data = "";
  for await (const chunk of req) data += chunk;
  return data;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // Inspired from:
  // https://github.com/Inbestigator/dressed/blob/main/packages/dressed/src/server/server.ts#L102-L149
  const signature = req.headers["x-signature-ed25519"];
  const timestamp = req.headers["x-signature-timestamp"];
  const rawBody = await getRawBody(req);

  if (!verifySignature(rawBody, signature, timestamp)) {
    return res.status(401).end("Invalid signature");
  }

  try {
    const body = JSON.parse(rawBody);
    let user;
    let result;

    switch (body.type) {
      case InteractionType.Ping:
        result = res.status(200).json({ type: InteractionResponseType.PONG });
        break;
      
      case InteractionType.ApplicationCommand:
        user = body.user || body.member.user;
        result = res.status(200).json(await handleCommands(body, user))
        break;
      
      case InteractionType.MessageComponent:
        user = body.user || body.member.user;
        result = res.status(200).json(await handleComponents(body, user))
        break;

      default: 
        break;
    }

    if(result)
      return result
    return res.status(400).end("Unknown interaction");
  
  } catch (error) {
    console.error(error)
    // I know this might look stupid since we also get discord ping but if we are gonna disappoint discord with 500, we may as well not care about it at all.
    // So this will be responding to button interactions and slash command interactions.
    discord.sendMessage({ content: error.stack || error.toString() })
        
    return res.status(200).json({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content: "Something went wrong :(",
            flags: 64
        }
    })
  }
}
