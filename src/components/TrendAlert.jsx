import { motion } from 'motion/react'
import { getSeverityConfig } from '../utils/severity'
import { entrance } from '../constants/theme'

export default function TrendAlert({ todayIndex, tomorrowIndex }) {
  const diff = tomorrowIndex - todayIndex
  if (diff < 1) return null

  const tomorrowConfig = getSeverityConfig(tomorrowIndex)
  const isRising = diff >= 2

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
      <motion.span
        className="material-symbols-outlined text-xl"
        style={{ color: tomorrowConfig.color }}
        animate={isRising ? { y: [0, -2, 0] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        trending_up
      </motion.span>
      <p className="text-sm">
        <span className="font-bold" style={{ color: tomorrowConfig.color }}>Heads up:</span>{' '}
        <span style={{ color: 'var(--color-text-muted)' }}>
          Tomorrow jumps to {tomorrowConfig.label.toLowerCase()}. Plan accordingly.
        </span>
      </p>
    </motion.div>
  )
}
