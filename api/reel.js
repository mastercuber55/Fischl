export default async function handler(req, res) {
  try {
    const { link } = req.query

    if (!link) {
      return res.status(400).json({ error: "Missing 'link' query param" })
    }

    // Call API Hut
    const response = await fetch("https://apihut.in/api/download/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Avatar-Key": "avatarhubadmin"
      },
      body: JSON.stringify({
        video_url: link,
        type: "instagram"
      })
    })

    const result = await response.json()

    if (!result || result.success === 0) {
      return res.status(500).json({ error: "API Hut failed", details: result })
    }

    // return the result from API Hut
    return res.status(200).json(result)

  } catch (err) {
    console.error("Error fetching reel:", err)
    return res.status(500).json({ error: "Server error", details: err.message })
  }
}