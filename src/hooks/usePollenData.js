import { useState, useEffect } from 'react'
import { MOCK_POLLEN_DATA, getTodayData, getForecastData } from '../data/mock'

export function usePollenData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      try {
        const res = await fetch('/api/pollen')

        if (!res.ok) throw new Error(`API returned ${res.status}`)

        const raw = await res.json()

        if (cancelled) return

        // The real API response has the same structure as our mock data,
        // so the same transform helpers work on both.
        const today = getTodayData(raw)
        const forecast = getForecastData(raw)
        setData({ today, forecast, raw })
      } catch {
        // API unavailable (local dev, rate limit, etc.) — use mock data
        if (cancelled) return
        console.info('[Pollen Season] API unavailable, using mock data')
        const today = getTodayData(MOCK_POLLEN_DATA)
        const forecast = getForecastData(MOCK_POLLEN_DATA)
        setData({ today, forecast, raw: MOCK_POLLEN_DATA })
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => { cancelled = true }
  }, [])

  return { data, loading, error }
}
