import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { usePollen } from '../context/PollenContext'
import TypeRow from '../components/TypeRow'
import SeasonalChart from '../components/SeasonalChart'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { getSeverityConfig } from '../utils/severity'
import { formatFullDate } from '../utils/formatDate'
import { entrance, stagger, spring } from '../constants/theme'

const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
}

export default function Forecast() {
  const { forecast, seasonal, loading } = usePollen()
  const [selectedDay, setSelectedDay] = useState(0)

  if (loading || !forecast) {
    return <LoadingSkeleton variant="forecast" />
  }

  const selected = forecast[selectedDay]
  const config = getSeverityConfig(selected.overallIndex)
  const topSpecies = selected.types
    .filter(t => t.index >= 3)
    .sort((a, b) => b.index - a.index)
    .map(t => t.name)

  return (
    <motion.div
      className="flex flex-col gap-6 pt-8 pb-24 sm:pb-6"
      variants={stagger}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      {...pageTransition}
    >
      <motion.div variants={entrance} className="px-6">
        <h1 className="text-3xl font-extrabold tracking-tight mb-1">7-Day Forecast</h1>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Manhattan, NY</p>
      </motion.div>

      {/* Day selector pills */}
      <motion.div variants={entrance} className="px-6">
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {forecast.map((day, i) => {
            const dayConfig = getSeverityConfig(day.overallIndex)
            const isSelected = i === selectedDay
            const d = new Date(day.date + 'T00:00:00')
            return (
              <motion.button
                key={day.date}
                onClick={() => setSelectedDay(i)}
                className="flex-shrink-0 flex flex-col items-center justify-between w-14 py-3 rounded-2xl transition-colors"
                style={{
                  height: '5.5rem',
                  backgroundColor: isSelected ? config.lightColor : 'var(--color-surface)',
                  boxShadow: isSelected ? 'none' : '0 0 0 1px var(--color-border)',
                  color: isSelected ? dayConfig.color : 'var(--color-text-muted)',
                }}
                whileTap={{ scale: 0.96 }}
                transition={spring}
              >
                <span className="text-[9px] font-bold tracking-widest uppercase" style={{ opacity: 0.7 }}>
                  {i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                </span>
                <span className="text-lg font-extrabold" style={{ color: isSelected ? dayConfig.color : 'var(--color-text)' }}>
                  {d.getDate()}
                </span>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dayConfig.color }} />
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Selected day detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="px-6 flex flex-col gap-5"
        >
          {/* Severity card */}
          <div
            className="relative overflow-hidden rounded-2xl p-6 space-y-3"
            style={{ backgroundColor: config.lightColor }}
          >
            <p className="text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: config.color, opacity: 0.8 }}>
              {selectedDay === 0 ? "Today's outlook" : formatFullDate(selected.date)}
            </p>
            <h2 className="text-4xl font-extrabold" style={{ color: config.color }}>
              {config.label}
            </h2>
            {selected.types.filter(t => t.index >= 2).length > 0 && (
              <p className="text-base font-medium leading-relaxed" style={{ color: config.color, opacity: 0.9 }}>
                {topSpecies.length > 0
                  ? `${topSpecies.join(' and ')} pollen ${topSpecies.length > 1 ? 'are' : 'is'} elevated.`
                  : 'Moderate pollen activity expected.'}
              </p>
            )}
          </div>

          {/* Type breakdown */}
          <div className="flex flex-col gap-2">
            {selected.types.map(type => (
              <TypeRow
                key={type.name}
                name={type.name}
                code={type.name.toUpperCase()}
                upi={type.index}
                species={type.speciesDetail || []}
                trend={type.trend}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Seasonal comparison */}
      {seasonal && (
        <motion.div variants={entrance} className="px-6">
          <SeasonalChart data={seasonal} />
        </motion.div>
      )}
    </motion.div>
  )
}
