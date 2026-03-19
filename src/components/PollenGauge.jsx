import { motion } from 'motion/react'
import { SEVERITY_CONFIG } from '../constants/theme'

const SEGMENTS = [0, 1, 2, 3, 4]

export default function PollenGauge({ value }) {
  const clamped = Math.max(0, Math.min(4, Math.round(value)))

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1.5 flex-1">
        {SEGMENTS.map(i => {
          const active = i <= clamped
          const config = SEVERITY_CONFIG[i]
          return (
            <motion.div
              key={i}
              className="h-2 flex-1 rounded-full"
              style={{
                backgroundColor: active ? config.color : 'var(--color-border)',
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                delay: 0.3 + i * 0.06,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          )
        })}
      </div>
      <span
        className="text-sm text-text-muted w-8 text-right"
        style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}
      >
        {clamped}/4
      </span>
    </div>
  )
}
