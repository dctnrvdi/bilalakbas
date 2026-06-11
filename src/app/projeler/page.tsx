export const revalidate = 0
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProjelerClient from '@/components/ProjelerClient'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

// Dinamik Metadata yapısı
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Projelerimiz | Bilal Akbaş',
    description: 'Bilal Akbaş tarafından hayata geçirilen tamamlanan ve devam eden projeleri inceleyin.',
    openGraph: {
      title: 'Projelerimiz | Bilal Akbaş',
      description: 'Bilal Akbaş tamamlanan ve devam eden projeler.',
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