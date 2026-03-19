// Vercel serverless function: proxies Open-Meteo weather data for NYC
// Free, no API key needed
export default async function handler(req, res) {
  const lat = req.query.lat || '40.7128'
  const lng = req.query.lng || '-74.0060'

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=precipitation_probability,wind_speed_10m&forecast_days=2&timezone=America/New_York`

    const response = await fetch(url)

    if (!response.ok) {
      const errorText = await response.text()
      return res.status(response.status).json({ error: 'Open-Meteo API error', detail: errorText })
    }

    const data = await response.json()

    // Cache for 1 hour at the edge
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200')
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch weather data', detail: err.message })
  }
}
