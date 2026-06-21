import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string || 'image'

    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 })
    }

    const isVideo = type === 'video'
    const maxSize = isVideo ? 100 * 1024 * 1024 : 10 * 1024 * 1024
    const bytes = await file.arrayBuffer()

    if (bytes.byteLength > maxSize) {
      return NextResponse.json(
        { error: isVideo ? 'Video maksimum 100MB olabilir.' : 'Görsel maksimum 10MB olabilir.' },
        { status: 413 }
      )
    }

    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataUri = `data:${file.type};base64,${base64}`

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'bilal-akbas',
      resource_type: isVideo ? 'video' : 'image',
      transformation: !isVideo ? [
        { quality: 'auto', fetch_format: 'auto' },
      ] : undefined,
    })

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      type: result.resource_type,
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    const msg = error?.message || 'Yükleme başarısız'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}