import type { Metadata } from 'next'
import HeroSection          from '@/components/home/HeroSection'
import StatsBar             from '@/components/home/StatsBar'
import MarqueeSection       from '@/components/home/MarqueeSection'
import HowItWorksSection    from '@/components/home/HowItWorksSection'
import AboutPreviewSection  from '@/components/home/AboutPreviewSection'
import ServicesGridSection  from '@/components/home/ServicesGridSection'
import PillarsSection       from '@/components/home/PillarsSection'
import PropertySection      from '@/components/home/PropertySection'
import ExportSection        from '@/components/home/ExportSection'
import ApproachSection      from '@/components/home/ApproachSection'
import NewsletterSection    from '@/components/home/NewsletterSection'
import CtaSection           from '@/components/home/CtaSection'

export const metadata: Metadata = {
  title:       'Finvesco International | Where Capital Meets Strategy',
  description: 'Finvesco International is a premier financial advisory and consulting firm based in Nairobi, Kenya. Expert Fractional CFO services, business acquisition advisory, financial forecasting, and strategic consulting for ambitious businesses across Africa and globally.',
  keywords: [
    'Finvesco International',
    'financial advisory Kenya',
    'consulting firm Nairobi',
    'fractional CFO Kenya',
    'business acquisitions Kenya',
    'financial consulting Africa',
    'investment advisory Nairobi',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title:       'Finvesco International — Where Capital Meets Strategy',
    description: 'Premier financial advisory and consulting firm based in Nairobi, Kenya — serving ambitious businesses across Africa and globally.',
    url:         '/',
  },
  twitter: {
    title:       'Finvesco International — Where Capital Meets Strategy',
    description: 'Premier financial advisory and consulting firm based in Nairobi, Kenya.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type':       'WebSite',
      '@id':         'https://finvescoint.com/#website',
      url:           'https://finvescoint.com',
      name:          'Finvesco International',
      description:   'Where Capital Meets Strategy',
      inLanguage:    'en',
    },
    {
      '@type':        'Organization',
      '@id':          'https://finvescoint.com/#organization',
      name:           'Finvesco International',
      alternateName:  'Finvesco',
      url:            'https://finvescoint.com',
      logo:           'https://finvescoint.com/logo.png',
      description:    'Premier consulting, investment, and financial advisory firm based in Nairobi, Kenya.',
      foundingDate:   '2024',
      address: {
        '@type':          'PostalAddress',
        addressLocality:  'Nairobi',
        addressCountry:   'KE',
      },
      contactPoint: {
        '@type':             'ContactPoint',
        contactType:         'customer service',
        email:               'hello@finvescoint.com',
        availableLanguage:   'English',
      },
      areaServed: ['Kenya', 'East Africa', 'Global'],
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <StatsBar />
      <MarqueeSection />
      <HowItWorksSection />
      <AboutPreviewSection />
      <ServicesGridSection />
      <PillarsSection />
      <PropertySection />
      <ExportSection />
      <ApproachSection />
      <NewsletterSection />
      <CtaSection />
    </>
  )
}
