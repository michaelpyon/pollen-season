import { motion } from 'motion/react'
import { getSeverityConfig } from '../utils/severity'
import { formatDayName } from '../utils/formatDate'
import { entrance, spring, press } from '../constants/theme'

export default function DayCard({ day, isWorst = false }) {
  const config = getSeverityConfig(day.overallUpi)
  const dayName = formatDayName(day.date)
  const isToday = dayName === 'Today'

  return (
    <motion.div
      variants={entrance}
      className="flex flex-col items-center gap-2 px-4 py-4 rounded-2xl min-w-[80px] shrink-0 transition-colors"
      style={{
        backgroundColor: isToday ? 'var(--color-surface)' : 'transparent',
        boxShadow: isToday ? '0 0 0 1px var(--color-border)' : 'none',
      }}
      whileTap={press}
      transition={spring}
    >
      <span
        className="text-xs text-text-muted"
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: isToday ? 600 : 400,
        }}
      >
        {dayName}
      </span>

      <div
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{ backgroundColor: config.lightColor }}
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: config.color }}
        />
      </div>

      <span
        className="text-lg font-medium"
        style={{
          fontFamily: 'var(--font-mono)',
          fontVariantNumeric: 'tabular-nums',
          color: config.color,
        }}
      >
        {day.overallUpi}
      </span>

      <span className="text-[11px] text-text-subtle">{config.label}</span>

      {isWorst && (
        <span
          className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
          style={{
            backgroundColor: config.lightColor,
            color: config.color,
          }}
        >
          Worst
        </span>
      )}
    </motion.div>
  )
}
