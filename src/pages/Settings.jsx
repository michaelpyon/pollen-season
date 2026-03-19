import { motion } from 'motion/react'
import { usePreferences } from '../hooks/usePreferences'
import { usePollenData } from '../hooks/usePollenData'
import AllergenPicker from '../components/AllergenPicker'
import { entrance, stagger } from '../constants/theme'

export default function Settings() {
  const { prefs, toggleAllergen } = usePreferences()
  const { data } = usePollenData()

  return (
    <motion.div
      className="flex flex-col gap-8 pt-8 pb-24 sm:pb-6"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
        <motion.div variants={entrance} className="px-6">
          <h1
            className="text-3xl tracking-tight mb-1"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Settings
          </h1>
          <p className="text-sm text-text-muted">Personalize your forecast</p>
        </motion.div>

        <AllergenPicker
          prefs={prefs}
          toggleAllergen={toggleAllergen}
          todaySpecies={data?.today?.species || []}
        />

        {/* SMS section (placeholder for follow-up) */}
        <motion.div variants={entrance} className="px-6">
          <p
            className="text-xs uppercase tracking-wider text-text-subtle mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Morning text
          </p>
          <div
            className="px-4 py-4 rounded-xl"
            style={{
              backgroundColor: 'var(--color-surface)',
              boxShadow: '0 0 0 1px var(--color-border)',
            }}
          >
            <p className="text-sm text-text-muted leading-relaxed">
              Get a text every morning with your personalized pollen forecast.
            </p>
            <p className="text-xs text-text-subtle mt-2" style={{ fontFamily: 'var(--font-mono)' }}>
              Coming soon
            </p>
          </div>
        </motion.div>

        {/* About */}
        <motion.div variants={entrance} className="px-6">
          <p
            className="text-xs uppercase tracking-wider text-text-subtle mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            About
          </p>
          <div className="text-sm text-text-muted leading-relaxed flex flex-col gap-2">
            <p>
              Pollen Season uses the Google Pollen API to deliver real-time pollen forecasts
              for New York City. Data updates every 30 minutes during pollen season.
            </p>
            <p>
              Species data covers trees (oak, birch, maple, elm, ash, pine), grasses (timothy,
              bluegrass, ryegrass), and weeds (ragweed, mugwort).
            </p>
            <p className="text-xs text-text-subtle" style={{ fontFamily: 'var(--font-mono)' }}>
              Pollen data should not replace medical advice. Consult your allergist for treatment decisions.
            </p>
          </div>
        </motion.div>
    </motion.div>
  )
}
