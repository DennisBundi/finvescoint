'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SERVICES_DATA } from '@/lib/services-data'
import SectionLabel from '@/components/shared/SectionLabel'

export default function ServicesGridSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section ref={ref} className="min-h-screen flex flex-col justify-center py-20 bg-black snap-start snap-always">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 w-full">

        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel text="Our Services" />
          <h2 className="font-serif text-4xl md:text-6xl text-offwhite leading-tight mt-4">
            Financial Expertise,{' '}
            <span className="italic text-gradient-gold">Six Verticals</span>
          </h2>
        </motion.div>

        {/* 2×3 grid separated by 1px lines */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border border border-border">
          {SERVICES_DATA.map(({ slug, shortTitle, tagline }, i) => (
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`${
                i >= 3 ? 'sm:border-t sm:border-border' : ''
              }`}
            >
              <Link
                href={`/services/${slug}`}
                className="group flex flex-col p-8 md:p-10 hover:bg-surface/50 transition-colors duration-300 h-full min-h-[220px]"
              >
                <span className="font-mono text-xs text-gold/40 tracking-[0.4em] mb-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="w-6 h-px bg-gold/30 group-hover:w-12 group-hover:bg-gold transition-all duration-500 mb-6" />
                <h3 className="font-serif text-xl md:text-2xl text-offwhite italic mb-3 group-hover:text-gold transition-colors duration-300 flex-1">
                  {shortTitle}
                </h3>
                <p className="text-muted text-xs leading-relaxed mb-6 max-w-[240px]">{tagline}</p>
                <div className="flex items-center gap-2 text-muted text-xs tracking-widest uppercase group-hover:text-gold group-hover:gap-3 transition-all duration-300">
                  <span>Explore</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all services link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-muted text-xs tracking-widest uppercase hover:text-gold transition-colors duration-300"
          >
            View All Services
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
