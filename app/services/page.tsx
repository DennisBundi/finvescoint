import type { Metadata } from 'next'
import { SERVICES_DATA } from '@/lib/services-data'
import ServicesHero from '@/components/services/ServicesHero'
import ServiceDetail from '@/components/services/ServiceDetail'
import InnerCta from '@/components/shared/InnerCta'

export const metadata: Metadata = {
  title: 'Financial Services | Finvesco International',
  description:
    'Finvesco International offers comprehensive financial services: Fractional CFO leadership, consulting, business acquisitions and due diligence, financial forecasting, sales leaseback negotiations, and financial reporting — tailored for businesses in Kenya and globally.',
  keywords: [
    'fractional CFO Kenya',
    'financial consulting Nairobi',
    'business acquisitions Kenya',
    'financial forecasting services',
    'sales leaseback negotiations',
    'financial reporting Kenya',
    'consulting services Nairobi',
    'business due diligence Kenya',
    'proforma financials',
  ],
  openGraph: {
    title: 'Financial Services | Finvesco International',
    description:
      'Comprehensive financial services for ambitious businesses — from Fractional CFO to Business Acquisitions, Financial Reporting, and Strategic Consulting.',
    type: 'website',
    siteName: 'Finvesco International',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Financial Services | Finvesco International',
    description:
      'Expert financial services for businesses — Fractional CFO, consulting, acquisitions, forecasting, leaseback, and reporting.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Finvesco International Financial Services',
  description: 'Comprehensive financial and consulting services for small businesses and enterprises.',
  url: 'https://finvescoint.com/services',
  itemListElement: SERVICES_DATA.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: s.title,
      description: s.metaDescription,
      url: `https://finvescoint.com/services/${s.slug}`,
      provider: { '@type': 'Organization', name: 'Finvesco International' },
      areaServed: 'Kenya',
    },
  })),
}

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <ServicesHero />
        {SERVICES_DATA.map((service, i) => (
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
    </>
  )
}
