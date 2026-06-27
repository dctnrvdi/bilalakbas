'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MediaUpload from '@/components/admin/MediaUpload'

type Member = {
  id: number
  name: string
  role: string
  bio: string | null
  image: string | null
  order: number
  published: boolean
}

type FormData = {
  name: string
  role: string
  bio: string
  image: string
  order: string
  published: boolean
}

const EMPTY_FORM: FormData = {
  name: '', role: '', bio: '', image: '', order: '0', published: true,
}

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

export default function AdminEkipClient({ members: initial }: { members: Member[] }) {
  const [members, setMembers] = useState<Member[]>(initial)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<FormData>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<number | null>(null)
  const [saved, setSaved] = useState(false)
  const router = useRouter()

  const foc = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = 'var(--gold)')
  const blu = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = 'var(--border-subtle)')

  const openNew = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setFormOpen(true)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
  }

  const openEdit = (member: Member) => {
    setEditingId(member.id)
    setForm({
      name: member.name,
      role: member.role,
      bio: member.bio || '',
      image: member.image || '',
      order: String(member.order),
      published: member.published,
    })
    setFormOpen(true)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
  }

  const closeForm = () => {
    setFormOpen(false)
    setEditingId(null)
    setForm(EMPTY_FORM)
  }

  const handleSave = async () => {
    if (!form.name.trim() || !form.role.trim()) {
      alert('İsim ve görev zorunludur.')
      return
    }
    setSaving(true)
    setSaved(false)

    try {
      const payload = {
        name: form.name.trim(),
        role: form.role.trim(),
        bio: form.bio.trim() || null,
        image: form.image.trim() || null,
        order: parseInt(form.order) || 0,
        published: form.published,
      }

      let res: Response
      if (editingId !== null) {
        res = await fetch(`/api/ekip/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } else {
        res = await fetch('/api/ekip', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }

      if (!res.ok) {
        const data = await res.json()
        alert(data.error || 'Islem basarisiz.')
        setSaving(false)
        return
      }

      const updated = await res.json()

      if (editingId !== null) {
        setMembers(prev => prev.map(m => m.id === editingId ? updated : m))
      } else {
        setMembers(prev => [...prev, updated].sort((a, b) => a.order - b.order))
      }

      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
      closeForm()
      router.refresh()
    } catch {
      alert('Bir hata olustu.')
    }

    setSaving(false)
  }

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`"${name}" ekip uyesini silmek istediginize emin misiniz?`)) return
    setDeleting(id)

    try {
      const res = await fetch(`/api/ekip/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setMembers(prev => prev.filter(m => m.id !== id))
        router.refresh()
      } else {
        alert('Silme islemi basarisiz.')
      }
    } catch {
      alert('Bir hata olustu.')
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
          }}>Ekip</h1>
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
          {!formOpen && (
            <button onClick={openNew} className="btn-gold" style={{ fontSize: '12px', padding: '12px 24px' }}>
              + Yeni Üye Ekle
            </button>
          )}
        </div>
      </div>

      {/* FORM */}
      {formOpen && (
        <div style={{
          background: 'var(--dark-2)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '3px',
          marginBottom: '32px',
          overflow: 'hidden',
        }}>
          {/* Form header */}
          <div style={{
            padding: '14px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--dark-3)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <p style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: '20px', fontWeight: 400,
              color: 'var(--text-primary)',
            }}>
              {editingId !== null ? 'Üye Düzenle' : 'Yeni Üye Ekle'}
            </p>
            <button
              onClick={closeForm}
              style={{
                background: 'none', border: 'none',
                color: 'var(--text-muted)', cursor: 'pointer',
                fontSize: '18px', lineHeight: 1,
                padding: '4px 8px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >×</button>
          </div>

          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Row 1: name + role */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Field label="İsim *">
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Ad Soyad"
                  style={I} onFocus={foc} onBlur={blu}
                />
              </Field>
              <Field label="Görev *">
                <input
                  value={form.role}
                  onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                  placeholder="Kıdemli Mühendis"
                  style={I} onFocus={foc} onBlur={blu}
                />
              </Field>
            </div>

            {/* Row 2: bio */}
            <Field label="Biyografi (opsiyonel)">
              <textarea
                value={form.bio}
                onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                placeholder="Kisa biyografi veya uzmanlik alani..."
                rows={3}
                style={{ ...I, resize: 'vertical' }}
                onFocus={foc} onBlur={blu}
              />
            </Field>

            {/* Row 3: image upload */}
            <Field label="Fotoğraf">
              <MediaUpload
                value={form.image}
                onChange={url => setForm(f => ({ ...f, image: url }))}
                accept="image"
                label="Fotoğraf Yükle"
              />
            </Field>

            {/* Row 4: order + published */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ width: '120px' }}>
                <Field label="Sıra">
                  <input
                    type="number"
                    value={form.order}
                    onChange={e => setForm(f => ({ ...f, order: e.target.value }))}
                    style={I} onFocus={foc} onBlur={blu}
                  />
                </Field>
              </div>
              <label style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                cursor: 'pointer', paddingBottom: '2px',
              }}>
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                  style={{ accentColor: 'var(--gold)', width: '15px', height: '15px' }}
                />
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>
                  Yayında
                </span>
              </label>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', paddingTop: '4px' }}>
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-gold"
                style={{ opacity: saving ? 0.7 : 1, cursor: saving ? 'not-allowed' : 'pointer' }}
              >
                {saving ? 'Kaydediliyor...' : editingId !== null ? 'Güncelle' : 'Ekle'}
              </button>
              <button
                onClick={closeForm}
                className="btn-dark"
                style={{ cursor: 'pointer' }}
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LIST */}
      {members.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '80px',
          background: 'var(--dark-2)',
          border: '1px solid var(--border-subtle)',
          color: 'var(--text-muted)', fontSize: '14px',
        }}>
          Henüz üye eklenmemiş.
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
            gridTemplateColumns: '48px 1fr 160px 60px 90px 120px',
            gap: '0',
            padding: '12px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--dark-3)',
            alignItems: 'center',
          }}>
            {['', 'İsim / Görev', 'Görev', 'Sıra', 'Yayın', 'İşlemler'].map((h, i) => (
              <p key={i} style={{
                fontSize: '9px', fontWeight: 700,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}>{h}</p>
            ))}
          </div>

          {members.map((member, i) => (
            <div
              key={member.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '48px 1fr 160px 60px 90px 120px',
                gap: '0',
                padding: '14px 20px',
                borderBottom: i < members.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                alignItems: 'center',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--dark-3)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {/* Thumbnail */}
              <div style={{
                width: '36px', height: '48px',
                background: 'var(--dark-3)',
                overflow: 'hidden', flexShrink: 0,
                border: '1px solid var(--border-subtle)',
              }}>
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{
                    width: '100%', height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="4" stroke="rgba(201,168,76,0.3)" strokeWidth="1.2"/>
                      <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="rgba(201,168,76,0.3)" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </div>
                )}
              </div>

              {/* Name */}
              <div>
                <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {member.name}
                </p>
                {member.bio && (
                  <p style={{
                    fontSize: '11px', color: 'var(--text-muted)',
                    marginTop: '2px', overflow: 'hidden',
                    textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    maxWidth: '240px',
                  }}>{member.bio}</p>
                )}
              </div>

              {/* Role */}
              <p style={{ fontSize: '11px', color: 'var(--gold)', letterSpacing: '0.06em' }}>
                {member.role}
              </p>

              {/* Order */}
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                {member.order}
              </p>

              {/* Published */}
              <div>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  fontSize: '10px', fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: member.published ? '#4caf50' : 'var(--text-muted)',
                }}>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: member.published ? '#4caf50' : 'var(--text-muted)',
                    flexShrink: 0,
                  }} />
                  {member.published ? 'Evet' : 'Hayir'}
                </span>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => openEdit(member)}
                  style={{
                    padding: '5px 12px',
                    background: 'transparent',
                    border: '1px solid var(--border)',
                    color: 'var(--gold)',
                    fontSize: '10px', fontWeight: 600,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'var(--font-dm-sans), sans-serif',
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
                </button>
                <button
                  onClick={() => handleDelete(member.id, member.name)}
                  disabled={deleting === member.id}
                  style={{
                    padding: '5px 10px',
                    background: 'transparent',
                    border: '1px solid rgba(224,90,90,0.3)',
                    color: '#e05a5a',
                    fontSize: '10px', fontWeight: 600,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    cursor: deleting === member.id ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    opacity: deleting === member.id ? 0.5 : 1,
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(224,90,90,0.08)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                >
                  {deleting === member.id ? '...' : 'Sil'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
