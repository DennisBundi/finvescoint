'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import MagneticButton from '@/components/shared/MagneticButton'
import { fadeUp, staggerContainer } from '@/lib/animations'

export default function AboutHero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundColor: '#0A0F1E',
      }}
    >
      <div className="absolute inset-0 bg-navy/85 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-transparent to-navy/90 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto pt-28 pb-20" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
            <div className="gold-line" />
            <span className="text-gold text-xs tracking-[0.4em] uppercase font-mono">Our Story</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="font-serif text-[2.75rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-[6.5vw] md:leading-[0.9] text-offwhite mb-8">
            Built to Empower<br />
            <span className="italic text-gradient-gold">Ambitious Business</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-muted text-base md:text-xl font-sans font-light max-w-2xl leading-relaxed mb-12">
            At Finvesco International, we partner with forward-thinking businesses and entrepreneurs
            across Kenya and beyond — providing strategic intelligence, capital structuring,
            and expert financial advisory to achieve lasting competitive advantage.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <MagneticButton>
              <Link
                href="/services"
                className="btn-primary"
              >
                Our Services
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/contact"
                className="btn-secondary"
              >
                Engage Us
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
