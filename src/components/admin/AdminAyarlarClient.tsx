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
    id: 'hizmetler',
    label: 'Hizmetler',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="9" y="2" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="2" y="9" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="9" y="9" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    id: 'iletisim',
    label: 'İletişim & Footer',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="3" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M1 6l7 4 7-4" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    id: 'marka',
    label: 'Marka',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
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
  const [activeTab, setActiveTab] = useState('anasayfa')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    logo_url: settings.logo_url || '',
    favicon_url: settings.favicon_url || '',
    hero_video_url: settings.hero_video_url || '',
    hero_image_url: settings.hero_image_url || '',
    hero_title: settings.hero_title || '',
    hero_subtitle: settings.hero_subtitle || '',
    stat_1_value: settings.stat_1_value || '',
    stat_1_label: settings.stat_1_label || '',
    stat_2_value: settings.stat_2_value || '',
    stat_2_label: settings.stat_2_label || '',
    stat_3_value: settings.stat_3_value || '',
    stat_3_label: settings.stat_3_label || '',
    stat_4_value: settings.stat_4_value || '',
    stat_4_label: settings.stat_4_label || '',
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
    contact_phone: settings.contact_phone || '',
    contact_email: settings.contact_email || '',
    contact_address: settings.contact_address || '',
    footer_phone: settings.footer_phone || '',
    footer_email: settings.footer_email || '',
    footer_address: settings.footer_address || '',
    footer_tagline: settings.footer_tagline || '',
  })

  const set = (name: string, value: string) =>
    setForm(prev => ({ ...prev, [name]: value }))

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    set(e.target.name, e.target.value)

  const foc = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = 'var(--gold)')
  const blu = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = 'var(--border-subtle)')

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

  const inp = (name: keyof typeof form, placeholder?: string) => (
    <input
      name={name}
      value={form[name]}
      onChange={onChange}
      placeholder={placeholder}
      style={I}
      onFocus={foc}
      onBlur={blu}
    />
  )

  const ta = (name: keyof typeof form, rows = 3, placeholder?: string) => (
    <textarea
      name={name}
      value={form[name]}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      style={{ ...I, resize: 'vertical' }}
      onFocus={foc}
      onBlur={blu}
    />
  )

  return (
    <div style={{ maxWidth: '860px' }}>

      {/* ── Page header + save ── */}
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
            <span style={{
              fontSize: '11px', color: '#4caf50',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Kaydedildi
            </span>
          )}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-gold"
            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{
        display: 'flex', gap: '0',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: '28px',
        overflowX: 'auto',
      }}>
        {TABS.map(tab => {
          const active = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '12px 20px',
                background: 'none', border: 'none',
                borderBottom: active ? '2px solid var(--gold)' : '2px solid transparent',
                color: active ? 'var(--gold)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '12px', fontWeight: 500,
                letterSpacing: '0.06em',
                fontFamily: 'var(--font-dm-sans), sans-serif',
                transition: 'color 0.2s ease',
                whiteSpace: 'nowrap',
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

      {/* ── ANA SAYFA ── */}
      {activeTab === 'anasayfa' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <Section title="Hero Bölümü" hint="Siteye girince görünen tam ekran alan">
            <Field label="Başlık">
              {inp('hero_title', 'Güven Üzerine İnşa Edilmiş.')}
            </Field>
            <Field label="Alt Başlık (çok satır destekli)">
              {ta('hero_subtitle', 2, 'Kısa bir slogan...')}
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Field label="Hero Video (öncelikli)">
                <MediaUpload
                  value={form.hero_video_url}
                  onChange={url => set('hero_video_url', url)}
                  accept="video"
                />
              </Field>
              <Field label="Hero Görsel (video yoksa gösterilir)">
                <MediaUpload
                  value={form.hero_image_url}
                  onChange={url => set('hero_image_url', url)}
                  accept="image"
                />
              </Field>
            </div>
          </Section>

          <Section title="İstatistikler" hint="Hero altındaki 4 rakam">
            {[1, 2, 3, 4].map(n => (
              <div key={n} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '10px', alignItems: 'end' }}>
                <Field label={`Değer ${n}`}>
                  <input name={`stat_${n}_value`} value={(form as any)[`stat_${n}_value`]} onChange={onChange} placeholder="10+" style={I} onFocus={foc} onBlur={blu} />
                </Field>
                <Field label={`Etiket ${n}`}>
                  <input name={`stat_${n}_label`} value={(form as any)[`stat_${n}_label`]} onChange={onChange} placeholder="Yıl Deneyim" style={I} onFocus={foc} onBlur={blu} />
                </Field>
              </div>
            ))}
          </Section>

        </div>
      )}

      {/* ── HİZMETLER ── */}
      {activeTab === 'hizmetler' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <Section title="Bölüm Başlığı" hint="Hizmetler kısmının üst metinleri">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <Field label="Küçük Etiket">
                {inp('services_label', 'Hizmetlerimiz')}
              </Field>
              <Field label="Başlık">
                {inp('services_title', 'Konut & Ticari')}
              </Field>
              <Field label="Alt Başlık (altın italic)">
                {inp('services_subtitle', 'Mükemmeliyetle Teslim')}
              </Field>
            </div>
          </Section>

          <Section title="Hizmet Kartları" hint="4 kart, çok satır açıklama destekli">
            {[1, 2, 3, 4].map(n => (
              <div key={n} style={{
                display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px',
                padding: '16px', background: 'var(--dark)',
                border: '1px solid var(--border-subtle)', borderRadius: '2px',
              }}>
                <Field label={`Kart ${n} — Başlık`}>
                  <input name={`service_${n}_title`} value={(form as any)[`service_${n}_title`]} onChange={onChange} style={I} onFocus={foc} onBlur={blu} />
                </Field>
                <Field label="Açıklama">
                  <textarea name={`service_${n}_desc`} value={(form as any)[`service_${n}_desc`]} onChange={onChange} rows={2} style={{ ...I, resize: 'vertical' }} onFocus={foc} onBlur={blu} />
                </Field>
              </div>
            ))}
          </Section>

        </div>
      )}

      {/* ── İLETİŞİM & FOOTER ── */}
      {activeTab === 'iletisim' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <Section title="İletişim Bilgileri" hint="İletişim sayfasında görünen bilgiler">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Field label="Telefon">
                {inp('contact_phone', '+90 232 000 00 00')}
              </Field>
              <Field label="E-posta">
                {inp('contact_email', 'info@bilalakbas.com')}
              </Field>
            </div>
            <Field label="Adres (her satır için Enter'a basın)">
              {ta('contact_address', 3, 'Sokak, Mahalle\nİzmir')}
            </Field>
          </Section>

          <Section title="Footer" hint="Sayfanın en altındaki bilgiler">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Field label="Telefon">
                {inp('footer_phone', '+90 232 000 00 00')}
              </Field>
              <Field label="E-posta">
                {inp('footer_email', 'info@bilalakbas.com')}
              </Field>
            </div>
            <Field label="Adres">
              {inp('footer_address', 'İzmir, Türkiye')}
            </Field>
            <Field label="Slogan">
              {inp('footer_tagline', 'Güven · Kalite · Mükemmellik')}
            </Field>
          </Section>

        </div>
      )}

      {/* ── MARKA ── */}
      {activeTab === 'marka' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <Section title="Logo" hint="Navbar'da görünen logo görseli">
            <MediaUpload
              value={form.logo_url}
              onChange={url => set('logo_url', url)}
              accept="image"
            />
            {form.logo_url && (
              <div style={{
                marginTop: '12px', padding: '20px 24px',
                background: 'var(--dark)', border: '1px solid var(--border-subtle)',
                display: 'inline-flex', alignItems: 'center', gap: '16px',
              }}>
                <img src={form.logo_url} alt="Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Önizleme</span>
              </div>
            )}
          </Section>

          <Section title="Favicon" hint="Tarayıcı sekmesinde görünen küçük ikon (32×32 PNG önerilir)">
            <MediaUpload
              value={form.favicon_url}
              onChange={url => set('favicon_url', url)}
              accept="image"
            />
            {form.favicon_url && (
              <div style={{
                marginTop: '12px', padding: '16px 20px',
                background: 'var(--dark)', border: '1px solid var(--border-subtle)',
                display: 'inline-flex', alignItems: 'center', gap: '16px',
              }}>
                <img src={form.favicon_url} alt="Favicon" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>32×32 Önizleme</span>
              </div>
            )}
          </Section>

        </div>
      )}

    </div>
  )
}

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: 'var(--dark-2)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '3px',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--dark-3)',
        display: 'flex', alignItems: 'baseline', gap: '12px',
      }}>
        <p style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: '18px', fontWeight: 400,
          color: 'var(--text-primary)', lineHeight: 1,
        }}>{title}</p>
        {hint && (
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{hint}</span>
        )}
      </div>
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {children}
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{
        display: 'block',
        fontSize: '9px', fontWeight: 700,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'var(--text-muted)', marginBottom: '7px',
      }}>{label}</label>
      {children}
    </div>
  )
}
