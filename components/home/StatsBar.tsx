'use client'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { STATS } from '@/lib/constants'

export default function StatsBar() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section ref={ref} className="relative py-20 border-y border-border/50 bg-surface/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, suffix, label }) => (
            <motion.div key={label} variants={fadeUp} className="text-center group">
              <div className="font-mono text-4xl md:text-5xl text-gold mb-2">
                {inView ? <CountUp end={value} duration={2.5} suffix={suffix} /> : <span>0{suffix}</span>}
              </div>
              <div className="text-muted text-sm tracking-widest uppercase">{label}</div>
              <div className="gold-line mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
