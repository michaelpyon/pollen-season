import { SEVERITY_CONFIG } from '../constants/theme'

export function getSeverityConfig(upi) {
  const clamped = Math.max(0, Math.min(4, Math.round(upi)))
  return SEVERITY_CONFIG[clamped]
}

export function getSeverityLabel(upi) {
  return getSeverityConfig(upi).label
}

// Returns the primary recommendation string based on UPI and top species
export function getRecommendation(upi, topSpecies = []) {
  const speciesStr = topSpecies.length > 0
    ? topSpecies.slice(0, 2).join(' and ')
    : null

  switch (Math.round(upi)) {
    case 0:
      return "No significant pollen detected. Breathe easy."
    case 1:
      return "Pollen is low today. You're probably fine without meds."
    case 2:
      return speciesStr
        ? `Moderate levels. Consider pre-medicating if you're sensitive to ${speciesStr}.`
        : "Moderate pollen today. Consider pre-medicating if you're sensitive."
    case 3:
      return speciesStr
        ? `Take your meds before heading out. ${speciesStr} ${topSpecies.length > 1 ? 'are' : 'is'} peaking.`
        : "Take your meds. Limit outdoor time between 5 and 10am."
    case 4:
      return speciesStr
        ? `Meds now. ${speciesStr} ${topSpecies.length > 1 ? 'are' : 'is'} at peak levels. Keep windows closed.`
        : "Meds now. Keep windows closed. Shower after going outside."
    default:
      return "No data available."
  }
}
