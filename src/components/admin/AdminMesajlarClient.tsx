'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Message = {
  id: number
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  read: boolean
  createdAt: string
}

export default function AdminMesajlarClient({ messages }: { messages: Message[] }) {
  const [selected, setSelected] = useState<Message | null>(null)
  const [deleting, setDeleting] = useState<number | null>(null)
  const router = useRouter()

  const handleMarkRead = async (id: number) => {
    try {
      await fetch(`/api/iletisim?id=${id}`, { method: 'PATCH' })
      router.refresh()
    } catch (e) {
      console.error(e)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Bu mesajı silmek istediğinize emin misiniz?')) return
    setDeleting(id)
    try {
      await fetch(`/api/iletisim?id=${id}`, { method: 'DELETE' })
      setSelected(null)
      router.refresh()
    } catch (e) {
      console.error(e)
    }
    setDeleting(null)
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <p style={{
          fontSize: '11px', fontWeight: 500,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: '8px',
        }}>Gelen Kutusu</p>
        <h1 style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: '36px', fontWeight: 300,
          color: 'var(--text-primary)',
        }}>Mesajlar</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '16px' }}>
        {/* List */}
        <div style={{
          background: 'var(--dark-2)',
          border: '1px solid var(--border-subtle)',
          overflow: 'hidden',
        }}>
          {messages.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '60px',
              color: 'var(--text-muted)', fontSize: '14px',
            }}>
              Henüz mesaj yok.
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={msg.id}
                onClick={() => {
                  setSelected(msg)
                  if (!msg.read) handleMarkRead(msg.id)
                }}
                style={{
                  padding: '20px 24px',
                  borderBottom: i < messages.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  cursor: 'pointer',
                  background: selected?.id === msg.id
                    ? 'var(--dark-3)'
                    : 'transparent',
                  transition: 'background 0.2s ease',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  if (selected?.id !== msg.id)
                    e.currentTarget.style.background = 'var(--dark-3)'
                }}
                onMouseLeave={e => {
                  if (selected?.id !== msg.id)
                    e.currentTarget.style.background = 'transparent'
                }}
              >
                {/* Unread dot */}
                {!msg.read && (
                  <div style={{
                    position: 'absolute', left: '8px', top: '50%',
                    transform: 'translateY(-50%)',
                    width: '6px', height: '6px',
                    borderRadius: '50%',
                    background: 'var(--gold)',
                  }} />
                )}

                <div style={{ paddingLeft: !msg.read ? '12px' : '0' }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-start', marginBottom: '4px',
                  }}>
                    <p style={{
                      fontSize: '14px', fontWeight: msg.read ? 400 : 500,
                      color: msg.read ? 'var(--text-secondary)' : 'var(--text-primary)',
                    }}>{msg.name}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {new Date(msg.createdAt).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  <p style={{
                    fontSize: '12px', color: 'var(--gold)',
                    marginBottom: '4px', letterSpacing: '0.05em',
                  }}>{msg.subject}</p>
                  <p style={{
                    fontSize: '12px', color: 'var(--text-muted)',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>{msg.message}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail */}
        {selected && (
          <div style={{
            background: 'var(--dark-2)',
            border: '1px solid var(--border-subtle)',
            padding: '32px',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'flex-start', marginBottom: '32px',
            }}>
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: '24px', fontWeight: 300,
                  color: 'var(--text-primary)', marginBottom: '4px',
                }}>{selected.subject}</h2>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {new Date(selected.createdAt).toLocaleString('tr-TR')}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: 'none', border: 'none',
                  color: 'var(--text-muted)', cursor: 'pointer',
                  fontSize: '20px', lineHeight: 1,
                }}
              >×</button>
            </div>

            <div style={{
              display: 'flex', flexDirection: 'column', gap: '16px',
              marginBottom: '32px',
            }}>
              {[
                { label: 'Gönderen', value: selected.name },
                { label: 'E-posta', value: selected.email },
                { label: 'Telefon', value: selected.phone || '—' },
              ].map(item => (
                <div key={item.label} style={{
                  display: 'flex', gap: '16px', alignItems: 'flex-start',
                }}>
                  <p style={{
                    fontSize: '10px', fontWeight: 600,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'var(--text-muted)', minWidth: '80px', paddingTop: '2px',
                  }}>{item.label}</p>
                  <p style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div style={{
              background: 'var(--dark-3)',
              border: '1px solid var(--border-subtle)',
              padding: '20px',
              marginBottom: '32px',
            }}>
              <p style={{
                fontSize: '14px', color: 'var(--text-secondary)',
                lineHeight: 1.7, whiteSpace: 'pre-wrap',
              }}>{selected.message}</p>
            </div>

<div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  window.location.href = 'mailto:' + selected.email + '?subject=Re: ' + selected.subject
                }}
                className="btn-gold"
                style={{ fontSize: '12px', padding: '10px 20px' }}
              >
                Yanitla
              </button>
              <button
                onClick={() => handleDelete(selected.id)}
                disabled={deleting === selected.id}
                style={{
                  padding: '10px 20px',
                  background: 'transparent',
                  border: '1px solid rgba(224,90,90,0.3)',
                  color: '#e05a5a',
                  fontSize: '12px', fontWeight: 500,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {deleting === selected.id ? '...' : 'Sil'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}