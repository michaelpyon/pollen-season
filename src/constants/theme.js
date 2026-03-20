// Framer Motion animation variants
export const entrance = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

export const listStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
}

export const exitVariant = {
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

export const spring = { type: 'spring', duration: 0.3, bounce: 0 }

export const press = { scale: 0.96 }

// UPI severity -> visual config
export const SEVERITY_CONFIG = {
  0: {
    label: 'Clear',
    color: 'var(--color-severity-0)',
    lightColor: 'var(--color-severity-0-light)',
    bgColor: 'var(--color-severity-0-bg)',
  },
  1: {
    label: 'Low',
    color: 'var(--color-severity-1)',
    lightColor: 'var(--color-severity-1-light)',
    bgColor: 'var(--color-severity-1-bg)',
  },
  2: {
    label: 'Moderate',
    color: 'var(--color-severity-2)',
    lightColor: 'var(--color-severity-2-light)',
    bgColor: 'var(--color-severity-2-bg)',
  },
  3: {
    label: 'High',
    color: 'var(--color-severity-3)',
    lightColor: 'var(--color-severity-3-light)',
    bgColor: 'var(--color-severity-3-bg)',
  },
  4: {
    label: 'Very High',
    color: 'var(--color-severity-4)',
    lightColor: 'var(--color-severity-4-light)',
    bgColor: 'var(--color-severity-4-bg)',
  },
}

// Material icon name per pollen type
export const TYPE_ICONS = {
  TREE: 'park',
  GRASS: 'grass',
  WEED: 'energy_savings_leaf',
}
