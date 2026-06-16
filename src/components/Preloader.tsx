'use client'

import { useEffect, useState } from 'react'

export default function Preloader() {
  const [phase, setPhase] = useState<'counting' | 'reveal' | 'done'>('counting')
  const [count, setCount] = useState(0)
  const [lineWidth, setLineWidth] = useState(0)

  useEffect(() => {
    // Sayac: 0 -> 100, 1.6 saniyede
    const duration = 1600
    const steps = 100
    const interval = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current += 1
      setCount(current)
      setLineWidth(current)
      if (current >= 100) {
        clearInterval(timer)
        // Kisa bekle, sonra reveal
        setTimeout(() => setPhase('reveal'), 200)
        // Reveal bittikten sonra done
        setTimeout(() => setPhase('done'), 1000)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  if (phase === 'done') return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: '#080A0C',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transform: phase === 'reveal' ? 'translateY(-100%)' : 'translateY(0)',
      transition: phase === 'reveal' ? 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
      pointerEvents: phase === 'reveal' ? 'none' : 'all',
    }}>

      {/* Ust kose — kucuk etiket */}
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '48px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        opacity: phase === 'counting' ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}>
        <div style={{ width: '24px', height: '1px', background: '#C9A84C' }} />
        <span style={{
          fontSize: '9px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(201,168,76,0.5)',
          fontFamily: 'var(--font-dm-sans), sans-serif',
        }}>Bilal Akbas Insaat</span>
      </div>

      {/* Sag ust — yil */}
      <div style={{
        position: 'absolute',
        top: '40px',
        right: '48px',
        fontSize: '9px',
        letterSpacing: '0.3em',
        color: 'rgba(255,255,255,0.15)',
        fontFamily: 'var(--font-dm-sans), sans-serif',
      }}>EST. 2010</div>

      {/* Ana icerik */}
      <div style={{ textAlign: 'center', position: 'relative' }}>

        {/* Buyuk BA harfleri — arkada ghost */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: 'clamp(160px, 25vw, 320px)',
          fontWeight: 300,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(201,168,76,0.04)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
          lineHeight: 1,
        }}>BA</div>

        {/* Orta cizgi animasyonu */}
        <div style={{
          width: '1px',
          height: '80px',
          background: 'linear-gradient(to bottom, transparent, #C9A84C)',
          margin: '0 auto 48px',
          opacity: 0.6,
        }} />

        {/* Baslik */}
        <h1 style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 300,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#F0EDE8',
          lineHeight: 1,
          marginBottom: '8px',
        }}>Bilal Akbaş</h1>

        <p style={{
          fontSize: '10px',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#C9A84C',
          fontFamily: 'var(--font-dm-sans), sans-serif',
          marginBottom: '64px',
          opacity: 0.8,
        }}>Mimarlık & İnşaat</p>

        {/* Progress bar */}
        <div style={{
          width: 'clamp(200px, 30vw, 320px)',
          height: '1px',
          background: 'rgba(255,255,255,0.06)',
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            left: 0, top: 0, bottom: 0,
            width: `${lineWidth}%`,
            background: 'linear-gradient(to right, rgba(201,168,76,0.3), #C9A84C)',
            transition: 'width 0.02s linear',
          }} />
        </div>

        {/* Sayac */}
        <div style={{
          marginTop: '20px',
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: '13px',
          color: 'rgba(201,168,76,0.5)',
          letterSpacing: '0.2em',
        }}>{String(count).padStart(2, '0')}</div>
      </div>

      {/* Alt kose */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '48px',
        right: '48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}>
        <p style={{
          fontSize: '9px',
          letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.1)',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-dm-sans), sans-serif',
          lineHeight: 1.8,
        }}>
          Guven · Kalite<br />Mukemmellik
        </p>
        <p style={{
          fontSize: '9px',
          letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.1)',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-dm-sans), sans-serif',
          textAlign: 'right',
          lineHeight: 1.8,
        }}>
          Istanbul<br />Turkiye
        </p>
      </div>

    </div>
  )
}
