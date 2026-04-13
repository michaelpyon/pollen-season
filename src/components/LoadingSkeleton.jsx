import { motion } from 'motion/react'

const shimmer = {
  animate: {
    opacity: [0.4, 0.7, 0.4],
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  },
}

function SkeletonBlock({ className, style }) {
  return (
    <motion.div
      className={`rounded-2xl ${className || ''}`}
      style={{ backgroundColor: 'var(--color-surface)', ...style }}
      {...shimmer}
    />
  )
}

function TodaySkeleton() {
  return (
    <div className="flex flex-col gap-6 px-6 pt-12 pb-24">
      {/* Date line */}
      <SkeletonBlock className="h-3 w-40" />

      {/* Hero card */}
      <SkeletonBlock className="h-72 w-full" />

      {/* Section label */}
      <SkeletonBlock className="h-3 w-32" />

      {/* Type rows */}
      <div className="flex flex-col gap-2">
        <SkeletonBlock className="h-16 w-full" />
        <SkeletonBlock className="h-16 w-full" />
        <SkeletonBlock className="h-16 w-full" />
        <SkeletonBlock className="h-16 w-full" />
      </div>

      {/* Weather row */}
      <SkeletonBlock className="h-20 w-full" />

      {/* Peak hours */}
      <SkeletonBlock className="h-24 w-full" />
    </div>
  )
}

function ForecastSkeleton() {
  return (
    <div className="flex flex-col gap-6 px-6 pt-8 pb-24">
      {/* Title */}
      <div>
        <SkeletonBlock className="h-8 w-48 mb-2" />
        <SkeletonBlock className="h-4 w-28" />
      </div>

      {/* Day pills */}
      <div className="flex gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <SkeletonBlock key={i} className="w-14 flex-shrink-0" style={{ height: '5.5rem' }} />
        ))}
      </div>

      {/* Severity card */}
      <SkeletonBlock className="h-36 w-full" />

      {/* Type rows */}
      <div className="flex flex-col gap-2">
        <SkeletonBlock className="h-16 w-full" />
        <SkeletonBlock className="h-16 w-full" />
        <SkeletonBlock className="h-16 w-full" />
      </div>
    </div>
  )
}

function DetailSkeleton() {
  return (
    <div className="flex flex-col gap-6 px-6 pt-8 pb-24">
      {/* Title */}
      <div>
        <SkeletonBlock className="h-8 w-48 mb-2" />
        <SkeletonBlock className="h-4 w-36" />
      </div>

      {/* Species cards */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-20 w-full" />
        ))}
      </div>

      {/* Bloom calendar */}
      <SkeletonBlock className="h-48 w-full" />
    </div>
  )
}

export default function LoadingSkeleton({ variant = 'today' }) {
  const skeletons = {
    today: TodaySkeleton,
    forecast: ForecastSkeleton,
    detail: DetailSkeleton,
  }
  const Component = skeletons[variant] || TodaySkeleton
  return <Component />
}
