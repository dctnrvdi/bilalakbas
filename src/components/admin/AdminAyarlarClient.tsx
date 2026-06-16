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
    logo_url: settings.logo_url || '',
    favicon_url: settings.favicon_url || '',
    hero_video_url: settings.hero_video_url || '',
    hero_image_url: settings.hero_image_url || '',
    hero_title: settings.hero_title || 'Guven Uzerine Insa Edilmis.',
    hero_subtitle: settings.hero_subtitle || '',
    about_title: settings.about_title || '',
    about_text: settings.about_text || '',
    contact_phone: settings.contact_phone || '',
    contact_email: settings.contact_email || '',
    contact_address: settings.contact_address || '',
    stat_1_value: settings.stat_1_value || '',
    stat_1_label: settings.stat_1_label || '',
    stat_2_value: settings.stat_2_value || '',
    stat_2_label: settings.stat_2_label || '',
    stat_3_value: settings.stat_3_value || '',
    stat_3_label: settings.stat_3_label || '',
    stat_4_value: settings.stat_4_value || '',
    stat_4_label: settings.stat_4_label || '',
    footer_phone: settings.footer_phone || '',
    footer_email: settings.footer_email || '',
    footer_address: settings.footer_address || '',
    footer_tagline: settings.footer_tagline || '',
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
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const focusGold = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'var(--gold)'
  }
  const blurSubtle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'var(--border-subtle)'
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
        }}>Site Yonetimi</p>
        <h1 style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: '36px', fontWeight: 300,
          color: 'var(--text-primary)',
        }}>Site Ayarlari</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px' }}>

        {/* Marka / Kimlik */}
        <div style={{
          background: 'var(--dark-2)',
          border: '1px solid var(--border-subtle)',
          padding: '32px',
        }}>
          <p style={sectionTitle}>Marka Kimligi</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

            {/* Logo */}
            <div>
              <label style={labelStyle}>Logo</label>
              <MediaUpload
                value={form.logo_url}
                onChange={url => setForm(prev => ({ ...prev, logo_url: url }))}
                accept="image"
              />
              {form.logo_url && (
                <div style={{
                  marginTop: '12px',
                  padding: '16px',
                  background: 'var(--dark-3)',
                  border: '1px solid var(--border-subtle)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                  <img
                    src={form.logo_url}
                    alt="Logo onizleme"
                    style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
                  />
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                    Onizleme
                  </span>
                </div>
              )}
            </div>

            {/* Favicon */}
            <div>
              <label style={labelStyle}>Favicon</label>
              <MediaUpload
                value={form.favicon_url}
                onChange={url => setForm(prev => ({ ...prev, favicon_url: url }))}
                accept="image"
              />
              {form.favicon_url && (
                <div style={{
                  marginTop: '12px',
                  padding: '16px',
                  background: 'var(--dark-3)',
                  border: '1px solid var(--border-subtle)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                  <img
                    src={form.favicon_url}
                    alt="Favicon onizleme"
                    style={{ height: '32px', width: '32px', objectFit: 'contain' }}
                  />
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                    Onizleme (32x32 goruntuleniyor)
                  </span>
                </div>
              )}
              <p style={{
                marginTop: '8px',
                fontSize: '11px',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
              }}>
                Tarayici sekmesinde gorunur. PNG veya ICO, tercihen 32x32 veya 64x64 piksel.
              </p>
            </div>

          </div>
        </div>

        {/* Hero Section */}
        <div style={{
          background: 'var(--dark-2)',
          border: '1px solid var(--border-subtle)',
          padding: '32px',
        }}>
          <p style={sectionTitle}>Ana Sayfa Hero</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Hero Baslik</label>
              <input
                name="hero_title"
                value={form.hero_title}
                onChange={handleChange}
                style={inputStyle}
                onFocus={focusGold}
                onBlur={blurSubtle}
              />
            </div>
            <div>
              <label style={labelStyle}>Hero Alt Baslik</label>
              <textarea
                name="hero_subtitle"
                value={form.hero_subtitle}
                onChange={handleChange}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={focusGold}
                onBlur={blurSubtle}
              />
            </div>
            <div>
              <label style={labelStyle}>Hero Video (oncelikli)</label>
              <MediaUpload
                value={form.hero_video_url}
                onChange={url => setForm(prev => ({ ...prev, hero_video_url: url }))}
                accept="video"
              />
            </div>
            <div>
              <label style={labelStyle}>Hero Gorsel (video yoksa gosterilir)</label>
              <MediaUpload
                value={form.hero_image_url}
                onChange={url => setForm(prev => ({ ...prev, hero_image_url: url }))}
                accept="image"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        {/* Hakkimizda Sayfasi */}
        <div style={{ background: 'var(--dark-2)', border: '1px solid var(--border-subtle)', padding: '32px' }}>
          <p style={sectionTitle}>Hakkimizda Sayfasi</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <p style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Hero Baslik</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div><label style={labelStyle}>Satir 1</label><input name="about_hero_title1" value={(form as any).about_hero_title1 || ''} onChange={handleChange} placeholder="Insaati Bir" style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} /></div>
              <div><label style={labelStyle}>Satir 2 (altin italic)</label><input name="about_hero_title2" value={(form as any).about_hero_title2 || ''} onChange={handleChange} placeholder="Sanat Olarak" style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} /></div>
              <div><label style={labelStyle}>Satir 3</label><input name="about_hero_title3" value={(form as any).about_hero_title3 || ''} onChange={handleChange} placeholder="Goruyoruz." style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} /></div>
            </div>

            <p style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '8px' }}>Hikayemiz</p>
            <div><label style={labelStyle}>Baslik</label><input name="about_story_title" value={(form as any).about_story_title || ''} onChange={handleChange} placeholder="10 Yildan Fazla Deneyim" style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} /></div>
            <div><label style={labelStyle}>Paragraf 1</label><textarea name="about_story_text1" value={(form as any).about_story_text1 || ''} onChange={handleChange} rows={3} style={{ ...inputStyle, resize: 'vertical' }} onFocus={focusGold} onBlur={blurSubtle} /></div>
            <div><label style={labelStyle}>Paragraf 2</label><textarea name="about_story_text2" value={(form as any).about_story_text2 || ''} onChange={handleChange} rows={3} style={{ ...inputStyle, resize: 'vertical' }} onFocus={focusGold} onBlur={blurSubtle} /></div>

            <p style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '8px' }}>Istatistikler (2x2)</p>
            {[1,2,3,4].map(n => (
              <div key={n} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                <div><label style={labelStyle}>Deger {n}</label><input name={`about_stat${n}_value`} value={(form as any)[`about_stat${n}_value`] || ''} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} /></div>
                <div><label style={labelStyle}>Etiket {n}</label><input name={`about_stat${n}_label`} value={(form as any)[`about_stat${n}_label`] || ''} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} /></div>
              </div>
            ))}

            <p style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '8px' }}>Degerlerimiz (4 kart)</p>
            {[1,2,3,4].map(n => (
              <div key={n} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                <div><label style={labelStyle}>Kart {n} Baslik</label><input name={`about_val${n}_title`} value={(form as any)[`about_val${n}_title`] || ''} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} /></div>
                <div><label style={labelStyle}>Kart {n} Aciklama</label><input name={`about_val${n}_desc`} value={(form as any)[`about_val${n}_desc`] || ''} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} /></div>
              </div>
            ))}

            <p style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '8px' }}>Timeline (6 adim)</p>
            {[1,2,3,4,5,6].map(n => (
              <div key={n} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 2fr', gap: '12px' }}>
                <div><label style={labelStyle}>Yil {n}</label><input name={`about_ms${n}_year`} value={(form as any)[`about_ms${n}_year`] || ''} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} /></div>
                <div><label style={labelStyle}>Baslik {n}</label><input name={`about_ms${n}_title`} value={(form as any)[`about_ms${n}_title`] || ''} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} /></div>
                <div><label style={labelStyle}>Aciklama {n}</label><input name={`about_ms${n}_desc`} value={(form as any)[`about_ms${n}_desc`] || ''} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} /></div>
              </div>
            ))}

            <p style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '8px' }}>Calisma Sureci (4 adim)</p>
            {[1,2,3,4].map(n => (
              <div key={n} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                <div><label style={labelStyle}>Adim {n} Baslik</label><input name={`about_proc${n}_title`} value={(form as any)[`about_proc${n}_title`] || ''} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} /></div>
                <div><label style={labelStyle}>Adim {n} Aciklama</label><input name={`about_proc${n}_desc`} value={(form as any)[`about_proc${n}_desc`] || ''} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} /></div>
              </div>
            ))}

          </div>
        </div>

        {/* Contact Section */}
        <div style={{
          background: 'var(--dark-2)',
          border: '1px solid var(--border-subtle)',
          padding: '32px',
        }}>
          <p style={sectionTitle}>Iletisim Bilgileri</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Telefon</label>
                <input name="contact_phone" value={form.contact_phone} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} />
              </div>
              <div>
                <label style={labelStyle}>E-posta</label>
                <input name="contact_email" value={form.contact_email} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Adres</label>
              <input name="contact_address" value={form.contact_address} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} />
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
                    onFocus={focusGold}
                    onBlur={blurSubtle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Etiket {n}</label>
                  <input
                    name={`stat_${n}_label`}
                    value={(form as any)[`stat_${n}_label`] || ''}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={focusGold}
                    onBlur={blurSubtle}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div style={{ background: 'var(--dark-2)', border: '1px solid var(--border-subtle)', padding: '32px' }}>
          <p style={sectionTitle}>Hizmetlerimiz Bolumu</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Etiket (kucuk yazi)</label>
                <input name="services_label" value={(form as any).services_label} onChange={handleChange} placeholder="Hizmetlerimiz" style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} />
              </div>
              <div>
                <label style={labelStyle}>Baslik</label>
                <input name="services_title" value={(form as any).services_title} onChange={handleChange} placeholder="Konut & Ticari" style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} />
              </div>
              <div>
                <label style={labelStyle}>Alt baslik (altin italic)</label>
                <input name="services_subtitle" value={(form as any).services_subtitle} onChange={handleChange} placeholder="Mukemmeliyetle Teslim" style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} />
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
              <p style={{ ...labelStyle, marginBottom: '16px' }}>Hizmet Kartlari</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[1, 2, 3, 4].map(n => (
                  <div key={n} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                    <div>
                      <label style={labelStyle}>Kart {n} Baslik</label>
                      <input name={`service_${n}_title`} value={(form as any)[`service_${n}_title`] || ''} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Kart {n} Aciklama</label>
                      <input name={`service_${n}_desc`} value={(form as any)[`service_${n}_desc`] || ''} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
                <input name="footer_phone" value={form.footer_phone} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} />
              </div>
              <div>
                <label style={labelStyle}>E-posta</label>
                <input name="footer_email" value={form.footer_email} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Adres</label>
              <input name="footer_address" value={form.footer_address} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} />
            </div>
            <div>
              <label style={labelStyle}>Alt Slogan</label>
              <input name="footer_tagline" value={form.footer_tagline} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} />
            </div>
          </div>
        </div>

        {/* Save */}
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
            {loading ? 'Kaydediliyor...' : 'Ayarlari Kaydet'}
          </button>
          {saved && (
            <p style={{ fontSize: '13px', color: '#4caf50' }}>
              Ayarlar kaydedildi
            </p>
          )}
        </div>
      </div>
    </div>
  )
}