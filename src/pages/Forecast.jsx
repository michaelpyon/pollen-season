import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { usePollenData } from '../hooks/usePollenData'
import ForecastStrip from '../components/ForecastStrip'
import TypeRow from '../components/TypeRow'
import { getSeverityConfig, getRecommendation } from '../utils/severity'
import { formatFullDate } from '../utils/formatDate'
import { entrance, stagger, spring } from '../constants/theme'

export default function Forecast() {
  const { data, loading } = usePollenData()
  const [selectedDay, setSelectedDay] = useState(0)

  if (loading || !data) {
    return (
      <div className="min-h-[calc(100dvh-5rem)] flex items-center justify-center">
        <motion.div
          className="w-8 h-8 rounded-full"
          style={{ backgroundColor: 'var(--color-surface)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    )
  }

  const forecast = data.forecast
  const selected = forecast[selectedDay]
  const config = getSeverityConfig(selected.overallUpi)
  const topSpecies = selected.species
    .filter(s => s.upi >= 3)
    .sort((a, b) => b.upi - a.upi)
    .map(s => s.name)

  return (
    <motion.div
      className="flex flex-col gap-6 pt-8 pb-24 sm:pb-6"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
        <motion.div variants={entrance} className="px-6">
          <h1
            className="text-3xl tracking-tight mb-1"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            5-Day Forecast
          </h1>
          <p className="text-sm text-text-muted">Manhattan, NY</p>
        </motion.div>

        {/* Day selector strip */}
        <motion.div variants={entrance} className="px-6">
          <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {forecast.map((day, i) => {
              const dayConfig = getSeverityConfig(day.overallUpi)
              const isSelected = i === selectedDay
              return (
                <motion.button
                  key={day.date}
                  onClick={() => setSelectedDay(i)}
                  className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl min-w-[72px] shrink-0 transition-colors"
                  style={{
                    backgroundColor: isSelected ? 'var(--color-surface)' : 'transparent',
                    boxShadow: isSelected ? '0 0 0 1px var(--color-border)' : 'none',
                  }}
                  whileTap={{ scale: 0.96 }}
                  transition={spring}
                >
                  <span className="text-[11px] text-text-muted" style={{ fontFamily: 'var(--font-mono)' }}>
                    {i === 0 ? 'Today' : new Date(day.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: dayConfig.lightColor }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dayConfig.color }} />
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums', color: dayConfig.color }}
                  >
                    {day.overallUpi}
                  </span>
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
            className="px-6 flex flex-col gap-4"
          >
            <div className="flex items-baseline gap-3">
              <span
                className="text-4xl"
                style={{ fontFamily: 'var(--font-display)', color: config.color }}
              >
                {config.label}
              </span>
              <span className="text-sm text-text-muted">{formatFullDate(selected.date)}</span>
            </div>

            <p className="text-sm text-text-muted leading-relaxed">
              {getRecommendation(selected.overallUpi, topSpecies)}
            </p>

            {/* Type breakdown */}
            <div className="flex flex-col gap-2">
              {selected.types.map(type => (
                <TypeRow
                  key={type.code}
                  name={type.name}
                  upi={type.upi}
                  species={selected.species.filter(s => {
                    if (type.code === 'TREE') return ['OAK', 'BIRCH', 'MAPLE', 'ELM', 'ASH', 'PINE'].includes(s.code)
                    if (type.code === 'GRASS') return ['TIMOTHY_GRASS', 'BLUEGRASS', 'RYEGRASS'].includes(s.code)
                    if (type.code === 'WEED') return ['RAGWEED', 'MUGWORT'].includes(s.code)
                    return false
                  })}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
    </motion.div>
  )
}
