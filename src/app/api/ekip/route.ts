import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET — published members by order (public)
export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(members)
  } catch {
    return NextResponse.json({ error: 'Sunucu hatasi' }, { status: 500 })
  }
}

// POST — create new member (admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 })
    }

    const body = await req.json()
    const { name, role, bio, image, order, published } = body

    if (!name || !role) {
      return NextResponse.json({ error: 'Zorunlu alanlar eksik' }, { status: 400 })
    }

    const member = await prisma.teamMember.create({
      data: {
        name: String(name),
        role: String(role),
        bio: bio ? String(bio) : null,
        image: image ? String(image) : null,
        order: Number(order) || 0,
        published: published !== false,
      },
    })

    return NextResponse.json(member, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Sunucu hatasi' }, { status: 500 })
  }
}
