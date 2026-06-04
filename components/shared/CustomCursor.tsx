'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX   = useSpring(cursorX, { stiffness: 500, damping: 40 })
  const springY   = useSpring(cursorY, { stiffness: 500, damping: 40 })
  const followerX = useSpring(cursorX, { stiffness: 120, damping: 20 })
  const followerY = useSpring(cursorY, { stiffness: 120, damping: 20 })

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [cursorX, cursorY])

  if (isTouch) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gold pointer-events-none z-[99999] mix-blend-difference"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-gold/40 pointer-events-none z-[99998]"
        style={{ x: followerX, y: followerY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}
