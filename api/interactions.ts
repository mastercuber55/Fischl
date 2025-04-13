import { VercelRequest, VercelResponse } from '@vercel/node';

export default (req: VercelRequest, res: VercelResponse) => {
  res.status(200).json({ type: 1 });  // Responding with a Pong message
};
