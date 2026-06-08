'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { staggerContainer, fadeUp } from '@/lib/animations'
import SectionLabel from '@/components/shared/SectionLabel'
import type { ServiceData } from '@/lib/services-data'

interface Props {
  service: ServiceData
}

export default function ServiceDetailBenefits({ service }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-24 md:py-40 bg-[#F4F2EE]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <motion.div variants={fadeUp} className="text-center mb-14 md:mb-20">
            <SectionLabel text="Why Choose Us" centered />
            <h2 className="font-serif text-4xl md:text-6xl text-navy leading-tight">
              Key <span className="italic text-gradient-gold">Benefits</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {service.benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                variants={fadeUp}
                className="relative p-6 md:p-8 border border-gray-200 bg-white hover:border-gold/50 transition-all duration-300 group"
              >
                <span className="font-mono text-xs text-gold/60 tracking-widest block mb-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="gold-line mb-5 group-hover:w-full" style={{ transition: 'width 500ms ease' }} />
                <h3 className="text-navy font-sans font-semibold text-base mb-3 group-hover:text-gold transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
