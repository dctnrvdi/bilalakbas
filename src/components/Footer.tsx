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
  const email = settings.footer_email || 'info@bilalakbas.com'
  const address = settings.footer_address || 'İstanbul, Türkiye'
  const tagline = settings.footer_tagline || 'Güven - Kalite - Mükemmellik'

  return (
    <footer style={{ background: 'var(--dark-2)', borderTop: '1px solid var(--border-subtle)' }}>

      {/* MAIN FOOTER */}
      <div style={{ padding: '80px 0 40px' }}>
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
              }}>Bilal Akbas</p>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '260px' }}>
                Güven üzerine inşa edilmiş, mükemmeliyetle teslim edilen projeler.
              </p>
            </div>

            <div>
              <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '20px' }}>Sayfalar</p>
              {[
                { href: '/hakkimizda', label: 'Hakkımızda' },
                { href: '/projeler', label: 'Projeler' },
                { href: '/iletisim', label: 'İletişim' },
              ].map(link => (
                <Link key={link.href} href={link.href} style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '12px', transition: 'color 0.3s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >{link.label}</Link>
              ))}
            </div>

            <div>
              <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '20px' }}>İletişim</p>
              {[email, phone, address].map(item => (
                <p key={item} style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>{item}</p>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              © {new Date().getFullYear()} Bilal Akbaş. Tüm hakları saklıdır.
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{tagline}</p>
          </div>
        </div>
      </div>

      {/* CPC SIGNATURE BAND */}
      <div style={{
        borderTop: '1px solid rgba(201,168,76,0.08)',
        background: '#080A0C',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Marquee bant */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0',
          overflow: 'hidden',
        }}>
          <style>{`
            @keyframes cpc-marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .cpc-marquee-track {
              display: flex;
              align-items: center;
              animation: cpc-marquee 18s linear infinite;
              width: max-content;
            }
            .cpc-marquee-track:hover {
              animation-play-state: paused;
            }
            .cpc-sep {
              width: 4px;
              height: 4px;
              border-radius: 50%;
              background: rgba(201,168,76,0.4);
              margin: 0 32px;
              flex-shrink: 0;
            }
            .cpc-sig-link {
              display: flex;
              align-items: center;
              gap: 14px;
              text-decoration: none;
              padding: 20px 0;
              flex-shrink: 0;
              transition: opacity 0.3s ease;
            }
            .cpc-sig-link:hover .cpc-label { color: #C9A84C; }
            .cpc-sig-link:hover .cpc-brand { color: #ffffff; letter-spacing: 0.35em; }
            .cpc-label {
              font-size: 9px;
              font-weight: 500;
              letter-spacing: 0.25em;
              text-transform: uppercase;
              color: rgba(255,255,255,0.2);
              transition: color 0.3s ease;
              white-space: nowrap;
            }
            .cpc-brand {
              font-family: var(--font-cormorant), serif;
              font-size: 15px;
              font-weight: 500;
              letter-spacing: 0.3em;
              text-transform: uppercase;
              color: rgba(201,168,76,0.7);
              transition: all 0.3s ease;
              white-space: nowrap;
            }
          `}</style>

          {/* Iki kopya — seamless loop */}
          <div className="cpc-marquee-track">
            {[...Array(2)].map((_, copy) => (
              <div key={copy} style={{ display: 'flex', alignItems: 'center' }}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                    <a
                      href="https://cutpastecut.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cpc-sig-link"
                    >
                      <span className="cpc-label">Designed & Developed by</span>
                      <span className="cpc-brand">CUTPASTECUT®</span>
                    </a>
                    <div className="cpc-sep" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}