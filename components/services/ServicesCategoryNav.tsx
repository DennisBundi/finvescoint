'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { usePathname } from 'next/navigation'
import SectionLabel from '@/components/shared/SectionLabel'
import { fadeUp, staggerContainer } from '@/lib/animations'

const CATEGORIES = [
  {
    num: '01',
    title: 'Consulting',
    href: '/services/consulting',
    sub: 'Advisory & Financial Planning',
    desc: 'Strategic intelligence and embedded financial advisory for complex, high-stakes business decisions.',
  },
  {
    num: '02',
    title: 'Investment',
    href: '/services/investment',
    sub: 'Acquisitions & Capital Strategy',
    desc: 'Capital structuring, due diligence, and deal advisory that matches the right instrument to the right opportunity.',
  },
  {
    num: '03',
    title: 'Branding',
    href: '/services/branding',
    sub: 'Export, Packaging & Advisory',
    desc: 'Export planning, brand architecture, and packaging that positions your product for international markets.',
  },
]

export default function ServicesCategoryNav() {
  const pathname = usePathname()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-black border-t border-b border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <SectionLabel text="Our Practice Areas" />
          <h2 className="font-serif text-4xl md:text-5xl text-offwhite leading-tight mt-2">
            Three disciplines,{' '}
            <span className="italic text-gradient-gold">one firm</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {CATEGORIES.map((cat) => {
            const active = pathname === cat.href
            return (
              <motion.div
                key={cat.href}
                variants={fadeUp}
                className={`group flex flex-col border transition-colors duration-300 p-8 md:p-10 ${
                  active
                    ? 'border-gold bg-gold/5'
                    : 'border-border bg-white/[0.02] hover:border-gold/50'
                }`}
              >
                <span className="font-mono text-xs text-gold/40 tracking-[0.4em] mb-6">{cat.num}</span>

                <div className={`h-px mb-8 transition-all duration-500 ${
                  active
                    ? 'w-full bg-gold'
                    : 'w-8 bg-gold/30 group-hover:w-full group-hover:bg-gold'
                }`} />

                <h3 className={`font-serif text-3xl md:text-4xl italic leading-tight mb-3 transition-colors duration-300 ${
                  active ? 'text-gold' : 'text-offwhite group-hover:text-gold'
                }`}>
                  {cat.title}
                </h3>

                <p className="font-mono text-xs text-gold/60 tracking-widest uppercase mb-6 leading-relaxed">
                  {cat.sub}
                </p>

                <p className="text-muted text-sm leading-relaxed flex-1 mb-10">
                  {cat.desc}
                </p>

                <Link
                  href={cat.href}
                  className={`group/btn inline-flex items-center gap-3 border px-6 py-3 text-xs font-mono tracking-widest uppercase w-fit transition-all duration-300 ${
                    active
                      ? 'border-gold text-gold'
                      : 'border-border text-muted hover:border-gold hover:text-gold'
                  }`}
                >
                  View More
                  <svg
                    width="14" height="14" viewBox="0 0 16 16" fill="none"
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
