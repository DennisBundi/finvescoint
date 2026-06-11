import type { Metadata } from 'next'
import AboutHero from '@/components/about/AboutHero'
import AboutMission from '@/components/about/AboutMission'
import AboutValues from '@/components/about/AboutValues'
import InnerCta from '@/components/shared/InnerCta'

export const metadata: Metadata = {
  title: 'About Us | Finvesco International — Premier Financial Consulting Firm',
  description:
    'Finvesco International is a premier consulting and financial advisory firm. We empower businesses with expert financial services, strategic advisory, and capital structuring for sustainable growth.',
  keywords: [
    'Finvesco International',
    'about us',
    'consulting firm',
    'financial advisory',
    'business strategy',
    'fractional CFO',
    'investment advisory',
  ],
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Finvesco International — Where Capital Meets Strategy',
    description:
      'Premier consulting and financial advisory firm empowering ambitious businesses globally.',
    url:      '/about',
    type:     'website',
    siteName: 'Finvesco International',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Finvesco International',
    description:
      'Premier consulting and financial advisory firm empowering ambitious businesses globally.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Finvesco International',
  alternateName: 'Finvesco',
  description:
    'Premier consulting, investment, and financial advisory firm serving businesses globally.',
  url: 'https://finvescoint.com',
  foundingDate: '2024',
  areaServed: 'Global',
  serviceType: [
    'Fractional CFO Services',
    'Financial Consulting',
    'Business Acquisition Advisory',
    'Financial Forecasting',
    'Sales Leaseback Negotiations',
    'Financial Reporting',
  ],
  knowsAbout: [
    'Financial Management',
    'Business Acquisitions',
    'Due Diligence',
    'Pro Forma Financials',
    'Capital Strategy',
    'Investment Advisory',
  ],
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <AboutHero />
        <AboutMission />
        <AboutValues />
        <InnerCta />
      </main>
    </>
  )
}
