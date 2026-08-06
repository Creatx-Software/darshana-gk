import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import '../styles/globals.css'
import Navigation from '@/components/layout/Navigation'
import LoadingScreen from '@/components/layout/LoadingScreen'
import ScrollAnimations from '@/components/layout/ScrollAnimations'
import Footer from '@/components/layout/Footer'
import ImageProtection from '@/components/layout/ImageProtection'
import BackToTop from '@/components/ui/BackToTop'
import JsonLd from '@/components/seo/JsonLd'
import { buildRootMetadata } from '@/lib/seo/metadata'
import { SEO_CONFIG } from '@/lib/seo/config'
import {
  jsonLdGraph,
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from '@/lib/seo/jsonld'

const cormorantGaramond = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = buildRootMetadata()

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f5' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  colorScheme: 'dark light',
}

/**
 * Site-wide structured data. Emitted once here so every page inherits the
 * organisation, workshop and website entities; page-level schemas reference
 * these by @id instead of repeating them.
 */
const siteSchema = jsonLdGraph(organizationSchema(), localBusinessSchema(), websiteSchema())

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={SEO_CONFIG.language} className={`${cormorantGaramond.variable} ${inter.variable}`}>
      <head>
        {/* Warm up the CMS origin — hero and gallery images all come from it. */}
        <link
          rel="preconnect"
          href={process.env.NEXT_PUBLIC_STRAPI_URL || 'https://api.darshanagalketayam.lk'}
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_STRAPI_URL || 'https://api.darshanagalketayam.lk'} />
      </head>
      <body>
        <JsonLd data={siteSchema} />
        <LoadingScreen />
        <ScrollAnimations />
        <ImageProtection />
        <Navigation />
        {children}
        <Footer />
        <BackToTop />
      </body>
    </html>
  )
}
