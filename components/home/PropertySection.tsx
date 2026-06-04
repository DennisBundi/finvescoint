'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { staggerContainer, fadeUp, slideLeft } from '@/lib/animations'
import SectionLabel from '@/components/shared/SectionLabel'
import { PROPERTIES } from '@/lib/constants'

export default function PropertySection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-32 bg-surface/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div variants={slideLeft} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <SectionLabel text="Real Assets" />
            <h2 className="font-serif text-5xl text-offwhite leading-tight mb-6">
              Property<br />
              <span className="italic text-gradient-gold">Investment</span>
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              Finvesco International actively invests in and manages real estate assets
              across Kenya — from residential to commercial properties. Our portfolio
              strategy prioritises long-term capital appreciation and strategic positioning
              in high-growth Kenyan markets.
            </p>
            <div className="flex items-center gap-3 text-gold text-sm tracking-widest uppercase group cursor-pointer">
              <span>Explore Investment Arm</span>
              <svg className="group-hover:translate-x-1 transition-transform duration-300" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'show' : 'hidden'} className="space-y-4">
            {PROPERTIES.map((p) => (
              <motion.div key={p.type} variants={fadeUp}
                className="flex items-center justify-between p-5 border border-border bg-surface/50 hover:border-gold/40 transition-colors duration-300">
                <div>
                  <p className="text-offwhite font-sans font-medium">{p.type}</p>
                  <p className="text-muted text-sm mt-0.5">{p.location}</p>
                </div>
                <span className={`text-xs px-3 py-1 border tracking-widest uppercase ${
                  p.status === 'Active' ? 'border-gold/40 text-gold' : 'border-muted/40 text-muted'
                }`}>
                  {p.status}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
