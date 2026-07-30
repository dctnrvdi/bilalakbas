'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('E-posta ve şifre zorunludur.')
      return
    }
    setLoading(true)
    setError('')
    const result = await signIn('credentials', {
      email, password, redirect: false,
    })
    if (result?.ok) {
      router.push('/studio')
    } else {
      setError('E-posta veya şifre hatalı.')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--dark)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: '28px', fontWeight: 500,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--text-primary)', marginBottom: '8px',
          }}>Bilal Akbaş</p>
          <p style={{
            fontSize: '11px', fontWeight: 500,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--gold)',
          }}>Admin Panel</p>
        </div>
        <div style={{
          background: 'var(--dark-2)',
          border: '1px solid var(--border-subtle)',
          padding: '48px 40px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{
                display: 'block', fontSize: '10px', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'var(--text-muted)', marginBottom: '8px',
              }}>E-posta</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                style={{
                  width: '100%', background: 'var(--dark-3)',
                  border: '1px solid var(--border-subtle)',
                  padding: '14px 16px', color: 'var(--text-primary)',
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: '14px', outline: 'none',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
              />
            </div>
            <div>
              <label style={{
                display: 'block', fontSize: '10px', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'var(--text-muted)', marginBottom: '8px',
              }}>Şifre</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  style={{
                    width: '100%', background: 'var(--dark-3)',
                    border: '1px solid var(--border-subtle)',
                    padding: '14px 44px 14px 16px', color: 'var(--text-primary)',
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: '14px', outline: 'none',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
                />
                <button type="button" onClick={() => setShowPw(v => !v)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0, display: 'flex' }}>
                  {showPw ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>
            {error && <p style={{ fontSize: '13px', color: '#e05a5a' }}>{error}</p>}
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: '100%', padding: '16px',
                background: 'var(--gold)', border: 'none',
                color: 'var(--dark)',
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '13px', fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1, marginTop: '8px',
              }}
            >
              {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>
          </div>
        </div>
        <p style={{
          textAlign: 'center', marginTop: '24px',
          fontSize: '12px', color: 'var(--text-muted)',
        }}>
          © {new Date().getFullYear()} Bilal Akbaş
        </p>
      </div>
    </div>
  )
}
