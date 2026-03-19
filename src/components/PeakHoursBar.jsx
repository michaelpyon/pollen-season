import { motion } from 'motion/react'
import { entrance } from '../constants/theme'

// Pollen peaks 5-10am, secondary bump 5-7pm
const HOURS = Array.from({ length: 24 }, (_, i) => i)
const PEAK_HOURS = new Set([5, 6, 7, 8, 9])
const SECONDARY_HOURS = new Set([17, 18])

function getHourIntensity(h) {
  if (PEAK_HOURS.has(h)) return 1
  if (SECONDARY_HOURS.has(h)) return 0.5
  return 0.1
}

export default function PeakHoursBar() {
  const now = new Date().getHours()

  return (
    <motion.div
      variants={entrance}
      initial="hidden"
      animate="visible"
      className="px-6"
    >
      <p
        className="text-xs uppercase tracking-wider text-text-subtle mb-3"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Peak hours
      </p>
      <div className="flex gap-px items-end h-10">
        {HOURS.map(h => {
          const intensity = getHourIntensity(h)
          const isCurrent = h === now
          return (
            <motion.div
              key={h}
              className="flex-1 rounded-sm relative"
              style={{
                height: `${20 + intensity * 80}%`,
                backgroundColor: intensity > 0.3
                  ? `rgba(194, 93, 58, ${intensity * 0.7})`
                  : 'var(--color-border)',
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.1 + h * 0.02, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {isCurrent && (
                <div
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: 'var(--color-text)' }}
                />
              )}
            </motion.div>
          )
        })}
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-[10px] text-text-subtle" style={{ fontFamily: 'var(--font-mono)' }}>12am</span>
        <span className="text-[10px] text-text-subtle" style={{ fontFamily: 'var(--font-mono)' }}>6am</span>
        <span className="text-[10px] text-text-subtle" style={{ fontFamily: 'var(--font-mono)' }}>12pm</span>
        <span className="text-[10px] text-text-subtle" style={{ fontFamily: 'var(--font-mono)' }}>6pm</span>
        <span className="text-[10px] text-text-subtle" style={{ fontFamily: 'var(--font-mono)' }}>11pm</span>
      </div>
    </motion.div>
  )
}
