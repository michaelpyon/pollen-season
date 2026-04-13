import { motion } from 'motion/react'
import { usePollen } from '../context/PollenContext'
import SeverityHero from '../components/SeverityHero'
import TrendAlert from '../components/TrendAlert'
import WeatherCorrelation from '../components/WeatherCorrelation'
import ActionTips from '../components/ActionTips'
import PeakHoursBar from '../components/PeakHoursBar'
import BoroughMap from '../components/BoroughMap'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { stagger } from '../constants/theme'

const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
}

export default function Today() {
  const { today, forecast, boroughs, loading, error } = usePollen()

  if (loading) {
    return <LoadingSkeleton variant="today" />
  }

  if (error) {
    return (
      <div className="min-h-[calc(100dvh-5rem)] flex flex-col items-center justify-center px-6">
        <p className="text-text-muted text-sm">Something went wrong loading pollen data.</p>
        <p className="text-xs mt-2" style={{ color: 'var(--color-text-subtle)' }}>{error}</p>
      </div>
    )
  }

  const tomorrowIndex = forecast?.[1]?.overallIndex ?? 0

  return (
    <motion.div
      className="flex flex-col gap-6 pb-24 sm:pb-6"
      variants={stagger}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      {...pageTransition}
    >
      <SeverityHero todayData={today} />

      <TrendAlert todayIndex={today.overallIndex} tomorrowIndex={tomorrowIndex} />

      <WeatherCorrelation weather={today.weather} severity={today.severity} />

      <PeakHoursBar peakHours={today.peakHours} />

      <BoroughMap boroughs={boroughs} />

      <ActionTips upi={today.overallIndex} />
    </motion.div>
  )
}
