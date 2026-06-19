import { prisma } from '@/lib/prisma'
import AdminHakkimizdaClient from '@/components/admin/AdminHakkimizdaClient'
export const revalidate = 0

export default async function AdminHakkimizdaPage() {
  let settings: Record<string, string> = {}
  try {
    const rows = await prisma.siteSettings.findMany()
    rows.forEach(r => { settings[r.key] = r.value })
  } catch (e) {
    console.error(e)
  }
  return <AdminHakkimizdaClient settings={settings} />
}
