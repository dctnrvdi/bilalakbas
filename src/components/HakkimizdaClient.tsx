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

const values = [
  { num: '01', title: 'Güven', desc: 'Her projede söz verdiğimizi yaparız. Müşterilerimizle kurduğumuz güven ilişkisi, onlarca yıllık işbirliklerinin temelidir.' },
  { num: '02', title: 'Kalite', desc: 'Malzeme seçiminden son detaya kadar her aşamada en yüksek standartları uygularız.' },
  { num: '03', title: 'Şeffaflık', desc: 'Süreç boyunca açık iletişim kurar, müşterilerimizi her adımda bilgilendiririz.' },
  { num: '04', title: 'Sürdürülebilirlik', desc: 'Çevre dostu malzemeler ve enerji verimli tasarımlarla geleceği düşünerek inşa ederiz.' },
]

const milestones = [
  { year: '2010', title: 'Kuruluş', desc: 'İstanbul\'da iki ortak tarafından kuruldu.' },
  { year: '2013', title: 'İlk Büyük Proje', desc: 'Maslak\'ta 12 katlı ticari yapı tamamlandı.' },
  { year: '2016', title: 'Büyüme', desc: 'Ankara ve İzmir ofisleri açıldı.' },
  { year: '2019', title: '100. Proje', desc: 'Lüks konut segmentine girildi.' },
  { year: '2022', title: 'Uluslararası', desc: 'KKTC\'de ilk yurt dışı proje başlatıldı.' },
  { year: '2024', title: 'Bugün', desc: '120+ tamamlanmış proje, 200+ çalışan.' },
]

export default function HakkimizdaClient() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── HERO ── */}
        <section style={{
          position: 'relative', minHeight: '70vh',
          display: 'flex', alignItems: 'flex-end',
          paddingBottom: '80px', overflow: 'hidden',
          background: 'var(--dark)',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.06) 0%, transparent 50%),
            linear-gradient(135deg, #0A0C0F 0%, #111318 100%)`,
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)`,
            backgroundSize: '80px 80px', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', left: '-20px', top: '50%',
            transform: 'translateY(-60%)',
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(100px, 16vw, 240px)', fontWeight: 300,
            color: 'transparent', WebkitTextStroke: '1px rgba(201,168,76,0.06)',
            pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap',
          }}>İNŞAAT</div>

          <div className="container-site" style={{ position: 'relative', zIndex: 2, paddingTop: '160px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <div style={{ width: '40px', height: '1px', background: 'var(--gold)' }} />
              <span style={{
                fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)',
              }}>Biz Kimiz</span>
            </div>
            <h1 style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(48px, 7vw, 96px)',
              fontWeight: 300, lineHeight: 1.05,
              letterSpacing: '-0.02em', color: 'var(--text-primary)',
            }}>
              İnşaatı Bir<br />
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Sanat Olarak</em><br />
              Görüyoruz.
            </h1>
          </div>
        </section>

        {/* ── INTRO ── */}
        <section className="section-pad" style={{ background: 'var(--dark-2)' }}>
          <div className="container-site">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '80px', alignItems: 'center',
            }}>
              <RevealSection>
                <div>
                  <p style={{
                    fontSize: '11px', fontWeight: 500,
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'var(--gold)', marginBottom: '24px',
                  }}>Hikayemiz</p>
                  <h2 style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: 'clamp(32px, 4vw, 52px)',
                    fontWeight: 300, lineHeight: 1.2,
                    color: 'var(--text-primary)', marginBottom: '32px',
                  }}>10 Yıldan Fazla Deneyim</h2>
                  <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '24px' }}>
                    2010 yılında İstanbul'da kurulan Özkur İnşaat, konut ve ticari inşaat alanında kalite ve güvenilirliğin sembolü haline geldi.
                  </p>
                  <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    Bugün 200'ü aşkın uzman kadromuzla, vizyonunuzu en yüksek standartta hayata geçirmeye devam ediyoruz.
                  </p>
                </div>
              </RevealSection>

              <RevealSection delay={0.2}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr',
                  gap: '1px', background: 'var(--border-subtle)',
                }}>
                  {[
                    { v: '10+', l: 'Yıl Deneyim' },
                    { v: '120+', l: 'Proje' },
                    { v: '200+', l: 'Uzman Kadro' },
                    { v: '%98', l: 'Müşteri Memnuniyeti' },
                  ].map(s => (
                    <div key={s.l} style={{
                      background: 'var(--dark-3)', padding: '40px 32px', textAlign: 'center',
                    }}>
                      <p style={{
                        fontFamily: 'var(--font-cormorant), serif',
                        fontSize: '48px', fontWeight: 300,
                        color: 'var(--gold)', lineHeight: 1, marginBottom: '8px',
                      }}>{s.v}</p>
                      <p style={{
                        fontSize: '11px', fontWeight: 500,
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: 'var(--text-secondary)',
                      }}>{s.l}</p>
                    </div>
                  ))}
                </div>
              </RevealSection>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="section-pad">
          <div className="container-site">
            <RevealSection>
              <div style={{ marginBottom: '64px' }}>
                <p style={{
                  fontSize: '11px', fontWeight: 500,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'var(--gold)', marginBottom: '16px',
                }}>Değerlerimiz</p>
                <h2 style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 'clamp(32px, 4vw, 56px)',
                  fontWeight: 300, lineHeight: 1.1, color: 'var(--text-primary)',
                }}>
                  Bizi Biz Yapan<br />
                  <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>İlkeler</em>
                </h2>
              </div>
            </RevealSection>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1px', background: 'var(--border-subtle)',
            }}>
              {values.map((v, i) => (
                <RevealSection key={v.num} delay={i * 0.1}>
                  <div
                    style={{
                      background: 'var(--dark)', padding: '48px 40px',
                      transition: 'background 0.3s ease', height: '100%',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--dark-3)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'var(--dark)')}
                  >
                    <p style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: '48px', fontWeight: 300,
                      color: 'rgba(201,168,76,0.2)', lineHeight: 1, marginBottom: '24px',
                    }}>{v.num}</p>
                    <h3 style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: '26px', fontWeight: 400,
                      color: 'var(--text-primary)', marginBottom: '12px',
                    }}>{v.title}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{v.desc}</p>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="section-pad" style={{ background: 'var(--dark-2)' }}>
          <div className="container-site">
            <RevealSection>
              <div style={{ marginBottom: '64px' }}>
                <p style={{
                  fontSize: '11px', fontWeight: 500,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'var(--gold)', marginBottom: '16px',
                }}>Tarihçemiz</p>
                <h2 style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 'clamp(32px, 4vw, 56px)',
                  fontWeight: 300, lineHeight: 1.1, color: 'var(--text-primary)',
                }}>Yolculuğumuz</h2>
              </div>
            </RevealSection>

            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', left: '80px', top: 0, bottom: 0,
                width: '1px', background: 'var(--border)',
              }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {milestones.map((m, i) => (
                  <RevealSection key={m.year} delay={i * 0.08}>
                    <div style={{
                      display: 'grid', gridTemplateColumns: '160px 1fr',
                      gap: '40px', padding: '40px 0',
                      borderBottom: i < milestones.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                      alignItems: 'start',
                    }}>
                      <div style={{ position: 'relative', textAlign: 'right', paddingRight: '40px' }}>
                        <div style={{
                          position: 'absolute', right: '-5px', top: '8px',
                          width: '9px', height: '9px', borderRadius: '50%',
                          background: 'var(--gold)', border: '2px solid var(--dark-2)',
                        }} />
                        <span style={{
                          fontFamily: 'var(--font-cormorant), serif',
                          fontSize: '28px', fontWeight: 300, color: 'var(--gold)',
                        }}>{m.year}</span>
                      </div>
                      <div>
                        <h3 style={{
                          fontFamily: 'var(--font-cormorant), serif',
                          fontSize: '22px', fontWeight: 400,
                          color: 'var(--text-primary)', marginBottom: '8px',
                        }}>{m.title}</h3>
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{m.desc}</p>
                      </div>
                    </div>
                  </RevealSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW WE WORK ── */}
        <section className="section-pad">
          <div className="container-site">
            <RevealSection>
              <div style={{ marginBottom: '64px' }}>
                <p style={{
                  fontSize: '11px', fontWeight: 500,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'var(--gold)', marginBottom: '16px',
                }}>Çalışma Sürecimiz</p>
                <h2 style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 'clamp(32px, 4vw, 56px)',
                  fontWeight: 300, lineHeight: 1.1, color: 'var(--text-primary)',
                }}>
                  Yapıyla İnşa Et,<br />
                  <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Güvenle Teslim Et</em>
                </h2>
              </div>
            </RevealSection>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '40px',
            }}>
              {[
                { step: '01', title: 'Keşif & Brifing', desc: 'İhtiyaçlarınızı ve vizyonunuzu derinlemesine anlıyoruz.' },
                { step: '02', title: 'Tasarım & Planlama', desc: 'Mühendislik ve mimarlık ekibimiz detaylı proje planı hazırlar.' },
                { step: '03', title: 'İnşaat', desc: 'Onaylı malzemeler ve uzman ekibimizle yapım başlar.' },
                { step: '04', title: 'Teslim', desc: 'Eksiksiz kontrol ve denetimden sonra anahtar teslim yapılır.' },
              ].map((p, i) => (
                <RevealSection key={p.step} delay={i * 0.1}>
                  <div style={{ position: 'relative', paddingLeft: '24px' }}>
                    <div style={{
                      position: 'absolute', left: 0, top: '6px',
                      width: '2px', height: '40px', background: 'var(--gold)',
                    }} />
                    <p style={{
                      fontSize: '11px', fontWeight: 500,
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                      color: 'var(--gold)', marginBottom: '12px',
                    }}>{p.step}</p>
                    <h3 style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: '22px', fontWeight: 400,
                      color: 'var(--text-primary)', marginBottom: '10px',
                    }}>{p.title}</h3>
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