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
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Pure CSS entrance — no Framer Motion initial/animate that mismatches SSR */}
      <nav className={`nav-enter fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-navy/90 backdrop-blur-xl border-b border-border/50 py-3'
          : 'bg-transparent py-4 md:py-5'
      }`}>
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex flex-col leading-none">
              <span className="font-serif text-base md:text-lg text-offwhite tracking-widest uppercase">FinVesco</span>
              <span className="font-sans text-[8px] md:text-[9px] text-gold tracking-[0.35em] uppercase">International</span>
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
              className="btn-nav"
            >
              Engage Us
            </Link>
          </MagneticButton>

          <button
            className="md:hidden flex flex-col justify-center gap-[5px] p-2 -mr-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}   transition={{ duration: 0.25 }} className="block w-5 h-px bg-offwhite origin-center" />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }}                          transition={{ duration: 0.25 }} className="block w-5 h-px bg-offwhite" />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} transition={{ duration: 0.25 }} className="block w-5 h-px bg-offwhite origin-center" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/96 backdrop-blur-2xl flex flex-col items-center justify-center"
            initial={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at top right)' }}
            exit={{    opacity: 0, clipPath: 'circle(0% at top right)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="flex flex-col items-center gap-10">
              {links.map(({ href, label }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{    opacity: 0, y: 24 }}
                  transition={{ delay: i * 0.07 + 0.15 }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`font-serif text-4xl sm:text-5xl hover:text-gold transition-colors duration-300 ${
                      pathname === href ? 'text-gold' : 'text-offwhite'
                    }`}
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-12">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-2 h-[46px] px-6 border border-gold text-gold text-xs tracking-widest uppercase hover:bg-gold hover:text-black transition-all duration-300"
              >
                Engage Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
