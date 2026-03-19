import { useMemo } from 'react'

// Computes a personalized severity score based on user's allergen sensitivities.
// If the user hasn't set any preferences, returns the overall UPI.
// If they have, weights the score toward species they react to.
export function usePersonalSeverity(todayData, userAllergens = []) {
  return useMemo(() => {
    if (!todayData) return { upi: 0, topSpecies: [], isPersonalized: false }

    // No preferences set: use overall UPI
    if (userAllergens.length === 0) {
      return {
        upi: todayData.overallUpi,
        topSpecies: todayData.topSpecies,
        isPersonalized: false,
      }
    }

    // Filter species to only ones the user is sensitive to
    const relevantSpecies = todayData.species.filter(s =>
      userAllergens.includes(s.code)
    )

    if (relevantSpecies.length === 0) {
      return {
        upi: todayData.overallUpi,
        topSpecies: todayData.topSpecies,
        isPersonalized: true,
      }
    }

    // Personal UPI = highest UPI among user's allergens
    const personalUpi = Math.max(...relevantSpecies.map(s => s.upi))
    const topSpecies = relevantSpecies
      .filter(s => s.upi >= 3)
      .sort((a, b) => b.upi - a.upi)
      .map(s => s.name)

    return {
      upi: personalUpi,
      topSpecies,
      isPersonalized: true,
    }
  }, [todayData, userAllergens])
}
