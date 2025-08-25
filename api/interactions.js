// api/interactions.js
import { InteractionType, InteractionResponseType } from "discord-interactions";
import { verifySignature } from "../utils/verifySignature.js";
import { handleCmds } from "../utils/handleCmds.js";

export const config = { api: { bodyParser: false } };

async function getRawBody(req) {
  let data = "";
  for await (const chunk of req) data += chunk;
  return data;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const signature = req.headers["x-signature-ed25519"];
  const timestamp = req.headers["x-signature-timestamp"];
  const rawBody = await getRawBody(req);

  if (!verifySignature(rawBody, signature, timestamp)) {
    return res.status(401).end("Invalid signature");
  }

  try {
    const body = JSON.parse(rawBody);

    // ✅ Handle Discord PING (verification)
    if (body.type === InteractionType.PING) {
      return res.status(200).json({ type: InteractionResponseType.PONG });
    }

    // ✅ Handle slash commands (later extend)
    if (body.type === InteractionType.APPLICATION_COMMAND) {
      // if (body.data.name === "echo") {

      //   const msg = body.data.options[0].value;

      //   return res.status(200).json({
      //     type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      //     data: { content: msg },
      //   });
      // }
      return res.status(200).json(handleCmds(body.data))
    }

    return res.status(400).end("Unknown interaction");
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).end();
  }
}
