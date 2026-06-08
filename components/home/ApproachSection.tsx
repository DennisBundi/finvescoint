'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { staggerContainer, fadeUp } from '@/lib/animations'
import SectionLabel from '@/components/shared/SectionLabel'
import { APPROACH_STEPS } from '@/lib/constants'

export default function ApproachSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-28 md:py-52 bg-navy snap-start">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-12 md:mb-20">
          <SectionLabel text="How We Work" />
          <h2 className="font-serif text-4xl md:text-6xl text-offwhite leading-tight">
            A Process Built<br />
            <span className="italic text-gradient-gold">for Precision</span>
          </h2>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 md:grid-cols-5 gap-0 border border-border border-b-0 sm:border-0 sm:border-none">
          {APPROACH_STEPS.map((step, i) => (
            <motion.div key={step.num} variants={fadeUp}
              className="relative p-5 md:p-8 border-b md:border-b-0 md:border-r border-border last:border-0 group">
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
