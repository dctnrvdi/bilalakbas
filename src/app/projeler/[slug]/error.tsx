'use client'

import Link from 'next/link'

export default function ProjeDetayError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main style={{ background: 'var(--dark)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>Hata</p>
        <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: 'var(--text-primary)', marginBottom: '24px' }}>
          Proje yüklenemedi
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '40px' }}>
          Bir bağlantı hatası oluştu. Lütfen tekrar deneyin.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={reset} className="btn-gold">Tekrar Dene</button>
          <Link href="/projeler" className="btn-dark">Projelere Dön</Link>
        </div>
      </div>
    </main>
  )
}
