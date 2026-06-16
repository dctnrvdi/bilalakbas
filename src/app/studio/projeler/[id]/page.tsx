import { prisma } from '@/lib/prisma'
import AdminProjeForm from '@/components/admin/AdminProjeForm'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProjeDuzenle({ params }: Props) {
  const { id } = await params
  let project = null

  try {
    project = await prisma.project.findFirst({
      where: { id: parseInt(id) },
    })
  } catch (e) {
    console.error(e)
  }

  if (!project) notFound()

  return <AdminProjeForm mode="edit" project={project!} />
}