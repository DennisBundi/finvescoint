'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { staggerContainer, fadeUp } from '@/lib/animations'
import SectionLabel from '@/components/shared/SectionLabel'
import { EXPORT_STEPS } from '@/lib/constants'

export default function ExportSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center mb-20" variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <SectionLabel text="Portfolio Company" centered />
          <h2 className="font-serif text-5xl md:text-6xl text-offwhite leading-tight">
            Product Export &<br />
            <span className="italic text-gradient-gold">Brand Packaging</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto mt-6 leading-relaxed">
            Through our investee company, Finvesco International is building bridges
            between African product excellence and global markets — from sourcing
            and packaging to branded export marketing.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {EXPORT_STEPS.map((step) => (
            <motion.div key={step.num} variants={fadeUp}
              className="relative p-6 border border-border bg-surface/30 hover:border-gold/40 transition-all duration-300 group">
              <span className="font-mono text-xs text-gold/40 tracking-widest">{step.num}</span>
              <div className="gold-line my-4 group-hover:w-full" style={{ transition: 'width 500ms ease' }} />
              <h3 className="text-offwhite font-sans font-medium mb-3">{step.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
