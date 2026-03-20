import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { usePollenData } from '../hooks/usePollenData'
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
        <h1 className="text-3xl font-extrabold tracking-tight mb-1">5-Day Forecast</h1>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Manhattan, NY</p>
      </motion.div>

      {/* Day selector: tall vertical pills */}
      <motion.div variants={entrance} className="px-6">
        <div className="flex gap-2.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {forecast.map((day, i) => {
            const dayConfig = getSeverityConfig(day.overallUpi)
            const isSelected = i === selectedDay
            const d = new Date(day.date + 'T00:00:00')
            return (
              <motion.button
                key={day.date}
                onClick={() => setSelectedDay(i)}
                className="flex-shrink-0 flex flex-col items-center justify-between w-16 py-4 rounded-2xl transition-colors"
                style={{
                  height: '6rem',
                  backgroundColor: isSelected ? config.lightColor : 'var(--color-surface)',
                  boxShadow: isSelected ? 'none' : '0 0 0 1px var(--color-border)',
                  color: isSelected ? dayConfig.color : 'var(--color-text-muted)',
                }}
                whileTap={{ scale: 0.96 }}
                transition={spring}
              >
                <span className="text-[10px] font-bold tracking-widest uppercase" style={{ opacity: 0.7 }}>
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
            <p className="text-base font-medium leading-relaxed" style={{ color: config.color, opacity: 0.9 }}>
              {getRecommendation(selected.overallUpi, topSpecies)}
            </p>
          </div>

          {/* Type breakdown */}
          <div className="flex flex-col gap-2">
            {selected.types.map(type => (
              <TypeRow
                key={type.code}
                name={type.name}
                code={type.code}
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
