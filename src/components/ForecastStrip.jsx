import { motion } from 'motion/react'
import DayCard from './DayCard'
import { listStagger } from '../constants/theme'

export default function ForecastStrip({ forecast }) {
  if (!forecast || forecast.length === 0) return null

  // Find the worst day to highlight it
  const worstUpi = Math.max(...forecast.map(d => d.overallUpi))
  const worstIndex = forecast.findIndex(d => d.overallUpi === worstUpi)

  return (
    <div className="px-6">
      <p
        className="text-xs uppercase tracking-wider text-text-subtle mb-3"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        5-day forecast
      </p>
      <motion.div
        className="flex gap-1 overflow-x-auto pb-2 -mx-1 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        variants={listStagger}
        initial="hidden"
        animate="visible"
      >
        {forecast.map((day, i) => (
          <DayCard
            key={day.date}
            day={day}
            isWorst={i === worstIndex && worstUpi >= 3}
          />
        ))}
      </motion.div>
    </div>
  )
}
