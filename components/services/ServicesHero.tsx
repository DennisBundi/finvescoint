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
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#0A0F1E',
      }}
    >
      {/* Overlays — match home/about pattern */}
      <div className="absolute inset-0 bg-navy/85 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-transparent to-navy/90 pointer-events-none" />

      {/* Pulsing gold orb */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-gold/10 blur-3xl pointer-events-none"
      />

      <div
        className="relative z-10 w-full max-w-[1200px] mx-auto pt-28 pb-20"
        style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
      >
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.div variants={fadeUp}>
            <SectionLabel text="What We Do" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-serif text-[2.75rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-[6.5vw] md:leading-[0.9] text-offwhite mb-8 max-w-4xl"
          >
            Precision Financial<br />
            <span className="italic text-gradient-gold">Services</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-muted text-base md:text-xl font-sans font-light max-w-2xl leading-relaxed mb-12"
          >
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

      {/* Scroll indicator — matches home hero */}
      <motion.div
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-muted text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 md:h-12 bg-gradient-to-b from-gold/50 to-transparent" />
      </motion.div>
    </section>
  )
}
