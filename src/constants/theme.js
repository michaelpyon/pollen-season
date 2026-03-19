// Framer Motion animation variants (from design system)
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
    color: 'var(--color-sage)',
    lightColor: 'var(--color-sage-light)',
    bgColor: 'var(--color-sage-bg)',
    dotClass: 'bg-sage',
  },
  1: {
    label: 'Low',
    color: 'var(--color-sage)',
    lightColor: 'var(--color-sage-light)',
    bgColor: 'var(--color-sage-bg)',
    dotClass: 'bg-sage',
  },
  2: {
    label: 'Moderate',
    color: 'var(--color-amber)',
    lightColor: 'var(--color-amber-light)',
    bgColor: 'var(--color-amber-bg)',
    dotClass: 'bg-amber',
  },
  3: {
    label: 'High',
    color: 'var(--color-terracotta)',
    lightColor: 'var(--color-terracotta-light)',
    bgColor: 'var(--color-terracotta-bg)',
    dotClass: 'bg-terracotta',
  },
  4: {
    label: 'Very High',
    color: 'var(--color-terracotta-deep)',
    lightColor: 'var(--color-terracotta-deep-light)',
    bgColor: 'var(--color-terracotta-deep-bg)',
    dotClass: 'bg-terracotta-deep',
  },
}
