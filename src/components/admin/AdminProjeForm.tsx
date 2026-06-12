'use client'

import { useState } from 'react'
import Link from 'next/link'
import MediaUpload from './MediaUpload'

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
      setError('Baslik, slug ve kategori zorunludur.')
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
          year: Number(form.year),
          order: Number(form.order),
        }),
      })

      if (res.ok) {
        window.location.href = '/admin/projeler'
      } else {
        const data = await res.json()
        setError(data.error || 'Bir hata olustu.')
      }
    } catch {
      setError('Bir hata olustu.')
    }
    setLoading(false)
  }

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <Link href="/admin/projeler" style={{
            fontSize: '12px', color: 'var(--text-muted)',
            textDecoration: 'none', letterSpacing: '0.08em',
            transition: 'color 0.2s ease',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            Projelere Don
          </Link>
        </div>
        <p style={{
          fontSize: '11px', fontWeight: 500,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: '8px',
        }}>{mode === 'create' ? 'Yeni Proje' : 'Proje Duzenle'}</p>
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
              <label style={labelStyle}>Baslik *</label>
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
                <option value="Luks">Luks</option>
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
              <label style={labelStyle}>Yil</label>
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
              <label style={labelStyle}>Sira</label>
              <input name="order" type="number" value={form.order} onChange={handleChange} style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Aciklama</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4}
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')} />
          </div>

          {/* Kapak Gorseli */}
          <div>
            <label style={labelStyle}>Kapak Gorseli (Hero Fotograf)</label>
            <MediaUpload
              value={form.coverImage}
              onChange={url => setForm(prev => ({ ...prev, coverImage: url }))}
              accept="image"
            />
          </div>

          {/* Ic Medya */}
          <div>
            <label style={labelStyle}>Ic Gorseller ve Videolar (Proje Detay Sayfasi)</label>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Gorsel veya video ekleyebilirsiniz. Sirayla goruntulenecektir.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {mediaItems.map((item, i) => (
                <div key={i} style={{
                  background: 'var(--dark-3)',
                  border: '1px solid var(--border-subtle)',
                  padding: '16px',
                  display: 'flex', flexDirection: 'column', gap: '12px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '11px', fontWeight: 600,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: item.type === 'video' ? 'var(--gold)' : 'var(--text-muted)',
                    }}>
                      {item.type === 'video' ? 'Video' : 'Gorsel'} {i + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const items = [...mediaItems]
                        items.splice(i, 1)
                        updateMedia(items)
                      }}
                      style={{
                        background: 'none', border: '1px solid #e05a5a',
                        color: '#e05a5a', padding: '4px 10px', cursor: 'pointer',
                        fontSize: '11px',
                      }}
                    >
                      Sil
                    </button>
                  </div>
                  <MediaUpload
                    value={item.url}
                    onChange={url => {
                      const items = [...mediaItems]
                      items[i] = { ...items[i], url }
                      updateMedia(items)
                    }}
                    accept={item.type}
                  />
                </div>
              ))}

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => updateMedia([...mediaItems, { url: '', type: 'image' }])}
                  style={{
                    flex: 1, background: 'none',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)', padding: '12px',
                    cursor: 'pointer', fontSize: '12px',
                    transition: 'border-color 0.3s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                >
                  + Gorsel Ekle
                </button>
                <button
                  type="button"
                  onClick={() => updateMedia([...mediaItems, { url: '', type: 'video' }])}
                  style={{
                    flex: 1, background: 'none',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--gold)', padding: '12px',
                    cursor: 'pointer', fontSize: '12px',
                    transition: 'border-color 0.3s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                >
                  + Video Ekle
                </button>
              </div>
            </div>
          </div>

          {/* One Cikan */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input type="checkbox" name="featured" id="featured"
              checked={form.featured} onChange={handleChange}
              style={{ width: '16px', height: '16px', accentColor: 'var(--gold)', cursor: 'pointer' }} />
            <label htmlFor="featured" style={{
              fontSize: '13px', color: 'var(--text-secondary)', cursor: 'pointer',
            }}>
              Ana sayfada one cikan proje olarak goster
            </label>
          </div>

          {error && <p style={{ fontSize: '13px', color: '#e05a5a' }}>{error}</p>}

          <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
            <button onClick={handleSubmit} disabled={loading} className="btn-gold"
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Kaydediliyor...' : mode === 'create' ? 'Projeyi Kaydet' : 'Degisiklikleri Kaydet'}
            </button>
            <Link href="/admin/projeler" className="btn-dark">Iptal</Link>
          </div>
        </div>
      </div>
    </div>
  )
}