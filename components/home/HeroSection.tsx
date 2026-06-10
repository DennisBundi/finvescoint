'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import MagneticButton from '@/components/shared/MagneticButton'

export default function HeroSection() {
  return (
    <section
      className="relative h-screen flex items-center overflow-hidden snap-start snap-always"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#0A0F1E',
      }}
    >
      <div className="absolute inset-0 bg-navy/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/50 pointer-events-none" />

      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-gold/10 blur-3xl pointer-events-none"
      />

      <div
        className="relative z-10 w-full max-w-[1200px] mx-auto pt-20 md:pt-24"
        style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
      >
        <motion.div
          className="flex items-center gap-3 mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="gold-line" />
          <span className="text-gold text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase font-sans">
            Consulting · Investment · Branding
          </span>
        </motion.div>

        <div className="overflow-hidden mb-5 md:mb-6">
          <motion.h1
            className="font-serif text-[2.75rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-[6.5vw] md:leading-[0.9] text-offwhite"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Where Capital<br />
            <span className="text-gradient-gold italic">Meets Strategy</span>
          </motion.h1>
        </div>

        <motion.p
          className="max-w-xl text-muted text-base md:text-xl font-sans font-light leading-relaxed mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Finvesco International partners with ambitious businesses to architect
          financial clarity, drive strategic growth, and build brands that command markets.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
        >
          <MagneticButton>
            <Link
              href="/services"
              className="btn-primary !px-6 sm:!px-9"
            >
              Our Services
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="/about"
              className="btn-ghost !px-6 sm:!px-9"
            >
              Our Story
            </Link>
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-muted text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 md:h-12 bg-gradient-to-b from-gold/50 to-transparent" />
      </motion.div>
    </section>
  )
}
