'use client'

import { usePathname } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/studio/login'

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
        marginLeft: '240px',
        padding: '40px 48px',
        overflowX: 'hidden',
        minHeight: '100vh',
      }}>
        {children}
      </main>
    </div>
  )
}