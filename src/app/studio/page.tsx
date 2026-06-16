import { prisma } from '@/lib/prisma'
import AdminDashboardClient from '@/components/admin/AdminDashboardClient'
export const revalidate = 0

export default async function AdminDashboard() {
  let projectCount = 0
  let messageCount = 0
  let unreadCount = 0

  try {
    projectCount = await prisma.project.count()
    messageCount = await prisma.contactMessage.count()
    unreadCount = await prisma.contactMessage.count({ where: { read: false } })
  } catch (e) {
    console.error(e)
  }

  return (
    <AdminDashboardClient
      projectCount={projectCount}
      messageCount={messageCount}
      unreadCount={unreadCount}
    />
  )
}