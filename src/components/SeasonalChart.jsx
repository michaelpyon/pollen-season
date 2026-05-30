import { motion } from 'motion/react'
import { entrance } from '../constants/theme'

// SVG line chart: this year vs last year, data-journalism style
export default function SeasonalChart({ data }) {
  if (!data) return null

  const { thisWeek, lastYear, deltaPct, deltaLabel } = data

  // Chart dimensions
  const W = 280
  const H = 120
  const PAD_X = 0
  const PAD_Y = 10
  const chartW = W - PAD_X * 2
  const chartH = H - PAD_Y * 2

  // Scale
  const allValues = [...thisWeek.map(d => d.index), ...lastYear.map(d => d.index)]
  const maxVal = Math.max(...allValues, 4)
  const minVal = 0

  const xScale = (i) => PAD_X + (i / (thisWeek.length - 1)) * chartW
  const yScale = (v) => PAD_Y + chartH - ((v - minVal) / (maxVal - minVal)) * chartH

  // Build SVG path strings
  const buildPath = (points) => {
    return points.map((p, i) => {
      const x = xScale(p.day)
      const y = yScale(p.index)
      return `${i === 0 ? 'M' : 'L'}${x},${y}`
    }).join(' ')
  }

  // Build area path (filled under the line)
  const buildArea = (points) => {
    const linePath = points.map((p, i) => {
      const x = xScale(p.day)
      const y = yScale(p.index)
      return `${i === 0 ? 'M' : 'L'}${x},${y}`
    }).join(' ')
    const lastX = xScale(points[points.length - 1].day)
    const firstX = xScale(points[0].day)
    return `${linePath} L${lastX},${H} L${firstX},${H} Z`
  }

  const thisYearPath = buildPath(thisWeek)
  const lastYearPath = buildPath(lastYear)
  const thisYearArea = buildArea(thisWeek)

  // Day labels
  const dayLabels = thisWeek.map(d => {
    const date = new Date(d.date + 'T00:00:00')
    return date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)
  })

  const isWorse = deltaPct > 0

  return (
    <motion.div
      variants={entrance}
      initial="hidden"
      animate="visible"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: 'var(--color-text-subtle)' }}>
        vs. last year (estimated)
      </p>

      <div
        className="rounded-2xl p-5"
        style={{
          backgroundColor: 'var(--color-surface)',
          boxShadow: '0 0 0 1px var(--color-border)',
        }}
      >
        {/* Delta callout */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className="material-symbols-outlined text-lg"
            style={{ color: isWorse ? 'var(--color-severity-3)' : 'var(--color-severity-1)' }}
          >
            {isWorse ? 'arrow_upward' : deltaPct < 0 ? 'arrow_downward' : 'remove'}
          </span>
          <span
            className="text-sm font-bold"
            style={{ color: isWorse ? 'var(--color-severity-3)' : 'var(--color-severity-1)' }}
          >
            {deltaLabel}
          </span>
        </div>

        {/* Chart */}
        <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full" style={{ overflow: 'visible' }}>
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(v => (
            <line
              key={v}
              x1={PAD_X}
              y1={yScale(v)}
              x2={W - PAD_X}
              y2={yScale(v)}
              stroke="var(--color-divider)"
              strokeWidth="1"
              strokeDasharray={v > 0 ? '4 4' : undefined}
            />
          ))}

          {/* Last year area (subtle) */}
          <motion.path
            d={buildArea(lastYear)}
            fill="var(--color-surface-high)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />

          {/* Last year line */}
          <motion.path
            d={lastYearPath}
            fill="none"
            stroke="var(--color-text-subtle)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* This year area */}
          <motion.path
            d={thisYearArea}
            fill={isWorse ? 'var(--color-severity-3-bg)' : 'var(--color-severity-1-bg)'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />

          {/* This year line */}
          <motion.path
            d={thisYearPath}
            fill="none"
            stroke={isWorse ? 'var(--color-severity-3)' : 'var(--color-severity-1)'}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Data points: this year */}
          {thisWeek.map((p, i) => (
            <motion.circle
              key={`this-${i}`}
              cx={xScale(p.day)}
              cy={yScale(p.index)}
              r="3"
              fill={isWorse ? 'var(--color-severity-3)' : 'var(--color-severity-1)'}
              stroke="var(--color-bg)"
              strokeWidth="1.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
            />
          ))}

          {/* Day labels at bottom */}
          {dayLabels.map((label, i) => (
            <text
              key={i}
              x={xScale(i)}
              y={H + 16}
              textAnchor="middle"
              fill="var(--color-text-subtle)"
              fontSize="9"
              fontWeight="700"
              fontFamily="var(--font-body)"
            >
              {label}
            </text>
          ))}

          {/* Y-axis labels */}
          {[0, 2, 4].map(v => (
            <text
              key={v}
              x={W + 4}
              y={yScale(v) + 3}
              fill="var(--color-text-subtle)"
              fontSize="8"
              fontWeight="600"
              fontFamily="var(--font-mono)"
            >
              {v}
            </text>
          ))}
        </svg>

        {/* Legend */}
        <div className="flex items-center gap-5 mt-3 pt-3" style={{ borderTop: '1px solid var(--color-divider)' }}>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-0.5 rounded-full" style={{ backgroundColor: isWorse ? 'var(--color-severity-3)' : 'var(--color-severity-1)' }} />
            <span className="text-[10px] font-bold" style={{ color: 'var(--color-text-muted)' }}>This year</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-0.5 rounded-full" style={{ backgroundColor: 'var(--color-text-subtle)', backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, var(--color-surface) 2px, var(--color-surface) 4px)' }} />
            <span className="text-[10px] font-bold" style={{ color: 'var(--color-text-muted)' }}>Last year</span>
          </div>
        </div>

        <p className="text-[10px] leading-snug mt-3" style={{ color: 'var(--color-text-subtle)' }}>
          Both lines are seasonal estimates based on historical NYC patterns, not recorded measurements.
        </p>
      </div>
    </motion.div>
  )
}
