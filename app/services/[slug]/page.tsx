import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  SERVICES_DATA,
  getServiceBySlug,
  getAllServiceSlugs,
  getRelatedServices,
} from '@/lib/services-data'
import ServiceDetailHero from '@/components/services/detail/ServiceDetailHero'
import ServiceDetailOverview from '@/components/services/detail/ServiceDetailOverview'
import ServiceDetailProcess from '@/components/services/detail/ServiceDetailProcess'
import ServiceDetailBenefits from '@/components/services/detail/ServiceDetailBenefits'
import RelatedServices from '@/components/services/detail/RelatedServices'
import InnerCta from '@/components/shared/InnerCta'

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}

  return {
    title: `${service.title} | Finvesco International`,
    description: service.metaDescription,
    keywords: [
      service.title,
      `${service.shortTitle} Kenya`,
      `${service.shortTitle} Nairobi`,
      'Finvesco International',
      'financial services Kenya',
    ],
    openGraph: {
      title: `${service.title} | Finvesco International`,
      description: service.metaDescription,
      type: 'website',
      siteName: 'Finvesco International',
      images: [{ url: service.heroImage, alt: service.heroImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | Finvesco International`,
      description: service.metaDescription,
    },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) notFound()

  const related = getRelatedServices(service.relatedSlugs)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDescription,
    slogan: service.tagline,
    provider: {
      '@type': 'Organization',
      name: 'Finvesco International',
      url: 'https://finvescoint.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nairobi',
        addressCountry: 'KE',
      },
    },
    areaServed: ['Kenya', 'East Africa', 'Global'],
    url: `https://finvescoint.com/services/${service.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <ServiceDetailHero service={service} />
        <ServiceDetailOverview service={service} />
        <ServiceDetailProcess service={service} />
        <ServiceDetailBenefits service={service} />
        <RelatedServices related={related} />
        <InnerCta />
      </main>
    </>
  )
}
