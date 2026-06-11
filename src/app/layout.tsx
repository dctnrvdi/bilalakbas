import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Bilal Akbaş | Insaat & Mimarlik',
    template: '%s | Bilal Akbaş',
  },
  description: 'Bilal Akbaş - guven uzerine insa edilmis, mukemmeliyetle teslim edilen konut ve ticari projeler.',
  keywords: ['insaat', 'mimarlik', 'konut', 'ticari', 'bilal akbaş', 'istanbul'],
  authors: [{ name: 'Bilal Akbaş' }],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Bilal Akbaş',
    title: 'Bilal Akbaş | Insaat & Mimarlik',
    description: 'Guven uzerine insa edilmis projeler.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bilal Akbaş',
    description: 'Guven uzerine insa edilmis projeler.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="noise">{children}</body>
    </html>
  )
}