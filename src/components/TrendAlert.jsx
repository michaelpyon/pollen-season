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
      className="mx-6 px-4 py-3 rounded-xl text-sm"
      style={{
        backgroundColor: tomorrowConfig.lightColor,
        boxShadow: `0 0 0 1px ${tomorrowConfig.color}20`,
      }}
    >
      <span className="font-medium" style={{ color: tomorrowConfig.color }}>
        Heads up:
      </span>{' '}
      <span className="text-text-muted">
        Tomorrow jumps to {tomorrowConfig.label.toLowerCase()}. Plan accordingly.
      </span>
    </motion.div>
  )
}
