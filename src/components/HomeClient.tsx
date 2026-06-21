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

function nl(text: string) {
  const parts = text.split('\n')
  return parts.map((line, i) => (
    <span key={i}>{line}{i < parts.length - 1 && <br />}</span>
  ))
}

export default function HomeClient({
  projects = [],
  settings = {},
}: {
  projects: any[]
  settings: Record<string, string>
}) {

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(40px)'
    el.style.transition = `opacity 0.7s ease ${index * 0.15}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.15}s`
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; observer.disconnect() }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <div ref={ref}>
      <Link href={`/projeler/${project.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div
          style={{ position: 'relative', aspectRatio: index === 0 ? '3/4' : '4/5', background: 'var(--dark-3)', overflow: 'hidden', cursor: 'pointer' }}
          onMouseEnter={e => {
            const inner = e.currentTarget.querySelector('.card-inner') as HTMLElement
            const overlay = e.currentTarget.querySelector('.card-overlay') as HTMLElement
            if (inner) inner.style.transform = 'scale(1.06)'
            if (overlay) overlay.style.opacity = '1'
          }}
          onMouseLeave={e => {
            const inner = e.currentTarget.querySelector('.card-inner') as HTMLElement
            const overlay = e.currentTarget.querySelector('.card-overlay') as HTMLElement
            if (inner) inner.style.transform = 'scale(1)'
            if (overlay) overlay.style.opacity = '0'
          }}
        >
          <div className="card-inner" style={{ position: 'absolute', inset: 0, transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }}>
            {project.coverImage ? (
              <img src={project.coverImage} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <div style={{
                width: '100%', height: '100%',
                background: `radial-gradient(ellipse at ${index === 0 ? '30%' : index === 1 ? '70%' : '50%'} 40%, rgba(201,168,76,0.08) 0%, transparent 60%), linear-gradient(135deg, var(--dark-3) 0%, var(--dark-4) 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '100px', fontWeight: 300, color: 'rgba(201,168,76,0.07)', userSelect: 'none' }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            )}
          </div>
          <div className="card-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 60%)', opacity: 0, transition: 'opacity 0.4s ease', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,12,15,0.92) 0%, rgba(10,12,15,0.3) 40%, transparent 70%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px' }}>
            <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '10px' }}>{project.category} · {project.year}</p>
            <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '26px', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '6px', lineHeight: 1.2 }}>{project.title}</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{project.location}</p>
            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              <span>İncele</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
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
      if (entry.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; observer.disconnect() }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])
  return <div ref={ref}>{children}</div>
}

  // Services bolumu — admin'den duzenlenebilir
  const servicesLabel = settings.services_label || 'Hizmetlerimiz'
  const servicesTitle = settings.services_title || 'Konut & Ticari'
  const servicesSubtitle = settings.services_subtitle || 'Mükemmeliyetle Teslim'

  const serviceItems = [
    {
      num: '01',
      title: settings.service_1_title || 'Konut İnşaatı',
      desc: settings.service_1_desc || 'Villadan rezidansa, her ölçekte prestijli konut projeleri.',
    },
    {
      num: '02',
      title: settings.service_2_title || 'Ticari Yapılar',
      desc: settings.service_2_desc || 'Ofis binaları, AVM ve endüstriyel tesisler.',
    },
    {
      num: '03',
      title: settings.service_3_title || 'İç Mimari',
      desc: settings.service_3_desc || 'Anahtar teslim iç tasarım ve uygulama hizmetleri.',
    },
    {
      num: '04',
      title: settings.service_4_title || 'Renovasyon',
      desc: settings.service_4_desc || 'Mevcut yapıların modern standartlara yükseltilmesi.',
    },
  ]

  return (
    <main>
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {settings.hero_video_url ? (
          <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
            <source src={settings.hero_video_url} type="video/mp4" />
          </video>
        ) : settings.hero_image_url ? (
          <img src={settings.hero_image_url} alt="Hero" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
        ) : null}

        <div style={{
          position: 'absolute', inset: 0,
          background: settings.hero_video_url || settings.hero_image_url
            ? 'linear-gradient(135deg, rgba(10,12,15,0.75) 0%, rgba(10,12,15,0.5) 100%)'
            : 'radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.07) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(201,168,76,0.04) 0%, transparent 40%), linear-gradient(135deg, #0A0C0F 0%, #111318 50%, #0A0C0F 100%)',
          zIndex: 1,
        }} />

        {!settings.hero_video_url && !settings.hero_image_url && (
          <>
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, backgroundImage: 'linear-gradient(rgba(201,168,76,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.05) 1px, transparent 1px)', backgroundSize: '80px 80px', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '15%', right: '8%', zIndex: 1, width: '1px', height: '60%', background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent)', transform: 'rotate(15deg)' }} />
            <div style={{ position: 'absolute', top: '10%', right: '12%', zIndex: 1, width: '1px', height: '50%', background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.1), transparent)', transform: 'rotate(15deg)' }} />
            <div style={{ position: 'absolute', right: '5%', top: '50%', zIndex: 1, transform: 'translateY(-50%)', width: 'clamp(300px, 40vw, 600px)', height: 'clamp(300px, 40vw, 600px)', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.06)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', right: '8%', top: '50%', zIndex: 1, transform: 'translateY(-50%)', width: 'clamp(200px, 28vw, 420px)', height: 'clamp(200px, 28vw, 420px)', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.1)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', right: '-20px', top: '50%', zIndex: 1, transform: 'translateY(-50%)', fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(100px, 16vw, 220px)', fontWeight: 300, color: 'transparent', WebkitTextStroke: '1px rgba(201,168,76,0.06)', pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap' }}>BILAL AKBAS</div>
          </>
        )}

        <div className="container-site" style={{ position: 'relative', zIndex: 2, paddingTop: '120px' }}>
          <div style={{ maxWidth: '680px' }}>
            <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
              <div style={{ width: '40px', height: '1px', background: 'var(--gold)' }} />
              <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>Est 2018 İzmir</span>
            </div>
            <h1 className="animate-fade-up delay-100" style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(52px, 7vw, 96px)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '32px' }}>
              {settings.hero_title ? (
                <>{settings.hero_title.split(' ').slice(0, -1).join(' ')}<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>{settings.hero_title.split(' ').slice(-1)[0]}</em></>
              ) : (
                <>Güven Üzerine<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>İnşa Edilmiş.</em></>
              )}
            </h1>
            <p className="animate-fade-up delay-200" style={{ fontSize: '16px', fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '460px', marginBottom: '56px' }}>
              {settings.hero_subtitle || 'Konut ve ticari projelerde detaya olan bağlılığımız, güvenilirliğimiz ve özenli icraatımızla yüksek kaliteli yapılar teslim ediyoruz.'}
            </p>
            <div className="animate-fade-up delay-300" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/projeler" className="btn-gold">
                Projelerimiz
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link href="/iletisim" className="btn-dark">İletişime Geç</Link>
            </div>
          </div>
        </div>

        <div className="animate-fade-in delay-600" style={{ position: 'absolute', bottom: '40px', left: '50%', zIndex: 2, transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Kaydır</span>
          <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: 'var(--dark-2)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '60px 0' }}>
        <div className="container-site">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '40px' }}>
            {[1, 2, 3, 4].map(n => ({
              value: settings[`stat_${n}_value`] || ['10+', '120+', '85K+', '5/5'][n - 1],
              label: settings[`stat_${n}_label`] || ['Yıl Deneyim', 'Tamamlanan Proje', 'İnşaat Alanı (m²)', 'Müşteri Memnuniyeti'][n - 1],
            })).map((stat, i) => (
              <RevealSection key={i} delay={i * 0.1}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, marginBottom: '8px' }}>{stat.value}</p>
                  <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{stat.label}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="section-pad">
        <div className="container-site">
          <RevealSection>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px', flexWrap: 'wrap', gap: '24px' }}>
              <div>
                <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>Seçili Çalışmalar</p>
                <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, lineHeight: 1.1, color: 'var(--text-primary)' }}>
                  Öne Çıkan<br />Projeler
                </h2>
              </div>
              <Link href="/projeler" className="btn-gold">Tüm Projeler</Link>
            </div>
          </RevealSection>
          {projects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)', fontSize: '14px' }}>Henüz proje eklenmemiş.</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2px' }}>
              {projects.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
            </div>
          )}
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-pad" style={{ background: 'var(--dark-2)' }}>
        <div className="container-site">
          <RevealSection>
            <div style={{ marginBottom: '64px' }}>
              <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>
                {servicesLabel}
              </p>
              <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, lineHeight: 1.1, color: 'var(--text-primary)', maxWidth: '560px' }}>
                {servicesTitle}<br />
                <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>{servicesSubtitle}</em>
              </h2>
            </div>
          </RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', background: 'var(--border-subtle)' }}>
            {serviceItems.map((service, i) => (
              <RevealSection key={service.num} delay={i * 0.1}>
                <div
                  style={{ background: 'var(--dark-2)', padding: '48px 40px', transition: 'background 0.3s ease', cursor: 'default', height: '100%' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--dark-3)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--dark-2)')}
                >
                  <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '48px', fontWeight: 300, color: 'rgba(201,168,76,0.2)', lineHeight: 1, marginBottom: '24px' }}>{service.num}</p>
                  <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '24px', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '12px' }}>{service.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{nl(service.desc)}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <RevealSection>
          <div className="container-site" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '24px' }}>Bir Projeniz mi Var?</p>
            <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 300, lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: '40px' }}>
              Vizyonunuzu<br />
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Gerçeğe Dönüştürelim.</em>
            </h2>
            <Link href="/iletisim" className="btn-gold" style={{ fontSize: '13px', padding: '16px 48px' }}>
              Bizimle İletişime Geçin
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </RevealSection>
      </section>
    </main>
  )
}
