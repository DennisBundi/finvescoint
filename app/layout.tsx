import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LenisProvider from '@/components/layout/LenisProvider'
import CustomCursor from '@/components/shared/CustomCursor'
import PageTransition from '@/components/shared/PageTransition'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://finvescoint.com'),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  openGraph: {
    type:     'website',
    locale:   'en_US',
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-WTJRL970RQ" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-WTJRL970RQ');
      `}</Script>
      <body className="bg-navy text-offwhite font-sans antialiased" suppressHydrationWarning>
        <CustomCursor />
        <LenisProvider>
          <Navbar />
          <PageTransition>
            <main className="w-full">{children}</main>
          </PageTransition>
          <Footer />
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  )
}
