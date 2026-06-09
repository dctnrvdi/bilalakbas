import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
      }}>
        {children}
      </main>
    </div>
  )
}