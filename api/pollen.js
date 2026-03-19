// Vercel serverless function: proxies Google Pollen API, hides API key, caches 30min
export default async function handler(req, res) {
  const apiKey = process.env.GOOGLE_POLLEN_API_KEY

  if (!apiKey) {
    return res.status(500).json({ error: 'GOOGLE_POLLEN_API_KEY not configured' })
  }

  const lat = req.query.lat || '40.7128'
  const lng = req.query.lng || '-74.0060'
  const days = req.query.days || '5'

  try {
    const url = `https://pollen.googleapis.com/v1/forecast:lookup?key=${apiKey}&location.longitude=${lng}&location.latitude=${lat}&days=${days}&languageCode=en`

    const response = await fetch(url)

    if (!response.ok) {
      const errorText = await response.text()
      return res.status(response.status).json({ error: 'Google API error', detail: errorText })
    }

    const data = await response.json()

    // Cache for 30 minutes at the edge
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600')
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch pollen data', detail: err.message })
  }
}
