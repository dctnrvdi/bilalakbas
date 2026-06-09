'use client'

import { useRef, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z.string().min(2, 'Ad en az 2 karakter olmali'),
  email: z.string().email('Gecerli bir e-posta girin'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Konu seciniz'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmali'),
})

type FormData = z.infer<typeof schema>

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

const inputBase: React.CSSProperties = {
  width: '100%',
  background: 'var(--dark-3)',
  padding: '16px 20px',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-dm-sans), sans-serif',
  fontSize: '14px',
  fontWeight: 300,
  outline: 'none',
  transition: 'border-color 0.3s ease',
}

export default function IletisimClient() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/iletisim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const getInputStyle = (hasError: boolean): React.CSSProperties => ({
    ...inputBase,
    border: `1px solid ${hasError ? '#e05a5a' : 'var(--border-subtle)'}`,
  })

  return (
    <main>
      {/* ── HERO ── */}
      <section style={{
        position: 'relative', minHeight: '55vh',
        display: 'flex', alignItems: 'flex-end',
        paddingBottom: '80px', overflow: 'hidden',
        background: 'var(--dark)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.06) 0%, transparent 50%),
            linear-gradient(135deg, #0A0C0F 0%, #111318 100%)
          `,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: '-20px', top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: 'clamp(80px, 14vw, 200px)', fontWeight: 300,
          color: 'transparent', WebkitTextStroke: '1px rgba(201,168,76,0.05)',
          pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap',
        }}>ILETISIM</div>

        <div className="container-site" style={{ position: 'relative', zIndex: 2, paddingTop: '160px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--gold)' }} />
            <span style={{
              fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)',
            }}>Bize Ulasin</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(48px, 7vw, 88px)',
            fontWeight: 300, lineHeight: 1.05,
            letterSpacing: '-0.02em', color: 'var(--text-primary)',
          }}>
            Projenizi<br />
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Konusalim.</em>
          </h1>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="section-pad">
        <div className="container-site">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '80px',
          }}>
            {/* Left */}
            <RevealSection>
              <div>
                <p style={{
                  fontSize: '11px', fontWeight: 500,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'var(--gold)', marginBottom: '40px',
                }}>Iletisim Bilgileri</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                  {[
                    { label: 'Adres', lines: ['Maslak Mahallesi, Buyukdere Cad.', 'No:123 Kat:5', 'Sarıyer / Istanbul'] },
                    { label: 'Telefon', lines: ['+90 212 000 00 00', '+90 532 000 00 00'] },
                    { label: 'E-posta', lines: ['info@ozkurinsaat.com', 'proje@ozkurinsaat.com'] },
                    { label: 'Calisma Saatleri', lines: ['Pazartesi - Cuma: 09:00 - 18:00', 'Cumartesi: 10:00 - 14:00'] },
                  ].map(item => (
                    <div key={item.label}>
                      <p style={{
                        fontSize: '10px', fontWeight: 600,
                        letterSpacing: '0.18em', textTransform: 'uppercase',
                        color: 'var(--text-muted)', marginBottom: '10px',
                      }}>{item.label}</p>
                      {item.lines.map(line => (
                        <p key={line} style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{line}</p>
                      ))}
                    </div>
                  ))}
                </div>
                <div style={{ margin: '48px 0', height: '1px', background: 'var(--border-subtle)' }} />
                <blockquote style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: '22px', fontWeight: 300, fontStyle: 'italic',
                  color: 'var(--text-secondary)', lineHeight: 1.6,
                  borderLeft: '2px solid var(--gold)', paddingLeft: '24px',
                }}>
                  "Her buyuk yapi, bir ilk gorusmeyle baslar."
                </blockquote>
              </div>
            </RevealSection>

            {/* Right — Form */}
            <RevealSection delay={0.2}>
              <div>
                <p style={{
                  fontSize: '11px', fontWeight: 500,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'var(--gold)', marginBottom: '40px',
                }}>Mesaj Gonderin</p>

                {status === 'success' ? (
                  <div style={{
                    padding: '48px 40px', background: 'var(--dark-3)',
                    border: '1px solid rgba(201,168,76,0.2)', textAlign: 'center',
                  }}>
                    <div style={{
                      width: '48px', height: '48px',
                      border: '1px solid var(--gold)', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 24px',
                    }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4 10l4 4 8-8" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: '28px', fontWeight: 300,
                      color: 'var(--text-primary)', marginBottom: '12px',
                    }}>Mesajiniz Iletildi</h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                      En kisa surede sizinle iletisime gecegiz.
                    </p>
                    <button onClick={() => setStatus('idle')} className="btn-gold" style={{ marginTop: '32px' }}>
                      Yeni Mesaj
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} noValidate>

                    {/* Name + Email */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{
                          display: 'block', fontSize: '10px', fontWeight: 600,
                          letterSpacing: '0.15em', textTransform: 'uppercase',
                          color: 'var(--text-muted)', marginBottom: '8px',
                        }}>Ad Soyad *</label>
                        <input
                          {...register('name')}
                          style={getInputStyle(!!errors.name)}
                          onFocus={e => { if (!errors.name) e.target.style.borderColor = 'var(--gold)' }}
                          onBlur={e => { if (!errors.name) e.target.style.borderColor = 'var(--border-subtle)' }}
                        />
                        {errors.name && (
                          <p style={{ fontSize: '11px', color: '#e05a5a', marginTop: '4px' }}>{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label style={{
                          display: 'block', fontSize: '10px', fontWeight: 600,
                          letterSpacing: '0.15em', textTransform: 'uppercase',
                          color: 'var(--text-muted)', marginBottom: '8px',
                        }}>E-posta *</label>
                        <input
                          {...register('email')}
                          type="email"
                          style={getInputStyle(!!errors.email)}
                          onFocus={e => { if (!errors.email) e.target.style.borderColor = 'var(--gold)' }}
                          onBlur={e => { if (!errors.email) e.target.style.borderColor = 'var(--border-subtle)' }}
                        />
                        {errors.email && (
                          <p style={{ fontSize: '11px', color: '#e05a5a', marginTop: '4px' }}>{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Phone + Subject */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{
                          display: 'block', fontSize: '10px', fontWeight: 600,
                          letterSpacing: '0.15em', textTransform: 'uppercase',
                          color: 'var(--text-muted)', marginBottom: '8px',
                        }}>Telefon</label>
                        <input
                          {...register('phone')}
                          type="tel"
                          style={getInputStyle(false)}
                          onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                          onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
                        />
                      </div>
                      <div>
                        <label style={{
                          display: 'block', fontSize: '10px', fontWeight: 600,
                          letterSpacing: '0.15em', textTransform: 'uppercase',
                          color: 'var(--text-muted)', marginBottom: '8px',
                        }}>Konu *</label>
                        <select
                          {...register('subject')}
                          style={{ ...getInputStyle(!!errors.subject), cursor: 'pointer' }}
                          onFocus={e => { if (!errors.subject) e.target.style.borderColor = 'var(--gold)' }}
                          onBlur={e => { if (!errors.subject) e.target.style.borderColor = 'var(--border-subtle)' }}
                        >
                          <option value="">Seciniz</option>
                          <option value="Konut Projesi">Konut Projesi</option>
                          <option value="Ticari Proje">Ticari Proje</option>
                          <option value="Renovasyon">Renovasyon</option>
                          <option value="Ic Mimari">Ic Mimari</option>
                          <option value="Genel Bilgi">Genel Bilgi</option>
                        </select>
                        {errors.subject && (
                          <p style={{ fontSize: '11px', color: '#e05a5a', marginTop: '4px' }}>{errors.subject.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label style={{
                        display: 'block', fontSize: '10px', fontWeight: 600,
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                        color: 'var(--text-muted)', marginBottom: '8px',
                      }}>Mesajiniz *</label>
                      <textarea
                        {...register('message')}
                        rows={6}
                        style={{ ...getInputStyle(!!errors.message), resize: 'vertical' }}
                        onFocus={e => { if (!errors.message) e.target.style.borderColor = 'var(--gold)' }}
                        onBlur={e => { if (!errors.message) e.target.style.borderColor = 'var(--border-subtle)' }}
                      />
                      {errors.message && (
                        <p style={{ fontSize: '11px', color: '#e05a5a', marginTop: '4px' }}>{errors.message.message}</p>
                      )}
                    </div>

                    {status === 'error' && (
                      <p style={{ fontSize: '13px', color: '#e05a5a' }}>Bir hata olustu, lutfen tekrar deneyin.</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-gold"
                      style={{
                        width: '100%', justifyContent: 'center',
                        padding: '18px', marginTop: '8px',
                        opacity: status === 'loading' ? 0.7 : 1,
                        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {status === 'loading' ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
                            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="10"/>
                          </svg>
                          Gonderiliyor...
                        </>
                      ) : 'Mesaji Gonder'}
                    </button>
                  </form>
                )}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section style={{ background: 'var(--dark-2)', padding: '0' }}>
        <div style={{
          width: '100%', height: '300px',
          background: 'var(--dark-3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderTop: '1px solid var(--border-subtle)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }} />
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{
              width: '48px', height: '48px',
              border: '1px solid var(--gold)', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C7.24 2 5 4.24 5 7c0 4.25 5 11 5 11s5-6.75 5-11c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 1 1 10 5a1.5 1.5 0 0 1 0 3.5z" fill="#C9A84C"/>
              </svg>
            </div>
            <p style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: '20px', fontWeight: 300, color: 'var(--text-secondary)',
            }}>Maslak, Istanbul</p>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  )
}