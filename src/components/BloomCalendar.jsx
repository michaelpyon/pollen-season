import { motion } from 'motion/react'
import { BLOOM_CALENDAR } from '../constants/plants'
import { getCurrentMonth } from '../utils/formatDate'
import { entrance, listStagger } from '../constants/theme'

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

// Colors per plant type for the bars
const BAR_COLORS = {
  ELM: '#3a666a',
  MAPLE: '#3a666a',
  BIRCH: '#4d7a7e',
  OAK: '#855335',
  ASH: '#3a666a',
  PINE: '#49664e',
  GRASS: '#9A7B4F',
  MUGWORT: '#855335',
  RAGWEED: '#a83836',
}

export default function BloomCalendar() {
  const currentMonth = getCurrentMonth()

  return (
    <motion.div
      variants={listStagger}
      initial="hidden"
      animate="visible"
      className="px-6"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.1em] mb-4" style={{ color: 'var(--color-text-subtle)' }}>
        NYC bloom calendar
      </p>

      <div className="p-5 rounded-2xl" style={{ backgroundColor: 'var(--color-surface)', boxShadow: '0 0 0 1px var(--color-border)' }}>
        {/* Month header */}
        <div className="flex mb-3 pl-20">
          {MONTHS.map((m, i) => (
            <div
              key={i}
              className="flex-1 text-center text-[10px] font-bold"
              style={{
                color: i + 1 === currentMonth ? 'var(--color-text)' : 'var(--color-text-subtle)',
              }}
            >
              {m}
            </div>
          ))}
        </div>

        {/* Plant rows */}
        <div className="flex flex-col gap-2">
          {BLOOM_CALENDAR.map(plant => (
            <motion.div
              key={plant.code}
              variants={entrance}
              className="flex items-center gap-2"
            >
              <span className="w-16 text-xs font-medium text-right shrink-0 truncate" style={{ color: 'var(--color-text-muted)' }}>
                {plant.name}
              </span>
              <div className="flex flex-1 gap-px">
                {Array.from({ length: 12 }, (_, i) => {
                  const month = i + 1
                  const active = month >= plant.start && month <= plant.end
                  return (
                    <div
                      key={i}
                      className="flex-1 h-3 rounded-sm"
                      style={{
                        backgroundColor: active
                          ? BAR_COLORS[plant.code] || 'var(--color-primary)'
                          : 'var(--color-surface-high)',
                        opacity: active ? 1 : 0.5,
                      }}
                    />
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Current month marker */}
        <div className="flex pl-20 mt-2">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="flex-1 flex justify-center">
              {i + 1 === currentMonth && (
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[5px]" style={{ borderBottomColor: 'var(--color-text)' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
