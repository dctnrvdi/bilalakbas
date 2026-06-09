'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

type Project = {
  id: number
  title: string
  slug: string
  category: string
  location: string
  year: number
  area: string
  description: string
  coverImage: string
  images: string
  featured: boolean
  order: number
}

function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(32px)'
    el.style.transition = `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])
  return <div ref={ref}>{children}</div>
}

export default function ProjeDetayClient({
  project,
  related,
}: {
  project: Project
  related: Project[]
}) {
  return (
    <main>
      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: '80px',
        overflow: 'hidden',
        background: 'var(--dark)',
      }}>
        {/* Background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse at 60% 40%, rgba(201,168,76,0.08) 0%, transparent 55%),
            linear-gradient(135deg, #0A0C0F 0%, #111318 100%)
          `,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }} />

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
          background: 'linear-gradient(to top, var(--dark), transparent)',
          pointerEvents: 'none',
        }} />

        <div className="container-site" style={{ position: 'relative', zIndex: 2, paddingTop: '160px' }}>
          {/* Breadcrumb */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            marginBottom: '40px',
          }}>
            <Link href="/projeler" style={{
              fontSize: '12px', color: 'var(--text-muted)',
              textDecoration: 'none', letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'color 0.3s ease',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              Projeler
            </Link>
            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>/</span>
            <span style={{ fontSize: '12px', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {project.title}
            </span>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px',
          }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--gold)' }} />
            <span style={{
              fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--gold)',
            }}>{project.category}</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(44px, 6vw, 88px)',
            fontWeight: 300, lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            maxWidth: '800px',
          }}>
            {project.title}
          </h1>
        </div>
      </section>

      {/* ── PROJECT VISUAL ── */}
      <section style={{ background: 'var(--dark-2)' }}>
        <div style={{
          width: '100%',
          aspectRatio: '16/7',
          background: `
            radial-gradient(ellipse at 40% 60%, rgba(201,168,76,0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.05) 0%, transparent 40%),
            linear-gradient(135deg, var(--dark-3) 0%, var(--dark-4) 50%, var(--dark-3) 100%)
          `,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <span style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(80px, 15vw, 200px)',
            fontWeight: 300,
            color: 'rgba(201,168,76,0.06)',
            letterSpacing: '-0.04em',
            userSelect: 'none',
          }}>
            {project.title.charAt(0)}
          </span>

          {/* Corner accents */}
          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(pos => (
            <div key={pos} style={{
              position: 'absolute',
              top: pos.includes('top') ? '24px' : 'auto',
              bottom: pos.includes('bottom') ? '24px' : 'auto',
              left: pos.includes('left') ? '24px' : 'auto',
              right: pos.includes('right') ? '24px' : 'auto',
              width: '24px', height: '24px',
              borderTop: pos.includes('top') ? '1px solid rgba(201,168,76,0.3)' : 'none',
              borderBottom: pos.includes('bottom') ? '1px solid rgba(201,168,76,0.3)' : 'none',
              borderLeft: pos.includes('left') ? '1px solid rgba(201,168,76,0.3)' : 'none',
              borderRight: pos.includes('right') ? '1px solid rgba(201,168,76,0.3)' : 'none',
            }} />
          ))}
        </div>
      </section>

      {/* ── INFO + DESCRIPTION ── */}
      <section className="section-pad">
        <div className="container-site">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '80px',
          }}>
            {/* Description */}
            <RevealSection>
              <p style={{
                fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--gold)', marginBottom: '24px',
              }}>Proje Hakkında</p>
              <p style={{
                fontSize: '17px', fontWeight: 300,
                color: 'var(--text-secondary)',
                lineHeight: 1.9,
              }}>
                {project.description}
              </p>
            </RevealSection>

            {/* Details */}
            <RevealSection delay={0.15}>
              <p style={{
                fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--gold)', marginBottom: '24px',
              }}>Proje Detayları</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {[
                  { label: 'Kategori', value: project.category },
                  { label: 'Konum', value: project.location },
                  { label: 'Yıl', value: String(project.year) },
                  { label: 'Alan', value: project.area },
                ].filter(d => d.value).map((detail, i, arr) => (
                  <div key={detail.label} style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 0',
                    borderBottom: i < arr.length - 1
                      ? '1px solid var(--border-subtle)' : 'none',
                  }}>
                    <span style={{
                      fontSize: '12px', fontWeight: 500,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                    }}>{detail.label}</span>
                    <span style={{
                      fontSize: '15px',
                      color: 'var(--text-primary)',
                      fontFamily: detail.label === 'Yıl' || detail.label === 'Alan'
                        ? 'var(--font-cormorant), serif' : 'inherit',
                      fontSize: detail.label === 'Yıl' || detail.label === 'Alan'
                        ? '20px' : '15px',
                    } as React.CSSProperties}>{detail.value}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '40px' }}>
                <Link href="/iletisim" className="btn-gold">
                  Bu Proje Hakkında Bilgi Al
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── RELATED PROJECTS ── */}
      {related.length > 0 && (
        <section className="section-pad" style={{ background: 'var(--dark-2)' }}>
          <div className="container-site">
            <RevealSection>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-end', marginBottom: '56px',
                flexWrap: 'wrap', gap: '24px',
              }}>
                <div>
                  <p style={{
                    fontSize: '11px', fontWeight: 500,
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'var(--gold)', marginBottom: '16px',
                  }}>Benzer Projeler</p>
                  <h2 style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: 'clamp(28px, 4vw, 48px)',
                    fontWeight: 300, lineHeight: 1.1,
                    color: 'var(--text-primary)',
                  }}>İlgini Çekebilir</h2>
                </div>
                <Link href="/projeler" className="btn-dark">Tüm Projeler</Link>
              </div>
            </RevealSection>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2px',
            }}>
              {related.map((rel, i) => (
                <RevealSection key={rel.id} delay={i * 0.1}>
                  <Link href={`/projeler/${rel.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <div
                      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
                      onMouseEnter={e => {
                        const inner = e.currentTarget.querySelector('.rel-inner') as HTMLElement
                        if (inner) inner.style.transform = 'scale(1.05)'
                      }}
                      onMouseLeave={e => {
                        const inner = e.currentTarget.querySelector('.rel-inner') as HTMLElement
                        if (inner) inner.style.transform = 'scale(1)'
                      }}
                    >
                      <div className="rel-inner" style={{
                        aspectRatio: '4/3',
                        background: `
                          radial-gradient(ellipse at ${i * 30}% 60%,
                            rgba(201,168,76,0.08) 0%, transparent 60%),
                          linear-gradient(135deg, var(--dark-3) 0%, var(--dark-4) 100%)
                        `,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-cormorant), serif',
                          fontSize: '72px', fontWeight: 300,
                          color: 'rgba(201,168,76,0.07)',
                          userSelect: 'none',
                        }}>{String(i + 1).padStart(2, '0')}</span>
                      </div>

                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(10,12,15,0.92) 0%, transparent 60%)',
                      }} />

                      <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px',
                      }}>
                        <p style={{
                          fontSize: '10px', fontWeight: 500,
                          letterSpacing: '0.18em', textTransform: 'uppercase',
                          color: 'var(--gold)', marginBottom: '8px',
                        }}>{rel.category} · {rel.year}</p>
                        <h3 style={{
                          fontFamily: 'var(--font-cormorant), serif',
                          fontSize: '20px', fontWeight: 400,
                          color: 'var(--text-primary)',
                        }}>{rel.title}</h3>
                      </div>
                    </div>
                  </Link>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}