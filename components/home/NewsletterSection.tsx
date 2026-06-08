'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeUp, slideLeft, slideRight, staggerContainer } from '@/lib/animations'
import SectionLabel from '@/components/shared/SectionLabel'

export default function NewsletterSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const [email, setEmail]       = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section ref={ref} className="py-24 md:py-32 bg-navy border-t border-border">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid md:grid-cols-2 gap-12 md:gap-24 items-center"
        >
          {/* Left */}
          <motion.div variants={slideLeft}>
            <SectionLabel text="Stay Informed" />
            <h2 className="font-serif text-3xl md:text-4xl text-offwhite leading-tight mt-4 mb-4">
              Market Insights,{' '}
              <span className="italic text-gradient-gold">Delivered Monthly</span>
            </h2>
            <p className="text-muted text-sm leading-relaxed max-w-sm">
              Strategic intelligence, market analysis, and financial insights from the Finvesco team — once a month, no noise.
            </p>
          </motion.div>

          {/* Right */}
          <motion.div variants={slideRight}>
            {submitted ? (
              <div className="flex flex-col gap-4 py-4">
                <div className="gold-line" />
                <p className="font-serif text-2xl text-offwhite">You&apos;re on the list.</p>
                <p className="text-muted text-sm">Look out for our next dispatch.</p>
                <button
                  onClick={() => { setSubmitted(false); setEmail('') }}
                  className="text-gold text-xs tracking-widest uppercase hover:text-gold-light transition-colors duration-300 self-start"
                >
                  Subscribe another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-surface border border-border text-offwhite placeholder:text-muted/50 text-sm px-4 py-3.5 focus:border-gold focus:outline-none transition-colors duration-300"
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
