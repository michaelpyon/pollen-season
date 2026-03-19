import { useState, useEffect } from 'react'
import { MOCK_WEATHER_DATA, getWeatherSummary } from '../data/mock'

export function useWeather() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      try {
        const res = await fetch('/api/weather')

        if (!res.ok) throw new Error(`API returned ${res.status}`)

        const raw = await res.json()

        if (cancelled) return
        setWeather(getWeatherSummary(raw))
      } catch {
        // API unavailable — use mock data
        if (cancelled) return
        console.info('[Pollen Season] Weather API unavailable, using mock data')
        setWeather(getWeatherSummary(MOCK_WEATHER_DATA))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => { cancelled = true }
  }, [])

  return { weather, loading }
}
