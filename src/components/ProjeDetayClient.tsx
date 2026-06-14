'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

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

type MediaItem = { url: string; type: 'image' | 'video' }

export default function ProjeDetayClient({
  project,
  related,
}: {
  project: Project
  related: Project[]
}) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const parseMedia = (images: string): MediaItem[] => {
    try {
      const parsed = JSON.parse(images)
      return parsed
        .map((item: any) =>
          typeof item === 'string'
            ? { url: item, type: 'image' as const }
            : item
        )
        .filter((item: MediaItem) => item.url && item.url !== project.coverImage)
    } catch { return [] }
  }

  const mediaItems = parseMedia(project.images)
  const hasMedia = mediaItems.length > 0

  const descParagraphs = (project.description || '')
    .split('\n\n')
    .map(p => p.trim())
    .filter(Boolean)

  const details = [
    { label: 'Kategori', value: project.category },
    { label: 'Konum', value: project.location },
    { label: 'Yıl', value: String(project.year) },
    { label: 'Alan', value: project.area },
  ].filter(d => d.value)

  return (
    <main style={{ background: 'var(--dark)', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: '80px',
        overflow: 'hidden',
      }}>
        {project.coverImage ? (
          <>
            <img src={project.coverImage} alt={project.title} style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(10,12,15,0.95) 0%, rgba(10,12,15,0.2) 60%, transparent 100%)',
            }} />
          </>
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 60% 40%, rgba(201,168,76,0.08) 0%, transparent 55%), linear-gradient(135deg, #0A0C0F 0%, #111318 100%)',
          }} />
        )}

        <div className="container-site" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
            <Link href="/projeler" style={{
              fontSize: '12px', color: 'rgba(255,255,255,0.5)',
              textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase',
              transition: 'color 0.3s ease',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >Projeler</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>/</span>
            <span style={{ fontSize: '12px', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {project.title}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--gold)' }} />
            <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>
              {project.category}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(48px, 7vw, 96px)',
            fontWeight: 300, lineHeight: 1.0,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            maxWidth: '800px',
          }}>
            {project.title}
          </h1>
        </div>

        <div style={{
          position: 'absolute', bottom: '32px', right: '40px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          opacity: 0.4,
        }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', writingMode: 'vertical-rl' }}>scroll</span>
          <div style={{ width: '1px', height: '40px', background: 'var(--gold)', opacity: 0.5 }} />
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : hasMedia ? '50% 50%' : '1fr',
        borderTop: '1px solid var(--border-subtle)',
      }}>

        {/* SOL - sticky info panel */}
        <div style={{
          position: isMobile ? 'relative' : hasMedia ? 'sticky' : 'relative',
          top: isMobile ? 'auto' : hasMedia ? '72px' : 'auto',
          height: isMobile ? 'auto' : hasMedia ? 'calc(100vh - 72px)' : 'auto',
          borderRight: (!isMobile && hasMedia) ? '1px solid var(--border-subtle)' : 'none',
          borderBottom: (isMobile && hasMedia) ? '1px solid var(--border-subtle)' : 'none',
          background: 'var(--dark-2)',
          overflowY: (!isMobile && hasMedia) ? 'auto' : 'visible',
        }}>
          <div style={{
            padding: isMobile ? '56px 24px 40px' : hasMedia ? '120px 64px 120px 48px' : '120px 80px',
            maxWidth: hasMedia ? 'none' : '900px',
            margin: hasMedia ? '0' : '0 auto',
          }}>
            <p style={{
              fontSize: '10px', fontWeight: 600,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: '14px',
            }}>Proje</p>

            <h2 style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: hasMedia ? 'clamp(36px, 4vw, 56px)' : 'clamp(40px, 5vw, 72px)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginBottom: '56px',
            }}>{project.category}</h2>

            {/* Gorsel yoksa detaylar + aciklama yan yana */}
            {!hasMedia && !isMobile ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
                {/* Sol: aciklama */}
                {descParagraphs.length > 0 && (
                  <div>
                    {descParagraphs.map((para, i) => (
                      <p key={i} style={{
                        fontSize: i === 0 ? '20px' : '15px',
                        fontWeight: i === 0 ? 400 : 300,
                        color: i === 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
                        lineHeight: i === 0 ? 1.55 : 1.85,
                        letterSpacing: i === 0 ? '-0.01em' : 0,
                        marginBottom: i === 0 ? '32px' : '20px',
                      }}>{para}</p>
                    ))}
                  </div>
                )}

                {/* Sag: detaylar + CTA */}
                <div>
                  <div style={{ marginBottom: '40px' }}>
                    <p style={{
                      fontSize: '10px', fontWeight: 600,
                      letterSpacing: '0.25em', textTransform: 'uppercase',
                      color: 'var(--gold)', marginBottom: '20px',
                    }}>Detaylar</p>
                    {details.map((detail, i) => (
                      <div key={detail.label} style={{
                        padding: '14px 0',
                        borderBottom: i < details.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px',
                      }}>
                        <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{detail.label}</span>
                        <span style={{
                          fontSize: detail.label === 'Yıl' || detail.label === 'Alan' ? '20px' : '14px',
                          fontFamily: detail.label === 'Yıl' || detail.label === 'Alan' ? 'var(--font-cormorant), serif' : 'inherit',
                          color: 'var(--text-primary)', textAlign: 'right',
                        }}>{detail.value}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/iletisim" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                    Bilgi Al
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>
            ) : (
              /* Gorsel var veya mobil — normal tek kolon duzen */
              <>
                {descParagraphs.length > 0 && (
                  <div style={{ marginBottom: '56px' }}>
                    {descParagraphs.map((para, i) => (
                      <p key={i} style={{
                        fontSize: i === 0 ? '19px' : '15px',
                        fontWeight: i === 0 ? 400 : 300,
                        color: i === 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
                        lineHeight: i === 0 ? 1.55 : 1.85,
                        letterSpacing: i === 0 ? '-0.01em' : 0,
                        marginBottom: i === 0 ? '32px' : '20px',
                      }}>{para}</p>
                    ))}
                  </div>
                )}

                <div style={{ marginBottom: '40px', paddingTop: '32px', borderTop: '1px solid var(--border-subtle)' }}>
                  <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '20px' }}>Detaylar</p>
                  {details.map((detail, i) => (
                    <div key={detail.label} style={{
                      padding: '14px 0',
                      borderBottom: i < details.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px',
                    }}>
                      <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{detail.label}</span>
                      <span style={{
                        fontSize: detail.label === 'Yıl' || detail.label === 'Alan' ? '20px' : '14px',
                        fontFamily: detail.label === 'Yıl' || detail.label === 'Alan' ? 'var(--font-cormorant), serif' : 'inherit',
                        color: 'var(--text-primary)', textAlign: 'right',
                      }}>{detail.value}</span>
                    </div>
                  ))}
                </div>

                <Link href="/iletisim" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                  Bilgi Al
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* SAG - scroll eden medya (sadece gorsel varsa render edilir) */}
        {hasMedia && (
          <div style={{
            padding: isMobile ? '40px 24px' : '120px 64px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            background: 'var(--dark)',
          }}>
            {mediaItems.map((item, i) => (
              <div key={i} style={{ width: '100%', overflow: 'hidden' }}>
                {item.type === 'video' ? (
                  <video src={item.url} autoPlay loop muted playsInline style={{ width: '100%', display: 'block' }} />
                ) : (
                  <img src={item.url} alt={`${project.title} - ${i + 1}`} style={{ width: '100%', display: 'block' }} />
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section style={{ padding: '120px 0', background: 'var(--dark-2)', borderTop: '1px solid var(--border-subtle)' }}>
          <div className="container-site">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '56px', flexWrap: 'wrap', gap: '24px' }}>
              <div>
                <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>Benzer Projeler</p>
                <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, lineHeight: 1.1, color: 'var(--text-primary)' }}>İlginizi Çekebilir</h2>
              </div>
              <Link href="/projeler" className="btn-dark">Tüm Projeler</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2px' }}>
              {related.map((rel, i) => (
                <Link key={rel.id} href={`/projeler/${rel.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
                    onMouseEnter={e => { const el = e.currentTarget.querySelector('.rel-inner') as HTMLElement; if (el) el.style.transform = 'scale(1.05)' }}
                    onMouseLeave={e => { const el = e.currentTarget.querySelector('.rel-inner') as HTMLElement; if (el) el.style.transform = 'scale(1)' }}
                  >
                    <div className="rel-inner" style={{ aspectRatio: '4/3', background: 'var(--dark-3)', overflow: 'hidden', transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }}>
                      {rel.coverImage ? (
                        <img src={rel.coverImage} alt={rel.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--dark-3) 0%, var(--dark-4) 100%)' }}>
                          <span style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '72px', fontWeight: 300, color: 'rgba(201,168,76,0.07)', userSelect: 'none' }}>{String(i + 1).padStart(2, '0')}</span>
                        </div>
                      )}
                    </div>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,12,15,0.92) 0%, transparent 60%)' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px' }}>
                      <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px' }}>{rel.category} · {rel.year}</p>
                      <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '20px', fontWeight: 400, color: 'var(--text-primary)' }}>{rel.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}