import { BLOOM_CALENDAR } from '../constants/plants'
import { getCurrentMonth } from './formatDate'

// Returns which allergens are currently active in NYC based on month
export function getActiveAllergens() {
  const month = getCurrentMonth()
  return BLOOM_CALENDAR.filter(p => month >= p.start && month <= p.end)
}

// Returns the season label for the current month
export function getCurrentSeason() {
  const month = getCurrentMonth()
  if (month >= 3 && month <= 5) return 'Tree pollen season'
  if (month >= 5 && month <= 7) return 'Grass pollen season'
  if (month >= 8 && month <= 10) return 'Ragweed season'
  if (month >= 11 || month <= 2) return 'Off-season'
  return 'Pollen season'
}
