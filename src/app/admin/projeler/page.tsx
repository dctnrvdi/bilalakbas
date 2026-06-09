import { prisma } from '@/lib/prisma'
import AdminProjelerClient from '@/components/admin/AdminProjelerClient'

export default async function AdminProjelerPage() {
  let projects: any[] = []
  try {
    projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
    })
  } catch (e) {
    console.error(e)
  }
  return <AdminProjelerClient projects={projects} />
}