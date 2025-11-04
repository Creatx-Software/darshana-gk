import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import '../styles/globals.css'
import Navigation from '@/components/layout/Navigation'
import LoadingScreen from '@/components/layout/LoadingScreen'
import ScrollAnimations from '@/components/layout/ScrollAnimations'
import Footer from '@/components/layout/Footer'

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

export const metadata: Metadata = {
  title: 'Darshana Gal Ketayam - Crafting Timeless Stonework',
  description: 'Four generations of master craftsmen preserving Sri Lanka\'s ancient art of granite carving since 1911. Specializing in sacred forms, memorials, and architectural stonework.',
  keywords: 'stone carving, granite carving, Sri Lanka, Buddha statues, memorials, tombstones, architectural stonework',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${inter.variable}`}>
      <body>
        <LoadingScreen />
        <ScrollAnimations />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
