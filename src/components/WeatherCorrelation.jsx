import { motion } from 'motion/react'
import { entrance } from '../constants/theme'

export default function WeatherCorrelation({ weather, severity }) {
  if (!weather) return null

  const { temp, humidity, wind } = weather

  // Build contextual message based on weather + severity
  let message = null
  let icon = null

  if (humidity > 70) {
    message = `High humidity (${humidity}%) can trap pollen near ground level. Expect lingering symptoms outdoors.`
    icon = 'water_drop'
  } else if (wind > 15) {
    message = `Windy today (${wind} mph). Expect pollen to spread further than usual.`
    icon = 'air'
  } else if (temp > 75 && severity === 'high') {
    message = `Warm weather (${temp}\u00b0F) and high pollen. Keep windows closed and run AC.`
    icon = 'wb_sunny'
  } else if (temp < 45) {
    message = `Cool temperatures (${temp}\u00b0F) are keeping pollen counts suppressed.`
    icon = 'ac_unit'
  }

  return (
    <motion.div
      variants={entrance}
      initial="hidden"
      animate="visible"
      className="mx-6"
    >
      {/* Weather stats row */}
      <div
        className="flex items-center justify-around p-4 rounded-2xl mb-3"
        style={{
          backgroundColor: 'var(--color-surface)',
          boxShadow: '0 0 0 1px var(--color-border)',
        }}
      >
        <div className="flex flex-col items-center gap-1">
          <span className="material-symbols-outlined text-lg" style={{ color: 'var(--color-primary)' }}>thermostat</span>
          <span className="text-sm font-bold">{temp}&deg;F</span>
          <span className="text-[10px]" style={{ color: 'var(--color-text-subtle)' }}>Temp</span>
        </div>
        <div className="w-px h-8" style={{ backgroundColor: 'var(--color-divider)' }} />
        <div className="flex flex-col items-center gap-1">
          <span className="material-symbols-outlined text-lg" style={{ color: 'var(--color-primary)' }}>water_drop</span>
          <span className="text-sm font-bold">{humidity}%</span>
          <span className="text-[10px]" style={{ color: 'var(--color-text-subtle)' }}>Humidity</span>
        </div>
        <div className="w-px h-8" style={{ backgroundColor: 'var(--color-divider)' }} />
        <div className="flex flex-col items-center gap-1">
          <span className="material-symbols-outlined text-lg" style={{ color: 'var(--color-primary)' }}>air</span>
          <span className="text-sm font-bold">{wind} mph</span>
          <span className="text-[10px]" style={{ color: 'var(--color-text-subtle)' }}>Wind</span>
        </div>
      </div>

      {/* Contextual message */}
      {message && (
        <div
          className="flex items-start gap-4 p-5 rounded-2xl"
          style={{
            backgroundColor: 'var(--color-surface)',
            boxShadow: '0 0 0 1px var(--color-border)',
          }}
        >
          <span className="material-symbols-outlined text-xl shrink-0" style={{ color: 'var(--color-primary)' }}>
            {icon}
          </span>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{message}</p>
        </div>
      )}
    </motion.div>
  )
}
