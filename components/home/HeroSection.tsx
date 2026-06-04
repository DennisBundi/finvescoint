'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import MagneticButton from '@/components/shared/MagneticButton'

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] flex items-center overflow-hidden mesh-bg">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}>
          <div className="gold-line" />
          <span className="text-gold text-xs tracking-[0.4em] uppercase font-sans">
            Consulting · Investment · Branding
          </span>
        </motion.div>

        <div className="overflow-hidden mb-6">
          <motion.h1
            className="font-serif text-6xl md:text-8xl lg:text-[7vw] leading-[0.9] text-offwhite"
            initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}>
            Where Capital<br />
            <span className="text-gradient-gold italic">Meets Strategy</span>
          </motion.h1>
        </div>

        <motion.p className="max-w-xl text-muted text-lg md:text-xl font-sans font-light leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}>
          Finvesco International partners with ambitious businesses to architect
          financial clarity, drive strategic growth, and build brands that command markets.
        </motion.p>

        <motion.div className="flex flex-wrap items-center gap-6"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}>
          <MagneticButton>
            <Link href="/services" className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-black text-sm tracking-widest uppercase font-medium hover:bg-gold-light transition-colors duration-300">
              Our Services
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link href="/about" className="inline-flex items-center gap-3 px-8 py-4 border border-border text-offwhite text-sm tracking-widest uppercase hover:border-gold/50 transition-colors duration-300">
              Our Story
            </Link>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: 1.5 }}>
        <div className="w-px h-24 bg-gold/50" />
        <span className="text-muted text-xs tracking-[0.3em] uppercase" style={{ writingMode: 'vertical-rl' }}>
          EST. 2024
        </span>
      </motion.div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
        <span className="text-muted text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent" />
      </motion.div>
    </section>
  )
}
