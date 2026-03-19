import { NavLink } from 'react-router-dom'
import { motion } from 'motion/react'
import { spring } from '../constants/theme'

const NAV_ITEMS = [
  {
    to: '/',
    label: 'Today',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93" />
      </svg>
    ),
  },
  {
    to: '/forecast',
    label: 'Forecast',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M3 10H21M16 2V6M8 2V6" />
      </svg>
    ),
  },
  {
    to: '/detail',
    label: 'Detail',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20C12 20 4 14 4 8.5C4 5.46 6.46 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.54 3 24 5.46 24 8.5C24 14 16 20 16 20" />
        <path d="M8 14L10.5 10L13 14L15.5 8" />
      </svg>
    ),
  },
  {
    to: '/settings',
    label: 'Settings',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2H11.78C11.2496 2 10.7409 2.21071 10.3658 2.58579C9.99072 2.96086 9.78 3.46957 9.78 4V4.18C9.78 5.2 9.1 6.1 8.12 6.44C8.03939 6.46861 7.95939 6.4986 7.88 6.53C6.92 6.93 5.78 6.76 5.08 6L4.94 5.86C4.5649 5.48553 4.05637 5.27525 3.526 5.27525C2.99563 5.27525 2.4871 5.48553 2.112 5.86C1.3 6.67 1.3 7.97 2.11 8.78L2.25 8.92C3.01 9.62 3.18 10.76 2.78 11.72C2.7486 11.7994 2.7186 11.8794 2.69 11.96C2.35 12.94 1.45 13.62 0.43 13.62H0.25C-0.280414 13.62 -0.789164 13.8307 -1.16424 14.2058C-1.53931 14.5809 -1.75 15.0896 -1.75 15.62V16.38C-1.75 17.49 -0.85 18.38 0.25 18.38H0.43C1.45 18.38 2.35 19.06 2.69 20.04" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
]

export default function NavBar() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 sm:relative sm:bottom-auto"
      style={{
        backgroundColor: 'var(--color-bg)',
        boxShadow: '0 -1px 0 0 var(--color-border)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="max-w-md mx-auto flex items-center justify-around h-16">
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors"
          >
            {({ isActive }) => (
              <motion.div
                className="flex flex-col items-center gap-1"
                animate={{ scale: isActive ? 1 : 0.95 }}
                transition={spring}
              >
                <div
                  style={{
                    color: isActive ? 'var(--color-text)' : 'var(--color-text-subtle)',
                    transition: 'color 150ms ease',
                  }}
                >
                  {item.icon}
                </div>
                <span
                  className="text-[10px] font-medium"
                  style={{
                    color: isActive ? 'var(--color-text)' : 'var(--color-text-subtle)',
                    fontFamily: 'var(--font-mono)',
                    transition: 'color 150ms ease',
                  }}
                >
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
