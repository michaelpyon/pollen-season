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
        <h1 className="text-3xl font-extrabold tracking-tight mb-1">Active Species</h1>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{season}</p>
      </motion.div>

      {/* Species cards with progress bars */}
      <motion.div variants={entrance} className="px-6">
        {species.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>No significant pollen activity detected.</p>
        ) : (
          <motion.div
            className="flex flex-col gap-3"
            variants={listStagger}
            initial="hidden"
            animate="visible"
          >
            {species.map(s => {
              const config = getSeverityConfig(s.upi)
              const pct = Math.min(100, (s.upi / 4) * 100)
              const isHigh = s.upi >= 3
              return (
                <motion.div
                  key={s.code}
                  variants={entrance}
                  className="flex items-center justify-between p-5 rounded-2xl"
                  style={{
                    backgroundColor: isHigh ? config.lightColor : 'var(--color-surface)',
                    boxShadow: isHigh ? 'none' : '0 0 0 1px var(--color-border)',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: isHigh ? 'white' : config.lightColor }}
                    >
                      <span className="material-symbols-outlined text-2xl" style={{ color: config.color }}>
                        {s.code === 'RAGWEED' || s.code === 'MUGWORT' ? 'energy_savings_leaf' :
                         ['TIMOTHY_GRASS', 'BLUEGRASS', 'RYEGRASS'].includes(s.code) ? 'grass' : 'park'}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold tracking-widest uppercase mb-0.5" style={{ color: 'var(--color-text-subtle)' }}>
                        {s.code === 'RAGWEED' || s.code === 'MUGWORT' ? 'Weed' :
                         ['TIMOTHY_GRASS', 'BLUEGRASS', 'RYEGRASS'].includes(s.code) ? 'Grass' : 'Tree'}
                      </span>
                      <h3 className="text-lg font-bold leading-none">{s.name}</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-extrabold" style={{ color: config.color }}>{config.label}</span>
                    <div className="w-12 h-1 rounded-full overflow-hidden mt-1" style={{ backgroundColor: 'rgba(49,51,46,0.08)' }}>
                      <div className="h-full rounded-full" style={{ backgroundColor: config.color, width: `${pct}%` }} />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </motion.div>

      {/* What's blooming now */}
      <motion.div variants={entrance} className="px-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: 'var(--color-text-subtle)' }}>
          What's blooming in NYC
        </p>
        <div className="flex flex-wrap gap-2">
          {activeAllergens.map(a => (
            <span
              key={a.code}
              className="text-xs font-medium px-3 py-1.5 rounded-full"
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
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Nothing major blooming right now.</p>
          )}
        </div>
      </motion.div>

      <PeakHoursBar />

      <BloomCalendar />
    </motion.div>
  )
}
