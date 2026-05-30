import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { getSeverityConfig } from '../utils/severity'
import { entrance, spring } from '../constants/theme'

// Simplified SVG paths for NYC boroughs (approximate shapes, viewBox 0 0 300 350)
const BOROUGH_PATHS = {
  manhattan: {
    d: 'M138,45 L145,40 L152,55 L155,80 L158,120 L160,165 L157,195 L152,210 L148,220 L142,225 L135,218 L132,200 L130,175 L128,150 L130,120 L132,90 L135,60 Z',
    labelX: 143,
    labelY: 140,
  },
  bronx: {
    d: 'M145,5 L165,0 L190,5 L210,15 L220,30 L225,50 L218,65 L200,70 L185,68 L170,60 L160,50 L155,40 L148,35 L145,20 Z',
    labelX: 185,
    labelY: 35,
  },
  brooklyn: {
    d: 'M135,228 L150,225 L165,228 L180,235 L195,250 L200,270 L195,290 L180,305 L165,315 L145,318 L130,310 L120,295 L115,275 L118,255 L125,240 Z',
    labelX: 158,
    labelY: 275,
  },
  queens: {
    d: 'M165,65 L185,72 L205,75 L220,85 L235,100 L245,120 L248,145 L245,170 L235,190 L220,205 L200,215 L180,218 L165,222 L160,210 L163,185 L165,160 L168,130 L170,100 L168,80 Z',
    labelX: 205,
    labelY: 150,
  },
  staten_island: {
    d: 'M55,260 L75,250 L95,255 L108,265 L112,280 L108,300 L100,315 L85,325 L70,330 L55,325 L45,310 L42,290 L45,275 Z',
    labelX: 78,
    labelY: 290,
  },
}

const BOROUGH_LABELS = {
  manhattan: 'MAN',
  bronx: 'BX',
  brooklyn: 'BK',
  queens: 'QNS',
  staten_island: 'SI',
}

export default function BoroughMap({ boroughs }) {
  const [selected, setSelected] = useState(null)

  if (!boroughs || boroughs.length === 0) return null

  const boroughMap = {}
  boroughs.forEach(b => { boroughMap[b.code] = b })

  const selectedData = selected ? boroughMap[selected] : null
  const selectedConfig = selectedData ? getSeverityConfig(selectedData.index) : null

  return (
    <motion.div
      variants={entrance}
      initial="hidden"
      animate="visible"
      className="mx-6"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: 'var(--color-text-subtle)' }}>
        NYC boroughs
      </p>

      <div
        className="rounded-2xl p-5 relative"
        style={{
          backgroundColor: 'var(--color-surface)',
          boxShadow: '0 0 0 1px var(--color-border)',
        }}
      >
        <svg
          viewBox="0 0 300 340"
          className="w-full"
          style={{ maxHeight: '280px' }}
        >
          {Object.entries(BOROUGH_PATHS).map(([code, path]) => {
            const borough = boroughMap[code]
            if (!borough) return null
            const config = getSeverityConfig(borough.index)
            const isSelected = selected === code

            return (
              <g key={code}>
                <motion.path
                  d={path.d}
                  fill={config.lightColor}
                  stroke={isSelected ? config.color : 'var(--color-border-hover)'}
                  strokeWidth={isSelected ? 2.5 : 1}
                  style={{ cursor: 'pointer' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={spring}
                  onClick={() => setSelected(selected === code ? null : code)}
                />
                {/* Borough label */}
                <text
                  x={path.labelX}
                  y={path.labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={config.color}
                  fontSize="11"
                  fontWeight="800"
                  fontFamily="var(--font-body)"
                  style={{ pointerEvents: 'none', letterSpacing: '0.05em' }}
                >
                  {BOROUGH_LABELS[code]}
                </text>
                {/* Severity dot */}
                <circle
                  cx={path.labelX}
                  cy={path.labelY + 14}
                  r="4"
                  fill={config.color}
                  style={{ pointerEvents: 'none' }}
                />
              </g>
            )
          })}
        </svg>

        {/* Selected borough detail */}
        <AnimatePresence>
          {selectedData && selectedConfig && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 p-4 rounded-xl flex items-center justify-between"
              style={{ backgroundColor: selectedConfig.lightColor }}
            >
              <div>
                <p className="text-sm font-bold" style={{ color: selectedConfig.color }}>
                  {selectedData.name}
                </p>
                <p className="text-xs" style={{ color: selectedConfig.color, opacity: 0.8 }}>
                  Dominant: {selectedData.dominantType}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold" style={{ color: selectedConfig.color }}>
                  {selectedData.index}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: selectedConfig.color }}>
                  {selectedConfig.label}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Disclosure: borough differences are modeled, not measured */}
        <p className="mt-3 text-[10px] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          Borough differences are modeled offsets from the citywide seasonal
          estimate, not separate per borough measurements.
        </p>
      </div>
    </motion.div>
  )
}
