import { motion } from 'motion/react'
import { entrance } from '../constants/theme'

const HOURS = Array.from({ length: 24 }, (_, i) => i)

function getHourIntensity(h, peakHours) {
  if (!peakHours) {
    // Default peak hours 5-10am
    if (h >= 5 && h <= 9) return 1
    if (h === 17 || h === 18) return 0.5
    return 0.1
  }

  const { start, end, peak } = peakHours
  if (h >= start && h <= end) {
    // Higher intensity near peak
    const distFromPeak = Math.abs(h - peak)
    const maxDist = Math.max(peak - start, end - peak)
    return maxDist > 0 ? 1 - (distFromPeak / maxDist) * 0.4 : 1
  }
  // Small secondary bump in evening
  if (h >= 17 && h <= 19) return 0.3
  return 0.08
}

export default function PeakHoursBar({ peakHours }) {
  const now = new Date().getHours()
  const peak = peakHours || { start: 5, end: 10, peak: 7 }

  return (
    <motion.div
      variants={entrance}
      initial="hidden"
      animate="visible"
      className="px-6"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: 'var(--color-text-subtle)' }}>
        Peak hours ({peak.start > 12 ? `${peak.start - 12}pm` : `${peak.start}am`} - {peak.end > 12 ? `${peak.end - 12}pm` : `${peak.end}am`})
      </p>
      <div
        className="p-5 rounded-2xl"
        style={{ backgroundColor: 'var(--color-surface)', boxShadow: '0 0 0 1px var(--color-border)' }}
      >
        <div className="flex gap-px items-end h-12 mb-3">
          {HOURS.map(h => {
            const intensity = getHourIntensity(h, peakHours)
            const isCurrent = h === now
            const isPeak = intensity > 0.3
            return (
              <motion.div
                key={h}
                className="flex-1 rounded-t-sm relative"
                style={{
                  height: `${20 + intensity * 80}%`,
                  backgroundColor: isPeak
                    ? `rgba(var(--color-severity-3-rgb), ${intensity * 0.7})`
                    : 'var(--color-surface-high)',
                  transformOrigin: 'bottom',
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.1 + h * 0.02, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {isCurrent && (
                  <motion.div
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: 'var(--color-text)' }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
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
