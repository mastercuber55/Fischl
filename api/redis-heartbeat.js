/**
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */

export default async function handler(req, res) {
	const authHeader = req.headers["authorization"]

	if (req.headers["x-vercel-cron"] != '1')
		return res.status(401).json({ error: "Not a Vercel Cron Request!" })

	await redis.set("lastAliveCheck", new Date().toISOString())
	return res.status(200).send("Made the redis heart beat!")
}