import nacl from "tweetnacl";
import { Buffer } from "node:buffer";

export function verifySignature(body, signature, timestamp) {
  if (!signature || !timestamp) return false;

  return nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, "hex"),
    Buffer.from(process.env.DISCORD_PUBLIC_KEY, "hex")
  );
}