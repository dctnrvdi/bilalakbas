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
    default: 'Özkur Insaat | Insaat & Mimarlik',
    template: '%s | Özkur Insaat',
  },
  description: 'Özkur Insaat - guven uzerine insa edilmis, mukemmeliyetle teslim edilen konut ve ticari projeler.',
  keywords: ['insaat', 'mimarlik', 'konut', 'ticari', 'ozkur insaat', 'istanbul'],
  authors: [{ name: 'Özkur Insaat' }],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Özkur Insaat',
    title: 'Özkur Insaat | Insaat & Mimarlik',
    description: 'Guven uzerine insa edilmis projeler.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Özkur Insaat',
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