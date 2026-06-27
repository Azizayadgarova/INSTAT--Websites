import { useState, useEffect, useRef } from 'react'
import { Button } from './shared/Button'
import { useHeroPhase } from '../hooks/useHeroPhase'

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
      const nx = (e.clientX - r.left) / r.width  - 0.5   // -0.5 .. 0.5
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

const STARS = [
  [120,40,1.1,2.2,0],[280,18,0.7,3.1,0.6],[430,55,1.3,1.9,1.0],[600,28,0.9,2.6,0.3],
  [750,62,0.8,3.3,1.4],[920,20,1.2,2.0,0.8],[1080,48,0.7,2.8,0.2],[1240,35,1.1,2.4,1.1],
  [1380,58,0.9,1.8,0.5],[185,130,1.0,2.7,0.9],[360,110,0.8,3.0,1.5],[540,145,1.3,2.1,0.4],
  [700,120,0.7,2.5,1.2],[880,138,1.1,1.7,0.7],[1060,115,0.9,3.2,0.1],[1300,142,1.2,2.3,1.3],
  [65,210,0.8,2.9,0.6],[250,195,1.0,2.2,1.8],[470,220,0.7,3.4,0.3],[660,200,1.3,1.9,1.0],
  [830,215,0.9,2.6,0.5],[1010,198,0.8,2.0,1.6],[1200,225,1.1,2.8,0.2],[1400,205,0.7,3.1,0.9],
  [340,300,1.0,2.4,1.4],[720,310,0.8,1.8,0.7],[1100,295,1.2,2.7,0.3],
]

const ArcBackground = ({ tilt = { x: 0, y: 0 } }) => (
  <svg
    style={{
      position: 'absolute',
      top: '-1186px', left: '50%',
      transform: `translateX(-50%) perspective(520px) rotateX(${tilt.y * -58}deg) rotateY(${tilt.x * 38}deg) scale(1.12)`,
      transformOrigin: '50% 92%',
      width: '100vw',
      height: '1900px',
      overflow: 'visible',
      zIndex: 1, pointerEvents: 'none',
      willChange: 'transform',
    }}
    viewBox="0 0 1440 580"
    fill="none"
    preserveAspectRatio="xMidYMax meet"
  >
    <defs>
      <radialGradient id="dome-fill" cx="50%" cy="0%" r="80%" gradientUnits="objectBoundingBox">
        <stop offset="0%"   stopColor="rgba(100,145,220,0.32)" />
        <stop offset="45%"  stopColor="rgba(90,130,210,0.14)" />
        <stop offset="100%" stopColor="rgba(80,120,200,0)" />
      </radialGradient>
      <radialGradient id="orb-dark" cx="38%" cy="30%" r="65%">
        <stop offset="0%"   stopColor="#0d1f3c" />
        <stop offset="100%" stopColor="#040c1c" />
      </radialGradient>
      <filter id="orb-ambient" x="-150%" y="-150%" width="400%" height="400%">
        <feGaussianBlur stdDeviation="22" />
      </filter>
      <filter id="star-glow" x="-200%" y="-200%" width="500%" height="500%">
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <linearGradient id="orb-r-stroke" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
        <stop offset="0%"   stopColor="rgba(55,139,239,1)" />
        <stop offset="35%"  stopColor="rgba(55,139,239,0.6)" />
        <stop offset="65%"  stopColor="rgba(20,60,120,0.15)" />
        <stop offset="100%" stopColor="rgba(8,20,33,0)" />
      </linearGradient>
      <radialGradient id="orb-top-light" cx="870" cy="-59" r="700" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.95" />
        <stop offset="20%"  stopColor="#378BEF" stopOpacity="0.7" />
        <stop offset="55%"  stopColor="rgba(55,139,239,0.25)" />
        <stop offset="85%"  stopColor="rgba(55,139,239,0.05)" />
        <stop offset="100%" stopColor="rgba(55,139,239,0)" />
      </radialGradient>
      <radialGradient id="orb-light" cx="1094" cy="274" r="320" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.95" />
        <stop offset="25%"  stopColor="#378BEF" stopOpacity="0.7" />
        <stop offset="60%"  stopColor="rgba(55,139,239,0.2)" />
        <stop offset="100%" stopColor="rgba(55,139,239,0)" />
      </radialGradient>
      <radialGradient id="orb-l-light" cx="288" cy="324" r="370" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.95" />
        <stop offset="25%"  stopColor="#378BEF" stopOpacity="0.7" />
        <stop offset="60%"  stopColor="rgba(55,139,239,0.2)" />
        <stop offset="100%" stopColor="rgba(55,139,239,0)" />
      </radialGradient>
      <linearGradient id="orb-l-stroke" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
        <stop offset="0%"   stopColor="rgba(55,139,239,1)" />
        <stop offset="35%"  stopColor="rgba(55,139,239,0.6)" />
        <stop offset="65%"  stopColor="rgba(20,60,120,0.15)" />
        <stop offset="100%" stopColor="rgba(8,20,33,0)" />
      </linearGradient>
      {/* Shooting star gradients */}
      <linearGradient id="shoot1" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="transparent"/>
        <stop offset="60%" stopColor="rgba(165,243,252,0.6)"/>
        <stop offset="100%" stopColor="white"/>
      </linearGradient>
      <linearGradient id="shoot2" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="transparent"/>
        <stop offset="60%" stopColor="rgba(147,197,253,0.5)"/>
        <stop offset="100%" stopColor="white"/>
      </linearGradient>

      {/* Arc1 mask — hides the arc where orbs sit (back-side hidden effect) */}
      <mask id="mask-arc1">
        <rect x="-1000" y="-2000" width="5000" height="6000" fill="white"/>
        <circle r="36" fill="black">
          <animateMotion dur="42s" begin="0s" repeatCount="indefinite" rotate="none">
            <mpath href="#arc1"/>
          </animateMotion>
        </circle>
        <circle r="36" fill="black">
          <animateMotion dur="42s" begin="21s" repeatCount="indefinite" rotate="none">
            <mpath href="#arc1"/>
          </animateMotion>
        </circle>
      </mask>

      {/* Arc2 mask */}
      <mask id="mask-arc2">
        <rect x="-1000" y="-2000" width="5000" height="6000" fill="white"/>
        <circle r="50" fill="black">
          <animateMotion dur="36s" begin="0s" repeatCount="indefinite" rotate="none"
            keyPoints="1;0" keyTimes="0;1" calcMode="linear">
            <mpath href="#arc2"/>
          </animateMotion>
        </circle>
        <circle r="27" fill="black">
          <animateMotion dur="36s" begin="18s" repeatCount="indefinite" rotate="none"
            keyPoints="1;0" keyTimes="0;1" calcMode="linear">
            <mpath href="#arc2"/>
          </animateMotion>
        </circle>
      </mask>
      {/* Nebula glow */}
      <radialGradient id="nebula-c" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stopColor="rgba(43,100,200,0.12)"/>
        <stop offset="50%" stopColor="rgba(20,60,140,0.06)"/>
        <stop offset="100%" stopColor="transparent"/>
      </radialGradient>
      <radialGradient id="nebula-l" cx="15%" cy="55%" r="35%">
        <stop offset="0%" stopColor="rgba(0,180,220,0.07)"/>
        <stop offset="100%" stopColor="transparent"/>
      </radialGradient>
      <radialGradient id="nebula-r" cx="85%" cy="50%" r="35%">
        <stop offset="0%" stopColor="rgba(80,50,200,0.07)"/>
        <stop offset="100%" stopColor="transparent"/>
      </radialGradient>
    </defs>

    <style>{`
      @keyframes arc_starA { 0%,100%{opacity:.08} 50%{opacity:.9} }
      @keyframes arc_starB { 0%,100%{opacity:.04} 35%{opacity:.65} 70%{opacity:.18} }
      @keyframes arc_nebula { 0%,100%{opacity:.6} 50%{opacity:1} }
    `}</style>

    {/* ── NEBULA GLOWS ── */}
    <ellipse cx="720" cy="260" rx="600" ry="220" fill="url(#nebula-c)"
      style={{animation:'arc_nebula 7s ease-in-out infinite'}}/>
    <ellipse cx="180" cy="320" rx="350" ry="180" fill="url(#nebula-l)"
      style={{animation:'arc_nebula 9s ease-in-out 2s infinite'}}/>
    <ellipse cx="1260" cy="300" rx="320" ry="170" fill="url(#nebula-r)"
      style={{animation:'arc_nebula 8s ease-in-out 4s infinite'}}/>

    {/* ── STARS ── */}
    {STARS.map(([cx,cy,r,dur,delay],i) => (
      <circle key={i} cx={cx} cy={cy} r={r} fill="white"
        filter="url(#star-glow)"
        style={{
          animation:`${i%3===0?'arc_starA':'arc_starB'} ${dur}s ${delay}s ease-in-out infinite`,
          opacity:.1,
        }}/>
    ))}

    {/* ── DOME FILL ── */}
    <path d="M 380 580 A 340 290 0 0 1 1060 580" fill="url(#dome-fill)" />

    {/* ── ARC PATHS ── */}
    <path id="arc1" d="M -80 580 A 800 650 0 0 1 1520 580"
      stroke="url(#orb-top-light)" strokeWidth="1.5" fill="none" mask="url(#mask-arc1)" />
    <path id="arc2" d="M 175 580 A 545 420 0 0 1 1265 580"
      stroke="url(#orb-l-light)" strokeWidth="1.5" fill="none" mask="url(#mask-arc2)" />

    {/* Arc light overlays */}
    <path d="M -80 580 A 800 650 0 0 1 1520 580"
      stroke="url(#orb-light)" strokeWidth="1.5" fill="none" mask="url(#mask-arc1)" />
    <path d="M 175 580 A 545 420 0 0 1 1265 580"
      stroke="url(#orb-light)" strokeWidth="1.5" fill="none" mask="url(#mask-arc2)" />

    {/* ── ARC1 ORBS → O'NGGA (chap→o'ng) ── */}
    <g>
      <animateMotion dur="42s" begin="0s" repeatCount="indefinite" rotate="none">
        <mpath href="#arc1" />
      </animateMotion>
      <animate attributeName="opacity"
        values="0;0.12;0.9;1;0.9;0.12;0"
        keyTimes="0;0.12;0.42;0.5;0.58;0.88;1"
        dur="42s" begin="0s" repeatCount="indefinite" />
      <circle r="45" fill="rgba(30,80,180,0.22)" filter="url(#orb-ambient)" />
      <circle r="35" fill="url(#orb-dark)" stroke="url(#orb-r-stroke)" strokeWidth="1" />
    </g>
    <g>
      <animateMotion dur="42s" begin="21s" repeatCount="indefinite" rotate="none">
        <mpath href="#arc1" />
      </animateMotion>
      <animate attributeName="opacity"
        values="0;0.12;0.9;1;0.9;0.12;0"
        keyTimes="0;0.12;0.42;0.5;0.58;0.88;1"
        dur="42s" begin="21s" repeatCount="indefinite" />
      <circle r="45" fill="rgba(30,80,180,0.22)" filter="url(#orb-ambient)" />
      <circle r="35" fill="url(#orb-dark)" stroke="url(#orb-r-stroke)" strokeWidth="1" />
    </g>

    {/* ── ARC2 ORBS → CHAPGA (o'ng→chap, reverse) ── */}
    <g>
      <animateMotion dur="36s" begin="0s" repeatCount="indefinite" rotate="none"
        keyPoints="1;0" keyTimes="0;1" calcMode="linear">
        <mpath href="#arc2" />
      </animateMotion>
      <animate attributeName="opacity"
        values="0;0.1;0.85;1;0.85;0.1;0"
        keyTimes="0;0.13;0.43;0.5;0.57;0.87;1"
        dur="36s" begin="0s" repeatCount="indefinite" />
      <circle r="60" fill="rgba(30,80,180,0.20)" filter="url(#orb-ambient)" />
      <circle r="48" fill="url(#orb-dark)" stroke="url(#orb-r-stroke)" strokeWidth="1" />
    </g>
    <g>
      <animateMotion dur="36s" begin="18s" repeatCount="indefinite" rotate="none"
        keyPoints="1;0" keyTimes="0;1" calcMode="linear">
        <mpath href="#arc2" />
      </animateMotion>
      <animate attributeName="opacity"
        values="0;0.1;0.85;1;0.85;0.1;0"
        keyTimes="0;0.13;0.43;0.5;0.57;0.87;1"
        dur="36s" begin="18s" repeatCount="indefinite" />
      <circle r="35" fill="rgba(30,80,180,0.28)" filter="url(#orb-ambient)" />
      <circle r="25" fill="url(#orb-dark)" stroke="url(#orb-l-stroke)" strokeWidth="1" />
    </g>
  </svg>
)

export default function IshOrinlariHero() {
  const { show } = useHeroPhase()
  const [email, setEmail] = useState('')
  const sectionRef = useRef(null)
  const { tilt, cursor } = useMouseParallax(sectionRef)

  return (
    <section
      ref={sectionRef}
      style={{
        width: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        padding: '100px 24px 160px',
        minHeight: '640px', background: 'rgba(14,18,27,1)',
      }}
    >
      <ArcBackground tilt={tilt} />

      {/* Cursor glow */}
      <div style={{
        position: 'absolute',
        left: cursor.x, top: cursor.y,
        width: '380px', height: '380px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(55,139,239,0.13) 0%, rgba(0,180,255,0.06) 40%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        filter: 'blur(18px)',
        pointerEvents: 'none',
        zIndex: 2,
        transition: 'opacity 0.3s',
      }} />

      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center',
        gap: '10px', zIndex: 10, position: 'relative',
        maxWidth: '820px', width: '100%',
      }}>
        <div style={show(1)}>
          <Button text='Ish va imkoniyatlar platformasi' variant='dark' />
        </div>

        <div style={show(2)}>
          <h1 style={{
            fontFamily: '"Inter Display",Inter,sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(38px, 5.5vw, 70px)',
            lineHeight: 1.08, letterSpacing: '-.03em',
            color: '#fff', margin: 0,
          }}>
            Eng dolzarb ish o&apos;rinlari
            <br />
            <span style={{ color: 'rgba(0,230,252,1)' }}>bitta platformada</span>
          </h1>
        </div>

        <div style={show(3)}>
          <p style={{
            fontFamily: '"Inter Display",Inter,sans-serif',
            fontWeight: 400, fontSize: '16px', lineHeight: 1.75,
            color: 'rgba(188,188,188,1)', maxWidth: '500px', margin: 0,
          }}>
            Ish beruvchilar va nomzodlarni bog&apos;lovchi zamonaviy platforma.
            Sizga mos ishni tez toping va karyerangizni rivojlantiring.
          </p>
        </div>

        <div style={{ ...show(4), position: 'relative', width: '477px', height: '52px', marginTop: '50px', display: 'flex', alignItems: 'center', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', boxShadow: '0px 4px 20px 0px rgba(47,7,106,0.08)', backdropFilter: 'blur(10px)', overflow: 'hidden' }}>
          <div className='relative z-10 flex items-center w-full h-full px-[6px] py-[6px] gap-1'>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Pochtangizni qoldiring"
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                padding: '0 16px', color: '#fff', fontSize: '16px',
                fontFamily: '"Inter Display",Inter,sans-serif',
              }}
            />
            <button
              style={{
                color: '#fff', fontFamily: '"Inter Display",Inter,sans-serif',
                fontWeight: 400, fontSize: '16px',
                width: '160px', height: '44px', borderRadius: '10px',
                border: '1px solid rgba(28,84,148,1)', padding: '12px',
                background: 'linear-gradient(180deg,#3E8BE6 0%,#1C5FB4 100%)',
                boxShadow: '0px 2px 6px 0px rgba(255,255,255,0.25) inset, 0px -2px 4px 0px rgba(14,18,27,0.3) inset, 0px 0px 0px 1px rgba(28,84,148,1)',
                cursor: 'pointer', whiteSpace: 'nowrap', transition: 'filter .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.18)' }}
              onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)' }}
            >
              Vakansiya izlash
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
