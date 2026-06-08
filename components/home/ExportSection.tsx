'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { staggerContainer, fadeUp } from '@/lib/animations'
import SectionLabel from '@/components/shared/SectionLabel'
import { EXPORT_STEPS } from '@/lib/constants'

export default function ExportSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="min-h-screen flex flex-col justify-center py-20 bg-[#F4F2EE] snap-start snap-always">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div className="text-center mb-14 md:mb-24" variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <SectionLabel text="Portfolio Company" centered />
          <h2 className="font-serif text-4xl md:text-6xl text-navy leading-tight">
            Product Export &<br />
            <span className="italic text-gradient-gold">Brand Packaging</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6 leading-relaxed">
            Through our investee company, Finvesco International is building bridges
            between African product excellence and global markets — from sourcing
            and packaging to branded export marketing.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {EXPORT_STEPS.map((step) => (
            <motion.div key={step.num} variants={fadeUp}
              className="relative p-6 border border-gray-200 bg-white hover:border-gold/50 transition-all duration-300 group">
              <span className="font-mono text-xs text-gold/60 tracking-widest">{step.num}</span>
              <div className="gold-line my-4 group-hover:w-full" style={{ transition: 'width 500ms ease' }} />
              <h3 className="text-navy font-sans font-semibold text-base mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
