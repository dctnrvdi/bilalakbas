'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MediaUpload from './MediaUpload'

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--dark-3)',
  border: '1px solid var(--border-subtle)',
  padding: '12px 16px',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-dm-sans), sans-serif',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.3s ease',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '10px', fontWeight: 600,
  letterSpacing: '0.15em', textTransform: 'uppercase',
  color: 'var(--text-muted)', marginBottom: '8px',
}

const sectionTitle: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant), serif',
  fontSize: '22px', fontWeight: 300,
  color: 'var(--text-primary)',
  marginBottom: '24px',
  paddingBottom: '12px',
  borderBottom: '1px solid var(--border-subtle)',
}

export default function AdminAyarlarClient({
  settings,
}: {
  settings: Record<string, string>
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    hero_video_url: settings.hero_video_url || '',
    hero_image_url: settings.hero_image_url || '',
    hero_title: settings.hero_title || 'Güven Üzerine İnşa Edilmiş.',
    hero_subtitle: settings.hero_subtitle || '',
    about_title: settings.about_title || '',
    about_text: settings.about_text || '',
    contact_phone: settings.contact_phone || '',
    contact_email: settings.contact_email || '',
    contact_address: settings.contact_address || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
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
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <p style={{
          fontSize: '11px', fontWeight: 500,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: '8px',
        }}>Site Yönetimi</p>
        <h1 style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: '36px', fontWeight: 300,
          color: 'var(--text-primary)',
        }}>Site Ayarları</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px' }}>

        {/* Hero Section */}
        <div style={{
          background: 'var(--dark-2)',
          border: '1px solid var(--border-subtle)',
          padding: '32px',
        }}>
          <p style={sectionTitle}>Ana Sayfa Hero</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <div>
              <label style={labelStyle}>Hero Başlık</label>
              <input
                name="hero_title"
                value={form.hero_title}
                onChange={handleChange}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
              />
            </div>

            <div>
              <label style={labelStyle}>Hero Alt Başlık</label>
              <textarea
                name="hero_subtitle"
                value={form.hero_subtitle}
                onChange={handleChange}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
              />
            </div>

            <div>
              <label style={labelStyle}>Hero Video (öncelikli)</label>
              <MediaUpload
                value={form.hero_video_url}
                onChange={url => setForm(prev => ({ ...prev, hero_video_url: url }))}
                accept="video"
              />
            </div>

            <div>
              <label style={labelStyle}>Hero Görsel (video yoksa gösterilir)</label>
              <MediaUpload
                value={form.hero_image_url}
                onChange={url => setForm(prev => ({ ...prev, hero_image_url: url }))}
                accept="image"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div style={{
          background: 'var(--dark-2)',
          border: '1px solid var(--border-subtle)',
          padding: '32px',
        }}>
          <p style={sectionTitle}>Hakkımızda</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Başlık</label>
              <input
                name="about_title"
                value={form.about_title}
                onChange={handleChange}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
              />
            </div>
            <div>
              <label style={labelStyle}>Ana Metin</label>
              <textarea
                name="about_text"
                value={form.about_text}
                onChange={handleChange}
                rows={5}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
              />
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div style={{
          background: 'var(--dark-2)',
          border: '1px solid var(--border-subtle)',
          padding: '32px',
        }}>
          <p style={sectionTitle}>İletişim Bilgileri</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Telefon</label>
                <input
                  name="contact_phone"
                  value={form.contact_phone}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
                />
              </div>
              <div>
                <label style={labelStyle}>E-posta</label>
                <input
                  name="contact_email"
                  value={form.contact_email}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Adres</label>
              <input
                name="contact_address"
                value={form.contact_address}
                onChange={handleChange}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
              />
            </div>
          </div>
        </div>

{/* Stats Section */}
<div style={{
  background: 'var(--dark-2)',
  border: '1px solid var(--border-subtle)',
  padding: '32px',
}}>
  <p style={sectionTitle}>Ana Sayfa Istatistikler</p>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    {[1, 2, 3, 4].map(n => (
      <div key={n} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Deger {n}</label>
          <input
            name={`stat_${n}_value`}
            value={(form as any)[`stat_${n}_value`] || ''}
            onChange={handleChange}
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
          />
        </div>
        <div>
          <label style={labelStyle}>Etiket {n}</label>
          <input
            name={`stat_${n}_label`}
            value={(form as any)[`stat_${n}_label`] || ''}
            onChange={handleChange}
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
          />
        </div>
      </div>
    ))}
  </div>
</div>

{/* Footer Section */}
<div style={{
  background: 'var(--dark-2)',
  border: '1px solid var(--border-subtle)',
  padding: '32px',
}}>
  <p style={sectionTitle}>Footer</p>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
      <div>
        <label style={labelStyle}>Telefon</label>
        <input
          name="footer_phone"
          value={(form as any).footer_phone || ''}
          onChange={handleChange}
          style={inputStyle}
          onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
        />
      </div>
      <div>
        <label style={labelStyle}>E-posta</label>
        <input
          name="footer_email"
          value={(form as any).footer_email || ''}
          onChange={handleChange}
          style={inputStyle}
          onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
        />
      </div>
    </div>
    <div>
      <label style={labelStyle}>Adres</label>
      <input
        name="footer_address"
        value={(form as any).footer_address || ''}
        onChange={handleChange}
        style={inputStyle}
        onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
        onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
      />
    </div>
    <div>
      <label style={labelStyle}>Alt Slogan</label>
      <input
        name="footer_tagline"
        value={(form as any).footer_tagline || ''}
        onChange={handleChange}
        style={inputStyle}
        onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
        onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
      />
    </div>
  </div>
</div>

        {/* Save Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-gold"
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
              padding: '14px 40px',
            }}
          >
            {loading ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
          </button>
          {saved && (
            <p style={{ fontSize: '13px', color: '#4caf50' }}>
              ✓ Ayarlar kaydedildi
            </p>
          )}
        </div>
      </div>
    </div>
  )
}