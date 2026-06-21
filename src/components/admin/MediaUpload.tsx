'use client'

import { useState, useRef } from 'react'

type Props = {
  value: string
  onChange: (url: string) => void
  accept?: 'image' | 'video' | 'both'
  label?: string
}

export default function MediaUpload({
  value,
  onChange,
  accept = 'image',
  label = 'Medya Yükle',
}: Props) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const acceptString =
    accept === 'both'
      ? 'image/*,video/*'
      : accept === 'video'
      ? 'video/*'
      : 'image/*'

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const isVideo = file.type.startsWith('video/')
    const maxSize = isVideo ? 100 * 1024 * 1024 : 10 * 1024 * 1024

    if (file.size > maxSize) {
      setError(isVideo ? 'Video max 100MB olabilir.' : 'Görsel max 10MB olabilir.')
      return
    }

    setUploading(true)
    setError('')
    setProgress(10)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', isVideo ? 'video' : 'image')

      setProgress(40)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      setProgress(80)

      if (!res.ok) {
        let errorMsg = 'Yükleme başarısız'
        try {
          const data = await res.json()
          errorMsg = data.error || errorMsg
        } catch {}
        throw new Error(errorMsg)
      }

      const data = await res.json()
      setProgress(100)
      onChange(data.url)

      setTimeout(() => setProgress(0), 500)
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu.')
    }

    setUploading(false)
  }

  const isVideo = value && (value.includes('.mp4') || value.includes('.webm') || value.includes('video'))

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="URL yapıştır veya yükle..."
          style={{
            flex: 1,
            background: 'var(--dark-3)',
            border: '1px solid var(--border-subtle)',
            padding: '12px 16px',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '13px',
            outline: 'none',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
        />
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          style={{
            padding: '12px 20px',
            background: uploading ? 'var(--dark-4)' : 'var(--gold)',
            border: 'none',
            color: uploading ? 'var(--text-muted)' : 'var(--dark)',
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '12px', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            cursor: uploading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap',
          }}
        >
          {uploading ? 'Yükleniyor...' : '↑ Yükle'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={acceptString}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      {/* Progress bar */}
      {uploading && (
        <div style={{
          height: '2px',
          background: 'var(--dark-4)',
          marginBottom: '12px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'var(--gold)',
            transition: 'width 0.3s ease',
          }} />
        </div>
      )}

      {error && (
        <p style={{ fontSize: '12px', color: '#e05a5a', marginBottom: '8px' }}>{error}</p>
      )}

      {/* Preview */}
      {value && !uploading && (
        <div style={{
          position: 'relative',
          background: 'var(--dark-3)',
          border: '1px solid var(--border-subtle)',
          overflow: 'hidden',
        }}>
          {isVideo ? (
            <video
              src={value}
              controls
              muted
              style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ position: 'relative', paddingTop: '40%' }}>
              <img
                src={value}
                alt="Preview"
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          )}
          <button
            onClick={() => onChange('')}
            style={{
              position: 'absolute', top: '8px', right: '8px',
              width: '28px', height: '28px',
              background: 'rgba(10,12,15,0.8)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              cursor: 'pointer', fontSize: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}