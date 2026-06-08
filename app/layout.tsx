import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LenisProvider from '@/components/layout/LenisProvider'
import CustomCursor from '@/components/shared/CustomCursor'
import PageTransition from '@/components/shared/PageTransition'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="bg-navy text-offwhite font-sans antialiased" suppressHydrationWarning>
        <CustomCursor />
        <LenisProvider>
          <Navbar />
          <PageTransition>
            <main className="w-full">{children}</main>
          </PageTransition>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
