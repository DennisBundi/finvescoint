'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PILLARS } from '@/lib/constants'
import SectionLabel from '@/components/shared/SectionLabel'

export default function PillarsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-32 max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <SectionLabel text="What We Do" />
        <h2 className="font-serif text-5xl md:text-6xl text-offwhite leading-tight">
          Three Pillars,<br />
          <span className="italic text-gradient-gold">One Vision</span>
        </h2>
      </div>

      <div className="flex flex-col border-t border-border">
        {PILLARS.map(({ num, title, subtitle, href }, i) => (
          <motion.div key={num}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <Link href={href}
              className="group flex items-center justify-between py-8 border-b border-border hover:border-gold/40 transition-colors duration-300">
              <div className="flex items-center gap-8 md:gap-16">
                <span className="font-mono text-xs text-gold/40 tracking-widest w-8 flex-shrink-0">{num}</span>
                <div>
                  <h3 className="font-serif text-3xl md:text-5xl text-offwhite italic group-hover:text-gold transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-muted text-sm mt-1 tracking-wide hidden md:block">{subtitle}</p>
                </div>
              </div>
              <div className="w-10 h-10 border border-border group-hover:border-gold/40 flex items-center justify-center text-muted group-hover:text-gold transition-all duration-300 flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
