import { motion } from 'motion/react'
import { usePollenData } from '../hooks/usePollenData'
import BloomCalendar from '../components/BloomCalendar'
import PeakHoursBar from '../components/PeakHoursBar'
import { getSeverityConfig } from '../utils/severity'
import { getCurrentSeason, getActiveAllergens } from '../utils/allergens'
import { entrance, stagger, listStagger } from '../constants/theme'

export default function Detail() {
  const { data, loading } = usePollenData()

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

  const season = getCurrentSeason()
  const activeAllergens = getActiveAllergens()
  const species = data.today.species.filter(s => s.upi > 0).sort((a, b) => b.upi - a.upi)

  return (
    <motion.div
      className="flex flex-col gap-8 pt-8 pb-24 sm:pb-6"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
        <motion.div variants={entrance} className="px-6">
          <h1
            className="text-3xl tracking-tight mb-1"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Detail
          </h1>
          <p className="text-sm text-text-muted">{season}</p>
        </motion.div>

        {/* Currently active species with levels */}
        <motion.div variants={entrance} className="px-6">
          <p
            className="text-xs uppercase tracking-wider text-text-subtle mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Active species today
          </p>
          {species.length === 0 ? (
            <p className="text-sm text-text-muted">No significant pollen activity detected.</p>
          ) : (
            <motion.div
              className="flex flex-col gap-2"
              variants={listStagger}
            >
              {species.map(s => {
                const config = getSeverityConfig(s.upi)
                return (
                  <motion.div
                    key={s.code}
                    variants={entrance}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      boxShadow: '0 0 0 1px var(--color-border)',
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: config.color }}
                    />
                    <span className="text-sm font-medium flex-1">{s.name}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: config.lightColor,
                        color: config.color,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {config.label}
                    </span>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </motion.div>

        {/* What's blooming now */}
        <motion.div variants={entrance} className="px-6">
          <p
            className="text-xs uppercase tracking-wider text-text-subtle mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            What's blooming in NYC
          </p>
          <div className="flex flex-wrap gap-2">
            {activeAllergens.map(a => (
              <span
                key={a.code}
                className="text-xs px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  boxShadow: '0 0 0 1px var(--color-border)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {a.name}
              </span>
            ))}
            {activeAllergens.length === 0 && (
              <p className="text-sm text-text-muted">Nothing major blooming right now. Enjoy the break.</p>
            )}
          </div>
        </motion.div>

        <PeakHoursBar />

        <BloomCalendar />
    </motion.div>
  )
}
