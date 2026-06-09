import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET — tüm projeleri listele
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')

    const projects = await prisma.project.findMany({
      where: {
        ...(featured === 'true' && { featured: true }),
        ...(category && { category }),
      },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

// POST — yeni proje ekle (admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const body = await req.json()
    const { title, slug, category, location, year, area, description, coverImage, images, featured, order } = body

    if (!title || !slug || !category) {
      return NextResponse.json({ error: 'Zorunlu alanlar eksik' }, { status: 400 })
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        category,
        location: location || '',
        year: Number(year) || new Date().getFullYear(),
        area: area || '',
        description: description || '',
        coverImage: coverImage || '',
        images: Array.isArray(images) ? JSON.stringify(images) : (images || '[]'),
        featured: Boolean(featured),
        order: Number(order) || 0,
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'Bu slug zaten kullanımda' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}