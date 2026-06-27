import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

type Props = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Props) {
  try {
    const { id: idStr } = await params
    const id = parseInt(idStr)
    if (isNaN(id)) return NextResponse.json({ error: 'Gecersiz ID' }, { status: 400 })

    const member = await prisma.teamMember.findFirst({ where: { id } })
    if (!member) return NextResponse.json({ error: 'Uye bulunamadi' }, { status: 404 })

    return NextResponse.json(member)
  } catch {
    return NextResponse.json({ error: 'Sunucu hatasi' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 })

    const { id: idStr } = await params
    const id = parseInt(idStr)
    if (isNaN(id)) return NextResponse.json({ error: 'Gecersiz ID' }, { status: 400 })

    const body = await req.json()
    const { name, role, bio, image, order, published } = body

    if (!name || !role) {
      return NextResponse.json({ error: 'Zorunlu alanlar eksik' }, { status: 400 })
    }

    const member = await prisma.teamMember.update({
      where: { id },
      data: {
        name: String(name),
        role: String(role),
        bio: bio ? String(bio) : null,
        image: image ? String(image) : null,
        order: Number(order) || 0,
        published: Boolean(published),
      },
    })

    return NextResponse.json(member)
  } catch (error: any) {
    if (error?.code === 'P2025') return NextResponse.json({ error: 'Uye bulunamadi' }, { status: 404 })
    return NextResponse.json({ error: 'Sunucu hatasi' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: Props) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 })

    const { id: idStr } = await params
    const id = parseInt(idStr)
    if (isNaN(id)) return NextResponse.json({ error: 'Gecersiz ID' }, { status: 400 })

    await prisma.teamMember.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error?.code === 'P2025') return NextResponse.json({ error: 'Uye bulunamadi' }, { status: 404 })
    return NextResponse.json({ error: 'Sunucu hatasi' }, { status: 500 })
  }
}
