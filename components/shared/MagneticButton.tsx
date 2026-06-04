'use client'
import { useRef, ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function MagneticButton({ children, className = '', onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width  / 2) * 0.35)
    y.set((e.clientY - rect.top  - rect.height / 2) * 0.35)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  )
}
