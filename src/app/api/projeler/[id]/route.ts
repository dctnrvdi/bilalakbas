import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

type Props = { params: Promise<{ id: string }> }

export async function GET(req: NextRequest, { params }: Props) {
  try {
    const { id: idStr } = await params
    const id = parseInt(idStr)
    if (isNaN(id)) return NextResponse.json({ error: 'Geçersiz ID' }, { status: 400 })

    const project = await prisma.project.findFirst({ where: { id } })
    if (!project) return NextResponse.json({ error: 'Proje bulunamadı' }, { status: 404 })

    return NextResponse.json(project)
  } catch {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id: idStr } = await params
    const id = parseInt(idStr)
    if (isNaN(id)) return NextResponse.json({ error: 'Geçersiz ID' }, { status: 400 })

    const body = await req.json()
    const { title, slug, category, location, year, area, description, coverImage, images, featured, order } = body

    const project = await prisma.project.update({
      where: { id },
      data: {
        title, slug, category, location,
        year: Number(year), area, description, coverImage,
        images: Array.isArray(images) ? JSON.stringify(images) : images,
        featured: Boolean(featured),
        order: Number(order),
      },
    })

    return NextResponse.json(project)
  } catch (error: any) {
    if (error?.code === 'P2025') return NextResponse.json({ error: 'Proje bulunamadı' }, { status: 404 })
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id: idStr } = await params
    const id = parseInt(idStr)
    if (isNaN(id)) return NextResponse.json({ error: 'Geçersiz ID' }, { status: 400 })

    await prisma.project.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error?.code === 'P2025') return NextResponse.json({ error: 'Proje bulunamadı' }, { status: 404 })
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}