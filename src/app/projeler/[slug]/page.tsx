export const revalidate = 0
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProjeDetayClient from '@/components/ProjeDetayClient'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const project = await prisma.project.findFirst({
      where: { slug },
    })
    if (!project) return { title: 'Proje Bulunamadi' }
    return {
      title: project.title,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
        images: project.coverImage ? [{ url: project.coverImage }] : [],
        type: 'article',
      },
    }
  } catch {
    return { title: 'Proje' }
  }
}

export default async function ProjeDetayPage({ params }: Props) {
  const { slug } = await params
  let project = null
  let related: any[] = []

  try {
    project = await prisma.project.findFirst({
      where: { slug },
    })
  } catch (e) {
    console.error('ProjeDetay DB hatası:', e)
    throw e
  }

  if (!project) {
    notFound()
  }

  try {
    related = await prisma.project.findMany({
      where: {
        category: project!.category,
        id: { not: project!.id },
      },
      take: 3,
      orderBy: { order: 'asc' },
    })
  } catch (e) {
    console.error(e)
  }

  return (
    <>
      <Navbar />
      <ProjeDetayClient project={project!} related={related} />
      <Footer />
    </>
  )
}