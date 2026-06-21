'use client'

import { prisma } from '@/lib/prisma'
import Link from 'next/link'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
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
              {loading ? 'Giris Yapiliyor...' : 'Giris Yap'}
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