import { prisma } from '@/lib/prisma'
import AdminEkipClient from '@/components/admin/AdminEkipClient'
export const revalidate = 0

export default async function AdminEkipPage() {
  let members: {
    id: number
    name: string
    role: string
    bio: string | null
    image: string | null
    order: number
    published: boolean
  }[] = []

  try {
    members = await prisma.teamMember.findMany({
      orderBy: { order: 'asc' },
    })
  } catch (e) {
    console.error(e)
  }

  return <AdminEkipClient members={members} />
}
