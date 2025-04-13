import { verifyKey } from 'discord-interactions';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify the request signature
  const signature = req.headers['x-signature-ed25519'];
  const timestamp = req.headers['x-signature-timestamp'];
  const isValidRequest = verifyKey(
    req.body,
    signature,
    timestamp,
    process.env.DISCORD_PUBLIC_KEY
  );

  if (!isValidRequest) {
    return res.status(401).json({ error: 'Invalid request signature' });
  }

  const interaction = req.body;

  // Handle ping
  if (interaction.type === 1) {
    return res.status(200).json({ type: 1 });
  }

  // Handle slash commands
  if (interaction.type === 2) {
    const { name } = interaction.data;
    
    // Example: Handle a /ping command
    if (name === 'ping') {
      return res.status(200).json({
        type: 4,
        data: {
          content: 'Pong!',
        },
      });
    }
  }

  // Unknown command/interaction
  res.status(400).json({ error: 'Unknown interaction type' });
}

export const config = {
  api: {
    bodyParser: false, // We'll parse the raw body ourselves
  },
};