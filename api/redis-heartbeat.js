/**
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */

import { get } from '@vercel/edge-config'
import DCutils from '../handlers/DCutils.js'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv(	)

export default async function handler(req, res) {

	if (req.headers["x-vercel-cron"] != '1')
		return res.status(401).json({ error: "Not a Vercel Cron Request!" })

	await redis.set("lastAliveCheck", new Date().toISOString())

	await DCutils.sendMessage({
		content: new Date().toISOString(),
	}, await get("redis-channel-ID"))

	return res.status(200).send("Made the redis heart beat!")
}