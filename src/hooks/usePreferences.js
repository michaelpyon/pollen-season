import { useState, useCallback } from 'react'

const STORAGE_KEY = 'pollen-season-prefs'

function loadPrefs() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : { allergens: [] }
  } catch {
    return { allergens: [] }
  }
}

export function usePreferences() {
  const [prefs, setPrefs] = useState(loadPrefs)

  const toggleAllergen = useCallback((code) => {
    setPrefs(prev => {
      const allergens = prev.allergens.includes(code)
        ? prev.allergens.filter(a => a !== code)
        : [...prev.allergens, code]
      const next = { ...prev, allergens }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const hasAllergen = useCallback((code) => {
    return prefs.allergens.includes(code)
  }, [prefs.allergens])

  return { prefs, toggleAllergen, hasAllergen }
}
