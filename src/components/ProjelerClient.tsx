'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

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
  featured: boolean
  order: number
}

const CATEGORIES = ['Tümü', 'Konut', 'Ticari', 'Lüks']

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

export default function ProjelerClient({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState('Tümü')
  const [filtered, setFiltered] = useState(projects)

  useEffect(() => {
    setFiltered(
      activeCategory === 'Tümü'
        ? projects
        : projects.filter(p => p.category === activeCategory)
    )
  }, [activeCategory, projects])

  return (
    <main>
      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        minHeight: '55vh',
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: '80px',
        overflow: 'hidden',
        background: 'var(--dark)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse at 80% 50%, rgba(201,168,76,0.06) 0%, transparent 50%),
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
        <div style={{
          position: 'absolute',
          right: '-20px', top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: 'clamp(100px, 16vw, 220px)',
          fontWeight: 300,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(201,168,76,0.05)',
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}>
          PROJELER
        </div>

        <div className="container-site" style={{ position: 'relative', zIndex: 2, paddingTop: '160px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--gold)' }} />
            <span style={{
              fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--gold)',
            }}>Çalışmalarımız</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(48px, 7vw, 88px)',
            fontWeight: 300, lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
          }}>
            Tüm Projeler
          </h1>
        </div>
      </section>

      {/* ── FILTER ── */}
      <section style={{
        background: 'var(--dark-2)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'sticky',
        top: '72px',
        zIndex: 50,
        backdropFilter: 'blur(12px)',
      }}>
        <div className="container-site">
          <div style={{ display: 'flex', gap: '0', overflowX: 'auto' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '20px 32px',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeCategory === cat
                    ? '2px solid var(--gold)'
                    : '2px solid transparent',
                  color: activeCategory === cat
                    ? 'var(--gold)'
                    : 'var(--text-secondary)',
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat}
                <span style={{
                  marginLeft: '8px',
                  fontSize: '10px',
                  color: activeCategory === cat ? 'var(--gold)' : 'var(--text-muted)',
                }}>
                  ({cat === 'Tümü' ? projects.length : projects.filter(p => p.category === cat).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="section-pad">
        <div className="container-site">
          {filtered.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '120px 0',
              color: 'var(--text-muted)', fontSize: '14px',
            }}>
              Bu kategoride proje bulunamadı.
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '2px',
            }}>
              {filtered.map((project, i) => (
                <RevealSection key={project.id} delay={i * 0.08}>
                  <Link href={`/projeler/${project.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <div
                      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
                      onMouseEnter={e => {
                        const inner = e.currentTarget.querySelector('.proj-inner') as HTMLElement
                        const info = e.currentTarget.querySelector('.proj-info') as HTMLElement
                        if (inner) inner.style.transform = 'scale(1.05)'
                        if (info) info.style.transform = 'translateY(0)'
                      }}
                      onMouseLeave={e => {
                        const inner = e.currentTarget.querySelector('.proj-inner') as HTMLElement
                        const info = e.currentTarget.querySelector('.proj-info') as HTMLElement
                        if (inner) inner.style.transform = 'scale(1)'
                        if (info) info.style.transform = 'translateY(8px)'
                      }}
                    >
                      <div className="proj-inner" style={{
                        aspectRatio: '4/3',
                        background: `
                          radial-gradient(ellipse at ${(i % 3) * 33}% 60%,
                            rgba(201,168,76,0.08) 0%, transparent 60%),
                          linear-gradient(135deg, var(--dark-3) 0%, var(--dark-4) 100%)
                        `,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                        position: 'relative',
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-cormorant), serif',
                          fontSize: '88px', fontWeight: 300,
                          color: 'rgba(201,168,76,0.07)',
                          userSelect: 'none',
                        }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>

                        {project.featured && (
                          <div style={{
                            position: 'absolute', top: '20px', left: '20px',
                            padding: '4px 12px',
                            background: 'var(--gold)',
                            color: 'var(--dark)',
                            fontSize: '10px', fontWeight: 600,
                            letterSpacing: '0.12em', textTransform: 'uppercase',
                          }}>Öne Çıkan</div>
                        )}
                      </div>

                      <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        height: '60%',
                        background: 'linear-gradient(to top, rgba(10,12,15,0.95) 0%, transparent 100%)',
                        pointerEvents: 'none',
                      }} />

                      <div className="proj-info" style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        padding: '28px',
                        transform: 'translateY(8px)',
                        transition: 'transform 0.4s ease',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                          <div>
                            <p style={{
                              fontSize: '10px', fontWeight: 500,
                              letterSpacing: '0.18em', textTransform: 'uppercase',
                              color: 'var(--gold)', marginBottom: '8px',
                            }}>{project.category} · {project.year}</p>
                            <h3 style={{
                              fontFamily: 'var(--font-cormorant), serif',
                              fontSize: '22px', fontWeight: 400,
                              color: 'var(--text-primary)', marginBottom: '4px',
                            }}>{project.title}</h3>
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                              {project.location}{project.area ? ` · ${project.area}` : ''}
                            </p>
                          </div>
                          <div style={{
                            width: '40px', height: '40px',
                            border: '1px solid rgba(201,168,76,0.4)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0,
                          }}>
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                              <path d="M3 8h10M9 4l4 4-4 4" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </RevealSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-pad" style={{ background: 'var(--dark-2)' }}>
        <RevealSection>
          <div className="container-site" style={{ textAlign: 'center' }}>
            <p style={{
              fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: '24px',
            }}>Sıradaki Proje</p>
            <h2 style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(36px, 5vw, 68px)',
              fontWeight: 300, lineHeight: 1.1,
              color: 'var(--text-primary)', marginBottom: '40px',
            }}>
              Projenizi Birlikte<br />
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Hayata Geçirelim.</em>
            </h2>
            <Link href="/iletisim" className="btn-gold" style={{ padding: '16px 48px' }}>
              İletişime Geçin
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </RevealSection>
      </section>
    </main>
  )
}