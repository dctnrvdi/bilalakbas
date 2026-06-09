import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProjelerClient from '@/components/ProjelerClient'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

// Dinamik Metadata yapısı
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Projelerimiz | Özkur İnşaat',
    description: 'Özkur İnşaat tarafından hayata geçirilen tamamlanan ve devam eden projeleri inceleyin.',
    openGraph: {
      title: 'Projelerimiz | Özkur İnşaat',
      description: 'Özkur İnşaat tamamlanan ve devam eden projeler.',
    },
  }
}

export default async function ProjelerPage() {
  let projects: any[] = []
  try {
    projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
    })
  } catch (e) {
    console.error(e)
  }
  return (
    <>
      <Navbar />
      <ProjelerClient projects={projects} />
      <Footer />
    </>
  )
}