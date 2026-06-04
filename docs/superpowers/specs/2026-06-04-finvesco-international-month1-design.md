# Finvesco International — Month 1 Core Build
## Design Spec

**Date:** 2026-06-04  
**Client:** Bernard Githinji  
**Entity:** Finvesco International  
**Builder:** TechsCrafts · Dennis Bundi Kimathi  
**Milestone:** Month 1 — Core build (Homepage, Navbar, Footer, animations) → Staging deploy → $250

---

## Brand

**Positioning:** *Where Capital Meets Strategy*  
**Three Pillars:** Consulting · Investment · Branding  
**Aesthetic:** Dark luxury editorial — McKinsey × BlackRock × Pentagram  
**Tone:** Authoritative, global, precise. Premium institutional.

### Color System

| Token | Value | Usage |
|---|---|---|
| `--color-black` | `#060810` | Footer background |
| `--color-navy` | `#0A0F1E` | Page background |
| `--color-surface` | `#0F1628` | Card surfaces |
| `--color-border` | `#1E2A45` | Borders, dividers |
| `--color-gold` | `#C9A84C` | Primary accent |
| `--color-gold-light` | `#E8C97A` | Hover gold |
| `--color-white` | `#F0F2F8` | Primary text |
| `--color-muted` | `#7A8BAA` | Secondary text |

### Typography

| Role | Font | Weights |
|---|---|---|
| Display/Headings | Cormorant Garamond | 300, 400, 600, italic |
| Body/UI | DM Sans | 300, 400, 500, 600 |
| Numbers/Stats | JetBrains Mono | 400, 500 |

---

## Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS — no `src/` wrapper, imports as `@/components/`
- **Animation:** Framer Motion + Lenis smooth scroll
- **Fonts:** Google Fonts (Cormorant Garamond + DM Sans + JetBrains Mono)
- **Deploy:** Vercel (staging URL delivered at end of Month 1)
- **Assets:** Built from scratch — geometric CSS logo mark, no photography

---

## Project Structure

```
finvesco-international/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── LenisProvider.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── StatsBar.tsx
│   │   ├── MarqueeSection.tsx
│   │   ├── PillarsSection.tsx
│   │   ├── PropertySection.tsx
│   │   ├── ExportSection.tsx
│   │   ├── ApproachSection.tsx
│   │   └── CtaSection.tsx
│   └── shared/
│       ├── AnimatedText.tsx
│       ├── ScrollReveal.tsx
│       ├── MagneticButton.tsx
│       ├── CustomCursor.tsx
│       ├── PageTransition.tsx
│       └── SectionLabel.tsx
├── lib/
│   ├── animations.ts
│   └── constants.ts
├── public/
│   └── fonts/ (empty — using Google Fonts)
├── .env.local
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## Implementation Approach

**Component-first, section-by-section.** Build and commit in this order:

1. Scaffold + global infrastructure
2. Shared components
3. Navbar
4. Homepage sections (one at a time, in section order)
5. Footer
6. Deploy to Vercel staging

Each commit is deployable. Bernard can review live progress after each push.

---

## Section 1: Global Infrastructure

### globals.css
- Google Fonts import (Cormorant Garamond + DM Sans + JetBrains Mono, `display=swap`)
- CSS custom properties for all color tokens and `--nav-height: 72px`
- `cursor: none` on `html` (desktop custom cursor takes over)
- Gold 4px custom scrollbar
- `::selection` background gold, text black
- SVG fractal noise texture overlay fixed at 4% opacity (`z-index: 9999`, `pointer-events: none`)
- `.gold-line` utility: 48px × 2px, gradient gold→transparent
- `.mesh-bg` utility: two radial gradients for hero background
- `.text-gradient-gold` utility: 135deg gradient gold→gold-light→gold, `background-clip: text`

### tailwind.config.ts
- All color tokens as Tailwind colors (black, navy, surface, border, gold, gold-light, offwhite, muted)
- Font families: serif (Cormorant Garamond), sans (DM Sans), mono (JetBrains Mono)
- Keyframes: marquee, marquee2, glowPulse, float
- Animations: marquee (30s), marquee2 (30s), glow-pulse (3s), float (6s)

### next.config.js
- AVIF + WebP image formats
- `optimizeCss: true`

### LenisProvider.tsx
- `'use client'`
- Lenis instance: `duration: 1.2`, custom ease `Math.min(1, 1.001 - Math.pow(2, -10 * t))`, `smoothWheel: true`
- RAF loop, cleanup on unmount
- Wraps children with `<>{children}</>`

---

## Section 2: Shared Components

### lib/animations.ts
Unified motion language — all variants use cubic bezier `[0.25, 0.46, 0.45, 0.94]`:
- `staggerContainer` — stagger children 0.12s, delay 0.1s
- `fadeUp` — opacity 0→1, y 40→0, 0.8s
- `fadeIn` — opacity 0→1, 0.6s
- `slideLeft` — opacity 0→1, x -60→0, 0.9s
- `slideRight` — opacity 0→1, x 60→0, 0.9s
- `scaleUp` — opacity 0→1, scale 0.92→1, 0.7s
- `charReveal` — opacity 0→1, y 100%→0, 0.6s

### CustomCursor.tsx
- `'use client'`
- Gold dot: 2px, `mix-blend-difference`, spring stiffness 500/damping 40
- Ring follower: 40px, `border-gold/40`, spring stiffness 120/damping 20
- Hidden by default on mobile (`@media (pointer: coarse)` via CSS)
- Starts offscreen at `(-100, -100)`

### MagneticButton.tsx
- `'use client'`
- `useMotionValue` + `useSpring` (stiffness 300, damping 20)
- 35% magnetic pull: `(clientX - centerX) * 0.35`
- Resets to (0, 0) on `onMouseLeave`

### AnimatedText.tsx
- Word-split, each word wrapped in `overflow-hidden` span
- `charReveal` variant per word, stagger via `transition.delay`
- Accepts `as` prop: h1 | h2 | h3 | p | span
- `whileInView` with `once: true`, amount 0.5

### ScrollReveal.tsx
- `useInView` hook, `threshold: 0.1`, `triggerOnce: true`
- Wraps children in `motion.div` with passed variants (default `fadeUp`)
- Accepts `delay` prop

### PageTransition.tsx
- `AnimatePresence mode="wait"` keyed by `usePathname()`
- Black curtain overlay: `scaleY: 1→0` (origin-bottom), duration 0.6s
- Page content: `opacity/y: 0/20 → 1/0`, duration 0.5s

### SectionLabel.tsx
- Gold line (`.gold-line`) + text in `text-xs tracking-[0.4em] uppercase text-gold`
- Flex row, `gap-4`
- Optional second gold line (mirrored, for centered labels)

---

## Section 3: Navbar

**File:** `components/layout/Navbar.tsx`

### Behaviour
- Fixed, full width, `z-50`
- `py-5 bg-transparent` on load → `py-3 bg-navy/90 backdrop-blur-xl border-b border-border/50` after 40px scroll
- Animates in: `y: -80→0, opacity: 0→1`, duration 0.8s on mount
- Never hides on downscroll (institutional authority)

### Logo Mark
- CSS-only diamond: `w-8 h-8 border border-gold rotate-45` → unrotates (`rotate-0`) on group hover, duration 500ms
- Inner: `bg-gold/10` → `bg-gold/20` on hover
- "FINVESCO" in `font-serif text-lg tracking-widest uppercase`
- "International" in `font-sans text-[9px] text-gold tracking-[0.35em] uppercase`

### Desktop Links
- Home · About · Services · Contact
- Active: `text-gold` + full-width gold underline (`-bottom-1`)
- Hover: `text-offwhite` + underline grows left→right (`w-0→w-full`)
- `aria-current="page"` on active link

### CTA Button
- `MagneticButton` wrapper
- "Engage Us" — bordered gold, `border border-gold text-gold` → `bg-gold text-black` on hover
- Links to `/contact`

### Mobile Menu
- Hamburger: 3 spans animate to × (`rotate-45/-45`, middle `opacity-0`)
- Full-screen overlay: `bg-black/95 backdrop-blur-2xl`
- Reveal: `clipPath: circle(0%→150% at top right)`, duration 0.6s
- Links in `font-serif text-5xl` stagger in with 0.1s delay each
- Closes on link click

---

## Section 4: Homepage

### Page Order (Option C — Punch with Stats)
Hero → StatsBar → Marquee → PillarsSection → PropertySection → ExportSection → ApproachSection → CtaSection

### HeroSection
- Full viewport (`h-screen min-h-[700px]`), `mesh-bg`
- Gold grid overlay: `backgroundSize: 80px 80px`, 10% opacity
- Two animated orbs: `scale: 1↔1.2`, `opacity: 0.3↔0.6`, 6s and 8s loops
- Parallax: `useScroll` + `useTransform`, content moves at 30% scroll speed
- Eyebrow: gold-line + "Consulting · Investment · Branding" in `tracking-[0.4em]`
- H1: `font-serif text-6xl md:text-8xl lg:text-[7vw]` — "Where Capital" + italic gradient "Meets Strategy"
- Body copy: max-w-xl, `text-muted text-lg font-light`
- Two MagneticButton CTAs: solid gold "Our Services →" + bordered "Our Story"
- Vertical "EST. 2024" label right edge, `writingMode: vertical-rl`, 30% opacity
- Scroll indicator: bouncing "Scroll" text + gradient line

### StatsBar
- `200+ Clients Served · $50M+ Assets Advised · 12+ Industries · 98% Client Retention`
- `react-countup` triggers on viewport entry (`inView`)
- Numbers in `font-mono text-4xl md:text-5xl text-gold`
- Labels in `text-muted text-sm tracking-widest uppercase`
- Gold underline appears on card hover

### MarqueeSection
- 12 items: Strategic Consulting · Investment Advisory · Brand Architecture · Financial Services · M&A Due Diligence · Fractional CFO · Market Expansion · Capital Strategy · Product Export · Property Investment · Sales Leaseback · Business Valuation
- Two lists animating in opposite directions (`animate-marquee` + `animate-marquee2`)
- Gold `✦` separator between items
- `overflow-hidden`, no wrapping

### PillarsSection (Option C — Horizontal Divider)
- Three full-width rows, `border-b border-border`
- Each row: number (font-mono, gold/40) left · italic serif title center · bordered arrow box right
- Arrow box: `border border-border` → `border-gold/40 text-gold` on hover
- Rows link to `/services/consulting`, `/services/investment`, `/services/branding`
- `ScrollReveal` on each row, staggered delays 0/0.1/0.2s

### PropertySection
- Two-column grid, `gap-16`
- Left: SectionLabel "Real Assets" + serif heading + body text + gold arrow CTA
- Right: 3 stacked property cards
  - Residential · Nairobi, Kenya · Active
  - Commercial · Nairobi, Kenya · Active
  - Mixed Use · Kenya · Acquiring
- Card: `border border-border bg-surface/50` → `border-gold/40` on hover
- Status badges: Active = `border-gold/40 text-gold`, Acquiring = `border-muted/40 text-muted`

### ExportSection
- Header: centered SectionLabel "Portfolio Company" (double gold lines) + serif heading
- 4-column grid (stacks to 2 on mobile, 1 on small)
  - 01 Product Sourcing · 02 Brand & Packaging · 03 Export Marketing · 04 Global Reach
- Card: `border border-border bg-surface/30` → `border-gold/40` on hover
- Gold line extends full-width on hover (`w-48px → w-full`, transition 500ms)

### ApproachSection
- 5-step horizontal timeline on desktop, stacked list on mobile
- Steps: **Engage · Diagnose · Architect · Execute · Sustain**
- Each step: number (font-mono gold/40) + bold title + one-line description
- Gold connector lines between steps (desktop only)
- Descriptions:
  - Engage — "We begin with a confidential strategy session to understand your position"
  - Diagnose — "We map the real constraints — financial, operational, and market"
  - Architect — "We design a precise strategy built around your specific goals"
  - Execute — "We work alongside your team to implement with rigour"
  - Sustain — "We monitor outcomes and adapt the strategy as markets shift"

### CtaSection
- Full-width dark panel (`bg-black`)
- Gold radial glow behind headline (`bg-gold/5 blur-3xl`, `animate-glow-pulse`)
- Serif heading: "Ready to architect your growth?"
- Subtext in `text-muted`
- MagneticButton "Engage Us →" — solid gold, links to `/contact`

---

## Section 5: Navbar & Footer

### Navbar
Documented in Section 3 above.

### Footer
**File:** `components/layout/Footer.tsx`

- `bg-black border-t border-border/50`
- 4-column grid (md): brand (2 cols) + Services + Company
- Brand block: CSS logo mark + tagline "Where capital meets strategy." + body text + gold-line
- Services: Consulting · Investment · Branding & Export (links to `/services/*`)
- Company: About Us · Contact (links to `/about`, `/contact`)
- Bottom bar: copyright left + LinkedIn · Facebook · Instagram right (placeholder `href="#"`)
- Social links: `target="_blank" rel="noopener noreferrer"`
- All links: `text-muted` → `text-offwhite` on hover

---

## Premium UX Standards (applied globally)

- All scroll animations: `triggerOnce: true` — no cheap repeating loops
- All interactive elements have explicit hover states — nothing feels dead
- `will-change: transform` on GPU-composited animated elements
- All Framer Motion variants use unified cubic bezier `[0.25, 0.46, 0.45, 0.94]`
- `prefers-reduced-motion` respected via Framer Motion's `useReducedMotion` hook
- `aria-current="page"` on active nav links
- `target="_blank"` links include `rel="noopener noreferrer"`
- No layout shift on font load (`font-display: swap`)
- Mobile: custom cursor disabled, touch-friendly tap targets minimum 44px

---

## Deployment

1. `npx create-next-app@latest finvesco-international` (no `src/` dir, with TypeScript + Tailwind + ESLint + App Router)
2. Install packages: `framer-motion @studio-freight/lenis clsx tailwind-merge react-intersection-observer react-countup sharp zod`
3. Configure `.env.local` (placeholder values for Month 1 — Supabase/Resend wired in Month 3)
4. Push to GitHub → import to Vercel → staging URL delivered to Bernard

---

## Out of Scope (Month 1)

- All sub-pages: `/about`, `/services/*`, `/contact`, `/admin`
- Supabase integration
- Resend email
- SEO infrastructure (`sitemap.ts`, `robots.ts`, `JsonLd.tsx`)
- Contact form
- Real social media URLs (placeholder `#` for now)

---

## Success Criteria

- [ ] Site live on Vercel staging URL
- [ ] All 8 homepage sections render correctly on desktop and mobile
- [ ] Custom cursor active on desktop, hidden on mobile
- [ ] Smooth scroll active (Lenis)
- [ ] All scroll animations trigger correctly
- [ ] Navbar scroll behaviour works (transparent → frosted)
- [ ] Mobile hamburger menu works
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Lighthouse performance score ≥ 85
