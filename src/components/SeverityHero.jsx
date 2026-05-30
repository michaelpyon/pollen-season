import { motion } from 'motion/react'
import { getSeverityConfig, getRecommendation } from '../utils/severity'
import { formatHeaderDate } from '../utils/formatDate'
import { entrance, stagger } from '../constants/theme'
import PollenGauge from './PollenGauge'
import TypeRow from './TypeRow'

export default function SeverityHero({ todayData }) {
  if (!todayData) return null

  const config = getSeverityConfig(todayData.overallIndex)
  const topSpecies = todayData.types
    .filter(t => t.index >= 3)
    .sort((a, b) => b.index - a.index)
    .map(t => t.name)
  const recommendation = getRecommendation(todayData.overallIndex, topSpecies)

  return (
    <motion.div
      className="flex flex-col px-6 py-12 transition-colors"
      style={{
        transitionProperty: 'background-color',
        transitionDuration: '800ms',
        transitionTimingFunction: 'ease',
      }}
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={entrance} className="mb-6">
        <p className="text-[10px] font-bold tracking-[0.1em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
          {formatHeaderDate(todayData.date)} / Manhattan, NY
        </p>
      </motion.div>

      {/* Hero severity card */}
      <motion.div
        variants={entrance}
        className="relative overflow-hidden rounded-2xl p-8 mb-8 flex flex-col items-center text-center"
        style={{ backgroundColor: config.lightColor }}
      >
        <p className="text-[10px] font-bold tracking-[0.1em] uppercase mb-2" style={{ color: config.color, opacity: 0.7 }}>
          Seasonal Estimate
        </p>

        {/* Animated index number */}
        <motion.div
          className="text-6xl font-extrabold mb-2"
          style={{ color: config.color, fontVariantNumeric: 'tabular-nums' }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {todayData.overallIndex}
        </motion.div>

        <h1
          className="text-5xl sm:text-6xl font-extrabold tracking-tighter mb-4"
          style={{ color: config.color }}
        >
          {config.label}
        </h1>
        <p className="text-lg font-medium leading-relaxed max-w-xs" style={{ color: config.color }}>
          {recommendation}
        </p>

        {/* Gauge inside the card */}
        <div className="mt-8 w-full max-w-xs">
          <PollenGauge value={todayData.overallIndex} />
        </div>
      </motion.div>

      {/* Type breakdown */}
      <motion.div variants={entrance}>
        <p className="text-[10px] font-bold uppercase tracking-[0.1em] mb-3 px-1" style={{ color: 'var(--color-text-subtle)' }}>
          Pollen Breakdown
        </p>
        <div className="flex flex-col gap-2">
          {todayData.types.map(type => (
            <TypeRow
              key={type.name}
              name={type.name}
              code={type.name.toUpperCase()}
              upi={type.index}
              species={type.speciesDetail || []}
              trend={type.trend}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
