export const revalidate = 0
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HomeClient from '@/components/HomeClient'
import { prisma } from '@/lib/prisma'

export default async function HomePage() {
  let projects: any[] = []
  let settings: Record<string, string> = {}

  // Projeleri çek
  try {
    projects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { order: 'asc' },
      take: 3,
    })
  } catch (e) {
    console.error("Projeler yüklenemedi:", e)
  }

  // Ayarları çek
  try {
    const rows = await prisma.siteSettings.findMany()
    rows.forEach(r => { settings[r.key] = r.value })
  } catch (e) {
    console.error("Ayarlar yüklenemedi:", e)
  }

  return (
    <>
      <Navbar />
      <HomeClient projects={projects} settings={settings} />
      <Footer />
    </>
  )
}