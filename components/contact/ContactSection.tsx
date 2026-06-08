'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { slideLeft, slideRight, staggerContainer } from '@/lib/animations'
import SectionLabel from '@/components/shared/SectionLabel'

const SERVICES = [
  'Fractional CFO Services',
  'Consulting Services',
  'Business Acquisitions and Due Diligence',
  'Financial Forecasts and Pro Forma Financials',
  'Sales and Leaseback Negotiations',
  'Financial Reporting',
  'Operational Financial Services',
  'Consultative and Advisory Services',
]

const CONTACT_INFO = [
  { label: 'Email', value: 'hello@finvescoint.com' },
  { label: 'Phone', value: '+254 700 000 000' },
  { label: 'Location', value: 'Nairobi, Kenya' },
  { label: 'Response Time', value: 'Within 24 hours' },
]

const inputClass =
  'w-full bg-surface border border-border text-offwhite placeholder:text-muted/50 text-sm px-4 py-3.5 focus:border-gold focus:outline-none transition-colors duration-300'

export default function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section ref={ref} className="min-h-screen py-32 md:py-52 bg-navy">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid md:grid-cols-2 gap-16 md:gap-24 items-start"
        >
          {/* Left — info */}
          <motion.div variants={slideLeft}>
            <SectionLabel text="Get In Touch" />
            <h1 className="font-serif text-[2.75rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-[6.5vw] md:leading-[0.9] text-offwhite mb-6">
              Let&apos;s Build<br />
              <span className="italic text-gradient-gold">Together</span>
            </h1>
            <p className="text-muted text-base md:text-xl font-sans font-light leading-relaxed mb-14 max-w-sm">
              Let Finvesco International know how we can be of service.
              Our team responds to every enquiry within 24 hours.
            </p>

            <div className="space-y-8">
              {CONTACT_INFO.map((c) => (
                <div key={c.label}>
                  <span className="font-mono text-xs text-gold/60 tracking-widest uppercase block mb-1">
                    {c.label}
                  </span>
                  <div className="gold-line mb-2" />
                  <span className="text-offwhite text-sm">{c.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div variants={slideRight}>
            {submitted ? (
              <div className="flex flex-col items-start gap-6 py-16">
                <div className="gold-line" />
                <h3 className="font-serif text-3xl text-offwhite">Message Received</h3>
                <p className="text-muted leading-relaxed max-w-sm">
                  Thank you for reaching out. A member of our team will be in touch within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-gold text-sm tracking-widest uppercase hover:text-gold-light transition-colors duration-300"
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-mono text-xs text-gold/60 tracking-widest uppercase block mb-2">
                    Full Name
                  </label>
                  <input
                    type="text" name="name" required
                    placeholder="John Smith"
                    value={form.name} onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono text-xs text-gold/60 tracking-widest uppercase block mb-2">
                      Email
                    </label>
                    <input
                      type="email" name="email" required
                      placeholder="johnsmith@gmail.com"
                      value={form.email} onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-gold/60 tracking-widest uppercase block mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel" name="phone"
                      placeholder="Phone number"
                      value={form.phone} onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-xs text-gold/60 tracking-widest uppercase block mb-2">
                    Service Required
                  </label>
                  <div className="relative">
                    <select
                      name="service" required
                      value={form.service} onChange={handleChange}
                      className={`${inputClass} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>Select the service you need</option>
                      {SERVICES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold/60"
                      width="14" height="14" viewBox="0 0 16 16" fill="none"
                    >
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                <div>
                  <label className="font-mono text-xs text-gold/60 tracking-widest uppercase block mb-2">
                    Additional Message
                  </label>
                  <textarea
                    name="message" rows={5}
                    placeholder="Type your message here..."
                    value={form.message} onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary mt-2"
                >
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
