import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Zorunlu alanlar eksik' }, { status: 400 })
    }

    const contact = await prisma.contactMessage.create({
      data: { name, email, phone: phone || null, subject, message },
    })

    return NextResponse.json({ success: true, id: contact.id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
  }

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(messages)
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = parseInt(searchParams.get('id') || '0')
  if (!id) return NextResponse.json({ error: 'Geçersiz ID' }, { status: 400 })

  await prisma.contactMessage.update({
    where: { id },
    data: { read: true },
  })

  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = parseInt(searchParams.get('id') || '0')
  if (!id) return NextResponse.json({ error: 'Geçersiz ID' }, { status: 400 })

  await prisma.contactMessage.delete({ where: { id } })

  return NextResponse.json({ success: true })
}