import { NavLink } from 'react-router-dom'
import { motion } from 'motion/react'
import { spring } from '../constants/theme'

const NAV_ITEMS = [
  { to: '/', label: 'Today', icon: 'today' },
  { to: '/forecast', label: 'Forecast', icon: 'calendar_view_day' },
  { to: '/detail', label: 'Detail', icon: 'analytics' },
  { to: '/settings', label: 'Settings', icon: 'settings' },
]

export default function NavBar() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 sm:relative sm:bottom-auto"
      style={{
        background: 'rgba(251, 249, 244, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '2.5rem 2.5rem 0 0',
        boxShadow: '0 -4px 40px rgba(49, 51, 46, 0.05)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="max-w-md mx-auto flex items-center justify-around px-4 pt-4 pb-2">
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex flex-col items-center px-5 py-2 rounded-full transition-colors"
          >
            {({ isActive }) => (
              <motion.div
                className="flex flex-col items-center gap-1 px-1 py-1 rounded-full"
                style={{
                  backgroundColor: isActive ? 'rgba(58, 102, 106, 0.1)' : 'transparent',
                  color: isActive ? 'var(--color-primary)' : 'rgba(49, 51, 46, 0.4)',
                }}
                animate={{ scale: isActive ? 1 : 0.95 }}
                transition={spring}
              >
                <span
                  className="material-symbols-outlined text-2xl"
                  style={{
                    fontVariationSettings: isActive
                      ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
                      : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  {item.icon}
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase">
                  {item.label}
                </span>
              </motion.div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
