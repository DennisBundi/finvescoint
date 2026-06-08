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
            <h2 className="font-serif text-3xl md:text-4xl text-navy leading-tight mb-6">
              What We<br />
              <span className="italic text-gradient-gold">Deliver</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              {service.tagline}
            </p>
            <MagneticButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-navy text-offwhite text-sm tracking-widest uppercase font-medium hover:bg-gold hover:text-black transition-all duration-300"
                style={{ height: '48px', paddingLeft: '28px', paddingRight: '28px' }}
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
                className={`leading-relaxed ${
                  i === 0
                    ? 'text-navy text-lg md:text-xl font-medium'
                    : 'text-gray-600 text-base'
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
