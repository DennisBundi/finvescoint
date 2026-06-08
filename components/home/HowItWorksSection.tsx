'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionLabel from '@/components/shared/SectionLabel'

const STEPS = [
  {
    num: '01',
    title: 'Book a Strategy Session',
    desc: 'We begin with a confidential consultation to understand your goals, challenges, and the gap between where you are and where you need to be.',
  },
  {
    num: '02',
    title: 'Receive Your Roadmap',
    desc: 'We design a custom strategy built specifically around your business reality — no generic templates, no borrowed playbooks.',
  },
  {
    num: '03',
    title: 'Execute with Confidence',
    desc: 'We work alongside your team to implement, monitor, and drive results — staying engaged until outcomes are realised.',
  },
]

export default function HowItWorksSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="min-h-screen flex flex-col justify-center py-20 bg-black snap-start snap-always">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 w-full">

        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel text="How It Works" />
          <h2 className="font-serif text-4xl md:text-6xl text-offwhite leading-tight mt-4">
            Three Steps to{' '}
            <span className="italic text-gradient-gold">Transformation</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-0 md:divide-x divide-border">
          {STEPS.map(({ num, title, desc }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group flex flex-col px-8 md:px-12 py-10 border border-border md:border-0 hover:bg-surface/40 transition-colors duration-300"
            >
              <span className="font-mono text-xs text-gold/40 tracking-[0.4em] block mb-6">{num}</span>
              <div className="w-8 h-px bg-gold/30 group-hover:w-16 group-hover:bg-gold transition-all duration-500 mb-8" />
              <h3 className="font-serif text-2xl md:text-3xl text-offwhite italic leading-tight mb-4 group-hover:text-gold transition-colors duration-300">
                {title}
              </h3>
              <p className="text-muted text-sm leading-relaxed flex-1">{desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
