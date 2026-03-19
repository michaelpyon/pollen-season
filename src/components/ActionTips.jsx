import { motion } from 'motion/react'
import { getTips } from '../utils/recommendations'
import { entrance, listStagger } from '../constants/theme'

export default function ActionTips({ upi }) {
  const tips = getTips(upi)
  if (!tips || tips.length === 0) return null

  return (
    <motion.div
      className="mx-6"
      variants={listStagger}
      initial="hidden"
      animate="visible"
    >
      <p
        className="text-xs uppercase tracking-wider text-text-subtle mb-3"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        What to do
      </p>
      <div className="flex flex-col gap-2">
        {tips.map((tip, i) => (
          <motion.div
            key={i}
            variants={entrance}
            className="flex items-start gap-3 text-sm text-text-muted leading-relaxed"
          >
            <div
              className="w-1 h-1 rounded-full bg-text-subtle mt-2 shrink-0"
            />
            <span>{tip}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
