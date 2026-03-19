import { motion } from 'motion/react'
import { BLOOM_CALENDAR } from '../constants/plants'
import { getCurrentMonth } from '../utils/formatDate'
import { entrance, listStagger } from '../constants/theme'

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Colors per plant type for the bars
const BAR_COLORS = {
  ELM: '#8BA888',
  MAPLE: '#8BA888',
  BIRCH: '#6B8F71',
  OAK: '#6B8F71',
  ASH: '#8BA888',
  PINE: '#A8C4A0',
  GRASS: '#C4943A',
  MUGWORT: '#C89060',
  RAGWEED: '#C25D3A',
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
      <p
        className="text-xs uppercase tracking-wider text-text-subtle mb-4"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        NYC bloom calendar
      </p>

      {/* Month header */}
      <div className="flex mb-2 pl-20">
        {MONTHS.map((m, i) => (
          <div
            key={i}
            className="flex-1 text-center text-[10px]"
            style={{
              fontFamily: 'var(--font-mono)',
              color: i + 1 === currentMonth ? 'var(--color-text)' : 'var(--color-text-subtle)',
              fontWeight: i + 1 === currentMonth ? 600 : 400,
            }}
          >
            {m}
          </div>
        ))}
      </div>

      {/* Plant rows */}
      <div className="flex flex-col gap-1.5">
        {BLOOM_CALENDAR.map(plant => (
          <motion.div
            key={plant.code}
            variants={entrance}
            className="flex items-center gap-2"
          >
            <span className="w-16 text-xs text-text-muted text-right shrink-0 truncate">
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
                        ? BAR_COLORS[plant.code] || 'var(--color-sage)'
                        : 'var(--color-border)',
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
      <div className="flex pl-20 mt-1">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="flex-1 flex justify-center">
            {i + 1 === currentMonth && (
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[5px]" style={{ borderBottomColor: 'var(--color-text)' }} />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
