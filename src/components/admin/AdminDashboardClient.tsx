'use client'

import Link from 'next/link'

type Props = {
  projectCount: number
  messageCount: number
  unreadCount: number
}

export default function AdminDashboardClient({ projectCount, messageCount, unreadCount }: Props) {
  return (
    <div>
      <div style={{ marginBottom: '48px' }}>
        <p style={{
          fontSize: '11px', fontWeight: 500,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: '12px',
        }}>Genel Bakış</p>
        <h1 style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: '40px', fontWeight: 300,
          color: 'var(--text-primary)',
        }}>Dashboard</h1>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '48px',
      }}>
        {[
          { label: 'Toplam Proje', value: projectCount, href: '/admin/projeler', color: 'var(--gold)' },
          { label: 'Toplam Mesaj', value: messageCount, href: '/admin/mesajlar', color: 'var(--text-primary)' },
          { label: 'Okunmamış', value: unreadCount, href: '/admin/mesajlar', color: '#e05a5a' },
        ].map(stat => (
          <Link key={stat.label} href={stat.href} style={{ textDecoration: 'none' }}>
            <div
              style={{
                background: 'var(--dark-2)',
                border: '1px solid var(--border-subtle)',
                padding: '28px',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
            >
              <p style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: '48px', fontWeight: 300,
                color: stat.color, lineHeight: 1,
                marginBottom: '8px',
              }}>{stat.value}</p>
              <p style={{
                fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}>{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div>
        <p style={{
          fontSize: '11px', fontWeight: 500,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'var(--text-muted)', marginBottom: '16px',
        }}>Hızlı İşlemler</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link href="/admin/projeler/yeni" className="btn-gold" style={{ fontSize: '12px', padding: '12px 24px' }}>
            + Yeni Proje Ekle
          </Link>
          <Link href="/admin/mesajlar" className="btn-dark" style={{ fontSize: '12px', padding: '12px 24px' }}>
            Mesajları Gör
          </Link>
          <Link href="/" className="btn-dark" style={{ fontSize: '12px', padding: '12px 24px' }}>
            Siteyi Görüntüle
          </Link>
        </div>
      </div>
    </div>
  )
}