import { prisma } from '@/lib/prisma'
import FooterClient from './FooterClient'

export default async function Footer() {
  let settings: Record<string, string> = {}
  try {
    const rows = await prisma.siteSettings.findMany()
    rows.forEach(r => { settings[r.key] = r.value })
  } catch (e) {
    console.error(e)
  }
  return <FooterClient settings={settings} />
}