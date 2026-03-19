import { motion } from 'motion/react'
import { getSeverityConfig, getRecommendation } from '../utils/severity'
import { formatHeaderDate } from '../utils/formatDate'
import { entrance, stagger } from '../constants/theme'
import PollenGauge from './PollenGauge'
import TypeRow from './TypeRow'

const BG_COLORS = {
  0: 'var(--color-sage-bg)',
  1: 'var(--color-sage-bg)',
  2: 'var(--color-amber-bg)',
  3: 'var(--color-terracotta-bg)',
  4: 'var(--color-terracotta-deep-bg)',
}

export default function SeverityHero({ todayData, severity }) {
  if (!todayData || !severity) return null

  const config = getSeverityConfig(severity.upi)
  const recommendation = getRecommendation(severity.upi, severity.topSpecies)
  const bgColor = BG_COLORS[Math.round(severity.upi)] || BG_COLORS[0]

  return (
    <motion.div
      className="min-h-[calc(100dvh-5rem)] flex flex-col justify-center px-6 py-12 transition-colors"
      style={{
        backgroundColor: bgColor,
        transitionProperty: 'background-color',
        transitionDuration: '800ms',
        transitionTimingFunction: 'ease',
      }}
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={entrance} className="mb-8">
        <p
          className="text-text-muted text-xs tracking-wider uppercase"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {formatHeaderDate(todayData.date)} / Manhattan, NY
        </p>
      </motion.div>

      <motion.div variants={entrance} className="mb-4">
        <h1
          className="text-[72px] sm:text-[96px] leading-[0.9] tracking-tight"
          style={{
            fontFamily: 'var(--font-display)',
            color: config.color,
            textWrap: 'balance',
          }}
        >
          {config.label}
        </h1>
      </motion.div>

      <motion.p
        variants={entrance}
        className="text-text-muted text-lg sm:text-xl max-w-md leading-relaxed mb-10"
        style={{ textWrap: 'pretty' }}
      >
        {recommendation}
      </motion.p>

      <motion.div variants={entrance} className="mb-8">
        <PollenGauge value={severity.upi} />
      </motion.div>

      <motion.div variants={entrance} className="flex flex-col gap-2">
        {todayData.types.map(type => (
          <TypeRow
            key={type.code}
            name={type.name}
            upi={type.upi}
            species={todayData.species.filter(s => {
              if (type.code === 'TREE') return ['OAK', 'BIRCH', 'MAPLE', 'ELM', 'ASH', 'PINE', 'ALDER', 'COTTONWOOD'].includes(s.code)
              if (type.code === 'GRASS') return ['TIMOTHY_GRASS', 'BLUEGRASS', 'RYEGRASS'].includes(s.code)
              if (type.code === 'WEED') return ['RAGWEED', 'MUGWORT'].includes(s.code)
              return false
            })}
          />
        ))}
      </motion.div>

      {severity.isPersonalized && (
        <motion.p
          variants={entrance}
          className="text-text-subtle text-xs mt-6"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Personalized to your allergens
        </motion.p>
      )}
    </motion.div>
  )
}
