import { useState } from 'react'
import { motion } from 'motion/react'
import { usePreferences } from '../hooks/usePreferences'
import { usePollenData } from '../hooks/usePollenData'
import { PLANT_GROUPS, PLANTS } from '../constants/plants'
import { entrance, stagger } from '../constants/theme'

export default function Settings() {
  const { prefs, toggleAllergen } = usePreferences()
  const { data } = usePollenData()
  const [phone, setPhone] = useState('')
  const todaySpecies = data?.today?.species || []

  return (
    <motion.div
      className="flex flex-col gap-8 pt-8 pb-24 sm:pb-6"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={entrance} className="px-6">
        <h1 className="text-3xl font-extrabold tracking-tight mb-1">Settings</h1>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Personalize your allergen tracking and notifications.
        </p>
      </motion.div>

      {/* SMS signup */}
      <motion.div variants={entrance} className="px-6">
        <div className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--color-surface)', boxShadow: '0 0 0 1px var(--color-border)' }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.1em] mb-1" style={{ color: 'var(--color-primary)' }}>
            SMS Check-in
          </p>
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Get your morning pollen forecast via text.
          </p>
          <div className="flex gap-2">
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl text-sm border-none"
              style={{
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text)',
                outline: 'none',
              }}
            />
            <button
              className="px-6 py-3 rounded-full text-sm font-bold transition-opacity hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: '#e7fdff',
              }}
            >
              Join
            </button>
          </div>
        </div>
      </motion.div>

      {/* Allergen toggles */}
      <motion.div variants={entrance} className="px-6 space-y-6">
        <h3 className="text-lg font-bold">Tracked Allergens</h3>
        {PLANT_GROUPS.map(group => {
          const icon = group.type === 'tree' ? 'park' : group.type === 'grass' ? 'grass' : 'energy_savings_leaf'
          return (
            <div key={group.type} className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <span className="material-symbols-outlined text-lg" style={{ color: 'var(--color-primary)' }}>{icon}</span>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: 'var(--color-text-muted)' }}>
                  {group.label}
                </h4>
              </div>
              <div className="flex flex-col gap-1.5">
                {group.plants.map(code => {
                  const plant = PLANTS[code]
                  if (!plant) return null
                  const selected = prefs.allergens.includes(code)
                  return (
                    <button
                      key={code}
                      onClick={() => toggleAllergen(code)}
                      className="flex items-center justify-between px-5 py-3.5 rounded-xl transition-colors"
                      style={{
                        backgroundColor: 'var(--color-surface)',
                        boxShadow: '0 0 0 1px var(--color-border)',
                      }}
                    >
                      <span className="text-sm font-medium">{plant.name}</span>
                      {/* Toggle switch */}
                      <div
                        className="w-10 h-5 rounded-full relative transition-colors duration-200"
                        style={{
                          backgroundColor: selected ? 'var(--color-primary)' : 'var(--color-surface-high)',
                        }}
                      >
                        <div
                          className="absolute top-1 w-3 h-3 rounded-full transition-all duration-200"
                          style={{
                            left: selected ? '1.375rem' : '0.25rem',
                            backgroundColor: selected ? '#e7fdff' : 'var(--color-text-subtle)',
                          }}
                        />
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* About */}
      <motion.div variants={entrance} className="px-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: 'var(--color-text-subtle)' }}>
          About
        </p>
        <div className="text-sm leading-relaxed flex flex-col gap-2" style={{ color: 'var(--color-text-muted)' }}>
          <p>
            Pollen Season uses the Google Pollen API to deliver real-time pollen forecasts
            for New York City. Data updates every 30 minutes during pollen season.
          </p>
          <p className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>
            Pollen data should not replace medical advice. Consult your allergist for treatment decisions.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
