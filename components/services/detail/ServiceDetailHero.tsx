'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeUp, staggerContainer } from '@/lib/animations'
import type { ServiceData } from '@/lib/services-data'

interface Props {
  service: ServiceData
}

export default function ServiceDetailHero({ service }: Props) {
  return (
    <section
      className="relative min-h-[80vh] flex items-end overflow-hidden"
      style={{
        backgroundImage: `url('${service.heroImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#0A0F1E',
      }}
    >
      <div className="absolute inset-0 bg-navy/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-navy/60 to-navy/30 pointer-events-none" />

      <div
        className="relative z-10 w-full max-w-[1200px] mx-auto pb-16 md:pb-24"
        style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
      >
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          {/* Breadcrumb */}
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-8 text-xs font-mono tracking-widest uppercase">
            <Link href="/services" className="text-muted hover:text-gold transition-colors duration-300">
              Services
            </Link>
            <span className="text-border">/</span>
            <span className="text-gold">{service.shortTitle}</span>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
            <div className="gold-line" />
            <span className="text-gold text-xs tracking-[0.4em] uppercase font-mono">
              {service.tagline}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-serif text-4xl sm:text-5xl md:text-7xl text-offwhite leading-[0.9] max-w-4xl"
          >
            {service.title.includes('&') || service.title.includes('and') ? (
              service.title
            ) : (
              <>
                {service.title.split(' ').slice(0, -1).join(' ')}<br />
                <span className="italic text-gradient-gold">
                  {service.title.split(' ').slice(-1)[0]}
                </span>
              </>
            )}
          </motion.h1>
        </motion.div>
      </div>
    </section>
  )
}
