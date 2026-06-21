'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MediaUpload from './MediaUpload'

const I: React.CSSProperties = {
  width: '100%',
  background: 'var(--dark)',
  border: '1px solid var(--border-subtle)',
  padding: '11px 14px',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-dm-sans), sans-serif',
  fontSize: '13px',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  borderRadius: '2px',
}

const TABS = [
  {
    id: 'marka',
    label: 'Marka Kiti',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M5.5 8.5l2 2 3-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'anasayfa',
    label: 'Ana Sayfa',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M2 6l6-4 6 4v8H2V6z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M6 14v-4h4v4" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'hakkimizda',
    label: 'Hakkımızda',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'iletisim',
    label: 'İletişim',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="3" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M1 6l7 4 7-4" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
]

export default function AdminAyarlarClient({
  settings,
}: {
  settings: Record<string, string>
}) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('marka')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    // Marka
    logo_url: settings.logo_url || '',
    favicon_url: settings.favicon_url || '',
    // Ana Sayfa — Hero
    hero_video_url: settings.hero_video_url || '',
    hero_image_url: settings.hero_image_url || '',
    hero_title: settings.hero_title || '',
    hero_subtitle: settings.hero_subtitle || '',
    // Ana Sayfa — İstatistikler
    stat_1_value: settings.stat_1_value || '',
    stat_1_label: settings.stat_1_label || '',
    stat_2_value: settings.stat_2_value || '',
    stat_2_label: settings.stat_2_label || '',
    stat_3_value: settings.stat_3_value || '',
    stat_3_label: settings.stat_3_label || '',
    stat_4_value: settings.stat_4_value || '',
    stat_4_label: settings.stat_4_label || '',
    // Ana Sayfa — Hizmetler
    services_label: settings.services_label || '',
    services_title: settings.services_title || '',
    services_subtitle: settings.services_subtitle || '',
    service_1_title: settings.service_1_title || '',
    service_1_desc: settings.service_1_desc || '',
    service_2_title: settings.service_2_title || '',
    service_2_desc: settings.service_2_desc || '',
    service_3_title: settings.service_3_title || '',
    service_3_desc: settings.service_3_desc || '',
    service_4_title: settings.service_4_title || '',
    service_4_desc: settings.service_4_desc || '',
    // Hakkımızda — Hero
    about_hero_title1: settings.about_hero_title1 || '',
    about_hero_title2: settings.about_hero_title2 || '',
    about_hero_title3: settings.about_hero_title3 || '',
    // Hakkımızda — Hikaye
    about_story_title: settings.about_story_title || '',
    about_story_text1: settings.about_story_text1 || '',
    about_story_text2: settings.about_story_text2 || '',
    // Hakkımızda — İstatistikler
    about_stat1_value: settings.about_stat1_value || '',
    about_stat1_label: settings.about_stat1_label || '',
    about_stat2_value: settings.about_stat2_value || '',
    about_stat2_label: settings.about_stat2_label || '',
    about_stat3_value: settings.about_stat3_value || '',
    about_stat3_label: settings.about_stat3_label || '',
    about_stat4_value: settings.about_stat4_value || '',
    about_stat4_label: settings.about_stat4_label || '',
    // Hakkımızda — Değerler
    about_val1_title: settings.about_val1_title || '',
    about_val1_desc: settings.about_val1_desc || '',
    about_val2_title: settings.about_val2_title || '',
    about_val2_desc: settings.about_val2_desc || '',
    about_val3_title: settings.about_val3_title || '',
    about_val3_desc: settings.about_val3_desc || '',
    about_val4_title: settings.about_val4_title || '',
    about_val4_desc: settings.about_val4_desc || '',
    // Hakkımızda — Tarihçe
    about_ms1_year: settings.about_ms1_year || '',
    about_ms1_title: settings.about_ms1_title || '',
    about_ms1_desc: settings.about_ms1_desc || '',
    about_ms2_year: settings.about_ms2_year || '',
    about_ms2_title: settings.about_ms2_title || '',
    about_ms2_desc: settings.about_ms2_desc || '',
    about_ms3_year: settings.about_ms3_year || '',
    about_ms3_title: settings.about_ms3_title || '',
    about_ms3_desc: settings.about_ms3_desc || '',
    about_ms4_year: settings.about_ms4_year || '',
    about_ms4_title: settings.about_ms4_title || '',
    about_ms4_desc: settings.about_ms4_desc || '',
    about_ms5_year: settings.about_ms5_year || '',
    about_ms5_title: settings.about_ms5_title || '',
    about_ms5_desc: settings.about_ms5_desc || '',
    about_ms6_year: settings.about_ms6_year || '',
    about_ms6_title: settings.about_ms6_title || '',
    about_ms6_desc: settings.about_ms6_desc || '',
    // Hakkımızda — Süreç
    about_proc1_title: settings.about_proc1_title || '',
    about_proc1_desc: settings.about_proc1_desc || '',
    about_proc2_title: settings.about_proc2_title || '',
    about_proc2_desc: settings.about_proc2_desc || '',
    about_proc3_title: settings.about_proc3_title || '',
    about_proc3_desc: settings.about_proc3_desc || '',
    about_proc4_title: settings.about_proc4_title || '',
    about_proc4_desc: settings.about_proc4_desc || '',
    // İletişim
    contact_phone: settings.contact_phone || '',
    contact_email: settings.contact_email || '',
    contact_address: settings.contact_address || '',
    // Footer
    footer_phone: settings.footer_phone || '',
    footer_email: settings.footer_email || '',
    footer_address: settings.footer_address || '',
    footer_tagline: settings.footer_tagline || '',
    // Referans logolar
    reference_logos: settings.reference_logos || '[]',
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const foc = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = 'var(--gold)')
  const blu = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = 'var(--border-subtle)')

  const get = (name: string) => (form as any)[name] as string

  const inp = (name: string, placeholder?: string) => (
    <input name={name} value={get(name)} onChange={onChange}
      placeholder={placeholder} style={I} onFocus={foc} onBlur={blu} />
  )
  const ta = (name: string, rows = 3, placeholder?: string) => (
    <textarea name={name} value={get(name)} onChange={onChange}
      rows={rows} placeholder={placeholder}
      style={{ ...I, resize: 'vertical' }} onFocus={foc} onBlur={blu} />
  )

  const [logoUploadKey, setLogoUploadKey] = useState(0)

  const refLogos: string[] = (() => {
    try { return JSON.parse(form.reference_logos) } catch { return [] }
  })()

  const addRefLogo = (url: string) => {
    if (!url) return
    const updated = [...refLogos, url]
    setForm(p => ({ ...p, reference_logos: JSON.stringify(updated) }))
    setLogoUploadKey(k => k + 1)
  }

  const removeRefLogo = (index: number) => {
    const updated = refLogos.filter((_, i) => i !== index)
    setForm(p => ({ ...p, reference_logos: JSON.stringify(updated) }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setSaved(false)
    try {
      const res = await fetch('/api/ayarlar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSaved(true)
        router.refresh()
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '860px' }}>

      {/* Page header */}
      <div style={{
        display: 'flex', alignItems: 'flex-end',
        justifyContent: 'space-between', marginBottom: '32px',
        flexWrap: 'wrap', gap: '16px',
      }}>
        <div>
          <p style={{
            fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: '6px',
          }}>Yönetim</p>
          <h1 style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: '32px', fontWeight: 300,
            color: 'var(--text-primary)', lineHeight: 1,
          }}>Site Ayarları</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {saved && (
            <span style={{ fontSize: '11px', color: '#4caf50', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Kaydedildi
            </span>
          )}
          <button onClick={handleSubmit} disabled={loading} className="btn-gold"
            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: '28px',
        overflowX: 'auto',
      }}>
        {TABS.map(tab => {
          const active = activeTab === tab.id
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '12px 22px',
              background: 'none', border: 'none',
              borderBottom: active ? '2px solid var(--gold)' : '2px solid transparent',
              color: active ? 'var(--gold)' : 'var(--text-secondary)',
              cursor: 'pointer', fontSize: '12px', fontWeight: 500,
              letterSpacing: '0.05em', whiteSpace: 'nowrap',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              transition: 'color 0.2s ease',
            }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text-primary)' }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              {tab.icon}
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* ── MARKA KİTİ ── */}
      {activeTab === 'marka' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Section title="Logo" hint="Navbar'da görünen görsel">
            <MediaUpload value={form.logo_url}
              onChange={url => setForm(p => ({ ...p, logo_url: url }))}
              accept="image" />
            {form.logo_url && (
              <Preview>
                <img src={form.logo_url} alt="Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
                <span>Logo önizleme</span>
              </Preview>
            )}
          </Section>

          <Section title="Favicon" hint="Tarayıcı sekmesi ikonu — 32×32 PNG önerilir">
            <MediaUpload value={form.favicon_url}
              onChange={url => setForm(p => ({ ...p, favicon_url: url }))}
              accept="image" />
            {form.favicon_url && (
              <Preview>
                <img src={form.favicon_url} alt="Favicon" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                <span>32×32 önizleme</span>
              </Preview>
            )}
          </Section>
        </div>
      )}

      {/* ── ANA SAYFA ── */}
      {activeTab === 'anasayfa' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <Section title="Hero" hint="Siteye girince görünen tam ekran alan">
            <Field label="Başlık">{inp('hero_title', 'Güven Üzerine İnşa Edilmiş.')}</Field>
            <Field label="Alt Başlık">{ta('hero_subtitle', 2, 'Kısa bir slogan...')}</Field>
            <Row>
              <Field label="Video (öncelikli)">
                <MediaUpload value={form.hero_video_url}
                  onChange={url => setForm(p => ({ ...p, hero_video_url: url }))}
                  accept="video" />
              </Field>
              <Field label="Görsel (video yoksa)">
                <MediaUpload value={form.hero_image_url}
                  onChange={url => setForm(p => ({ ...p, hero_image_url: url }))}
                  accept="image" />
              </Field>
            </Row>
          </Section>

          <Section title="İstatistikler" hint="Hero'nun altındaki 4 rakam">
            {[1, 2, 3, 4].map(n => (
              <Row key={n} cols="140px 1fr">
                <Field label={`Değer ${n}`}>{inp(`stat_${n}_value`, '10+')}</Field>
                <Field label={`Etiket ${n}`}>{inp(`stat_${n}_label`, 'Yıl Deneyim')}</Field>
              </Row>
            ))}
          </Section>

          <Section title="Hizmetler Bölümü" hint="Ana sayfadaki 4 hizmet kartı">
            <Row cols="1fr 1fr 1fr">
              <Field label="Küçük Etiket">{inp('services_label', 'Hizmetlerimiz')}</Field>
              <Field label="Başlık">{inp('services_title', 'Konut & Ticari')}</Field>
              <Field label="Alt Başlık (altın)">{inp('services_subtitle', 'Mükemmeliyetle Teslim')}</Field>
            </Row>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '4px' }}>
              {[1, 2, 3, 4].map(n => (
                <div key={n} style={{
                  display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px',
                  padding: '14px', background: 'var(--dark)',
                  border: '1px solid var(--border-subtle)', borderRadius: '2px',
                }}>
                  <Field label={`Kart ${n} Başlık`}>{inp(`service_${n}_title`)}</Field>
                  <Field label="Açıklama">{ta(`service_${n}_desc`, 2)}</Field>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Referans Logolar" hint="Ana sayfada kayan logo bandı — PNG, SVG veya JPG">
            {refLogos.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '8px', marginBottom: '4px' }}>
                {refLogos.map((url, i) => (
                  <div key={i} style={{ position: 'relative', background: 'var(--dark)', border: '1px solid var(--border-subtle)', borderRadius: '2px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '72px' }}>
                    <img src={url} alt="" style={{ maxHeight: '40px', maxWidth: '100px', objectFit: 'contain', filter: 'brightness(0) invert(0.6)' }} />
                    <button
                      type="button"
                      onClick={() => removeRefLogo(i)}
                      style={{ position: 'absolute', top: '4px', right: '4px', width: '18px', height: '18px', background: 'rgba(10,12,15,0.8)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2px', lineHeight: 1 }}
                    >×</button>
                  </div>
                ))}
              </div>
            )}
            <Field label="Logo ekle (yuklenince otomatik listeye eklenir)">
              <MediaUpload
                key={logoUploadKey}
                value=""
                onChange={addRefLogo}
                accept="image"
                label="Logo yukle"
              />
            </Field>
          </Section>

        </div>
      )}

      {/* ── HAKKIMIZDA ── */}
      {activeTab === 'hakkimizda' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <Section title="Hero Başlık" hint="3 satır — 2. satır altın italik">
            <Row cols="1fr 1fr 1fr">
              <Field label="Satır 1">{inp('about_hero_title1', 'İnşaatı Bir')}</Field>
              <Field label="Satır 2 (altın)">{inp('about_hero_title2', 'Sanat Olarak')}</Field>
              <Field label="Satır 3">{inp('about_hero_title3', 'Görüyoruz.')}</Field>
            </Row>
          </Section>

          <Section title="Hikayemiz">
            <Field label="Başlık">{inp('about_story_title', '10 Yıldan Fazla Deneyim')}</Field>
            <Field label="Paragraf 1">{ta('about_story_text1', 3)}</Field>
            <Field label="Paragraf 2">{ta('about_story_text2', 3)}</Field>
          </Section>

          <Section title="İstatistikler" hint="Hikaye bölümünün yanındaki 2×2 grid">
            {[1, 2, 3, 4].map(n => (
              <Row key={n} cols="120px 1fr">
                <Field label={`Değer ${n}`}>{inp(`about_stat${n}_value`, '10+')}</Field>
                <Field label={`Etiket ${n}`}>{inp(`about_stat${n}_label`)}</Field>
              </Row>
            ))}
          </Section>

          <Section title="Değerlerimiz" hint="01/02/03/04 numaralı 4 kart">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[1, 2, 3, 4].map(n => (
                <div key={n} style={{
                  display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px',
                  padding: '14px', background: 'var(--dark)',
                  border: '1px solid var(--border-subtle)', borderRadius: '2px',
                }}>
                  <Field label={`Kart ${n} Başlık`}>{inp(`about_val${n}_title`)}</Field>
                  <Field label="Açıklama">{ta(`about_val${n}_desc`, 2)}</Field>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Tarihçe" hint="6 dönüm noktası">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} style={{
                  display: 'grid', gridTemplateColumns: '80px 1fr 2fr', gap: '10px',
                  padding: '14px', background: 'var(--dark)',
                  border: '1px solid var(--border-subtle)', borderRadius: '2px',
                  alignItems: 'start',
                }}>
                  <Field label={`Yıl ${n}`}>{inp(`about_ms${n}_year`, '2018')}</Field>
                  <Field label="Başlık">{inp(`about_ms${n}_title`)}</Field>
                  <Field label="Açıklama">{ta(`about_ms${n}_desc`, 2)}</Field>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Çalışma Süreci" hint="4 adım">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[1, 2, 3, 4].map(n => (
                <div key={n} style={{
                  display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px',
                  padding: '14px', background: 'var(--dark)',
                  border: '1px solid var(--border-subtle)', borderRadius: '2px',
                }}>
                  <Field label={`Adım ${n} Başlık`}>{inp(`about_proc${n}_title`)}</Field>
                  <Field label="Açıklama">{ta(`about_proc${n}_desc`, 2)}</Field>
                </div>
              ))}
            </div>
          </Section>

        </div>
      )}

      {/* ── İLETİŞİM ── */}
      {activeTab === 'iletisim' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <Section title="İletişim Bilgileri" hint="İletişim sayfasında görünür">
            <Row>
              <Field label="Telefon">{inp('contact_phone', '+90 232 000 00 00')}</Field>
              <Field label="E-posta">{inp('contact_email', 'info@bilalakbas.com')}</Field>
            </Row>
            <Field label="Adres (çok satır — her satır için Enter)">
              {ta('contact_address', 3, 'Sokak No, Mahalle\nİzmir')}
            </Field>
          </Section>

          <Section title="Footer" hint="Sayfanın en altındaki alan">
            <Row>
              <Field label="Telefon">{inp('footer_phone')}</Field>
              <Field label="E-posta">{inp('footer_email')}</Field>
            </Row>
            <Field label="Adres">{inp('footer_address')}</Field>
            <Field label="Slogan">{inp('footer_tagline', 'Güven · Kalite · Mükemmellik')}</Field>
          </Section>

        </div>
      )}

    </div>
  )
}

/* ── Yardımcı bileşenler ── */

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: 'var(--dark-2)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '3px', overflow: 'hidden',
    }}>
      <div style={{
        padding: '13px 22px',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--dark-3)',
        display: 'flex', alignItems: 'baseline', gap: '10px',
      }}>
        <p style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: '18px', fontWeight: 400,
          color: 'var(--text-primary)', lineHeight: 1,
        }}>{title}</p>
        {hint && <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{hint}</span>}
      </div>
      <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {children}
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{
        display: 'block', fontSize: '9px', fontWeight: 700,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'var(--text-muted)', marginBottom: '6px',
      }}>{label}</label>
      {children}
    </div>
  )
}

function Row({ children, cols = '1fr 1fr' }: { children: React.ReactNode; cols?: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: cols, gap: '12px' }}>
      {children}
    </div>
  )
}

function Preview({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      marginTop: '10px', padding: '14px 18px',
      background: 'var(--dark)', border: '1px solid var(--border-subtle)',
      display: 'inline-flex', alignItems: 'center', gap: '14px', borderRadius: '2px',
    }}>
      {Array.isArray(children)
        ? children.map((child, i) =>
            typeof child === 'string'
              ? <span key={i} style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{child}</span>
              : child
          )
        : children}
    </div>
  )
}
