import { MetadataRoute } from 'next'
import { getAllServiceSlugs } from '@/lib/services-data'

const BASE = 'https://finvescoint.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes = getAllServiceSlugs().map((slug) => ({
    url:              `${BASE}/services/${slug}`,
    lastModified:     new Date(),
    changeFrequency:  'monthly' as const,
    priority:         0.8,
  }))

  return [
    { url: BASE,                  lastModified: new Date(), changeFrequency: 'weekly'  as const, priority: 1.0 },
    { url: `${BASE}/about`,       lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE}/services`,    lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${BASE}/contact`,     lastModified: new Date(), changeFrequency: 'yearly'  as const, priority: 0.7 },
    ...serviceRoutes,
  ]
}
