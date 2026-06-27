'use client'

import { useRef, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type Member = {
  id: number
  name: string
  role: string
  bio: string | null
  image: string | null
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
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])
  return <div ref={ref}>{children}</div>
}

function MemberCard({ member, index }: { member: Member; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(40px)'
    el.style.transition = `opacity 0.7s ease ${index * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        observer.disconnect()
      }
    }, { threshold: 0.08 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <div ref={ref}>
      <div
        style={{ overflow: 'hidden', cursor: 'default' }}
        onMouseEnter={e => {
          const img = e.currentTarget.querySelector('.member-img') as HTMLElement
          if (img) img.style.transform = 'scale(1.04)'
        }}
        onMouseLeave={e => {
          const img = e.currentTarget.querySelector('.member-img') as HTMLElement
          if (img) img.style.transform = 'scale(1)'
        }}
      >
        {/* Photo */}
        <div style={{
          position: 'relative',
          width: '100%',
          paddingTop: '133.33%', /* 3:4 aspect ratio */
          overflow: 'hidden',
          background: 'var(--dark-3)',
          marginBottom: '20px',
        }}>
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="member-img"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
              }}
            />
          ) : (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, var(--dark-2) 0%, var(--dark-3) 100%)',
            }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="18" r="8" stroke="rgba(201,168,76,0.25)" strokeWidth="1.5"/>
                <path d="M8 44c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="rgba(201,168,76,0.25)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          )}
          {/* Subtle overlay on hover */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(10,12,15,0.4) 0%, transparent 50%)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Info */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: '24px', fontWeight: 400,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
            marginBottom: '6px',
          }}>{member.name}</h3>

          <p style={{
            fontSize: '10px', fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: member.bio ? '12px' : '0',
          }}>{member.role}</p>

          {member.bio && (
            <p style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: '320px',
            }}>{member.bio}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function EkipClient({ members }: { members: Member[] }) {
  return (
    <>
      <Navbar />
      <main>

        {/* HERO */}
        <section style={{
          position: 'relative',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: '80px',
          overflow: 'hidden',
          background: 'var(--dark)',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.06) 0%, transparent 50%), linear-gradient(135deg, #0A0C0F 0%, #111318 100%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', left: '-20px', top: '50%',
            transform: 'translateY(-60%)',
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(100px, 16vw, 240px)',
            fontWeight: 300,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(201,168,76,0.06)',
            pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap',
          }}>EKİP</div>

          <div className="container-site" style={{ position: 'relative', zIndex: 2, paddingTop: '160px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <div style={{ width: '40px', height: '1px', background: 'var(--gold)' }} />
              <span style={{
                fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--gold)',
              }}>Ekibimiz</span>
            </div>
            <h1 style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(48px, 7vw, 96px)',
              fontWeight: 300, lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}>
              Uzman<br />
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Kadromuz</em>
            </h1>
          </div>
        </section>

        {/* TEAM GRID */}
        <section className="section-pad" style={{ background: 'var(--dark)' }}>
          <div className="container-site">
            {members.length === 0 ? (
              <RevealSection>
                <div style={{
                  textAlign: 'center', padding: '80px 0',
                  color: 'var(--text-muted)', fontSize: '15px',
                }}>
                  Yakin zamanda ekip üyeleri eklenecektir.
                </div>
              </RevealSection>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '48px 40px',
              }}>
                {members.map((member, i) => (
                  <MemberCard key={member.id} member={member} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
