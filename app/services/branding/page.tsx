import type { Metadata } from 'next'
import Link from 'next/link'
import ServicesCategoryNav from '@/components/services/ServicesCategoryNav'
import InnerCta from '@/components/shared/InnerCta'

export const metadata: Metadata = {
  title: 'Branding & Export Services | Finvesco International',
  description:
    'Export planning, brand packaging, operational financial services, and consultative advisory from Finvesco International — building identities that command market attention.',
  alternates: { canonical: '/services/branding' },
  openGraph: {
    title: 'Branding & Export Services | Finvesco International',
    description: 'Export planning, brand packaging, and operational advisory services for businesses entering global markets.',
    url: '/services/branding',
    siteName: 'Finvesco International',
  },
}

const SERVICES = [
  {
    num: '01',
    title: 'Export Planning & Packaging',
    paragraphs: [
      'Through our investee company, Finvesco International supports businesses in positioning their products for international markets. We handle the full export journey — from product sourcing and quality assessment to brand identity and packaging design that meets international retail and regulatory standards.',
      'Our team understands what it takes to move a product from a local market to a global shelf. We work closely with producers to ensure every element — labelling, materials, positioning, and pricing strategy — is calibrated for the target market.',
      'Whether you are entering a new international market or scaling an existing export operation, we bring the commercial and financial expertise to make the transition structured, efficient, and commercially sound.',
    ],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80',
    imageAlt: 'Product packaging and export preparation workspace',
  },
  {
    num: '02',
    title: 'Operational Financial Services',
    paragraphs: [
      'Operational financial services bridge the gap between high-level strategy and day-to-day financial management. We embed with your team to ensure that your financial operations — from accounts payable and receivable to payroll, treasury, and month-end close — run with the rigour and efficiency your business demands.',
      'Our operational support is particularly valuable for businesses going through rapid growth, restructuring, or post-acquisition integration — where financial processes need to scale quickly without losing accuracy or control.',
      'We implement the systems, controls, and reporting cadences that keep your operational finances tight, your leadership informed, and your business ready for the next stage of growth.',
    ],
    image: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&w=1920&q=80',
    imageAlt: 'Financial operations and reporting documentation',
  },
  {
    num: '03',
    title: 'Consultative & Advisory Services',
    paragraphs: [
      'Our consultative and advisory services are designed for leaders who need a trusted, senior financial perspective — without a full-time engagement. We work as a strategic sounding board, helping you pressure-test decisions, evaluate options, and navigate complex financial situations with confidence.',
      'This service is particularly suited to founders, CEOs, and board members who need an independent financial voice on key decisions — capital raises, market entries, restructuring events, or strategic pivots.',
      'Engagements are flexible: structured retainers, project-based advisory, or on-demand access to senior expertise. We adapt to what your situation requires.',
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
    imageAlt: 'Strategic advisory session in a modern business environment',
  },
]

export default function BrandingPage() {
  return (
    <main>
      <section className="relative pt-32 pb-16 bg-navy">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="gold-line" />
            <span className="text-gold text-xs tracking-[0.4em] uppercase font-mono">Our Services</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-offwhite leading-tight mb-6">
            Branding &<br />
            <span className="italic text-gradient-gold">Export</span>
          </h1>
          <p className="text-muted text-base md:text-xl font-light leading-relaxed max-w-2xl">
            Export planning, brand packaging, and operational advisory — building
            businesses that command attention in global markets.
          </p>
        </div>
      </section>

      <ServicesCategoryNav />

      {SERVICES.map((s, i) => {
        const light = i % 2 === 0
        const reverse = i % 2 !== 0
        return (
          <article key={s.num} className={`py-24 md:py-40 ${light ? 'bg-[#F7F5F0]' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${reverse ? 'md:[&>*:first-child]:order-last' : ''}`}>
                <div>
                  <span className="font-mono text-xs text-gold/60 tracking-widest block mb-4">{s.num}</span>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="gold-line" />
                    <span className="text-gold/60 text-xs tracking-widest uppercase font-mono">Service</span>
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl text-navy leading-tight mb-3">{s.title}</h2>
                  <div className="w-10 h-px bg-gold mb-8" />
                  {s.paragraphs.map((p, pi) => (
                    <p key={pi} className={`text-gray-700 text-base leading-[1.85] ${pi < s.paragraphs.length - 1 ? 'mb-5' : 'mb-8'}`}>{p}</p>
                  ))}
                  <Link href="/contact" className="btn-dark inline-flex items-center gap-2">
                    Enquire
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={s.image} alt={s.imageAlt} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-navy/10" />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-transparent" />
                </div>
              </div>
            </div>
          </article>
        )
      })}

      <InnerCta />
    </main>
  )
}
