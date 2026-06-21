'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import MediaUpload from './MediaUpload'

function MultiUpload({ onAdd }: { onAdd: (items: { url: string; type: 'image' | 'video' }[]) => void }) {
  const [done, setDone] = useState(0)
  const [total, setTotal] = useState(0)
  const [errors, setErrors] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const busy = total > 0 && done + errors < total

  const uploadAll = async (files: File[]) => {
    setDone(0); setErrors(0); setTotal(files.length)
    const results = await Promise.all(
      files.map(async file => {
        const isVideo = file.type.startsWith('video/')
        try {
          const fd = new FormData()
          fd.append('file', file)
          fd.append('type', isVideo ? 'video' : 'image')
          const res = await fetch('/api/upload', { method: 'POST', body: fd })
          if (!res.ok) { setErrors(e => e + 1); return null }
          const data = await res.json().catch(() => ({}))
          if (data.url) { setDone(d => d + 1); return { url: data.url as string, type: (isVideo ? 'video' : 'image') as 'image' | 'video' } }
          setErrors(e => e + 1); return null
        } catch { setErrors(e => e + 1); return null }
      })
    )
    const items = results.filter((r): r is { url: string; type: 'image' | 'video' } => !!r)
    if (items.length) onAdd(items)
    setTimeout(() => setTotal(0), 1500)
  }

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length) uploadAll(files)
    e.target.value = ''
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files || [])
    if (files.length) uploadAll(files)
  }

  return (
    <div
      onClick={() => !busy && inputRef.current?.click()}
      onDragOver={e => e.preventDefault()}
      onDrop={onDrop}
      style={{
        border: '1px dashed var(--border-subtle)',
        padding: '24px 16px', cursor: busy ? 'default' : 'pointer',
        textAlign: 'center', background: 'var(--dark-3)',
        transition: 'border-color 0.2s ease',
      }}
      onMouseEnter={e => { if (!busy) (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)' }}
    >
      <input ref={inputRef} type="file" multiple accept="image/*,video/*" onChange={onInput} style={{ display: 'none' }} />
      {busy ? (
        <div>
          <p style={{ fontSize: '12px', color: 'var(--gold)', fontFamily: 'var(--font-dm-sans)', marginBottom: '8px' }}>
            {done + errors} / {total} yüklendi
          </p>
          <div style={{ height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '1px' }}>
            <div style={{
              height: '100%', background: 'var(--gold)', borderRadius: '1px',
              width: `${((done + errors) / total) * 100}%`, transition: 'width 0.3s ease',
            }} />
          </div>
          {errors > 0 && <p style={{ fontSize: '11px', color: '#e05a5a', marginTop: '6px' }}>{errors} dosya yüklenemedi</p>}
        </div>
      ) : total > 0 ? (
        <p style={{ fontSize: '12px', color: '#4caf50', fontFamily: 'var(--font-dm-sans)' }}>✓ {done} dosya eklendi</p>
      ) : (
        <div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', marginBottom: '4px' }}>
            Birden fazla görsel veya video seçin
          </p>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-dm-sans)' }}>
            Sürükle-bırak veya tıkla · JPG, PNG, MP4, MOV · Ctrl/Cmd ile çoklu seçim
          </p>
        </div>
      )}
    </div>
  )
}

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

type Props = {
  mode: 'create' | 'edit'
  project?: Project
}

type MediaItem = { url: string; type: 'image' | 'video' }

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

export default function AdminProjeForm({ mode, project }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const parseMedia = (images: string | undefined): MediaItem[] => {
    if (!images) return []
    try {
      const parsed = JSON.parse(images)
      return parsed.map((item: any) =>
        typeof item === 'string'
          ? { url: item, type: 'image' as const }
          : item
      )
    } catch { return [] }
  }

  const [form, setForm] = useState({
    title: project?.title || '',
    slug: project?.slug || '',
    category: project?.category || 'Ticari',
    location: project?.location || '',
    year: project?.year || new Date().getFullYear(),
    area: project?.area || '',
    description: project?.description || '',
    coverImage: project?.coverImage || '',
    images: project?.images || '[]',
    featured: project?.featured || false,
    order: project?.order || 0,
  })

  const mediaItems = parseMedia(form.images)

  const updateMedia = (items: MediaItem[]) => {
    setForm(prev => ({ ...prev, images: JSON.stringify(items) }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setForm(prev => ({
      ...prev,
      title,
      slug: mode === 'create' ? generateSlug(title) : prev.slug,
    }))
  }

  const handleSubmit = async () => {
    if (!form.title || !form.slug || !form.category) {
      setError('Başlık, slug ve kategori zorunludur.')
      return
    }
    const cleanSlug = generateSlug(form.slug)
    if (!cleanSlug) {
      setError('Slug geçerli URL karakterleri içermelidir (a-z, 0-9, tire).')
      return
    }
    setLoading(true)
    setError('')

    try {
      const url = mode === 'create' ? '/api/projeler' : `/api/projeler/${project!.id}`
      const method = mode === 'create' ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          slug: cleanSlug,
          year: Number(form.year),
          order: Number(form.order),
        }),
      })

      if (res.ok) {
        window.location.href = '/studio/projeler'
      } else {
        const data = await res.json()
        setError(data.error || 'Bir hata oluştu.')
      }
    } catch {
      setError('Bir hata oluştu.')
    }
    setLoading(false)
  }

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <Link href="/studio/projeler" style={{
            fontSize: '12px', color: 'var(--text-muted)',
            textDecoration: 'none', letterSpacing: '0.08em',
            transition: 'color 0.2s ease',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            Projelere Dön
          </Link>
        </div>
        <p style={{
          fontSize: '11px', fontWeight: 500,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: '8px',
        }}>{mode === 'create' ? 'Yeni Proje' : 'Proje Düzenle'}</p>
        <h1 style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: '36px', fontWeight: 300,
          color: 'var(--text-primary)',
        }}>
          {mode === 'create' ? 'Yeni Proje Ekle' : form.title}
        </h1>
      </div>

      <div style={{
        background: 'var(--dark-2)',
        border: '1px solid var(--border-subtle)',
        padding: '40px',
        maxWidth: '800px',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Başlık *</label>
              <input name="title" value={form.title} onChange={handleTitleChange} style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')} />
            </div>
            <div>
              <label style={labelStyle}>Slug *</label>
              <input name="slug" value={form.slug} onChange={handleChange} style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Kategori *</label>
              <select name="category" value={form.category} onChange={handleChange}
                style={{ ...inputStyle, cursor: 'pointer' }}
                onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}>
                <option value="Konut">Konut</option>
                <option value="Ticari">Ticari</option>
                <option value="Lüks">Lüks</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Konum</label>
              <input name="location" value={form.location} onChange={handleChange} style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Yıl</label>
              <input name="year" type="number" value={form.year} onChange={handleChange} style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')} />
            </div>
            <div>
              <label style={labelStyle}>Alan (m2)</label>
              <input name="area" value={form.area} onChange={handleChange} style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')} />
            </div>
            <div>
              <label style={labelStyle}>Sıra</label>
              <input name="order" type="number" value={form.order} onChange={handleChange} style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Açıklama</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4}
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')} />
          </div>

          {/* Kapak Gorseli */}
          <div>
            <label style={labelStyle}>Kapak Görseli (Hero Fotoğraf)</label>
            <MediaUpload
              value={form.coverImage}
              onChange={url => setForm(prev => ({ ...prev, coverImage: url }))}
              accept="image"
            />
          </div>

          {/* Ic Medya */}
          <div>
            <label style={labelStyle}>İç Görseller ve Videolar (Proje Detay Sayfası)</label>

            {/* Mevcut medya — thumbnail grid */}
            {mediaItems.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                gap: '8px', marginBottom: '12px',
              }}>
                {mediaItems.map((item, i) => {
                  const isVid = item.type === 'video'
                  return (
                    <div key={i} style={{ position: 'relative', borderRadius: '2px', overflow: 'hidden' }}>
                      {isVid ? (
                        <video src={item.url} style={{ width: '100%', height: '76px', objectFit: 'cover', display: 'block' }} />
                      ) : (
                        <img src={item.url} alt="" style={{ width: '100%', height: '76px', objectFit: 'cover', display: 'block' }} />
                      )}
                      {isVid && (
                        <div style={{
                          position: 'absolute', bottom: '4px', left: '5px',
                          fontSize: '10px', color: 'rgba(255,255,255,0.8)',
                          textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                        }}>▶</div>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          const items = [...mediaItems]
                          items.splice(i, 1)
                          updateMedia(items)
                        }}
                        style={{
                          position: 'absolute', top: '4px', right: '4px',
                          width: '20px', height: '20px', borderRadius: '50%',
                          background: 'rgba(10,10,10,0.75)', border: 'none',
                          color: '#fff', cursor: 'pointer', fontSize: '13px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          lineHeight: 1,
                        }}
                      >×</button>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Çoklu yükleme alanı */}
            <MultiUpload onAdd={newItems => updateMedia([...mediaItems, ...newItems])} />
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px', fontFamily: 'var(--font-dm-sans)' }}>
              {mediaItems.length > 0 ? `${mediaItems.length} dosya eklendi · ` : ''}Yeni dosya eklemek için yukarıya tıklayın veya sürükleyin
            </p>
          </div>

          {/* Öne Çıkan */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input type="checkbox" name="featured" id="featured"
              checked={form.featured} onChange={handleChange}
              style={{ width: '16px', height: '16px', accentColor: 'var(--gold)', cursor: 'pointer' }} />
            <label htmlFor="featured" style={{
              fontSize: '13px', color: 'var(--text-secondary)', cursor: 'pointer',
            }}>
              Ana sayfada öne çıkan proje olarak göster
            </label>
          </div>

          {error && <p style={{ fontSize: '13px', color: '#e05a5a' }}>{error}</p>}

          <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
            <button onClick={handleSubmit} disabled={loading} className="btn-gold"
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Kaydediliyor...' : mode === 'create' ? 'Projeyi Kaydet' : 'Değişiklikleri Kaydet'}
            </button>
            <Link href="/studio/projeler" className="btn-dark">İptal</Link>
          </div>
        </div>
      </div>
    </div>
  )
}