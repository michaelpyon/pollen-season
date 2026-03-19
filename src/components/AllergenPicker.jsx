import { motion } from 'motion/react'
import { PLANT_GROUPS, PLANTS } from '../constants/plants'
import { getSeverityConfig } from '../utils/severity'
import { entrance, listStagger, spring, press } from '../constants/theme'

export default function AllergenPicker({ prefs, toggleAllergen, todaySpecies = [] }) {
  return (
    <motion.div
      variants={listStagger}
      initial="hidden"
      animate="visible"
      className="px-6"
    >
      <p
        className="text-xs uppercase tracking-wider text-text-subtle mb-2"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Your allergens
      </p>
      <p className="text-sm text-text-muted mb-5 leading-relaxed">
        Select the species you react to. Your daily forecast will be personalized to these.
      </p>

      <div className="flex flex-col gap-6">
        {PLANT_GROUPS.map(group => (
          <motion.div key={group.type} variants={entrance}>
            <p className="text-xs font-medium text-text-muted mb-2.5 uppercase tracking-wide">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.plants.map(code => {
                const plant = PLANTS[code]
                if (!plant) return null
                const selected = prefs.allergens.includes(code)
                const todayLevel = todaySpecies.find(s => s.code === code)
                const config = todayLevel ? getSeverityConfig(todayLevel.upi) : null

                return (
                  <motion.button
                    key={code}
                    onClick={() => toggleAllergen(code)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors"
                    style={{
                      backgroundColor: selected ? 'var(--color-surface)' : 'transparent',
                      boxShadow: selected
                        ? '0 0 0 1.5px var(--color-text-subtle)'
                        : '0 0 0 1px var(--color-border)',
                      color: selected ? 'var(--color-text)' : 'var(--color-text-muted)',
                    }}
                    whileTap={press}
                    transition={spring}
                  >
                    {selected && (
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    <span>{plant.name}</span>
                    {config && todayLevel && todayLevel.upi > 0 && (
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: config.color }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
