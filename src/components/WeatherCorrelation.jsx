import { motion } from 'motion/react'
import { entrance } from '../constants/theme'

export default function WeatherCorrelation({ weather }) {
  if (!weather) return null

  let message = null
  let icon = null

  if (weather.todayRainLikely) {
    message = `Rain expected today (${weather.todayMaxPrecipChance}% chance). Pollen counts should drop this afternoon.`
    icon = (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-text-subtle shrink-0">
        <path d="M12 21.5C12 21.5 4.5 13.5 4.5 9C4.5 4.86 7.86 2 12 2C16.14 2 19.5 4.86 19.5 9C19.5 13.5 12 21.5 12 21.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  } else if (weather.tomorrowRainLikely) {
    message = `Rain expected tomorrow (${weather.tomorrowMaxPrecipChance}% chance). Expect some relief from pollen.`
    icon = (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-text-subtle shrink-0">
        <path d="M12 21.5C12 21.5 4.5 13.5 4.5 9C4.5 4.86 7.86 2 12 2C16.14 2 19.5 4.86 19.5 9C19.5 13.5 12 21.5 12 21.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  } else if (weather.tomorrowWindy) {
    message = `Windy tomorrow (gusts up to ${weather.tomorrowMaxWindSpeed} km/h). Expect higher pollen spread.`
    icon = (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-text-subtle shrink-0">
        <path d="M2 12H15.5C17.433 12 19 10.433 19 8.5C19 6.567 17.433 5 15.5 5C13.567 5 12 6.567 12 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17H11.5C13.433 17 15 18.567 15 20.5C15 22.433 13.433 24 11.5 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (!message) return null

  return (
    <motion.div
      variants={entrance}
      initial="hidden"
      animate="visible"
      className="mx-6 flex items-start gap-3 px-4 py-3 rounded-xl"
      style={{
        backgroundColor: 'var(--color-surface)',
        boxShadow: '0 0 0 1px var(--color-border)',
      }}
    >
      {icon}
      <p className="text-sm text-text-muted leading-relaxed">{message}</p>
    </motion.div>
  )
}
