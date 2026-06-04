import { Variants } from 'framer-motion'

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.9, ease: EASE } },
}

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.9, ease: EASE } },
}

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show:   { opacity: 1, scale: 1,   transition: { duration: 0.7, ease: EASE } },
}

export const charReveal: Variants = {
  hidden: { opacity: 0, y: '100%' },
  show:   { opacity: 1, y: 0,      transition: { duration: 0.6, ease: EASE } },
}
