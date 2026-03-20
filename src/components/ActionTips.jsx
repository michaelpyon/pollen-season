import { motion } from 'motion/react'
import { entrance, listStagger } from '../constants/theme'

// Icon + title pairs for tips per severity level
const TIP_CARDS = {
  0: [],
  1: [
    { icon: 'sunny', title: 'Enjoy the outdoors', body: 'Pollen is low today. No precautions needed.' },
  ],
  2: [
    { icon: 'medication', title: 'Pre-medicate if sensitive', body: 'Consider an antihistamine if you react to active species.' },
    { icon: 'schedule', title: 'Time your outdoor plans', body: 'Morning jogs are fine, but watch the 5 to 10am peak.' },
  ],
  3: [
    { icon: 'medication', title: 'Take your meds', body: 'Antihistamine before heading outside today.' },
    { icon: 'window', title: 'Keep windows closed', body: 'Prevent pollen from drifting into your living spaces.' },
    { icon: 'schedule', title: 'Avoid peak hours', body: 'Stay inside between 5 and 10am when counts spike.' },
    { icon: 'shower', title: 'Shower before bed', body: 'Rinse off outdoor allergens from skin and hair.' },
  ],
  4: [
    { icon: 'medication', title: 'Meds first thing', body: 'Take allergy medication as soon as you wake up.' },
    { icon: 'home', title: 'Stay indoors', body: 'Limit outdoor time during peak hours (5 to 10am).' },
    { icon: 'window', title: 'Seal up the house', body: 'Keep all windows shut. Run AC on recirculate.' },
    { icon: 'shower', title: 'Decontaminate', body: 'Shower and change clothes after any time outside.' },
  ],
}

export default function ActionTips({ upi }) {
  const level = Math.max(0, Math.min(4, Math.round(upi)))
  const cards = TIP_CARDS[level]
  if (!cards || cards.length === 0) return null

  return (
    <motion.div
      className="mx-6"
      variants={listStagger}
      initial="hidden"
      animate="visible"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: 'var(--color-text-subtle)' }}>
        What to do
      </p>
      <div className="grid grid-cols-2 gap-3">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            variants={entrance}
            className="p-4 rounded-2xl flex flex-col gap-2.5"
            style={{
              backgroundColor: 'var(--color-surface)',
              boxShadow: '0 0 0 1px var(--color-border)',
            }}
          >
            <span className="material-symbols-outlined text-xl" style={{ color: 'var(--color-primary)' }}>
              {card.icon}
            </span>
            <span className="text-sm font-bold leading-tight">{card.title}</span>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {card.body}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
