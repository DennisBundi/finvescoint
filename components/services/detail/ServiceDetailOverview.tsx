'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { staggerContainer, fadeUp, slideLeft } from '@/lib/animations'
import SectionLabel from '@/components/shared/SectionLabel'
import MagneticButton from '@/components/shared/MagneticButton'
import type { ServiceData } from '@/lib/services-data'

interface Props {
  service: ServiceData
}

export default function ServiceDetailOverview({ service }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-24 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">

          {/* Sticky label column */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="md:sticky md:top-28"
          >
            <SectionLabel text="Overview" />
            <h2 className="font-serif text-4xl md:text-5xl text-navy leading-[1.1] tracking-tight mb-6">
              What We<br />
              <span className="italic text-gradient-gold">Deliver</span>
            </h2>
            <p className="text-gray-500 text-base leading-loose mb-8">
              {service.tagline}
            </p>
            <MagneticButton>
              <Link
                href="/contact"
                className="btn-dark"
              >
                Enquire Now
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Paragraphs column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="space-y-6"
          >
            {service.overviewParagraphs.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className={`${
                  i === 0
                    ? 'font-serif text-xl md:text-2xl text-navy leading-[1.6] font-normal'
                    : 'text-gray-400 text-base md:text-[17px] leading-[1.85] tracking-[0.01em]'
                }`}
              >
                {para}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
