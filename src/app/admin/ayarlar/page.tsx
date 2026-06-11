import { prisma } from '@/lib/prisma'
import AdminAyarlarClient from '@/components/admin/AdminAyarlarClient'
export const revalidate = 0

export default async function AdminAyarlarPage() {
  let settings: Record<string, string> = {}
  try {
    const rows = await prisma.siteSettings.findMany()
    rows.forEach(r => { settings[r.key] = r.value })
  } catch (e) {
    console.error(e)
  }
  return <AdminAyarlarClient settings={settings} />
}