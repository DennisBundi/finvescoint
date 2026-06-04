'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { staggerContainer, fadeUp } from '@/lib/animations'
import SectionLabel from '@/components/shared/SectionLabel'
import { APPROACH_STEPS } from '@/lib/constants'

export default function ApproachSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-32 bg-surface/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <SectionLabel text="How We Work" />
          <h2 className="font-serif text-5xl md:text-6xl text-offwhite leading-tight">
            A Process Built<br />
            <span className="italic text-gradient-gold">for Precision</span>
          </h2>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 md:grid-cols-5 gap-0">
          {APPROACH_STEPS.map((step, i) => (
            <motion.div key={step.num} variants={fadeUp}
              className="relative p-6 md:p-8 border-b md:border-b-0 md:border-r border-border last:border-0 group">
              {i < APPROACH_STEPS.length - 1 && (
                <div className="hidden md:block absolute -right-1.5 top-8 w-3 h-3 rounded-full border-2 border-gold bg-navy z-10" />
              )}
              <span className="font-mono text-xs text-gold/40 tracking-widest block mb-4">{step.num}</span>
              <div className="gold-line mb-4" />
              <h3 className="text-offwhite font-sans font-semibold text-lg mb-3 group-hover:text-gold transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
