import { motion } from 'motion/react'
import { getSeverityConfig } from '../utils/severity'
import { entrance } from '../constants/theme'

// Only renders when tomorrow's UPI is meaningfully higher than today's
export default function TrendAlert({ todayUpi, tomorrowUpi }) {
  const diff = tomorrowUpi - todayUpi
  if (diff < 2) return null

  const tomorrowConfig = getSeverityConfig(tomorrowUpi)

  return (
    <motion.div
      variants={entrance}
      initial="hidden"
      animate="visible"
      className="mx-6 flex items-center gap-3 px-5 py-4 rounded-2xl"
      style={{
        backgroundColor: tomorrowConfig.lightColor,
        boxShadow: `0 0 0 1px ${tomorrowConfig.color}15`,
      }}
    >
      <span className="material-symbols-outlined text-xl" style={{ color: tomorrowConfig.color }}>
        trending_up
      </span>
      <p className="text-sm">
        <span className="font-bold" style={{ color: tomorrowConfig.color }}>Heads up:</span>{' '}
        <span style={{ color: 'var(--color-text-muted)' }}>
          Tomorrow jumps to {tomorrowConfig.label.toLowerCase()}. Plan accordingly.
        </span>
      </p>
    </motion.div>
  )
}
