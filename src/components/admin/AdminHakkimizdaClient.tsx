'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

const subHeading: React.CSSProperties = {
  fontSize: '11px', color: 'var(--text-muted)',
  letterSpacing: '0.1em', textTransform: 'uppercase',
  marginTop: '8px', marginBottom: '12px',
}

export default function AdminHakkimizdaClient({
  settings,
}: {
  settings: Record<string, string>
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    about_hero_title1: settings.about_hero_title1 || '',
    about_hero_title2: settings.about_hero_title2 || '',
    about_hero_title3: settings.about_hero_title3 || '',
    about_story_title: settings.about_story_title || '',
    about_story_text1: settings.about_story_text1 || '',
    about_story_text2: settings.about_story_text2 || '',
    about_stat1_value: settings.about_stat1_value || '',
    about_stat1_label: settings.about_stat1_label || '',
    about_stat2_value: settings.about_stat2_value || '',
    about_stat2_label: settings.about_stat2_label || '',
    about_stat3_value: settings.about_stat3_value || '',
    about_stat3_label: settings.about_stat3_label || '',
    about_stat4_value: settings.about_stat4_value || '',
    about_stat4_label: settings.about_stat4_label || '',
    about_val1_title: settings.about_val1_title || '',
    about_val1_desc: settings.about_val1_desc || '',
    about_val2_title: settings.about_val2_title || '',
    about_val2_desc: settings.about_val2_desc || '',
    about_val3_title: settings.about_val3_title || '',
    about_val3_desc: settings.about_val3_desc || '',
    about_val4_title: settings.about_val4_title || '',
    about_val4_desc: settings.about_val4_desc || '',
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
    about_proc1_title: settings.about_proc1_title || '',
    about_proc1_desc: settings.about_proc1_desc || '',
    about_proc2_title: settings.about_proc2_title || '',
    about_proc2_desc: settings.about_proc2_desc || '',
    about_proc3_title: settings.about_proc3_title || '',
    about_proc3_desc: settings.about_proc3_desc || '',
    about_proc4_title: settings.about_proc4_title || '',
    about_proc4_desc: settings.about_proc4_desc || '',
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
        }}>Hakkımızda Sayfası</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px' }}>

        {/* Hero Başlık */}
        <div style={{ background: 'var(--dark-2)', border: '1px solid var(--border-subtle)', padding: '32px' }}>
          <p style={sectionTitle}>Hero Başlık</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={subHeading}>Üç satır başlık (2. satır altın italik görünür)</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Satır 1</label>
                <input name="about_hero_title1" value={form.about_hero_title1} onChange={handleChange} placeholder="İnşaatı Bir" style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} />
              </div>
              <div>
                <label style={labelStyle}>Satır 2 (altın italic)</label>
                <input name="about_hero_title2" value={form.about_hero_title2} onChange={handleChange} placeholder="Sanat Olarak" style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} />
              </div>
              <div>
                <label style={labelStyle}>Satır 3</label>
                <input name="about_hero_title3" value={form.about_hero_title3} onChange={handleChange} placeholder="Görüyoruz." style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} />
              </div>
            </div>
          </div>
        </div>

        {/* Hikayemiz */}
        <div style={{ background: 'var(--dark-2)', border: '1px solid var(--border-subtle)', padding: '32px' }}>
          <p style={sectionTitle}>Hikayemiz</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Başlık</label>
              <input name="about_story_title" value={form.about_story_title} onChange={handleChange} placeholder="10 Yıldan Fazla Deneyim" style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} />
            </div>
            <div>
              <label style={labelStyle}>Paragraf 1</label>
              <textarea name="about_story_text1" value={form.about_story_text1} onChange={handleChange} rows={3} style={{ ...inputStyle, resize: 'vertical' }} onFocus={focusGold} onBlur={blurSubtle} />
            </div>
            <div>
              <label style={labelStyle}>Paragraf 2</label>
              <textarea name="about_story_text2" value={form.about_story_text2} onChange={handleChange} rows={3} style={{ ...inputStyle, resize: 'vertical' }} onFocus={focusGold} onBlur={blurSubtle} />
            </div>
          </div>
        </div>

        {/* İstatistikler */}
        <div style={{ background: 'var(--dark-2)', border: '1px solid var(--border-subtle)', padding: '32px' }}>
          <p style={sectionTitle}>İstatistikler (2×2 grid)</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[1, 2, 3, 4].map(n => (
              <div key={n} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Değer {n}</label>
                  <input name={`about_stat${n}_value`} value={(form as any)[`about_stat${n}_value`]} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} />
                </div>
                <div>
                  <label style={labelStyle}>Etiket {n}</label>
                  <input name={`about_stat${n}_label`} value={(form as any)[`about_stat${n}_label`]} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Değerlerimiz */}
        <div style={{ background: 'var(--dark-2)', border: '1px solid var(--border-subtle)', padding: '32px' }}>
          <p style={sectionTitle}>Değerlerimiz (4 kart)</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3, 4].map(n => (
              <div key={n} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Kart {n} Başlık</label>
                  <input name={`about_val${n}_title`} value={(form as any)[`about_val${n}_title`]} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} />
                </div>
                <div>
                  <label style={labelStyle}>Kart {n} Açıklama</label>
                  <textarea name={`about_val${n}_desc`} value={(form as any)[`about_val${n}_desc`]} onChange={handleChange} rows={2} style={{ ...inputStyle, resize: 'vertical' }} onFocus={focusGold} onBlur={blurSubtle} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ background: 'var(--dark-2)', border: '1px solid var(--border-subtle)', padding: '32px' }}>
          <p style={sectionTitle}>Tarihçe (6 adım)</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 2fr', gap: '12px', alignItems: 'start' }}>
                <div>
                  <label style={labelStyle}>Yıl {n}</label>
                  <input name={`about_ms${n}_year`} value={(form as any)[`about_ms${n}_year`]} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} />
                </div>
                <div>
                  <label style={labelStyle}>Başlık {n}</label>
                  <input name={`about_ms${n}_title`} value={(form as any)[`about_ms${n}_title`]} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} />
                </div>
                <div>
                  <label style={labelStyle}>Açıklama {n}</label>
                  <textarea name={`about_ms${n}_desc`} value={(form as any)[`about_ms${n}_desc`]} onChange={handleChange} rows={2} style={{ ...inputStyle, resize: 'vertical' }} onFocus={focusGold} onBlur={blurSubtle} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Çalışma Süreci */}
        <div style={{ background: 'var(--dark-2)', border: '1px solid var(--border-subtle)', padding: '32px' }}>
          <p style={sectionTitle}>Çalışma Süreci (4 adım)</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3, 4].map(n => (
              <div key={n} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Adım {n} Başlık</label>
                  <input name={`about_proc${n}_title`} value={(form as any)[`about_proc${n}_title`]} onChange={handleChange} style={inputStyle} onFocus={focusGold} onBlur={blurSubtle} />
                </div>
                <div>
                  <label style={labelStyle}>Adım {n} Açıklama</label>
                  <textarea name={`about_proc${n}_desc`} value={(form as any)[`about_proc${n}_desc`]} onChange={handleChange} rows={2} style={{ ...inputStyle, resize: 'vertical' }} onFocus={focusGold} onBlur={blurSubtle} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-gold"
            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer', padding: '14px 40px' }}
          >
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
          {saved && <p style={{ fontSize: '13px', color: '#4caf50' }}>Kaydedildi</p>}
        </div>
      </div>
    </div>
  )
}
