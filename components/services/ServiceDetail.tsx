'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { staggerContainer, slideLeft, slideRight } from '@/lib/animations'
import SectionLabel from '@/components/shared/SectionLabel'
import MagneticButton from '@/components/shared/MagneticButton'

interface Props {
  slug: string
  num: string
  title: string
  paragraphs: string[]
  imageSrc: string
  imageAlt: string
  reverse?: boolean
  light?: boolean
}

export default function ServiceDetail({
  slug,
  num,
  title,
  paragraphs,
  imageSrc,
  imageAlt,
  reverse = false,
  light = true,
}: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  const bg = light ? 'bg-[#F7F5F0]' : 'bg-white'

  return (
    <article ref={ref} className={`py-24 md:py-40 ${bg}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${
            reverse ? 'md:[&>*:first-child]:order-last' : ''
          }`}
        >
          {/* Text */}
          <motion.div variants={slideLeft} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <span className="font-mono text-xs text-gold/60 tracking-widest block mb-4">{num}</span>
            <SectionLabel text="Service" />
            <h2 className="font-serif text-4xl md:text-5xl text-navy leading-tight mb-3">{title}</h2>
            <div className="w-10 h-px bg-gold mb-8" />
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className={`text-gray-700 text-base leading-[1.85] ${
                  i < paragraphs.length - 1 ? 'mb-5' : 'mb-8'
                }`}
              >
                {p}
              </p>
            ))}

            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton>
                <Link
                  href={`/services/${slug}`}
                  className="btn-dark"
                >
                  View Details
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </MagneticButton>

              <Link
                href="/contact"
                className="text-gold text-xs tracking-widest uppercase hover:text-navy transition-colors duration-300 flex items-center gap-2 group"
              >
                Enquire
                <svg
                  className="group-hover:translate-x-1 transition-transform duration-300"
                  width="12" height="12" viewBox="0 0 16 16" fill="none"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-navy/10" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-transparent" />
          </motion.div>
        </div>
      </div>
    </article>
  )
}
