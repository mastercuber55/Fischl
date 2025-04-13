import { InteractionType, InteractionResponseType } from 'discord-interactions';

export default (req, res) => {
  const { type, data } = req.body;

  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  console.log(req.body);
};
