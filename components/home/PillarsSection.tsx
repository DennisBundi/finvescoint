'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PILLARS } from '@/lib/constants'
import SectionLabel from '@/components/shared/SectionLabel'

const PILLAR_DESC: Record<string, string> = {
  Consulting: 'Strategic intelligence and embedded advisory for complex, high-stakes decisions.',
  Investment: 'Capital structuring that matches the right instrument to the right opportunity.',
  Branding:   'Visual systems and positioning that make your brand impossible to overlook.',
}

export default function PillarsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="min-h-screen flex flex-col justify-center py-20 bg-navy snap-start snap-always">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 w-full">

        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel text="What We Do" />
          <h2 className="font-serif text-4xl md:text-6xl text-offwhite leading-tight mt-4">
            Three Pillars,{' '}
            <span className="italic text-gradient-gold">One Vision</span>
          </h2>
        </motion.div>

        {/* Pillars — 3 equal columns, divided by 1px lines */}
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {PILLARS.map(({ num, title, subtitle, href }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <Link
                href={href}
                className="group flex flex-col items-center text-center px-8 md:px-10 py-10 md:py-12 hover:bg-surface/50 transition-colors duration-300 h-full"
              >
                {/* Number */}
                <span className="font-mono text-xs text-gold/40 tracking-[0.4em] mb-6">
                  {num}
                </span>

                {/* Gold accent line — expands on hover */}
                <div className="w-8 h-px bg-gold/30 group-hover:w-16 group-hover:bg-gold transition-all duration-500 mb-8" />

                {/* Title */}
                <h3 className="font-serif text-3xl md:text-4xl text-offwhite italic leading-tight mb-4 group-hover:text-gold transition-colors duration-300">
                  {title}
                </h3>

                {/* Tagline */}
                <p className="font-mono text-xs text-gold/60 tracking-widest uppercase mb-6 leading-relaxed">
                  {subtitle}
                </p>

                {/* Description */}
                <p className="text-muted text-sm leading-relaxed max-w-[260px] flex-1">
                  {PILLAR_DESC[title]}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 mt-8 text-muted text-xs tracking-widest uppercase group-hover:text-gold group-hover:gap-3 transition-all duration-300">
                  <span>Explore</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
