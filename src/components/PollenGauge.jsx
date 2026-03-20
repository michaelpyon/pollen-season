import { motion } from 'motion/react'
import { SEVERITY_CONFIG } from '../constants/theme'

const SEGMENTS = [0, 1, 2, 3, 4]
const HEIGHTS = [4, 6, 8, 10, 12] // relative bar heights (in tailwind h-units mapped to %)

export default function PollenGauge({ value }) {
  const clamped = Math.max(0, Math.min(4, Math.round(value)))

  return (
    <div className="w-full max-w-xs space-y-3">
      <div className="flex justify-between items-end gap-1.5 h-12">
        {SEGMENTS.map(i => {
          const active = i <= clamped
          const config = SEVERITY_CONFIG[i]
          const heightPct = 20 + (HEIGHTS[i] / 12) * 80
          return (
            <motion.div
              key={i}
              className="flex-1 rounded-full"
              style={{
                height: `${heightPct}%`,
                backgroundColor: active ? config.color : 'rgba(49, 51, 46, 0.08)',
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{
                delay: 0.3 + i * 0.06,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                height: `${heightPct}%`,
                backgroundColor: active ? config.color : 'rgba(49, 51, 46, 0.08)',
                transformOrigin: 'bottom',
              }}
            />
          )
        })}
      </div>
      <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--color-text-subtle)' }}>
        <span>Low</span>
        <span>Moderate</span>
        <span style={{ color: clamped >= 3 ? SEVERITY_CONFIG[clamped].color : undefined }}>High</span>
        <span>Very High</span>
      </div>
    </div>
  )
}
