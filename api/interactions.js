import { InteractionType, InteractionResponseType } from "discord-api-types/v10";
// import { handleCommands, handleComponents } from "../handlers/handleInteractions.js"
// 
// import { Redis } from "@upstash/redis";
import DCutils from "../handlers/DCutils.js";
import { codeBlock } from "@discordjs/builders";
import nacl from "tweetnacl";
import { handleCommands, handleComponents } from "../handlers/handleInteractions.js";

// globalThis.redis = globalThis.redis || Redis.fromEnv();

export const config = {
  runtime: "nodejs",
  api: {
    bodyParser: false
  }
}

function verifySignature(body, signature, timestamp) {
  if (!signature || !timestamp) return false;

  return nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, "hex"),
    Buffer.from(process.env.DISCORD_PUBLIC_KEY, "hex")
  );
}

/** @param {import('@vercel/node').VercelRequest} req */
function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", chunk => {
      data += chunk;
    });

    req.on("end", () => {
      resolve(data);
    });

    req.on("error", err => {
      reject(err);
    });
  });
}


/**
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default async function handler(req, res) {
  console.time("ACK");
  if (req.method !== "POST") 
    return res.status(405).send("Method Not Allowed")

  const signature = req.headers["x-signature-ed25519"];
  const timestamp = req.headers["x-signature-timestamp"];
  const rawBody = await getRawBody(req);

  if (!verifySignature(rawBody, signature, timestamp)) {
    return res.status(401).end("Invalid Signature");
  }

  try {
    const body = JSON.parse(rawBody);
    let user;

    switch (body.type) {
      case InteractionType.Ping:
        return res.status(200).json({ type: InteractionResponseType.Pong })
        break;
      
      case InteractionType.ApplicationCommand:
        user = body.user || body.member?.user;
        return res.status(200).json(await handleCommands(body, user))
        break;
      
      case InteractionType.MessageComponent:
        user = body.user || body.member?.user;
        res.status(200).json(await handleComponents(body, user))
        break;

      default: 
        res.status(200).json({ type: InteractionResponseType.DeferredChannelMessageWithSource })
        break;
    }

  } catch (error) {
    /** @type {Error} */
    const err = /** @type {any} */ (error);

    console.error(error)
    DCutils.sendMessage({ content: codeBlock("javascript", err.stack || err.toString()) })
        
    return res.status(200).json({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: codeBlock("javascript", err.stack || err.toString()),
        flags: 64
      }
    })
  }
}
