import { motion } from 'motion/react'
import { usePollenData } from '../hooks/usePollenData'
import { useWeather } from '../hooks/useWeather'
import { usePreferences } from '../hooks/usePreferences'
import { usePersonalSeverity } from '../hooks/usePersonalSeverity'
import SeverityHero from '../components/SeverityHero'
import TrendAlert from '../components/TrendAlert'
import WeatherCorrelation from '../components/WeatherCorrelation'
import ActionTips from '../components/ActionTips'
import PeakHoursBar from '../components/PeakHoursBar'
import { stagger } from '../constants/theme'

export default function Today() {
  const { data, loading, error } = usePollenData()
  const { weather } = useWeather()
  const { prefs } = usePreferences()
  const severity = usePersonalSeverity(data?.today, prefs.allergens)

  if (loading) {
    return (
      <div className="min-h-[calc(100dvh-5rem)] flex items-center justify-center">
        <motion.div
          className="w-8 h-8 rounded-full"
          style={{ backgroundColor: 'var(--color-surface)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[calc(100dvh-5rem)] flex flex-col items-center justify-center px-6">
        <p className="text-text-muted text-sm">Something went wrong loading pollen data.</p>
        <p className="text-xs mt-2" style={{ color: 'var(--color-text-subtle)' }}>{error}</p>
      </div>
    )
  }

  const tomorrowUpi = data?.forecast?.[1]?.overallUpi ?? 0

  return (
    <motion.div
      className="flex flex-col gap-6 pb-24 sm:pb-6"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <SeverityHero todayData={data.today} severity={severity} />

      <TrendAlert todayUpi={severity.upi} tomorrowUpi={tomorrowUpi} />

      <WeatherCorrelation weather={weather} />

      <PeakHoursBar />

      <ActionTips upi={severity.upi} />
    </motion.div>
  )
}
