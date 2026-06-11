'use client'

import { usePathname } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'var(--dark)',
    }}>
      <AdminSidebar />
      <main style={{
        flex: 1,
        marginLeft: '260px',
        padding: '40px',
        overflowX: 'hidden',
        minHeight: '100vh',
      }}>
        {children}
      </main>
    </div>
  )
}