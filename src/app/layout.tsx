import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { prisma } from '@/lib/prisma'
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
  robots: { index: true, follow: true },
}

async function getSettings(): Promise<Record<string, string>> {
  try {
    const settings = await prisma.siteSettings.findMany()
    const map: Record<string, string> = {}
    settings.forEach(s => { map[s.key] = s.value })
    return map
  } catch { return {} }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()
  const faviconUrl = settings.favicon_url || null

  return (
    <html lang="tr" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {faviconUrl && <link rel="icon" href={faviconUrl} />}
      </head>
      <body className="noise">
        {children}
        <Analytics />
      </body>
    </html>
  )
}