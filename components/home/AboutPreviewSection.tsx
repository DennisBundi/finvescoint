'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeUp, slideLeft, slideRight, staggerContainer } from '@/lib/animations'
import MagneticButton from '@/components/shared/MagneticButton'
import SectionLabel from '@/components/shared/SectionLabel'

const FACTS = [
  { value: '200+',  label: 'Clients Served'   },
  { value: '$50M+', label: 'Assets Advised'   },
  { value: '12+',   label: 'Industries'        },
  { value: '98%',   label: 'Client Retention' },
]

export default function AboutPreviewSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="min-h-screen flex flex-col justify-center py-20 bg-navy snap-start snap-always">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid md:grid-cols-2 gap-16 md:gap-24 items-center"
        >
          {/* Left — text */}
          <motion.div variants={slideLeft}>
            <SectionLabel text="Who We Are" />
            <h2 className="font-serif text-4xl md:text-6xl text-offwhite leading-tight mt-4 mb-8">
              Built to Empower<br />
              <span className="italic text-gradient-gold">Ambitious Business</span>
            </h2>
            <p className="text-muted text-base md:text-lg font-sans font-light leading-relaxed mb-5 max-w-lg">
              Finvesco International is a premier financial advisory and investment firm headquartered in Kenya, serving ambitious businesses across Africa and beyond.
            </p>
            <p className="text-muted text-base font-sans font-light leading-relaxed mb-12 max-w-lg">
              We combine deep financial expertise with strategic precision — delivering the clarity, capital, and execution support that ambitious leaders need to grow with confidence.
            </p>
            <MagneticButton className="inline-block">
              <Link href="/about" className="btn-secondary">
                Our Story
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Right — stats grid */}
          <motion.div variants={slideRight} className="grid grid-cols-2 gap-4 md:gap-6">
            {FACTS.map((f) => (
              <motion.div
                key={f.label}
                variants={fadeUp}
                className="border border-border p-6 md:p-8 hover:border-gold/40 transition-colors duration-300 group"
              >
                <div className="gold-line mb-4" />
                <span className="font-serif text-3xl md:text-5xl text-offwhite block mb-2 group-hover:text-gold transition-colors duration-300">
                  {f.value}
                </span>
                <span className="font-mono text-xs text-muted tracking-widest uppercase">{f.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
