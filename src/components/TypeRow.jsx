import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { getSeverityConfig } from '../utils/severity'
import { spring, press } from '../constants/theme'

export default function TypeRow({ name, upi, species = [] }) {
  const [expanded, setExpanded] = useState(false)
  const config = getSeverityConfig(upi)
  const hasSpecies = species.length > 0 && species.some(s => s.upi > 0)

  return (
    <div>
      <motion.button
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors"
        style={{
          backgroundColor: 'var(--color-surface)',
          boxShadow: '0 0 0 1px var(--color-border)',
          cursor: hasSpecies ? 'pointer' : 'default',
        }}
        onClick={() => hasSpecies && setExpanded(!expanded)}
        whileTap={hasSpecies ? press : undefined}
        transition={spring}
      >
        <div
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: config.color }}
        />
        <span className="text-sm font-medium text-text flex-1 text-left">{name}</span>
        <span
          className="text-xs text-text-muted"
          style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}
        >
          {config.label}
        </span>
        {hasSpecies && (
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-text-subtle shrink-0"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={spring}
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
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
            <div className="pt-1 pb-1 pl-9 pr-4 flex flex-col gap-0.5">
              {species
                .filter(s => s.upi > 0)
                .sort((a, b) => b.upi - a.upi)
                .map(s => {
                  const sConfig = getSeverityConfig(s.upi)
                  return (
                    <div
                      key={s.code}
                      className="flex items-center justify-between py-1.5 text-sm"
                    >
                      <span className="text-text-muted">{s.name}</span>
                      <span
                        className="text-xs"
                        style={{
                          color: sConfig.color,
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
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
