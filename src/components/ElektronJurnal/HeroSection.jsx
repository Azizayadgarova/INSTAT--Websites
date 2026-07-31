import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CARDS } from '@/data/journals.data'
import { Button } from '../shared/Button'
import Text from '../shared/Text'
import CarouselCard from './CarouselCard'
import { C_H, KF, N, nextPid, PCOLORS, ROT_Y, SPEED, SPREAD_X, SPREAD_Z, STAIR_Y, wrapOffset } from './constants'

function useIsMobile(bp = 768) {
	const [mob, setMob] = useState(false)
	useEffect(() => {
		const check = () => setMob(window.innerWidth < bp)
		check()
		window.addEventListener('resize', check, { passive: true })
		return () => window.removeEventListener('resize', check)
	}, [bp])
	return mob
}

function HeroSection() {
    const {
        t
    } = useTranslation();

    const isMobile = useIsMobile()
    const [visible, setVisible] = useState(false)
    const [flipped, setFlipped] = useState({})
    const [hovered, setHovered] = useState(null)
    const [shimmer, setShimmer] = useState({})
    const [tilts, setTilts] = useState(CARDS.map(() => ({ rx: 0, ry: 0 })))
    const [particles, setParticles] = useState([])
    const [ripple, setRipple] = useState(null)
    const [transforms, setTransforms] = useState([])

    const indexRef    = useRef(0)
    const pausedRef   = useRef(false)
    const rafRef      = useRef(null)
    const cardRefs    = useRef([])
    const sectionRef  = useRef(null)
    const visibleRef  = useRef(false)

    useEffect(() => {
		const el = document.createElement('style')
		el.setAttribute('data-ej-kf', '1')
		el.textContent = KF
		document.head.appendChild(el)
		return () => document.head.removeChild(el)
	}, [])

    useEffect(() => {
		const t = setTimeout(() => setVisible(true), 80)
		return () => clearTimeout(t)
	}, [])

    useEffect(() => {
		const loop = () => {
			if (!pausedRef.current) indexRef.current = (indexRef.current + SPEED) % N
			const ci = indexRef.current
			const tfs = CARDS.map((_, i) => {
				const raw = i - ci
				const off = wrapOffset(raw)
				const abs = Math.abs(off)
				const sign = Math.sign(off)
				const t = Math.min(abs / 2, 1)
				const tSq = t * t
				return {
					rotY: sign * Math.min(abs * ROT_Y, ROT_Y),
					transX: off * SPREAD_X,
					transZ: -abs * SPREAD_Z,
					transY: tSq * STAIR_Y,
					scale: 1 - tSq * 0.28,
					opac: abs > 2.2 ? 0 : 1 - Math.min(abs * 0.28, 0.6),
					zIdx: Math.round((1 - abs) * 50) + 50,
					abs,
				}
			})
			setTransforms(tfs)
			if (visibleRef.current) {
				rafRef.current = requestAnimationFrame(loop)
			} else {
				rafRef.current = null
			}
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				visibleRef.current = entry.isIntersecting
				if (entry.isIntersecting && !rafRef.current) {
					rafRef.current = requestAnimationFrame(loop)
				}
			},
			{ threshold: 0.1 },
		)
		if (sectionRef.current) observer.observe(sectionRef.current)
		rafRef.current = requestAnimationFrame(loop)

		return () => {
			cancelAnimationFrame(rafRef.current)
			rafRef.current = null
			observer.disconnect()
		}
	}, [])

    const onMove = useCallback((e, i) => {
		const el = cardRefs.current[i]
		if (!el) return
		const r = el.getBoundingClientRect()
		setTilts(p =>
			p.map((t, idx) =>
				idx === i
					? {
							rx: ((e.clientY - r.top) / r.height - 0.5) * -18,
							ry: ((e.clientX - r.left) / r.width - 0.5) * 20,
						}
					: t,
			),
		)
	}, [])

    const onEnter = useCallback((e, i) => {
		pausedRef.current = true
		setHovered(i)
		setShimmer(p => ({ ...p, [i]: false }))
		requestAnimationFrame(() => setShimmer(p => ({ ...p, [i]: true })))
		const el = cardRefs.current[i]
		if (el) {
			const r = el.getBoundingClientRect()
			setRipple({
				x: e.clientX - r.left,
				y: e.clientY - r.top,
				i,
				id: Date.now(),
			})
		}
	}, [])

    const onLeave = useCallback(i => {
		pausedRef.current = false
		setHovered(null)
		setShimmer(p => ({ ...p, [i]: false }))
		setTilts(p => p.map((t, idx) => (idx === i ? { rx: 0, ry: 0 } : t)))
		setRipple(null)
	}, [])

    const onClick = useCallback((e, i) => {
		setFlipped(p => ({ ...p, [i]: !p[i] }))
		const el = cardRefs.current[i]
		if (!el) return
		const r = el.getBoundingClientRect()
		const cx = e.clientX - r.left,
			cy = e.clientY - r.top
		setParticles(p => [
			...p,
			...Array.from({ length: 14 }, (_, k) => {
				const a = (k / 14) * Math.PI * 2,
					d = 50 + Math.random() * 80
				return {
					id: nextPid(),
					x: cx - 3,
					y: cy - 3,
					i,
					color: PCOLORS[Math.floor(Math.random() * PCOLORS.length)],
					dx: Math.cos(a) * d,
					dy: Math.sin(a) * d,
				}
			}),
		])
	}, [])

    const removePart = useCallback(
		id => setParticles(p => p.filter(x => x.id !== id)),
		[],
	)

    return (
        <section
			ref={sectionRef}
				style={{
					width: '100%',
					backgroundImage: 'url(/BG.webp)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					position: 'relative',
					overflow: 'hidden',
					paddingTop: '100px',
				}}
			>
            {/* Hero text */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '24px',
                    zIndex: 10,
                    position: 'relative',
                    opacity: visible ? 1 : 0,
                    animation: visible
                        ? 'ej_fadeUp .9s cubic-bezier(.16,1,.3,1) both'
                        : 'none',
                }}
            >
                <Button text='Platforma haqida' variant='dark' />
                <h1
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: 'clamp(32px, 8.33vw, 64px)',
                        lineHeight: 1.1,
                        letterSpacing: '-.03em',
                        color: '#fff',
                        maxWidth: '1100px',
                        margin: 0,
                    }}
                >{t("components.heroSection.ilmiy_jurnallar_va_maqolalar")}<br />
                    <span style={{ color: 'rgba(var(--cyan-rgb),1)' }}>{t("components.heroSection.yagona_platforma")}</span>
                </h1>
                <p
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: 1.6,
                        color: 'rgba(var(--text-rgb),1)',
                        maxWidth: '480px',
                        margin: 0,
                    }}
                >{t("components.heroSection.recenzentdan_otgan_ilmiy_maqolalar")}</p>
            </div>
            {/* Carousel */}
            <div
                className='ej-carousel'
                style={{
                    position: 'relative',
                    width: '100%',
                    height: isMobile ? `${C_H}px` : '480px',
                    marginTop: isMobile ? '32px' : '52px',
                    perspective: '1100px',
                    perspectiveOrigin: '50% 38%',
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 1s ease .3s',
                }}
            >
                {CARDS.map((card, i) => {
                    const tf = transforms[i]
                    if (!tf) return null
                    return (
                        <CarouselCard
                            key={card.backTitle}
                            card={card}
                            i={i}
                            tf={tf}
                            isH={hovered === i}
                            isFlip={!!flipped[i]}
                            tilt={tilts[i]}
                            shimmer={!!shimmer[i]}
                            ripple={ripple?.i === i ? ripple : null}
                            particles={particles.filter(p => p.i === i)}
                            cardRef={el => (cardRefs.current[i] = el)}
                            onMove={e => onMove(e, i)}
                            onEnter={e => onEnter(e, i)}
                            onLeave={() => onLeave(i)}
                            onClick={e => onClick(e, i)}
                            removePart={removePart}
                        />
                    )
                })}
            </div>
            {/* CTA button */}
            <div
                style={{
                    marginTop: '0px',
                    marginBottom: '40px',
                    zIndex: 10,
                    position: 'relative',
                    opacity: visible ? 1 : 0,
                    transition: 'opacity .85s ease .6s',
                }}
            >
                <button
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: 'rgba(var(--blue-rgb),1)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '100px',
                        padding: '14px 28px',
                        fontSize: '16px',
                        fontWeight: 500,
                        fontFamily: 'var(--font-display)',
                        cursor: 'pointer',
                        transition: 'opacity .2s, transform .2s',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.opacity = '.85'
                        e.currentTarget.style.transform = 'scale(1.06)'
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.opacity = '1'
                        e.currentTarget.style.transform = 'scale(1)'
                    }}
                >{t("components.heroSection.maqola_yuborish")}<svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
                        <path
                            d='M5 12h14M13 6l6 6-6 6'
                            stroke='#fff'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                </button>
            </div>
        </section>
    );
}

export default HeroSection
