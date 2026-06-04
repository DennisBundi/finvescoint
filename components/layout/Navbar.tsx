'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from '@/components/shared/MagneticButton'

const links = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact',  label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-navy/90 backdrop-blur-xl border-b border-border/50 py-3' : 'bg-transparent py-5'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-8 h-8 border border-gold rotate-45 group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center">
              <div className="w-full h-full bg-gold/10 group-hover:bg-gold/20 transition-colors" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-lg text-offwhite tracking-widest uppercase">Finvesco</span>
              <span className="font-sans text-[9px] text-gold tracking-[0.35em] uppercase">International</span>
            </div>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={pathname === href ? 'page' : undefined}
                  className={`relative text-sm tracking-widest uppercase font-sans transition-colors duration-300 group ${
                    pathname === href ? 'text-gold' : 'text-muted hover:text-offwhite'
                  }`}
                >
                  {label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                    pathname === href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              </li>
            ))}
          </ul>

          <MagneticButton className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-gold text-gold text-sm tracking-widest uppercase hover:bg-gold hover:text-black transition-all duration-300"
            >
              Engage Us
            </Link>
          </MagneticButton>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}   className="block w-6 h-px bg-offwhite origin-center" />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }}                          className="block w-6 h-px bg-offwhite" />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} className="block w-6 h-px bg-offwhite origin-center" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center"
            initial={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at top right)' }}
            exit={{    opacity: 0, clipPath: 'circle(0% at top right)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="flex flex-col items-center gap-8">
              {links.map(({ href, label }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-5xl text-offwhite hover:text-gold transition-colors"
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
