import { createContext, useContext, useState, useEffect } from 'react'
import {
  getTodayData,
  getForecastData,
  getBoroughData,
  getSeasonalComparison,
} from '../services/pollenData'

const PollenContext = createContext(null)

export function PollenProvider({ children }) {
  const [state, setState] = useState({
    today: null,
    forecast: null,
    boroughs: null,
    seasonal: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    // Simulate async data fetch with a small delay for loading state
    const timer = setTimeout(() => {
      try {
        if (cancelled) return

        const today = getTodayData()
        const forecast = getForecastData()
        const boroughs = getBoroughData()
        const seasonal = getSeasonalComparison()

        setState({
          today,
          forecast,
          boroughs,
          seasonal,
          loading: false,
          error: null,
        })
      } catch (err) {
        if (!cancelled) {
          setState(prev => ({
            ...prev,
            loading: false,
            error: err.message || 'Failed to load pollen data',
          }))
        }
      }
    }, 400) // Short delay to show loading skeleton

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [])

  return (
    <PollenContext.Provider value={state}>
      {children}
    </PollenContext.Provider>
  )
}

export function usePollen() {
  const ctx = useContext(PollenContext)
  if (!ctx) {
    throw new Error('usePollen must be used within a PollenProvider')
  }
  return ctx
}
