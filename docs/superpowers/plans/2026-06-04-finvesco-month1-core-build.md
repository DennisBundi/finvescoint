# Finvesco International — Month 1 Core Build Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy the complete Finvesco International homepage (8 sections), Navbar, Footer, and all shared components to a Vercel staging URL.

**Architecture:** Component-first, section-by-section. Scaffold global infrastructure first, then shared components, then Navbar, then each homepage section independently, then Footer. Each task commits working code. The root `app/page.tsx` assembles all sections at the end.

**Tech Stack:** Next.js 14 (App Router, TypeScript), Tailwind CSS, Framer Motion, @studio-freight/lenis, react-countup, react-intersection-observer, Vercel

---

## File Map

| File | Responsibility |
|---|---|
| `next.config.js` | Image formats, CSS optimization |
| `tailwind.config.ts` | Color tokens, fonts, keyframes, animations |
| `app/globals.css` | CSS vars, Google Fonts, scrollbar, cursor, noise texture, utility classes |
| `app/layout.tsx` | Root layout — wraps all pages with Navbar, Footer, Lenis, Cursor, PageTransition |
| `app/page.tsx` | Homepage — assembles all 8 sections in order |
| `lib/animations.ts` | Framer Motion variant library (shared motion language) |
| `lib/constants.ts` | All site content/data (stats, marquee items, properties, steps) |
| `components/layout/LenisProvider.tsx` | Smooth scroll provider (global) |
| `components/layout/Navbar.tsx` | Sticky nav — scroll behaviour, logo, desktop links, mobile overlay |
| `components/layout/Footer.tsx` | Site footer — brand, service links, company links, social |
| `components/shared/CustomCursor.tsx` | Gold dot + ring cursor with spring physics |
| `components/shared/MagneticButton.tsx` | Magnetic hover wrapper for CTA buttons |
| `components/shared/AnimatedText.tsx` | Word-by-word text reveal animation |
| `components/shared/ScrollReveal.tsx` | IntersectionObserver scroll animation wrapper |
| `components/shared/PageTransition.tsx` | Black curtain route transition |
| `components/shared/SectionLabel.tsx` | Gold eyebrow label (line + uppercase text) |
| `components/home/HeroSection.tsx` | Full-viewport hero with parallax, orbs, grid, CTAs |
| `components/home/StatsBar.tsx` | Animated CountUp stats (4 metrics) |
| `components/home/MarqueeSection.tsx` | Infinite scrolling service ticker |
| `components/home/PillarsSection.tsx` | 3 service pillars as horizontal divider rows |
| `components/home/PropertySection.tsx` | 2-col property investment showcase |
| `components/home/ExportSection.tsx` | 4-step product export grid |
| `components/home/ApproachSection.tsx` | 5-step "How We Work" timeline |
| `components/home/CtaSection.tsx` | Final CTA with gold glow |

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `finvesco-international/` (entire project)
- Create: `next.config.js`
- Create: `.env.local`
- Create: `.gitignore`

- [ ] **Step 1: Scaffold the project**

Run in `C:\Users\user\Projects\Finvescoint`:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```
When prompted: answer No to "Would you like to use Turbopack" (use standard webpack for stability).

- [ ] **Step 2: Install dependencies**

```bash
npm install framer-motion @studio-freight/lenis react-intersection-observer react-countup clsx tailwind-merge sharp zod
```

- [ ] **Step 3: Create `.env.local`**

```bash
# Supabase — wired in Month 3
NEXT_PUBLIC_SUPABASE_URL=placeholder
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder
SUPABASE_SERVICE_ROLE_KEY=placeholder

# Resend — wired in Month 3
RESEND_API_KEY=placeholder

# Admin — wired in Month 3
ADMIN_PASSWORD=placeholder

NEXT_PUBLIC_SITE_URL=https://finvescoint.com
```

- [ ] **Step 4: Create `next.config.js`** (replace the default)

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['finvescoint.com'],
  },
  experimental: {
    optimizeCss: true,
  },
}
module.exports = nextConfig
```

- [ ] **Step 5: Verify the project runs**

```bash
npm run dev
```
Expected: Next.js dev server starts at `http://localhost:3000` with no errors.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: scaffold Next.js project with dependencies"
```

---

## Task 2: Tailwind Config + Global Styles

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Replace `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        black:        '#060810',
        navy:         '#0A0F1E',
        surface:      '#0F1628',
        border:       '#1E2A45',
        gold:         '#C9A84C',
        'gold-light': '#E8C97A',
        offwhite:     '#F0F2F8',
        muted:        '#7A8BAA',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
        mono:  ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'marquee':    'marquee 30s linear infinite',
        'marquee2':   'marquee2 30s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '0.9' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 2: Replace `app/globals.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-black:      #060810;
  --color-navy:       #0A0F1E;
  --color-surface:    #0F1628;
  --color-border:     #1E2A45;
  --color-gold:       #C9A84C;
  --color-gold-light: #E8C97A;
  --color-white:      #F0F2F8;
  --color-muted:      #7A8BAA;
  --nav-height:       72px;
}

* { box-sizing: border-box; padding: 0; margin: 0; }

html {
  scroll-behavior: smooth;
}

@media (pointer: fine) {
  html { cursor: none; }
}

body {
  background-color: var(--color-navy);
  color: var(--color-white);
  font-family: 'DM Sans', sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom scrollbar */
::-webkit-scrollbar        { width: 4px; }
::-webkit-scrollbar-track  { background: var(--color-navy); }
::-webkit-scrollbar-thumb  { background: var(--color-gold); border-radius: 2px; }

/* Selection */
::selection { background: var(--color-gold); color: var(--color-black); }

/* Noise texture overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
  opacity: 0.04;
}

/* Utility classes */
.gold-line {
  width: 48px;
  height: 2px;
  background: linear-gradient(90deg, var(--color-gold), transparent);
  flex-shrink: 0;
}

.mesh-bg {
  background:
    radial-gradient(ellipse 80% 60% at 20% 20%, rgba(201,168,76,0.06) 0%, transparent 60%),
    radial-gradient(ellipse 60% 80% at 80% 80%, rgba(10,15,30,0.8) 0%, transparent 60%),
    var(--color-navy);
}

.text-gradient-gold {
  background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-light) 50%, var(--color-gold) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

- [ ] **Step 3: Verify no build errors**

```bash
npm run build
```
Expected: Build completes with no TypeScript or CSS errors.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: configure Tailwind tokens and global styles"
```

---

## Task 3: Content Constants

**Files:**
- Create: `lib/constants.ts`

- [ ] **Step 1: Create `lib/constants.ts`**

```ts
export const SITE_NAME        = 'Finvesco International'
export const SITE_TAGLINE     = 'Where Capital Meets Strategy'
export const SITE_DESCRIPTION = 'Finvesco International is a premier consulting, investment, and branding firm. We partner with ambitious businesses across Kenya and internationally to drive strategic growth and build commanding market positions.'

export const STATS = [
  { value: 200, suffix: '+',  label: 'Clients Served' },
  { value: 50,  suffix: 'M+', label: 'Assets Advised ($)' },
  { value: 12,  suffix: '+',  label: 'Industries' },
  { value: 98,  suffix: '%',  label: 'Client Retention' },
]

export const MARQUEE_ITEMS = [
  'Strategic Consulting', 'Investment Advisory', 'Brand Architecture',
  'Financial Services', 'M&A Due Diligence', 'Fractional CFO',
  'Market Expansion', 'Capital Strategy', 'Product Export',
  'Property Investment', 'Sales Leaseback', 'Business Valuation',
]

export const PILLARS = [
  { num: '01', title: 'Consulting',  subtitle: 'Strategic Intelligence for Complex Decisions', href: '/services/consulting' },
  { num: '02', title: 'Investment',  subtitle: 'Structuring Capital for Maximum Impact',        href: '/services/investment' },
  { num: '03', title: 'Branding',    subtitle: 'Identities That Command Market Attention',      href: '/services/branding' },
]

export const PROPERTIES = [
  { type: 'Residential', location: 'Nairobi, Kenya', status: 'Active'    },
  { type: 'Commercial',  location: 'Nairobi, Kenya', status: 'Active'    },
  { type: 'Mixed Use',   location: 'Kenya',          status: 'Acquiring' },
]

export const EXPORT_STEPS = [
  { num: '01', title: 'Product Sourcing',   desc: 'Identifying and qualifying premium African products for global markets.' },
  { num: '02', title: 'Brand & Packaging',  desc: 'Crafting visual identity and packaging that meets international standards.' },
  { num: '03', title: 'Export Marketing',   desc: 'Market entry strategy and distribution channel development.' },
  { num: '04', title: 'Global Reach',       desc: 'Connecting African producers to international buyers and retailers.' },
]

export const APPROACH_STEPS = [
  { num: '01', title: 'Engage',    desc: 'We begin with a confidential strategy session to understand your position.' },
  { num: '02', title: 'Diagnose',  desc: 'We map the real constraints — financial, operational, and market.' },
  { num: '03', title: 'Architect', desc: 'We design a precise strategy built around your specific goals.' },
  { num: '04', title: 'Execute',   desc: 'We work alongside your team to implement with rigour.' },
  { num: '05', title: 'Sustain',   desc: 'We monitor outcomes and adapt the strategy as markets shift.' },
]
```

- [ ] **Step 2: Commit**

```bash
git add lib/constants.ts
git commit -m "feat: add site content constants"
```

---

## Task 4: Animation Library

**Files:**
- Create: `lib/animations.ts`

- [ ] **Step 1: Create `lib/animations.ts`**

```ts
import { Variants } from 'framer-motion'

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.9, ease: EASE } },
}

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.9, ease: EASE } },
}

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show:   { opacity: 1, scale: 1,   transition: { duration: 0.7, ease: EASE } },
}

export const charReveal: Variants = {
  hidden: { opacity: 0, y: '100%' },
  show:   { opacity: 1, y: 0,      transition: { duration: 0.6, ease: EASE } },
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add lib/animations.ts
git commit -m "feat: add Framer Motion animation variant library"
```

---

## Task 5: Shared Components

**Files:**
- Create: `components/shared/CustomCursor.tsx`
- Create: `components/shared/MagneticButton.tsx`
- Create: `components/shared/AnimatedText.tsx`
- Create: `components/shared/ScrollReveal.tsx`
- Create: `components/shared/PageTransition.tsx`
- Create: `components/shared/SectionLabel.tsx`

- [ ] **Step 1: Create `components/shared/CustomCursor.tsx`**

```tsx
'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX   = useSpring(cursorX, { stiffness: 500, damping: 40 })
  const springY   = useSpring(cursorY, { stiffness: 500, damping: 40 })
  const followerX = useSpring(cursorX, { stiffness: 120, damping: 20 })
  const followerY = useSpring(cursorY, { stiffness: 120, damping: 20 })

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [cursorX, cursorY])

  if (isTouch) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gold pointer-events-none z-[99999] mix-blend-difference"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-gold/40 pointer-events-none z-[99998]"
        style={{ x: followerX, y: followerY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}
```

- [ ] **Step 2: Create `components/shared/MagneticButton.tsx`**

```tsx
'use client'
import { useRef, ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function MagneticButton({ children, className = '', onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width  / 2) * 0.35)
    y.set((e.clientY - rect.top  - rect.height / 2) * 0.35)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 3: Create `components/shared/AnimatedText.tsx`**

```tsx
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
              custom={delay + i * 0.05}
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
```

- [ ] **Step 4: Create `components/shared/ScrollReveal.tsx`**

```tsx
'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeUp } from '@/lib/animations'
import { ReactNode } from 'react'
import { Variants } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  variants?: Variants
}

export default function ScrollReveal({ children, className = '', delay = 0, variants = fadeUp }: Props) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 5: Create `components/shared/PageTransition.tsx`**

```tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div
          className="fixed inset-0 bg-black z-[9998] origin-bottom pointer-events-none"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

- [ ] **Step 6: Create `components/shared/SectionLabel.tsx`**

```tsx
interface Props {
  text: string
  centered?: boolean
}

export default function SectionLabel({ text, centered = false }: Props) {
  return (
    <div className={`flex items-center gap-4 mb-6 ${centered ? 'justify-center' : ''}`}>
      <div className="gold-line" />
      <span className="text-gold text-xs tracking-[0.4em] uppercase font-sans">{text}</span>
      {centered && <div className="gold-line" style={{ transform: 'scaleX(-1)' }} />}
    </div>
  )
}
```

- [ ] **Step 7: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 8: Commit**

```bash
git add components/shared/
git commit -m "feat: add shared components (Cursor, MagneticButton, AnimatedText, ScrollReveal, PageTransition, SectionLabel)"
```

---

## Task 6: Lenis Smooth Scroll Provider

**Files:**
- Create: `components/layout/LenisProvider.tsx`

- [ ] **Step 1: Create `components/layout/LenisProvider.tsx`**

```tsx
'use client'
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return <>{children}</>
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/LenisProvider.tsx
git commit -m "feat: add Lenis smooth scroll provider"
```

---

## Task 7: Root Layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LenisProvider from '@/components/layout/LenisProvider'
import CustomCursor from '@/components/shared/CustomCursor'
import PageTransition from '@/components/shared/PageTransition'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-navy text-offwhite font-sans antialiased">
        <CustomCursor />
        <LenisProvider>
          <Navbar />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
```

Note: Navbar and Footer are stubbed — create them as empty components first so layout compiles, then fill them in Tasks 8 and 15.

- [ ] **Step 2: Create stub Navbar (so layout compiles)**

```tsx
// components/layout/Navbar.tsx
export default function Navbar() {
  return <nav className="fixed top-0 left-0 right-0 z-50 h-[72px]" />
}
```

- [ ] **Step 3: Create stub Footer (so layout compiles)**

```tsx
// components/layout/Footer.tsx
export default function Footer() {
  return <footer />
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx components/layout/Navbar.tsx components/layout/Footer.tsx
git commit -m "feat: add root layout with stubs for Navbar and Footer"
```

---

## Task 8: Navbar

**Files:**
- Modify: `components/layout/Navbar.tsx`

- [ ] **Step 1: Replace `components/layout/Navbar.tsx`**

```tsx
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
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-navy/90 backdrop-blur-xl border-b border-border/50 py-3'
            : 'bg-transparent py-5'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-8 h-8 border border-gold rotate-45 group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center">
              <div className="w-full h-full bg-gold/10 group-hover:bg-gold/20 transition-colors" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-lg text-offwhite tracking-widest uppercase">Finvesco</span>
              <span className="font-sans text-[9px] text-gold tracking-[0.35em] uppercase">International</span>
            </div>
          </Link>

          {/* Desktop links */}
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

          {/* CTA */}
          <MagneticButton className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-gold text-gold text-sm tracking-widest uppercase hover:bg-gold hover:text-black transition-all duration-300"
            >
              Engage Us
            </Link>
          </MagneticButton>

          {/* Mobile hamburger */}
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

      {/* Mobile menu overlay */}
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
                  animate={{ opacity: 1, y: 0  }}
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
```

- [ ] **Step 2: Verify dev server — check Navbar renders**

```bash
npm run dev
```
Open `http://localhost:3000`. Expected: Navbar appears, transparent on load. Scroll — should become frosted. Mobile hamburger works.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: build Navbar with scroll behaviour, mobile overlay, and magnetic CTA"
```

---

## Task 9: HeroSection

**Files:**
- Create: `components/home/HeroSection.tsx`

- [ ] **Step 1: Create `components/home/HeroSection.tsx`**

```tsx
'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import MagneticButton from '@/components/shared/MagneticButton'

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] flex items-center overflow-hidden mesh-bg">

      {/* Animated gold grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Glowing orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-gold/5 blur-3xl pointer-events-none"
      />

      {/* Content — parallax on scroll */}
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-6 w-full">

        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="gold-line" />
          <span className="text-gold text-xs tracking-[0.4em] uppercase font-sans">
            Consulting · Investment · Branding
          </span>
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            className="font-serif text-6xl md:text-8xl lg:text-[7vw] leading-[0.9] text-offwhite"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0,      opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Where Capital<br />
            <span className="text-gradient-gold italic">Meets Strategy</span>
          </motion.h1>
        </div>

        {/* Body */}
        <motion.p
          className="max-w-xl text-muted text-lg md:text-xl font-sans font-light leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Finvesco International partners with ambitious businesses to architect
          financial clarity, drive strategic growth, and build brands that command markets.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <MagneticButton>
            <Link
              href="/services"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-black text-sm tracking-widest uppercase font-medium hover:bg-gold-light transition-colors duration-300"
            >
              Our Services
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 px-8 py-4 border border-border text-offwhite text-sm tracking-widest uppercase hover:border-gold/50 transition-colors duration-300"
            >
              Our Story
            </Link>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Vertical EST label */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-30 hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.5 }}
      >
        <div className="w-px h-24 bg-gold/50" />
        <span
          className="text-muted text-xs tracking-[0.3em] uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          EST. 2024
        </span>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-muted text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent" />
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Wire into `app/page.tsx`**

```tsx
import HeroSection from '@/components/home/HeroSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
    </>
  )
}
```

- [ ] **Step 3: Check in browser**

```bash
npm run dev
```
Open `http://localhost:3000`. Expected: Full-viewport hero, gold grid, orbs pulsing, headline animates in, parallax on scroll.

- [ ] **Step 4: Commit**

```bash
git add components/home/HeroSection.tsx app/page.tsx
git commit -m "feat: build HeroSection with parallax, orbs, animated headline, and magnetic CTAs"
```

---

## Task 10: StatsBar

**Files:**
- Create: `components/home/StatsBar.tsx`

- [ ] **Step 1: Create `components/home/StatsBar.tsx`**

```tsx
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
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {STATS.map(({ value, suffix, label }) => (
            <motion.div key={label} variants={fadeUp} className="text-center group">
              <div className="font-mono text-4xl md:text-5xl text-gold mb-2">
                {inView
                  ? <CountUp end={value} duration={2.5} suffix={suffix} />
                  : <span>0{suffix}</span>
                }
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
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
import HeroSection  from '@/components/home/HeroSection'
import StatsBar     from '@/components/home/StatsBar'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
    </>
  )
}
```

- [ ] **Step 3: Check in browser**

Scroll past hero. Expected: Stats count up when section enters viewport. Numbers in gold mono font.

- [ ] **Step 4: Commit**

```bash
git add components/home/StatsBar.tsx app/page.tsx
git commit -m "feat: build StatsBar with CountUp animation on scroll"
```

---

## Task 11: MarqueeSection

**Files:**
- Create: `components/home/MarqueeSection.tsx`

- [ ] **Step 1: Create `components/home/MarqueeSection.tsx`**

```tsx
import { MARQUEE_ITEMS } from '@/lib/constants'

export default function MarqueeSection() {
  return (
    <section className="py-12 border-y border-border/30 overflow-hidden bg-surface/20">
      <div className="flex gap-0">
        <ul className="flex gap-12 animate-marquee whitespace-nowrap" aria-hidden="true">
          {MARQUEE_ITEMS.map(item => (
            <li key={item} className="flex items-center gap-12">
              <span className="text-muted text-sm tracking-widest uppercase">{item}</span>
              <span className="text-gold text-lg" aria-hidden="true">✦</span>
            </li>
          ))}
        </ul>
        <ul className="flex gap-12 animate-marquee2 whitespace-nowrap" aria-hidden="true">
          {MARQUEE_ITEMS.map(item => (
            <li key={`${item}-2`} className="flex items-center gap-12">
              <span className="text-muted text-sm tracking-widest uppercase">{item}</span>
              <span className="text-gold text-lg" aria-hidden="true">✦</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
import HeroSection    from '@/components/home/HeroSection'
import StatsBar       from '@/components/home/StatsBar'
import MarqueeSection from '@/components/home/MarqueeSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <MarqueeSection />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/home/MarqueeSection.tsx app/page.tsx
git commit -m "feat: build infinite marquee ticker"
```

---

## Task 12: PillarsSection

**Files:**
- Create: `components/home/PillarsSection.tsx`

- [ ] **Step 1: Create `components/home/PillarsSection.tsx`**

```tsx
'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PILLARS } from '@/lib/constants'
import SectionLabel from '@/components/shared/SectionLabel'

export default function PillarsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-32 max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <SectionLabel text="What We Do" />
        <h2 className="font-serif text-5xl md:text-6xl text-offwhite leading-tight">
          Three Pillars,<br />
          <span className="italic text-gradient-gold">One Vision</span>
        </h2>
      </div>

      <div className="flex flex-col">
        {PILLARS.map(({ num, title, subtitle, href }, i) => (
          <motion.div
            key={num}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link
              href={href}
              className="group flex items-center justify-between py-8 border-b border-border hover:border-gold/40 transition-colors duration-300"
            >
              <div className="flex items-center gap-8 md:gap-16">
                <span className="font-mono text-xs text-gold/40 tracking-widest w-8">{num}</span>
                <div>
                  <h3 className="font-serif text-3xl md:text-5xl text-offwhite italic group-hover:text-gradient-gold transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-muted text-sm mt-1 tracking-wide hidden md:block">{subtitle}</p>
                </div>
              </div>
              <div className="w-10 h-10 border border-border group-hover:border-gold/40 flex items-center justify-center text-muted group-hover:text-gold transition-all duration-300 flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
import HeroSection    from '@/components/home/HeroSection'
import StatsBar       from '@/components/home/StatsBar'
import MarqueeSection from '@/components/home/MarqueeSection'
import PillarsSection from '@/components/home/PillarsSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <MarqueeSection />
      <PillarsSection />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/home/PillarsSection.tsx app/page.tsx
git commit -m "feat: build PillarsSection with horizontal divider rows"
```

---

## Task 13: PropertySection

**Files:**
- Create: `components/home/PropertySection.tsx`

- [ ] **Step 1: Create `components/home/PropertySection.tsx`**

```tsx
'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { staggerContainer, fadeUp, slideLeft } from '@/lib/animations'
import SectionLabel from '@/components/shared/SectionLabel'
import { PROPERTIES } from '@/lib/constants'

export default function PropertySection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-32 bg-surface/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <motion.div variants={slideLeft} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <SectionLabel text="Real Assets" />
            <h2 className="font-serif text-5xl text-offwhite leading-tight mb-6">
              Property<br />
              <span className="italic text-gradient-gold">Investment</span>
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              Finvesco International actively invests in and manages real estate assets
              across Kenya — from residential to commercial properties. Our portfolio
              strategy prioritises long-term capital appreciation and strategic positioning
              in high-growth Kenyan markets.
            </p>
            <div className="flex items-center gap-3 text-gold text-sm tracking-widest uppercase group cursor-pointer">
              <span>Explore Investment Arm</span>
              <svg className="group-hover:translate-x-1 transition-transform duration-300" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="space-y-4"
          >
            {PROPERTIES.map((p) => (
              <motion.div
                key={p.type}
                variants={fadeUp}
                className="flex items-center justify-between p-5 border border-border bg-surface/50 hover:border-gold/40 transition-colors duration-300"
              >
                <div>
                  <p className="text-offwhite font-sans font-medium">{p.type}</p>
                  <p className="text-muted text-sm mt-0.5">{p.location}</p>
                </div>
                <span className={`text-xs px-3 py-1 border tracking-widest uppercase ${
                  p.status === 'Active'
                    ? 'border-gold/40 text-gold'
                    : 'border-muted/40 text-muted'
                }`}>
                  {p.status}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
import HeroSection      from '@/components/home/HeroSection'
import StatsBar         from '@/components/home/StatsBar'
import MarqueeSection   from '@/components/home/MarqueeSection'
import PillarsSection   from '@/components/home/PillarsSection'
import PropertySection  from '@/components/home/PropertySection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <MarqueeSection />
      <PillarsSection />
      <PropertySection />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/home/PropertySection.tsx app/page.tsx
git commit -m "feat: build PropertySection with 2-col layout and status badges"
```

---

## Task 14: ExportSection

**Files:**
- Create: `components/home/ExportSection.tsx`

- [ ] **Step 1: Create `components/home/ExportSection.tsx`**

```tsx
'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { staggerContainer, fadeUp } from '@/lib/animations'
import SectionLabel from '@/components/shared/SectionLabel'
import { EXPORT_STEPS } from '@/lib/constants'

export default function ExportSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-32">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          className="text-center mb-20"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <SectionLabel text="Portfolio Company" centered />
          <h2 className="font-serif text-5xl md:text-6xl text-offwhite leading-tight">
            Product Export &<br />
            <span className="italic text-gradient-gold">Brand Packaging</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto mt-6 leading-relaxed">
            Through our investee company, Finvesco International is building bridges
            between African product excellence and global markets — from sourcing
            and packaging to branded export marketing.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {EXPORT_STEPS.map((step) => (
            <motion.div
              key={step.num}
              variants={fadeUp}
              className="relative p-6 border border-border bg-surface/30 hover:border-gold/40 transition-all duration-300 group"
            >
              <span className="font-mono text-xs text-gold/40 tracking-widest">{step.num}</span>
              <div className="gold-line my-4 group-hover:w-full transition-all duration-500" style={{ transition: 'width 500ms ease' }} />
              <h3 className="text-offwhite font-sans font-medium mb-3">{step.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
import HeroSection      from '@/components/home/HeroSection'
import StatsBar         from '@/components/home/StatsBar'
import MarqueeSection   from '@/components/home/MarqueeSection'
import PillarsSection   from '@/components/home/PillarsSection'
import PropertySection  from '@/components/home/PropertySection'
import ExportSection    from '@/components/home/ExportSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <MarqueeSection />
      <PillarsSection />
      <PropertySection />
      <ExportSection />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/home/ExportSection.tsx app/page.tsx
git commit -m "feat: build ExportSection with 4-step grid and hover gold line"
```

---

## Task 15: ApproachSection

**Files:**
- Create: `components/home/ApproachSection.tsx`

- [ ] **Step 1: Create `components/home/ApproachSection.tsx`**

```tsx
'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { staggerContainer, fadeUp } from '@/lib/animations'
import SectionLabel from '@/components/shared/SectionLabel'
import { APPROACH_STEPS } from '@/lib/constants'

export default function ApproachSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-32 bg-surface/10">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-16">
          <SectionLabel text="How We Work" />
          <h2 className="font-serif text-5xl md:text-6xl text-offwhite leading-tight">
            A Process Built<br />
            <span className="italic text-gradient-gold">for Precision</span>
          </h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 md:grid-cols-5 gap-0"
        >
          {APPROACH_STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              variants={fadeUp}
              className="relative p-6 md:p-8 border-b md:border-b-0 md:border-r border-border last:border-0 group"
            >
              {/* Connector dot */}
              <div className="hidden md:block absolute -right-1.5 top-8 w-3 h-3 rounded-full border-2 border-gold bg-navy z-10 last:hidden" />

              <span className="font-mono text-xs text-gold/40 tracking-widest block mb-4">{step.num}</span>
              <div className="gold-line mb-4" />
              <h3 className="text-offwhite font-sans font-semibold text-lg mb-3 group-hover:text-gold transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
import HeroSection      from '@/components/home/HeroSection'
import StatsBar         from '@/components/home/StatsBar'
import MarqueeSection   from '@/components/home/MarqueeSection'
import PillarsSection   from '@/components/home/PillarsSection'
import PropertySection  from '@/components/home/PropertySection'
import ExportSection    from '@/components/home/ExportSection'
import ApproachSection  from '@/components/home/ApproachSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <MarqueeSection />
      <PillarsSection />
      <PropertySection />
      <ExportSection />
      <ApproachSection />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/home/ApproachSection.tsx app/page.tsx
git commit -m "feat: build ApproachSection with 5-step Engage→Sustain process"
```

---

## Task 16: CtaSection

**Files:**
- Create: `components/home/CtaSection.tsx`

- [ ] **Step 1: Create `components/home/CtaSection.tsx`**

```tsx
'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import MagneticButton from '@/components/shared/MagneticButton'
import { fadeUp, staggerContainer } from '@/lib/animations'

export default function CtaSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section ref={ref} className="py-40 bg-black relative overflow-hidden">
      {/* Gold glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[600px] h-[300px] rounded-full bg-gold/5 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-8">
            <div className="gold-line" />
            <span className="text-gold text-xs tracking-[0.4em] uppercase">Begin the Engagement</span>
            <div className="gold-line" style={{ transform: 'scaleX(-1)' }} />
          </motion.div>

          <motion.h2 variants={fadeUp} className="font-serif text-5xl md:text-7xl text-offwhite leading-tight mb-6">
            Ready to architect<br />
            <span className="italic text-gradient-gold">your growth?</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-muted text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            Partner with Finvesco International. Strategy-first, execution-focused, results-driven.
          </motion.p>

          <motion.div variants={fadeUp}>
            <MagneticButton className="inline-block">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gold text-black text-sm tracking-widest uppercase font-medium hover:bg-gold-light transition-colors duration-300"
              >
                Engage Us
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Complete `app/page.tsx`**

```tsx
import HeroSection      from '@/components/home/HeroSection'
import StatsBar         from '@/components/home/StatsBar'
import MarqueeSection   from '@/components/home/MarqueeSection'
import PillarsSection   from '@/components/home/PillarsSection'
import PropertySection  from '@/components/home/PropertySection'
import ExportSection    from '@/components/home/ExportSection'
import ApproachSection  from '@/components/home/ApproachSection'
import CtaSection       from '@/components/home/CtaSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <MarqueeSection />
      <PillarsSection />
      <PropertySection />
      <ExportSection />
      <ApproachSection />
      <CtaSection />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/home/CtaSection.tsx app/page.tsx
git commit -m "feat: build CtaSection with gold glow and magnetic CTA"
```

---

## Task 17: Footer

**Files:**
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Replace `components/layout/Footer.tsx`**

```tsx
import Link from 'next/link'

const serviceLinks = [
  { href: '/services/consulting', label: 'Consulting' },
  { href: '/services/investment', label: 'Investment' },
  { href: '/services/branding',   label: 'Branding & Export' },
]

const companyLinks = [
  { href: '/about',   label: 'About Us' },
  { href: '/contact', label: 'Contact' },
]

const socials = [
  { label: 'LinkedIn',  href: '#' },
  { label: 'Facebook',  href: '#' },
  { label: 'Instagram', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-black border-t border-border/50 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-7 h-7 border border-gold rotate-45 flex-shrink-0" />
              <div className="flex flex-col leading-none">
                <span className="font-serif text-lg text-offwhite tracking-widest uppercase">Finvesco</span>
                <span className="font-sans text-[9px] text-gold tracking-[0.35em] uppercase">International</span>
              </div>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Where capital meets strategy. A premier consulting, investment,
              and branding firm serving ambitious businesses across Kenya and globally.
            </p>
            <div className="gold-line mt-8" />
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gold text-xs tracking-[0.4em] uppercase mb-6">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted text-sm hover:text-offwhite transition-colors duration-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-gold text-xs tracking-[0.4em] uppercase mb-6">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted text-sm hover:text-offwhite transition-colors duration-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/30 gap-4">
          <p className="text-muted text-xs">
            © {new Date().getFullYear()} Finvesco International. All rights reserved.
          </p>
          <div className="flex gap-6">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted text-xs hover:text-gold transition-colors duration-300 tracking-wider uppercase"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Final build check**

```bash
npm run build
```
Expected: Clean build, zero TypeScript errors, zero ESLint errors.

- [ ] **Step 3: Full visual check in browser**

```bash
npm run dev
```
Walk through the full page top to bottom:
- Navbar: transparent → frosted on scroll, mobile overlay works
- Hero: orbs, grid, parallax, headline animation, CTAs
- Stats: count up on scroll
- Marquee: infinite scroll, no jitter
- Pillars: 3 horizontal rows, hover effects, arrow boxes
- Property: 2-col layout, status badges
- Export: 4-col grid, hover gold line expand
- Approach: 5 steps, connector dots
- CTA: glow pulse, magnetic button
- Footer: 4-col, links, bottom bar

- [ ] **Step 4: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: build Footer with brand, service links, company links, and socials"
```

---

## Task 18: Deploy to Vercel Staging

- [ ] **Step 1: Create GitHub repository**

Go to https://github.com/new — create repo named `finvesco-international` (private).

- [ ] **Step 2: Push code**

```bash
git remote add origin https://github.com/DennisBundi/finvesco-international.git
git branch -M main
git push -u origin main
```

- [ ] **Step 3: Import to Vercel**

1. Go to https://vercel.com/new
2. Import `finvesco-international` repo
3. Framework: Next.js (auto-detected)
4. Add environment variable: `NEXT_PUBLIC_SITE_URL=https://finvescoint.com`
5. Click Deploy

- [ ] **Step 4: Verify staging URL**

Expected: Vercel provides a URL like `finvesco-international.vercel.app`. Open it and walk through the full page.

- [ ] **Step 5: Share URL with Bernard**

Send Bernard the staging URL for Month 1 review and sign-off (triggers $250 payment milestone).

---

## Success Criteria

- [ ] All 8 homepage sections render correctly desktop + mobile
- [ ] Custom cursor active on desktop, hidden on touch devices
- [ ] Lenis smooth scroll active
- [ ] All scroll animations trigger once on viewport entry
- [ ] Navbar scroll behaviour correct (transparent → frosted)
- [ ] Mobile hamburger menu opens/closes correctly
- [ ] Stats count up on scroll
- [ ] Marquee scrolls infinitely without jitter
- [ ] `npm run build` passes with zero errors
- [ ] Vercel staging URL live and shareable
