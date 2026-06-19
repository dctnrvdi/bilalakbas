'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const navItems = [
  {
    href: '/studio',
    label: 'Dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="6" height="6" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="10" y="2" width="6" height="6" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="2" y="10" width="6" height="6" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="10" y="10" width="6" height="6" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
  href: '/studio/ayarlar',
  label: 'Site Ayarları',
  icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.22 3.22l1.42 1.42M13.36 13.36l1.42 1.42M3.22 14.78l1.42-1.42M13.36 4.64l1.42-1.42" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
},
  {
    href: '/studio/hakkimizda',
    label: 'Hakkımızda',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M2 16c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/studio/projeler',
    label: 'Projeler',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 14V6l7-4 7 4v8H2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M6 14v-4h6v4" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: '/studio/mesajlar',
    label: 'Mesajlar',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="4" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M2 7l7 4 7-4" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside style={{
      position: 'fixed',
      left: 0, top: 0, bottom: 0,
      width: '260px',
      background: 'var(--dark-2)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{
        padding: '32px 28px',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <p style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: '18px', fontWeight: 500,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--text-primary)',
          marginBottom: '4px',
        }}>Bilal Akbaş</p>
        <p style={{
          fontSize: '10px', fontWeight: 500,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--gold)',
        }}>Admin Panel</p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '24px 16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map(item => {
            const isActive = pathname === item.href ||
              (item.href !== '/studio' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  background: isActive ? 'var(--dark-3)' : 'transparent',
                  border: isActive ? '1px solid var(--border)' : '1px solid transparent',
                  color: isActive ? 'var(--gold)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  transition: 'all 0.2s ease',
                  borderRadius: '2px',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'var(--dark-3)'
                    e.currentTarget.style.color = 'var(--text-primary)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                  }
                }}
              >
                {item.icon}
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Logout */}
      <div style={{ padding: '16px', borderTop: '1px solid var(--border-subtle)' }}>
        <Link
          href="/"
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '10px 16px',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '12px',
            letterSpacing: '0.05em',
            marginBottom: '4px',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 2H2v12h4M11 5l3 3-3 3M6 8h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Siteye Dön
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/studio/login' })}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            width: '100%',
            padding: '10px 16px',
            background: 'none', border: 'none',
            color: 'var(--text-muted)',
            fontSize: '12px',
            letterSpacing: '0.05em',
            cursor: 'pointer',
            transition: 'color 0.2s ease',
            textAlign: 'left',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#e05a5a')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 2h4v12h-4M7 5L4 8l3 3M12 8H4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Çıkış Yap
        </button>
      </div>
    </aside>
  )
}