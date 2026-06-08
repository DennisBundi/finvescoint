'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { staggerContainer, fadeUp } from '@/lib/animations'
import SectionLabel from '@/components/shared/SectionLabel'

const PILLARS = [
  {
    label: 'Our Expertise',
    body: 'At Finvesco, we specialize in providing accounting and financial services for small businesses and startups. Our team has extensive experience working with entrepreneurs — helping them navigate the financial challenges of starting, acquiring, and managing a business day to day.',
  },
  {
    label: 'Our Service',
    body: 'We offer a full range of financial services including business acquisition due diligence, financial forecasts and proforma financials, sales leaseback negotiations, financial reporting, and strategic advisory. We work closely with each client to provide customised solutions that meet their specific needs.',
  },
  {
    label: 'Our Approach',
    body: 'We provide proactive, responsive service — always available to answer questions and give guidance. Beyond advice, we offer ongoing operational support, helping clients stay on top of their finances and make informed, confident decisions at every stage of growth.',
  },
]

export default function AboutMission() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-28 md:py-52 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <motion.div variants={fadeUp} className="text-center mb-16 md:mb-24">
            <SectionLabel text="Who We Are" centered />
            <h2 className="font-serif text-4xl md:text-6xl text-navy leading-tight">
              About <span className="italic text-gradient-gold">Finvesco</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto mt-6 leading-relaxed">
              We empower small businesses and startups with expert accounting and financial services.
              With deep experience supporting entrepreneurs, we guide you through the financial
              complexities of starting, acquiring, and managing your business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {PILLARS.map((item) => (
              <motion.div key={item.label} variants={fadeUp} className="group">
                <div className="gold-line mb-6 group-hover:w-full" style={{ transition: 'width 500ms ease' }} />
                <h3 className="font-serif text-2xl md:text-3xl text-navy mb-4">{item.label}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
