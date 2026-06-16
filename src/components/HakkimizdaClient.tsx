'use client'

import { useRef, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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

export default function HakkimizdaClient({ settings = {} }: { settings?: Record<string, string> }) {

  const s = settings

  // Hero
  const heroTitle1 = s.about_hero_title1 || 'Insaati Bir'
  const heroTitle2 = s.about_hero_title2 || 'Sanat Olarak'
  const heroTitle3 = s.about_hero_title3 || 'Goruyoruz.'

  // Hikaye
  const storyTitle = s.about_story_title || '10 Yildan Fazla Deneyim'
  const storyText1 = s.about_story_text1 || '2010 yilinda Istanbul\'da kurulan Bilal Akbas, konut ve ticari insaat alaninda kalite ve guvenilirligin sembolu haline geldi.'
  const storyText2 = s.about_story_text2 || 'Bugun 200\'u askın uzman kadromuzla, vizyonunuzu en yuksek standartta hayata gecirmeye devam ediyoruz.'

  // Stats (2x2)
  const stats = [
    { v: s.about_stat1_value || '10+', l: s.about_stat1_label || 'Yil Deneyim' },
    { v: s.about_stat2_value || '120+', l: s.about_stat2_label || 'Proje' },
    { v: s.about_stat3_value || '200+', l: s.about_stat3_label || 'Uzman Kadro' },
    { v: s.about_stat4_value || '%98', l: s.about_stat4_label || 'Musteri Memnuniyeti' },
  ]

  // Degerler
  const values = [
    { num: '01', title: s.about_val1_title || 'Guven', desc: s.about_val1_desc || 'Her projede soz verdigimizi yapariz. Musterilerimizle kurduğumuz guven iliskisi, onlarca yillik isbirliklerinin temelidir.' },
    { num: '02', title: s.about_val2_title || 'Kalite', desc: s.about_val2_desc || 'Malzeme seciminden son detaya kadar her asamada en yuksek standartlari uygulariz.' },
    { num: '03', title: s.about_val3_title || 'Seffaflik', desc: s.about_val3_desc || 'Surec boyunca acik iletisim kurar, musterilerimizi her adimda bilgilendiririz.' },
    { num: '04', title: s.about_val4_title || 'Surdurulebilirlik', desc: s.about_val4_desc || 'Cevre dostu malzemeler ve enerji verimli tasarimlarla gelecegi dusenerek insa ederiz.' },
  ]

  // Timeline
  const milestones = [
    { year: s.about_ms1_year || '2010', title: s.about_ms1_title || 'Kurulus', desc: s.about_ms1_desc || 'Istanbul\'da iki ortak tarafindan kuruldu.' },
    { year: s.about_ms2_year || '2013', title: s.about_ms2_title || 'Ilk Buyuk Proje', desc: s.about_ms2_desc || 'Maslak\'ta 12 katli ticari yapi tamamlandi.' },
    { year: s.about_ms3_year || '2016', title: s.about_ms3_title || 'Buyume', desc: s.about_ms3_desc || 'Ankara ve Izmir ofisleri acildi.' },
    { year: s.about_ms4_year || '2019', title: s.about_ms4_title || '100. Proje', desc: s.about_ms4_desc || 'Luks konut segmentine girildi.' },
    { year: s.about_ms5_year || '2022', title: s.about_ms5_title || 'Uluslararasi', desc: s.about_ms5_desc || 'KKTC\'de ilk yurt disi proje baslatildi.' },
    { year: s.about_ms6_year || '2024', title: s.about_ms6_title || 'Bugun', desc: s.about_ms6_desc || '120+ tamamlanmis proje, 200+ calisan.' },
  ]

  // Calisma sureci
  const process = [
    { step: '01', title: s.about_proc1_title || 'Kesif & Brifing', desc: s.about_proc1_desc || 'Ihtiyaclarinizi ve vizyonunuzu derinlemesine anliyoruz.' },
    { step: '02', title: s.about_proc2_title || 'Tasarim & Planlama', desc: s.about_proc2_desc || 'Muhendislik ve mimarlik ekibimiz detayli proje plani hazirlar.' },
    { step: '03', title: s.about_proc3_title || 'Insaat', desc: s.about_proc3_desc || 'Onaylı malzemeler ve uzman ekibimizle yapim baslar.' },
    { step: '04', title: s.about_proc4_title || 'Teslim', desc: s.about_proc4_desc || 'Eksiksiz kontrol ve denetimden sonra anahtar teslim yapilir.' },
  ]

  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section style={{
          position: 'relative', minHeight: '70vh',
          display: 'flex', alignItems: 'flex-end',
          paddingBottom: '80px', overflow: 'hidden',
          background: 'var(--dark)',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.06) 0%, transparent 50%), linear-gradient(135deg, #0A0C0F 0%, #111318 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)', backgroundSize: '80px 80px', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-60%)', fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(100px, 16vw, 240px)', fontWeight: 300, color: 'transparent', WebkitTextStroke: '1px rgba(201,168,76,0.06)', pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap' }}>INSAAT</div>
          <div className="container-site" style={{ position: 'relative', zIndex: 2, paddingTop: '160px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <div style={{ width: '40px', height: '1px', background: 'var(--gold)' }} />
              <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>Biz Kimiz</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              {heroTitle1}<br />
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>{heroTitle2}</em><br />
              {heroTitle3}
            </h1>
          </div>
        </section>

        {/* HIKAYE */}
        <section className="section-pad" style={{ background: 'var(--dark-2)' }}>
          <div className="container-site">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'center' }}>
              <RevealSection>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '24px' }}>Hikayemiz</p>
                  <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 300, lineHeight: 1.2, color: 'var(--text-primary)', marginBottom: '32px' }}>{storyTitle}</h2>
                  <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '24px' }}>{storyText1}</p>
                  <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>{storyText2}</p>
                </div>
              </RevealSection>
              <RevealSection delay={0.2}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border-subtle)' }}>
                  {stats.map(stat => (
                    <div key={stat.l} style={{ background: 'var(--dark-3)', padding: '40px 32px', textAlign: 'center' }}>
                      <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '48px', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, marginBottom: '8px' }}>{stat.v}</p>
                      <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{stat.l}</p>
                    </div>
                  ))}
                </div>
              </RevealSection>
            </div>
          </div>
        </section>

        {/* DEGERLER */}
        <section className="section-pad">
          <div className="container-site">
            <RevealSection>
              <div style={{ marginBottom: '64px' }}>
                <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>Degerlerimiz</p>
                <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 300, lineHeight: 1.1, color: 'var(--text-primary)' }}>
                  Bizi Biz Yapan<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Ilkeler</em>
                </h2>
              </div>
            </RevealSection>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1px', background: 'var(--border-subtle)' }}>
              {values.map((v, i) => (
                <RevealSection key={v.num} delay={i * 0.1}>
                  <div style={{ background: 'var(--dark)', padding: '48px 40px', transition: 'background 0.3s ease', height: '100%' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--dark-3)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'var(--dark)')}
                  >
                    <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '48px', fontWeight: 300, color: 'rgba(201,168,76,0.2)', lineHeight: 1, marginBottom: '24px' }}>{v.num}</p>
                    <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '26px', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '12px' }}>{v.title}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{v.desc}</p>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="section-pad" style={{ background: 'var(--dark-2)' }}>
          <div className="container-site">
            <RevealSection>
              <div style={{ marginBottom: '64px' }}>
                <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>Tarihcemiz</p>
                <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 300, lineHeight: 1.1, color: 'var(--text-primary)' }}>Yolculugumuz</h2>
              </div>
            </RevealSection>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '80px', top: 0, bottom: 0, width: '1px', background: 'var(--border)' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {milestones.map((m, i) => (
                  <RevealSection key={m.year} delay={i * 0.08}>
                    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '40px', padding: '40px 0', borderBottom: i < milestones.length - 1 ? '1px solid var(--border-subtle)' : 'none', alignItems: 'start' }}>
                      <div style={{ position: 'relative', textAlign: 'right', paddingRight: '40px' }}>
                        <div style={{ position: 'absolute', right: '-5px', top: '8px', width: '9px', height: '9px', borderRadius: '50%', background: 'var(--gold)', border: '2px solid var(--dark-2)' }} />
                        <span style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '28px', fontWeight: 300, color: 'var(--gold)' }}>{m.year}</span>
                      </div>
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '22px', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '8px' }}>{m.title}</h3>
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{m.desc}</p>
                      </div>
                    </div>
                  </RevealSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CALISMA SURECI */}
        <section className="section-pad">
          <div className="container-site">
            <RevealSection>
              <div style={{ marginBottom: '64px' }}>
                <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>Calisma Surecimiz</p>
                <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 300, lineHeight: 1.1, color: 'var(--text-primary)' }}>
                  Yapiyla Insa Et,<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Guvenle Teslim Et</em>
                </h2>
              </div>
            </RevealSection>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '40px' }}>
              {process.map((p, i) => (
                <RevealSection key={p.step} delay={i * 0.1}>
                  <div style={{ position: 'relative', paddingLeft: '24px' }}>
                    <div style={{ position: 'absolute', left: 0, top: '6px', width: '2px', height: '40px', background: 'var(--gold)' }} />
                    <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>{p.step}</p>
                    <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '22px', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '10px' }}>{p.title}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{p.desc}</p>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}