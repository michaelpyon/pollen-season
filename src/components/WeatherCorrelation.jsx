import { motion } from 'motion/react'
import { entrance } from '../constants/theme'

export default function WeatherCorrelation({ weather }) {
  if (!weather) return null

  let message = null
  let icon = null

  if (weather.todayRainLikely) {
    message = `Rain expected today (${weather.todayMaxPrecipChance}% chance). Pollen counts should drop this afternoon.`
    icon = 'water_drop'
  } else if (weather.tomorrowRainLikely) {
    message = `Rain expected tomorrow (${weather.tomorrowMaxPrecipChance}% chance). Expect some relief from pollen.`
    icon = 'water_drop'
  } else if (weather.tomorrowWindy) {
    message = `Windy tomorrow (gusts up to ${weather.tomorrowMaxWindSpeed} km/h). Expect higher pollen spread.`
    icon = 'air'
  }

  if (!message) return null

  return (
    <motion.div
      variants={entrance}
      initial="hidden"
      animate="visible"
      className="mx-6 flex items-start gap-4 p-5 rounded-2xl"
      style={{
        backgroundColor: 'var(--color-surface)',
        boxShadow: '0 0 0 1px var(--color-border)',
      }}
    >
      <span className="material-symbols-outlined text-xl shrink-0" style={{ color: 'var(--color-primary)' }}>
        {icon}
      </span>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{message}</p>
    </motion.div>
  )
}
