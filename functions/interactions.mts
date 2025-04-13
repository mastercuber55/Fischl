import { Context } from '@netlify/functions'

export default async (request: Request, context: Context) => {
  return new Response(
    JSON.stringify({ type: 1 }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
};
