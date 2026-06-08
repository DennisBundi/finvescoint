'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { staggerContainer, fadeUp } from '@/lib/animations'
import SectionLabel from '@/components/shared/SectionLabel'

const VALUES = [
  {
    num: '01',
    title: 'Integrity First',
    desc: 'We hold ourselves to the highest ethical standards in every engagement, ensuring transparent counsel that puts client interests foremost — always.',
  },
  {
    num: '02',
    title: 'Strategic Precision',
    desc: 'Every recommendation is backed by rigorous analysis. We diagnose, model, and architect with precision — never guessing with your capital.',
  },
  {
    num: '03',
    title: 'Results Driven',
    desc: 'We measure our success by client outcomes. Strategy without execution is theory — we stay engaged until results materialize and are sustained.',
  },
  {
    num: '04',
    title: 'Partnership Mindset',
    desc: "We embed with our clients' teams rather than advising from the outside. Your challenges become our challenges, and your wins become ours.",
  },
]

export default function AboutValues() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-28 md:py-52 bg-navy">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <motion.div variants={fadeUp} className="mb-14 md:mb-24 text-center">
            <SectionLabel text="What Drives Us" centered />
            <h2 className="font-serif text-4xl md:text-6xl text-offwhite leading-tight">
              Our Core<br />
              <span className="italic text-gradient-gold">Values</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <motion.div
                key={v.num} variants={fadeUp}
                className="p-6 md:p-8 border border-border hover:border-gold/40 transition-colors duration-300 group"
              >
                <span className="font-mono text-xs text-gold/40 tracking-widest block mb-4">{v.num}</span>
                <div className="gold-line mb-5" />
                <h3 className="text-offwhite font-sans font-semibold text-base mb-3 group-hover:text-gold transition-colors duration-300">
                  {v.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
