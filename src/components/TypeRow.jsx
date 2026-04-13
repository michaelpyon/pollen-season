import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { getSeverityConfig } from '../utils/severity'
import { TYPE_ICONS, spring, press } from '../constants/theme'

const TREND_ICONS = {
  rising: 'trending_up',
  falling: 'trending_down',
  stable: 'trending_flat',
}

const TREND_COLORS = {
  rising: 'var(--color-severity-4)',
  falling: 'var(--color-severity-1)',
  stable: 'var(--color-text-subtle)',
}

export default function TypeRow({ name, code, upi, species = [], trend }) {
  const [expanded, setExpanded] = useState(false)
  const config = getSeverityConfig(upi)
  const icon = TYPE_ICONS[code] || (name === 'Mold' ? 'humidity_mid' : 'eco')
  const pct = Math.min(100, (upi / 4) * 100)

  // Species can be either [{name, code, index}] or [{name, code, upi}] depending on source
  const speciesWithLevel = species.filter(s => (s.index || s.upi || 0) > 0)
  const hasSpecies = speciesWithLevel.length > 0

  return (
    <div>
      <motion.button
        className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-colors"
        style={{
          backgroundColor: 'var(--color-surface)',
          boxShadow: '0 0 0 1px var(--color-border)',
          cursor: hasSpecies ? 'pointer' : 'default',
        }}
        onClick={() => hasSpecies && setExpanded(!expanded)}
        whileTap={hasSpecies ? press : undefined}
        transition={spring}
      >
        {/* Icon circle */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${config.lightColor}` }}
        >
          <span className="material-symbols-outlined text-xl" style={{ color: config.color }}>{icon}</span>
        </div>

        {/* Name + progress bar */}
        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">{name}</span>
              {trend && (
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ color: TREND_COLORS[trend] || 'var(--color-text-subtle)' }}
                >
                  {TREND_ICONS[trend] || 'trending_flat'}
                </span>
              )}
            </div>
            <span className="text-xs font-bold" style={{ color: config.color }}>
              {config.label}
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-surface-high)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: config.color }}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
          </div>
        </div>

        {/* Expand chevron */}
        {hasSpecies && (
          <motion.span
            className="material-symbols-outlined text-lg shrink-0"
            style={{ color: 'var(--color-text-subtle)' }}
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={spring}
          >
            expand_more
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {expanded && hasSpecies && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-1 pb-1 pl-16 pr-5 flex flex-col gap-0.5">
              {speciesWithLevel
                .sort((a, b) => (b.index || b.upi || 0) - (a.index || a.upi || 0))
                .map(s => {
                  const level = s.index || s.upi || 0
                  const sConfig = getSeverityConfig(level)
                  return (
                    <div key={s.code || s.name} className="flex items-center justify-between py-1.5 text-sm">
                      <span style={{ color: 'var(--color-text-muted)' }}>{s.name}</span>
                      <span className="text-xs font-bold" style={{ color: sConfig.color }}>
                        {sConfig.label}
                      </span>
                    </div>
                  )
                })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
