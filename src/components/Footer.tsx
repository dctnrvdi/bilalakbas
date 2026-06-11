'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Footer() {
  const [settings, setSettings] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/ayarlar')
      .then(r => r.json())
      .then(data => setSettings(data))
      .catch(() => {})
  }, [])

  const phone = settings.footer_phone || '+90 212 000 00 00'
  const email = settings.footer_email || 'info@ozkurinsaat.com'
  const address = settings.footer_address || 'Istanbul, Turkiye'
  const tagline = settings.footer_tagline || 'Guven - Kalite - Mukemmellik'

  return (
    <footer style={{
      background: 'var(--dark-2)',
      borderTop: '1px solid var(--border-subtle)',
      padding: '80px 0 40px',
    }}>
      <div className="container-site">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '60px', marginBottom: '60px',
        }}>
          <div>
            <p style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: '22px', fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--text-primary)', marginBottom: '16px',
            }}>Ozkur Insaat</p>
            <p style={{
              fontSize: '13px', color: 'var(--text-secondary)',
              lineHeight: 1.7, maxWidth: '260px',
            }}>
              Guven uzerine insa edilmis, mukemmeliyetle teslim edilen projeler.
            </p>
          </div>

          <div>
            <p style={{
              fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: '20px',
            }}>Sayfalar</p>
            {[
              { href: '/hakkimizda', label: 'Hakkimizda' },
              { href: '/projeler', label: 'Projeler' },
              { href: '/iletisim', label: 'Iletisim' },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{
                display: 'block', fontSize: '13px',
                color: 'var(--text-secondary)', textDecoration: 'none',
                marginBottom: '12px', transition: 'color 0.3s ease',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <p style={{
              fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: '20px',
            }}>Iletisim</p>
            {[email, phone, address].map(item => (
              <p key={item} style={{
                fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px',
              }}>{item}</p>
            ))}
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '32px',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '16px',
        }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Ozkur Insaat. Tum haklari saklidir.
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            {tagline}
          </p>
        </div>
      </div>
    </footer>
  )
}