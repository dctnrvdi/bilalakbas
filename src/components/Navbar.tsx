'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/projeler', label: 'Projeler' },
  { href: '/ekip', label: 'Ekip' },
  { href: '/iletisim', label: 'İletişim' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [logoUrl, setLogoUrl] = useState<string | null | undefined>(undefined)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    fetch('/api/ayarlar')
      .then(r => r.json())
      .then(data => setLogoUrl(data.logo_url || null))
      .catch(() => setLogoUrl(null))
  }, [])

  const bgColor = isMobile
    ? 'rgba(10,12,15,0.98)'
    : scrolled ? 'rgba(10,12,15,0.92)' : 'rgba(10,12,15,0.4)'

  return (
    <>
      <nav className="navbar-safe" style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 200,
        paddingBottom: scrolled ? '16px' : '28px',
        paddingLeft: isMobile ? '24px' : '40px',
        paddingRight: isMobile ? '24px' : '40px',
        background: bgColor,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(201,168,76,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.4s ease, padding 0.4s ease',
      }}>

        {/* Logo — undefined iken hicbir sey gosterme, null ise yazi, string ise gorsel */}
        <Link href="/" style={{ textDecoration: 'none', minWidth: '80px', minHeight: '32px', display: 'flex', alignItems: 'center' }}>
          {logoUrl === undefined ? (
            // Fetch bitmedi — bos tut, flash yok
            <span style={{ display: 'block', width: '80px', height: '32px' }} />
          ) : logoUrl ? (
            <img src={logoUrl} alt="Logo" style={{ height: '32px', width: 'auto', objectFit: 'contain', display: 'block' }} />
          ) : (
            <span style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: '20px', fontWeight: 500,
              color: '#F0EDE8', letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>Bilal Akbas</span>
          )}
        </Link>

        {!isMobile && (
          <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover-line" style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '13px', fontWeight: 400,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: pathname === link.href ? '#C9A84C' : '#9A9589',
                textDecoration: 'none', transition: 'color 0.3s ease',
              }}>{link.label}</Link>
            ))}
            <Link href="/iletisim" className="btn-gold" style={{ padding: '10px 24px', fontSize: '12px' }}>
              Teklif Al
            </Link>
          </div>
        )}

        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px',
          }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: '24px', height: '1px',
                background: '#C9A84C', transition: 'all 0.3s ease',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(4px, 4px)'
                  : i === 1 ? 'scaleX(0)'
                  : 'rotate(-45deg) translate(4px, -4px)'
                  : 'none',
              }} />
            ))}
          </button>
        )}
      </nav>

      {isMobile && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 199,
          background: 'rgba(10,12,15,0.97)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '40px',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}>
          {navLinks.map((link, i) => (
            <Link key={link.href} href={link.href} style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: '36px', fontWeight: 300,
              color: pathname === link.href ? '#C9A84C' : '#F0EDE8',
              textDecoration: 'none', letterSpacing: '0.05em',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
              transition: `all 0.4s ease ${i * 0.08}s`,
            }}>{link.label}</Link>
          ))}
          <Link href="/iletisim" className="btn-gold" style={{ marginTop: '16px' }}>
            Teklif Al
          </Link>
        </div>
      )}
    </>
  )
}