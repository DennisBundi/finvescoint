import type { Metadata } from 'next'
import ContactSection from '@/components/contact/ContactSection'

export const metadata: Metadata = {
  title: 'Contact Us | Finvesco International',
  description:
    'Contact Finvesco International for expert financial consulting, business acquisition advisory, fractional CFO services, and strategic financial guidance. Based in Nairobi, Kenya — serving clients globally. Our team responds within 24 hours.',
  keywords: [
    'contact Finvesco International',
    'hire financial consultant Kenya',
    'fractional CFO enquiry',
    'business advisory contact Nairobi',
    'financial consulting inquiry',
    'Finvesco contact',
  ],
  openGraph: {
    title: 'Contact Finvesco International',
    description:
      'Let Finvesco International know how we can be of service. Our team responds to every enquiry within 24 hours.',
    type: 'website',
    siteName: 'Finvesco International',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Finvesco International',
    description: 'Reach out to Finvesco International for expert financial and consulting services.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Finvesco International',
  description:
    'Contact form and information for Finvesco International — a premier financial consulting firm based in Nairobi, Kenya.',
  url: 'https://finvescoint.com/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'Finvesco International',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      areaServed: ['KE', 'Global'],
      availableLanguage: 'English',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nairobi',
      addressCountry: 'KE',
    },
  },
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <ContactSection />
      </main>
    </>
  )
}
