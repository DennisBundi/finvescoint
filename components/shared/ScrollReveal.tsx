'use client'
import { motion, Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeUp } from '@/lib/animations'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  variants?: Variants
}

export default function ScrollReveal({ children, className = '', delay = 0, variants = fadeUp }: Props) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
