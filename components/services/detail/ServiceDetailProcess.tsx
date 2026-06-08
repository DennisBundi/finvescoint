'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { staggerContainer, fadeUp } from '@/lib/animations'
import SectionLabel from '@/components/shared/SectionLabel'
import type { ServiceData } from '@/lib/services-data'

interface Props {
  service: ServiceData
}

export default function ServiceDetailProcess({ service }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section ref={ref} className="py-24 md:py-40 bg-navy">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <motion.div variants={fadeUp} className="mb-14 md:mb-20">
            <SectionLabel text="Our Process" />
            <h2 className="font-serif text-4xl md:text-6xl text-offwhite leading-tight">
              How We<br />
              <span className="italic text-gradient-gold">Deliver</span>
            </h2>
          </motion.div>

          {/* Horizontal step cards — same visual as ApproachSection */}
          <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-0 border border-border border-b-0 sm:border-0">
            {service.process.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                className="relative p-5 md:p-8 border-b md:border-b-0 md:border-r border-border last:border-0 group"
              >
                {i < service.process.length - 1 && (
                  <div className="hidden md:block absolute -right-1.5 top-8 w-3 h-3 rounded-full border-2 border-gold bg-navy z-10" />
                )}
                <span className="font-mono text-xs text-gold/40 tracking-widest block mb-4">
                  {step.num}
                </span>
                <div className="gold-line mb-4" />
                <h3 className="text-offwhite font-sans font-semibold text-base mb-3 group-hover:text-gold transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
