import { prisma } from '@/lib/prisma'
import AdminMesajlarClient from '@/components/admin/AdminMesajlarClient'
export const revalidate = 0

export default async function AdminMesajlarPage() {
  let messages: any[] = []
  try {
    messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (e) {
    console.error(e)
  }
  return <AdminMesajlarClient messages={messages} />
}