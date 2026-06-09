'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Project = {
  id: number
  title: string
  slug: string
  category: string
  location: string
  year: number
  area: string
  featured: boolean
  order: number
}

export default function AdminProjelerClient({ projects }: { projects: Project[] }) {
  const [deleting, setDeleting] = useState<number | null>(null)
  const router = useRouter()

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`"${title}" projesini silmek istediğinize emin misiniz?`)) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/projeler/${id}`, { method: 'DELETE' })
      if (res.ok) {
        router.refresh()
      } else {
        alert('Silme işlemi başarısız.')
      }
    } catch {
      alert('Bir hata oluştu.')
    }
    setDeleting(null)
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-end', marginBottom: '40px',
        flexWrap: 'wrap', gap: '16px',
      }}>
        <div>
          <p style={{
            fontSize: '11px', fontWeight: 500,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: '8px',
          }}>Yönetim</p>
          <h1 style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: '36px', fontWeight: 300,
            color: 'var(--text-primary)',
          }}>Projeler</h1>
        </div>
        <Link href="/admin/projeler/yeni" className="btn-gold" style={{ fontSize: '12px', padding: '12px 24px' }}>
          + Yeni Proje Ekle
        </Link>
      </div>

      {/* Table */}
      {projects.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '80px',
          background: 'var(--dark-2)',
          border: '1px solid var(--border-subtle)',
          color: 'var(--text-muted)', fontSize: '14px',
        }}>
          Henüz proje eklenmemiş.
        </div>
      ) : (
        <div style={{
          background: 'var(--dark-2)',
          border: '1px solid var(--border-subtle)',
          overflow: 'hidden',
        }}>
          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 120px 160px 80px 120px',
            gap: '0',
            padding: '14px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--dark-3)',
          }}>
            {['Proje', 'Kategori', 'Konum', 'Yıl', 'İşlemler'].map(h => (
              <p key={h} style={{
                fontSize: '10px', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}>{h}</p>
            ))}
          </div>

          {/* Rows */}
          {projects.map((project, i) => (
            <div
              key={project.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 120px 160px 80px 120px',
                gap: '0',
                padding: '18px 24px',
                borderBottom: i < projects.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                alignItems: 'center',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--dark-3)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {/* Title */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <p style={{
                    fontSize: '14px', fontWeight: 400,
                    color: 'var(--text-primary)',
                  }}>{project.title}</p>
                  {project.featured && (
                    <span style={{
                      padding: '2px 8px',
                      background: 'rgba(201,168,76,0.15)',
                      border: '1px solid rgba(201,168,76,0.3)',
                      color: 'var(--gold)',
                      fontSize: '9px', fontWeight: 600,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                    }}>Öne Çıkan</span>
                  )}
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  /{project.slug}
                </p>
              </div>

              {/* Category */}
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                {project.category}
              </p>

              {/* Location */}
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                {project.location}
              </p>

              {/* Year */}
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                {project.year}
              </p>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link
                  href={`/admin/projeler/${project.id}`}
                  style={{
                    padding: '6px 14px',
                    background: 'transparent',
                    border: '1px solid var(--border)',
                    color: 'var(--gold)',
                    fontSize: '11px', fontWeight: 500,
                    letterSpacing: '0.08em',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    display: 'inline-block',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--gold)'
                    e.currentTarget.style.color = 'var(--dark)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--gold)'
                  }}
                >
                  Düzenle
                </Link>
                <button
                  onClick={() => handleDelete(project.id, project.title)}
                  disabled={deleting === project.id}
                  style={{
                    padding: '6px 14px',
                    background: 'transparent',
                    border: '1px solid rgba(224,90,90,0.3)',
                    color: '#e05a5a',
                    fontSize: '11px', fontWeight: 500,
                    letterSpacing: '0.08em',
                    cursor: deleting === project.id ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    opacity: deleting === project.id ? 0.5 : 1,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(224,90,90,0.1)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {deleting === project.id ? '...' : 'Sil'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}