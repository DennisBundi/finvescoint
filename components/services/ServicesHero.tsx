'use client'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import SectionLabel from '@/components/shared/SectionLabel'

const SERVICE_TAGS = [
  'Fractional CFO', 'Consulting', 'Acquisitions',
  'Forecasting', 'Leaseback', 'Reporting',
]

export default function ServicesHero() {
  return (
    <section className="relative min-h-[75vh] flex items-center overflow-hidden mesh-bg">
      <div className="relative z-10 w-full max-w-[1200px] mx-auto pt-32 pb-24" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.div variants={fadeUp}>
            <SectionLabel text="What We Do" />
          </motion.div>

          <motion.h1 variants={fadeUp} className="font-serif text-[2.75rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-[6.5vw] md:leading-[0.9] text-offwhite mb-8 max-w-4xl">
            Precision Financial<br />
            <span className="italic text-gradient-gold">Services</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-muted text-base md:text-xl font-sans font-light max-w-2xl leading-relaxed mb-12">
            From fractional CFO leadership to comprehensive financial reporting — our services
            are purpose-built for businesses that demand expertise, accountability, and
            measurable outcomes.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            {SERVICE_TAGS.map((s) => (
              <span
                key={s}
                className="font-mono text-xs text-gold/60 tracking-widest uppercase border border-border px-4 py-2"
              >
                {s}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
