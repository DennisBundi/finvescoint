'use client'
import { motion } from 'framer-motion'
import { charReveal, staggerContainer } from '@/lib/animations'

interface Props {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export default function AnimatedText({ text, className = '', delay = 0, as: Tag = 'h2' }: Props) {
  const words = text.split(' ')
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      className={`overflow-hidden ${className}`}
    >
      <Tag className="flex flex-wrap gap-x-[0.25em]">
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              variants={charReveal}
              className="inline-block"
              transition={{ delay: delay + i * 0.05 }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  )
}
