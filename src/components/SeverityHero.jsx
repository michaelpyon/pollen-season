import { motion } from 'motion/react'
import { getSeverityConfig, getRecommendation } from '../utils/severity'
import { formatHeaderDate } from '../utils/formatDate'
import { entrance, stagger } from '../constants/theme'
import PollenGauge from './PollenGauge'
import TypeRow from './TypeRow'

export default function SeverityHero({ todayData, severity }) {
  if (!todayData || !severity) return null

  const config = getSeverityConfig(severity.upi)
  const recommendation = getRecommendation(severity.upi, severity.topSpecies)
  const bgColor = config.bgColor || 'var(--color-bg)'

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
          Current Severity
        </p>
        <h1
          className="text-7xl sm:text-8xl font-extrabold tracking-tighter mb-4"
          style={{ color: config.color }}
        >
          {config.label}
        </h1>
        <p className="text-lg font-medium leading-relaxed max-w-xs" style={{ color: config.color }}>
          {recommendation}
        </p>

        {/* Gauge inside the card */}
        <div className="mt-8 w-full max-w-xs">
          <PollenGauge value={severity.upi} />
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
              key={type.code}
              name={type.name}
              code={type.code}
              upi={type.upi}
              species={todayData.species.filter(s => {
                if (type.code === 'TREE') return ['OAK', 'BIRCH', 'MAPLE', 'ELM', 'ASH', 'PINE', 'ALDER', 'COTTONWOOD'].includes(s.code)
                if (type.code === 'GRASS') return ['TIMOTHY_GRASS', 'BLUEGRASS', 'RYEGRASS'].includes(s.code)
                if (type.code === 'WEED') return ['RAGWEED', 'MUGWORT'].includes(s.code)
                return false
              })}
            />
          ))}
        </div>
      </motion.div>

      {severity.isPersonalized && (
        <motion.p
          variants={entrance}
          className="text-xs mt-6"
          style={{ color: 'var(--color-text-subtle)' }}
        >
          Personalized to your allergens
        </motion.p>
      )}
    </motion.div>
  )
}
