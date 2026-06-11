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
            <h2 className="font-serif text-5xl md:text-7xl text-navy leading-[1.05] tracking-tight">
              Key <span className="italic text-gradient-gold">Benefits</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {service.benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                variants={fadeUp}
                className="relative p-6 md:p-8 border border-gray-200 bg-white hover:border-gold/50 transition-all duration-300 group overflow-hidden"
              >
                <span className="font-mono text-5xl md:text-6xl font-bold text-gold/[0.07] absolute top-4 right-4 leading-none select-none pointer-events-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative z-10">
                  <div className="gold-line mb-5 group-hover:w-full" style={{ transition: 'width 500ms ease' }} />
                  <h3 className="font-serif font-normal text-xl md:text-2xl text-navy leading-snug mb-3 group-hover:text-gold transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-[1.85] tracking-[0.01em]">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
