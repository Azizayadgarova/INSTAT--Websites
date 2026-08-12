import { useTranslation } from 'react-i18next'
import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { Button } from './shared/Button'
import { useHeroPhase } from '../hooks/useHeroPhase'

const ArcBackground = lazy(() => import('./IshOrinlariHeroArc'))

function useMouseParallax(ref) {
  const rafRef = useRef(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width  - 0.5
      const ny = (e.clientY - r.top)  / r.height - 0.5
      targetRef.current = { x: nx, y: ny }
      setCursor({ x: e.clientX - r.left, y: e.clientY - r.top })
    }
    const onLeave = () => { targetRef.current = { x: 0, y: 0 } }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    const loop = () => {
      const t = targetRef.current
      const c = currentRef.current
      c.x += (t.x - c.x) * 0.08
      c.y += (t.y - c.y) * 0.08
      setTilt({ x: c.x, y: c.y })
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [ref])

  return { tilt, cursor }
}

export default function IshOrinlariHero() {
  const {
    t
  } = useTranslation();

  const { show } = useHeroPhase()
  const [email, setEmail] = useState('')
  const sectionRef = useRef(null)
  const { tilt, cursor } = useMouseParallax(sectionRef)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const [mountArc, setMountArc] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const mount = () => setMountArc(true)
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(mount, { timeout: 800 })
      return () => cancelIdleCallback(id)
    }
    const t = setTimeout(mount, 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        width: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        padding: isMobile ? '100px 16px 0' : '100px 24px 160px',
        minHeight: isMobile ? 'auto' : '640px', background: 'rgba(var(--bg-rgb),1)',
      }}
    >
      {mountArc && (
        <Suspense fallback={null}>
          <ArcBackground tilt={tilt} isMobile={isMobile} />
        </Suspense>
      )}
      {/* Cursor glow — transform only to avoid CLS */}
      <div style={{
        position: 'absolute',
        left: 0, top: 0,
        width: '380px', height: '380px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(55,139,239,0.13) 0%, rgba(0,180,255,0.06) 40%, transparent 70%)',
        transform: `translate(${cursor.x - 190}px, ${cursor.y - 190}px)`,
        filter: 'blur(18px)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center',
        gap: '10px', zIndex: 10, position: 'relative',
        maxWidth: '820px', width: '100%',
      }}>
        <div style={show(1)}>
          <Button text={t("components.ishOrinlariHero.ish_va_imkoniyatlar_platformasi", "Ish va imkoniyatlar platformasi")} variant='dark' />
        </div>

        <div style={show(2)}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(32px, 8.33vw, 64px)',
            lineHeight: 1.1, letterSpacing: '-.03em',
            color: '#fff', margin: 0,
          }}>{t("components.ishOrinlariHero.eng_dolzarb_ish_orinlari")}<br />
            <span style={{ color: 'rgba(var(--cyan-rgb),1)' }}>{t("components.ishOrinlariHero.bitta_platformada")}</span>
          </h1>
        </div>

        <div style={show(3)}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400, fontSize: '16px', lineHeight: 1.75,
            color: 'rgba(var(--text-rgb),1)', maxWidth: '500px', margin: 0,
          }}>{t("components.ishOrinlariHero.ish_beruvchilar_va_nomzodlarni")}</p>
        </div>

        <div style={{ ...show(4), position: 'relative', width: '100%', maxWidth: isMobile ? '100%' : '477px', height: isMobile ? '44px' : '52px', marginTop: '50px', display: 'flex', alignItems: 'center', borderRadius: '12px', background: isMobile ? 'rgba(33,43,59,1)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0px 4px 20px 0px rgba(47,7,106,0.08)', backdropFilter: 'blur(10px)', overflow: 'hidden' }}>
          <div className='relative z-10 flex items-center w-full h-full gap-1' style={{ padding: isMobile ? '4px' : '6px' }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t("components.ishOrinlariHero.pochtangizni_qoldiring")}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                padding: '0 12px', color: '#fff', fontSize: isMobile ? '14px' : '16px',
                fontFamily: 'var(--font-display)',
              }}
            />
            <button
              style={{
                color: '#fff', fontFamily: 'var(--font-display)',
                fontWeight: isMobile ? 500 : 400,
                fontSize: isMobile ? '14px' : '16px',
                lineHeight: isMobile ? '20px' : 'normal',
                letterSpacing: isMobile ? '-0.084px' : 'normal',
                width: isMobile ? '125px' : '160px',
                height: isMobile ? '36px' : '44px',
                borderRadius: isMobile ? '8px' : '10px',
                border: '1px solid rgba(28,84,148,1)',
                padding: isMobile ? '8px' : '12px',
                background: 'linear-gradient(180deg,#3E8BE6 0%,#1C5FB4 100%)',
                boxShadow: '0px 2px 6px 0px rgba(255,255,255,0.25) inset, 0px -2px 4px 0px rgba(var(--bg-rgb),0.3) inset, 0px 0px 0px 1px rgba(28,84,148,1)',
                cursor: 'pointer', whiteSpace: 'nowrap', transition: 'filter .2s', flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.18)' }}
              onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)' }}
            >{t("components.ishOrinlariHero.vakansiya_izlash")}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
