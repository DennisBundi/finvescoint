import type { Metadata } from 'next'
import Link from 'next/link'
import { SERVICES_DATA } from '@/lib/services-data'
import ServicesCategoryNav from '@/components/services/ServicesCategoryNav'
import ServiceDetail from '@/components/services/ServiceDetail'
import InnerCta from '@/components/shared/InnerCta'

export const metadata: Metadata = {
  title: 'Consulting Services | Finvesco International',
  description:
    'Expert consulting, financial forecasting, and financial reporting services from Finvesco International — strategic guidance for ambitious businesses globally.',
  alternates: { canonical: '/services/consulting' },
  openGraph: {
    title: 'Consulting Services | Finvesco International',
    description: 'Strategic consulting, financial forecasting, and reporting services for ambitious businesses.',
    url: '/services/consulting',
    siteName: 'Finvesco International',
  },
}

const SLUGS = ['consulting', 'financial-forecasts', 'financial-reporting']
const services = SLUGS.map((slug) => SERVICES_DATA.find((s) => s.slug === slug)!)

export default function ConsultingPage() {
  return (
    <main>
      <section className="relative pt-32 pb-16 bg-navy">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="gold-line" />
            <span className="text-gold text-xs tracking-[0.4em] uppercase font-mono">Our Services</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-offwhite leading-tight mb-6">
            Consulting<br />
            <span className="italic text-gradient-gold">Services</span>
          </h1>
          <p className="text-muted text-base md:text-xl font-light leading-relaxed max-w-2xl">
            Strategic advisory, financial forecasting, and reporting — the full consulting
            stack for businesses that need expert financial guidance at every stage.
          </p>
        </div>
      </section>

      <ServicesCategoryNav />

      {services.map((service, i) => (
        <ServiceDetail
          key={service.slug}
          slug={service.slug}
          num={String(i + 1).padStart(2, '0')}
          title={service.title}
          paragraphs={service.listingParagraphs}
          imageSrc={service.heroImage}
          imageAlt={service.heroImageAlt}
          reverse={i % 2 !== 0}
          light={i % 2 === 0}
        />
      ))}

      <InnerCta />
    </main>
  )
}
