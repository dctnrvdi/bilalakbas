import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
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
    default: 'Bilal Akbas | Insaat & Mimarlik',
    template: '%s | Bilal Akbas',
  },
  description: 'Bilal Akbas - guven uzerine insa edilmis, mukemmeliyetle teslim edilen konut ve ticari projeler.',
  keywords: ['insaat', 'mimarlik', 'konut', 'ticari', 'bilal akbas', 'istanbul'],
  authors: [{ name: 'Bilal Akbas' }],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Bilal Akbas',
    title: 'Bilal Akbas | Insaat & Mimarlik',
    description: 'Guven uzerine insa edilmis projeler.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bilal Akbas',
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
    <html lang="tr" className={`${cormorant.variable} ${dmSans.variable}`} style={{ scrollbarGutter: 'stable' }}>
       <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  </head>
      <body className="noise">
        {children}
        <Analytics />
      </body>
    </html>
  )
}