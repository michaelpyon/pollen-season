import { motion } from 'motion/react'
import { usePollen } from '../context/PollenContext'
import BloomCalendar from '../components/BloomCalendar'
import PeakHoursBar from '../components/PeakHoursBar'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { getSeverityConfig } from '../utils/severity'
import { getCurrentSeason, getActiveAllergens } from '../utils/allergens'
import { entrance, stagger, listStagger } from '../constants/theme'

const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
}

export default function Detail() {
  const { today, loading } = usePollen()

  if (loading || !today) {
    return <LoadingSkeleton variant="detail" />
  }

  const season = getCurrentSeason()
  const activeAllergens = getActiveAllergens()

  // Flatten all species from all types
  const allSpecies = today.types.flatMap(t =>
    (t.speciesDetail || []).filter(s => s.index > 0).map(s => ({
      ...s,
      typeName: t.name,
    }))
  ).sort((a, b) => b.index - a.index)

  return (
    <motion.div
      className="flex flex-col gap-8 pt-8 pb-24 sm:pb-6"
      variants={stagger}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      {...pageTransition}
    >
      <motion.div variants={entrance} className="px-6">
        <h1 className="text-3xl font-extrabold tracking-tight mb-1">Active Species</h1>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{season}</p>
      </motion.div>

      {/* Species cards */}
      <motion.div variants={entrance} className="px-6">
        {allSpecies.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>No significant pollen activity detected.</p>
        ) : (
          <motion.div
            className="flex flex-col gap-3"
            variants={listStagger}
            initial="hidden"
            animate="visible"
          >
            {allSpecies.map((s, i) => {
              const config = getSeverityConfig(s.index)
              const pct = Math.min(100, (s.index / 4) * 100)
              const isHigh = s.index >= 3
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
                      style={{ backgroundColor: isHigh ? 'var(--color-bg)' : config.lightColor }}
                    >
                      <span className="material-symbols-outlined text-2xl" style={{ color: config.color }}>
                        {s.typeName === 'Weed' ? 'energy_savings_leaf' :
                         s.typeName === 'Grass' ? 'grass' :
                         s.typeName === 'Mold' ? 'humidity_mid' : 'park'}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold tracking-widest uppercase mb-0.5" style={{ color: 'var(--color-text-subtle)' }}>
                        {s.typeName}
                      </span>
                      <h3 className="text-lg font-bold leading-none">{s.name}</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-extrabold" style={{ color: config.color }}>{config.label}</span>
                    <div className="w-12 h-1 rounded-full overflow-hidden mt-1" style={{ backgroundColor: 'var(--color-divider)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: config.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.05 }}
                      />
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

      <PeakHoursBar peakHours={today.peakHours} />

      <BloomCalendar />
    </motion.div>
  )
}
