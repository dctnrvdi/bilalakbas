'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const NAV_GROUPS = [
  {
    label: 'Site İçeriği',
    items: [
      {
        href: '/studio/ayarlar',
        label: 'Site Ayarları',
        icon: (
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.1 3.1l1.4 1.4M11.5 11.5l1.4 1.4M3.1 12.9l1.4-1.4M11.5 4.5l1.4-1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        ),
      },
      {
        href: '/studio/hakkimizda',
        label: 'Hakkımızda',
        icon: (
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        ),
      },
      {
        href: '/studio/projeler',
        label: 'Projeler',
        icon: (
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M1.5 13V5.5l6.5-4 6.5 4V13H1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
            <path d="M5.5 13V9.5h5V13" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
          </svg>
        ),
      },
      {
        href: '/studio/mesajlar',
        label: 'Mesajlar',
        icon: (
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="3" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M1 6.5l7 4 7-4" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
        ),
      },
    ],
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/studio'
      ? pathname === '/studio'
      : pathname === href || pathname.startsWith(href + '/')

  return (
    <aside style={{
      position: 'fixed',
      left: 0, top: 0, bottom: 0,
      width: '240px',
      background: 'var(--dark-2)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 50,
    }}>

      {/* Brand */}
      <div style={{
        padding: '28px 24px 24px',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <Link href="/studio" style={{ textDecoration: 'none' }}>
          <p style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: '17px', fontWeight: 500,
            letterSpacing: '0.08em',
            color: 'var(--text-primary)',
            marginBottom: '3px',
          }}>Bilal Akbaş</p>
          <p style={{
            fontSize: '9px', fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--gold)',
          }}>Admin Panel</p>
        </Link>
      </div>

      {/* Dashboard */}
      <div style={{ padding: '16px 12px 8px' }}>
        <NavItem
          href="/studio"
          label="Dashboard"
          active={pathname === '/studio'}
          icon={
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
          }
        />
      </div>

      {/* Nav groups */}
      <nav style={{ flex: 1, padding: '0 12px', overflowY: 'auto' }}>
        {NAV_GROUPS.map(group => (
          <div key={group.label} style={{ marginBottom: '24px' }}>
            <p style={{
              fontSize: '8px', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--text-muted)',
              padding: '0 10px', marginBottom: '6px',
            }}>{group.label}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {group.items.map(item => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  active={isActive(item.href)}
                  icon={item.icon}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{
        padding: '12px',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex', flexDirection: 'column', gap: '2px',
      }}>
        <Link
          href="/"
          target="_blank"
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '9px 10px',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '12px',
            borderRadius: '3px',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--dark-3)'
            e.currentTarget.style.color = 'var(--text-primary)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'var(--text-muted)'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M7 2H2v12h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 5l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 8h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Siteyi Gör
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/studio/login' })}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            width: '100%', padding: '9px 10px',
            background: 'none', border: 'none',
            color: 'var(--text-muted)',
            fontSize: '12px', cursor: 'pointer',
            borderRadius: '3px',
            transition: 'all 0.15s ease',
            textAlign: 'left',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(224,90,90,0.08)'
            e.currentTarget.style.color = '#e05a5a'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'var(--text-muted)'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M9 2h5v12H9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 11l-3-3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 8h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Çıkış Yap
        </button>
      </div>
    </aside>
  )
}

function NavItem({ href, label, active, icon }: {
  href: string
  label: string
  active: boolean
  icon: React.ReactNode
}) {
  return (
    <Link
      href={href}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '9px 10px',
        background: active ? 'var(--dark-3)' : 'transparent',
        borderLeft: active ? '2px solid var(--gold)' : '2px solid transparent',
        color: active ? 'var(--gold)' : 'var(--text-secondary)',
        textDecoration: 'none',
        fontSize: '12px', fontWeight: active ? 500 : 400,
        borderRadius: '0 3px 3px 0',
        transition: 'all 0.15s ease',
        letterSpacing: '0.02em',
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.background = 'var(--dark-3)'
          e.currentTarget.style.color = 'var(--text-primary)'
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = 'var(--text-secondary)'
        }
      }}
    >
      {icon}
      {label}
    </Link>
  )
}
