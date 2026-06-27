export const revalidate = 0
import type { Metadata } from 'next'
import EkipClient from '@/components/EkipClient'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Ekip | Bilal Akbas',
  description: 'Bilal Akbas uzman ekibi ile tanisın.',
}

export default async function EkipPage() {
  let members: {
    id: number
    name: string
    role: string
    bio: string | null
    image: string | null
    order: number
  }[] = []

  try {
    members = await prisma.teamMember.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
      select: { id: true, name: true, role: true, bio: true, image: true, order: true },
    })
  } catch (e) {
    console.error(e)
  }

  return <EkipClient members={members} />
}
