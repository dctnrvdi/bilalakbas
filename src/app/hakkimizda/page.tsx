export const revalidate = 0
import type { Metadata } from 'next'
import HakkimizdaClient from '@/components/HakkimizdaClient'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: 'Bilal Akbaş hakkında — vizyonumuz, misyonumuz ve ekibimiz.',
}

async function getSettings(): Promise<Record<string, string>> {
  try {
    const settings = await prisma.siteSettings.findMany()
    const map: Record<string, string> = {}
    settings.forEach(s => { map[s.key] = s.value })
    return map
  } catch { return {} }
}

export default async function HakkimizdaPage() {
  const settings = await getSettings()
  return <HakkimizdaClient settings={settings} />
}