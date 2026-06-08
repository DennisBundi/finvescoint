'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import MagneticButton from '@/components/shared/MagneticButton'
import { fadeUp, staggerContainer } from '@/lib/animations'

export default function InnerCta() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section ref={ref} className="py-28 md:py-40 bg-black relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[600px] h-[300px] rounded-full bg-gold/5 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-6 md:mb-8">
            <div className="gold-line" />
            <span className="text-gold text-xs tracking-[0.4em] uppercase">Begin the Engagement</span>
            <div className="gold-line" style={{ transform: 'scaleX(-1)' }} />
          </motion.div>

          <motion.h2 variants={fadeUp} className="font-serif text-4xl sm:text-5xl md:text-6xl text-offwhite leading-tight mb-6">
            Ready to architect<br />
            <span className="italic text-gradient-gold">your growth?</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-muted text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            Partner with Finvesco International. Strategy-first, execution-focused, results-driven.
          </motion.p>

          <motion.div variants={fadeUp}>
            <MagneticButton className="inline-block">
              <Link href="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gold text-black text-sm tracking-widest uppercase font-medium hover:bg-gold-light transition-colors duration-300">
                Engage Us
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
