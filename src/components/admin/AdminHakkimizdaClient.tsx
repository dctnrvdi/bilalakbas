'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
  { id: 'hero', label: 'Hero & Hikaye' },
  { id: 'istatistik', label: 'İstatistikler' },
  { id: 'degerler', label: 'Değerler' },
  { id: 'tarihce', label: 'Tarihçe' },
  { id: 'surec', label: 'Süreç' },
]

export default function AdminHakkimizdaClient({
  settings,
}: {
  settings: Record<string, string>
}) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('hero')
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const foc = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = 'var(--gold)')
  const blu = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = 'var(--border-subtle)')

  const inp = (name: string, placeholder?: string) => (
    <input name={name} value={(form as any)[name]} onChange={onChange}
      placeholder={placeholder} style={I} onFocus={foc} onBlur={blu} />
  )
  const ta = (name: string, rows = 2, placeholder?: string) => (
    <textarea name={name} value={(form as any)[name]} onChange={onChange}
      rows={rows} placeholder={placeholder}
      style={{ ...I, resize: 'vertical' }} onFocus={foc} onBlur={blu} />
  )

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

      {/* Header */}
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
          }}>Hakkımızda Sayfası</h1>
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
        display: 'flex', gap: '0',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: '28px', overflowX: 'auto',
      }}>
        {TABS.map(tab => {
          const active = activeTab === tab.id
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: '12px 20px',
              background: 'none', border: 'none',
              borderBottom: active ? '2px solid var(--gold)' : '2px solid transparent',
              color: active ? 'var(--gold)' : 'var(--text-secondary)',
              cursor: 'pointer', fontSize: '12px', fontWeight: 500,
              letterSpacing: '0.06em', whiteSpace: 'nowrap',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              transition: 'color 0.2s ease',
            }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text-primary)' }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* HERO & HİKAYE */}
      {activeTab === 'hero' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Section title="Hero Başlık" hint="3 satır başlık — 2. satır altın italik görünür">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              <Field label="Satır 1">{inp('about_hero_title1', 'İnşaatı Bir')}</Field>
              <Field label="Satır 2 (altın)">{inp('about_hero_title2', 'Sanat Olarak')}</Field>
              <Field label="Satır 3">{inp('about_hero_title3', 'Görüyoruz.')}</Field>
            </div>
          </Section>
          <Section title="Hikayemiz">
            <Field label="Başlık">{inp('about_story_title', '10 Yıldan Fazla Deneyim')}</Field>
            <Field label="Paragraf 1 (çok satır destekli)">{ta('about_story_text1', 3)}</Field>
            <Field label="Paragraf 2 (çok satır destekli)">{ta('about_story_text2', 3)}</Field>
          </Section>
        </div>
      )}

      {/* İSTATİSTİKLER */}
      {activeTab === 'istatistik' && (
        <Section title="İstatistikler (2×2 grid)" hint="Hikaye bölümünün sağında yer alır">
          {[1, 2, 3, 4].map(n => (
            <div key={n} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '10px' }}>
              <Field label={`Değer ${n}`}>{inp(`about_stat${n}_value`, '10+')}</Field>
              <Field label={`Etiket ${n}`}>{inp(`about_stat${n}_label`, 'Yıl Deneyim')}</Field>
            </div>
          ))}
        </Section>
      )}

      {/* DEĞERLER */}
      {activeTab === 'degerler' && (
        <Section title="Değerlerimiz" hint="4 kart — siteye göre 01/02/03/04 numaralı">
          {[1, 2, 3, 4].map(n => (
            <div key={n} style={{
              display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px',
              padding: '14px', background: 'var(--dark)',
              border: '1px solid var(--border-subtle)', borderRadius: '2px',
            }}>
              <Field label={`Kart ${n} — Başlık`}>{inp(`about_val${n}_title`)}</Field>
              <Field label="Açıklama (çok satır)">{ta(`about_val${n}_desc`, 2)}</Field>
            </div>
          ))}
        </Section>
      )}

      {/* TARİHÇE */}
      {activeTab === 'tarihce' && (
        <Section title="Tarihçe" hint="6 dönüm noktası — yıl sütunu solda, timeline formatı">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} style={{
              display: 'grid', gridTemplateColumns: '90px 1fr 2fr', gap: '10px',
              padding: '14px', background: 'var(--dark)',
              border: '1px solid var(--border-subtle)', borderRadius: '2px',
              alignItems: 'start',
            }}>
              <Field label={`Yıl ${n}`}>{inp(`about_ms${n}_year`, '2018')}</Field>
              <Field label="Başlık">{inp(`about_ms${n}_title`)}</Field>
              <Field label="Açıklama">{ta(`about_ms${n}_desc`, 2)}</Field>
            </div>
          ))}
        </Section>
      )}

      {/* SÜREÇ */}
      {activeTab === 'surec' && (
        <Section title="Çalışma Süreci" hint="4 adım — 01/02/03/04 sırasıyla">
          {[1, 2, 3, 4].map(n => (
            <div key={n} style={{
              display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px',
              padding: '14px', background: 'var(--dark)',
              border: '1px solid var(--border-subtle)', borderRadius: '2px',
            }}>
              <Field label={`Adım ${n} — Başlık`}>{inp(`about_proc${n}_title`)}</Field>
              <Field label="Açıklama">{ta(`about_proc${n}_desc`, 2)}</Field>
            </div>
          ))}
        </Section>
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
        padding: '14px 24px',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--dark-3)',
        display: 'flex', alignItems: 'baseline', gap: '12px',
      }}>
        <p style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: '18px', fontWeight: 400,
          color: 'var(--text-primary)', lineHeight: 1,
        }}>{title}</p>
        {hint && <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{hint}</span>}
      </div>
      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
        color: 'var(--text-muted)', marginBottom: '6px',
      }}>{label}</label>
      {children}
    </div>
  )
}
