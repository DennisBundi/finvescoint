'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { staggerContainer, fadeUp } from '@/lib/animations'
import SectionLabel from '@/components/shared/SectionLabel'
import type { ServiceData } from '@/lib/services-data'

interface Props {
  related: ServiceData[]
}

export default function RelatedServices({ related }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  if (related.length === 0) return null

  return (
    <section ref={ref} className="py-24 md:py-40 bg-navy">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <motion.div variants={fadeUp} className="mb-12 md:mb-16">
            <SectionLabel text="Explore More" />
            <h2 className="font-serif text-5xl md:text-7xl text-offwhite leading-[1.05] tracking-tight">
              Related <span className="italic text-gradient-gold">Services</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {related.map((service) => (
              <motion.div key={service.slug} variants={fadeUp}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex flex-col h-full p-8 md:p-12 border border-border hover:border-gold/50 transition-all duration-300 relative overflow-hidden"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      backgroundImage: `url('${service.heroImage}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div className="absolute inset-0 bg-navy/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="gold-line mb-8" />
                    <h3 className="font-serif font-normal text-3xl md:text-4xl text-offwhite leading-snug mb-4 group-hover:text-gold transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted text-base leading-[1.85] tracking-[0.01em] mb-10">
                      {service.tagline}
                    </p>
                    <div className="flex items-center gap-2 text-gold text-xs tracking-[0.3em] uppercase group-hover:gap-4 transition-all duration-300">
                      <span>View Service</span>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
