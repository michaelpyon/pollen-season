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
      <p className="text-[10px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: 'var(--color-text-subtle)' }}>
        Peak hours
      </p>
      <div
        className="p-5 rounded-2xl"
        style={{ backgroundColor: 'var(--color-surface)', boxShadow: '0 0 0 1px var(--color-border)' }}
      >
        <div className="flex gap-px items-end h-12 mb-3">
          {HOURS.map(h => {
            const intensity = getHourIntensity(h)
            const isCurrent = h === now
            const isPeak = intensity > 0.3
            return (
              <motion.div
                key={h}
                className="flex-1 rounded-t-sm relative"
                style={{
                  height: `${20 + intensity * 80}%`,
                  backgroundColor: isPeak
                    ? `rgba(133, 83, 53, ${intensity * 0.7})`
                    : 'var(--color-surface-high)',
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
        <div className="flex justify-between">
          <span className="text-[10px] font-bold" style={{ color: 'var(--color-text-subtle)' }}>6 AM</span>
          <span className="text-[10px] font-bold" style={{ color: 'var(--color-severity-3)' }}>12 PM</span>
          <span className="text-[10px] font-bold" style={{ color: 'var(--color-text-subtle)' }}>6 PM</span>
          <span className="text-[10px] font-bold" style={{ color: 'var(--color-text-subtle)' }}>12 AM</span>
        </div>
      </div>
    </motion.div>
  )
}
