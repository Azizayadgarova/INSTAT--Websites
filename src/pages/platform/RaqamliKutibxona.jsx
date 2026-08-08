import { useTranslation } from 'react-i18next'
import { useSectionText } from '@/hooks/useSectionText'
import bgImage from '@/assets/bgImg/Ai-boom 2.webp'
import img1 from '@/assets/image1.webp'
import img2 from '@/assets/image2.webp'
import img3 from '@/assets/image3.webp'
import img4 from '@/assets/image4.webp'
import img5 from '@/assets/image5.webp'
import card2 from '@/assets/kutubxona1.png'
import card3 from '@/assets/kutubxona2.png'
import card4 from '@/assets/kutubxona3.png'
import card5 from '@/assets/kutubxona4.png'
import card1 from '@/assets/kutubxona5.png'
import { useCallback, useEffect, useRef, useState } from 'react'
import ElektronKutubxona from '../../components/ElektronKutubxona'
import FAQSection from '../../components/FAQSection'
import FoydalanishJarayoni from '../../components/FoydalanishJarayoni'
import InformationStatistika from '../../components/InformationStatistika'
import Kutubxona from '../../components/Kutubxona'
import ProblemSection from '../../components/ProblemSection'
import Testimonials from '../../components/Testimonial'
import Text from '../../components/shared/Text'

const POSITIONS = [
	{ rotate: 1, translateY: 40, zIndex: 1, floatDuration: 3.8, floatDelay: 0 },
	{
		rotate: -8,
		translateY: 20,
		zIndex: 2,
		floatDuration: 4.2,
		floatDelay: 0.5,
	},
	{ rotate: 0, translateY: 0, zIndex: 5, floatDuration: 3.5, floatDelay: 1.0 },
	{ rotate: 8, translateY: 20, zIndex: 2, floatDuration: 4.6, floatDelay: 0.3 },
	{
		rotate: -1,
		translateY: 40,
		zIndex: 1,
		floatDuration: 3.2,
		floatDelay: 0.8,
	},
]

const IMAGES = [card1, card2, card3, card4, card5]

const CARD_BOX_SHADOW = `
  0px 16px 35px rgba(var(--bg-rgb),0.08),
  0px 63px 63px rgba(var(--bg-rgb),0.06),
  0px 142px 85px rgba(var(--bg-rgb),0.04),
  0px 252px 101px rgba(var(--bg-rgb),0.02)
`
const HOVER_BOX_SHADOW = `
  0px 24px 50px rgba(var(--bg-rgb),0.22),
  0px 80px 80px rgba(var(--bg-rgb),0.14),
  0px 160px 100px rgba(var(--bg-rgb),0.07)
`

const keyframes = `
  @keyframes floatCard {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-14px); }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes cardEntrance {
    from { opacity: 0; transform: translateY(80px) scale(0.92); }
    to   { opacity: 1; transform: translateY(0)   scale(1); }
  }
  @keyframes shimmer {
    0%   { left: -120%; }
    100% { left: 160%; }
  }
  @keyframes glowPulse {
    0%, 100% { opacity: 0.35; transform: translateX(-50%) scale(1); }
    50%       { opacity: 0.65; transform: translateX(-50%) scale(1.14); }
  }
  @keyframes ribbonScroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes ribbonScrollReverse {
    0%   { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
  @media (max-width: 767px) {
    .rk-cards-scene { zoom: 0.72; }
    .rk-card-outer { display: none; }
  }
`

const PARTICLE_COLORS = ['#534AB7', '#0F6E56', '#993C1D', '#993556', '#185FA5']

const RIBBON_ROW1 = [
	{ label: 'Qonunchilik va Huquq', img: img1 },
	{ label: "Ta'lim Standartlari", img: img2 },
	{ label: 'Tadqiqot va Statistika', img: img3 },
	{ label: 'Madaniyat va Milliy Meros', img: img4 },
	{ label: 'Ilm-fan va Texnologiya', img: img5 },
]
const RIBBON_ROW2 = [
	{ label: 'Ilm-fan va Texnologiya', img: img5 },
	{ label: 'Qonunchilik va Huquq', img: img1 },
	{ label: 'Tadqiqot va Statistika', img: img3 },
	{ label: 'Madaniyat va Milliy Meros', img: img4 },
	{ label: "Ta'lim Standartlari", img: img2 },
]

// 6x takrorlash — har qanday kenglikdagi ekranda bo'shliqsiz ishlaydi
const ROW1 = [
	...RIBBON_ROW1,
	...RIBBON_ROW1,
	...RIBBON_ROW1,
	...RIBBON_ROW1,
	...RIBBON_ROW1,
	...RIBBON_ROW1,
]
const ROW2 = [
	...RIBBON_ROW2,
	...RIBBON_ROW2,
	...RIBBON_ROW2,
	...RIBBON_ROW2,
	...RIBBON_ROW2,
	...RIBBON_ROW2,
]

const RaqamliKutibxona = () => {
    const {
        t
    } = useTranslation();

    const st = useSectionText('library')

    const [mounted, setMounted] = useState(false)
    const [hoveredIndex, setHovered] = useState(null)
    const [, setParticles] = useState([])
    const [shimmers, setShimmers] = useState({})
    const [order, setOrder] = useState(() => IMAGES.map((_, i) => i))
    const [dragOver, setDragOver] = useState(null)

    const sceneRef = useRef(null)
    const mouseRef = useRef({ mx: 0, my: 0 })
    const rafRef = useRef(null)
    const cardRefs = useRef([])
    const floatRefs = useRef([])
    const tRef = useRef(0)
    const lastRef = useRef(0)
    const hoveredRef = useRef(null)
    const dragIndexRef = useRef(null)
    const swapRef = useRef({})

    const centerIndex = Math.floor(POSITIONS.length / 2)

    useEffect(() => {
		const el = document.createElement('style')
		el.setAttribute('data-rk-kf', '1')
		el.textContent = keyframes
		document.head.appendChild(el)
		return () => document.head.removeChild(el)
	}, [])

    useEffect(() => {
		const t = setTimeout(() => setMounted(true), 50)
		return () => clearTimeout(t)
	}, [])

    useEffect(() => {
		const el = sceneRef.current
		if (!el) return

		const onMove = e => {
			const r = el.getBoundingClientRect()
			mouseRef.current = {
				mx: (e.clientX - r.left - r.width / 2) / (r.width / 2),
				my: (e.clientY - r.top - r.height / 2) / (r.height / 2),
			}
		}
		const onLeave = () => {
			mouseRef.current = { mx: 0, my: 0 }
		}

		el.addEventListener('mousemove', onMove)
		el.addEventListener('mouseleave', onLeave)
		return () => {
			el.removeEventListener('mousemove', onMove)
			el.removeEventListener('mouseleave', onLeave)
		}
	}, [])

    useEffect(() => {
		if (!mounted) return

		const loop = ts => {
			const dt = Math.min((ts - lastRef.current) / 1000, 0.05)
			lastRef.current = ts
			tRef.current += dt

			const t = tRef.current
			const hI = hoveredRef.current
			const { mx, my } = mouseRef.current

			POSITIONS.forEach((card, i) => {
				const floatEl = floatRefs.current[i]
				const tiltEl = cardRefs.current[i]
				if (!floatEl || !tiltEl) return

				const isH = hI === i
				const isSib = hI !== null && Math.abs(i - hI) === 1
				const offset = (i - centerIndex) * 160

				const floatY =
					Math.sin(t * ((2 * Math.PI) / card.floatDuration) + card.floatDelay) *
					10
				const pxX = mx * (i - centerIndex) * 6
				const pxY = my * 7

				const tiltX = isH ? my * -14 : 0
				const tiltY = isH ? mx * 12 : 0
				const scale = isH ? 1.08 : isSib ? 0.97 : 1
				const rotate = isH ? card.rotate * 0.4 : card.rotate
				const ty = isH ? card.translateY - 24 : card.translateY

				floatEl.style.transform = `translateY(${floatY + pxY}px)`
				tiltEl.style.transform = `
          translateX(-50%)
          translateX(${offset + pxX}px)
          rotate(${rotate}deg)
          translateY(${ty}px)
          scale(${scale})
          rotateX(${tiltX}deg)
          rotateY(${tiltY}deg)
        `
				const isSwapping = swapRef.current[i]
				tiltEl.style.transition = isSwapping
					? 'transform 0.7s cubic-bezier(0.34,1.56,0.64,1), filter 0.5s ease'
					: isH
						? 'transform 0.1s linear'
						: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)'
				tiltEl.style.filter = isSwapping
					? 'brightness(1.35) drop-shadow(0 0 22px rgba(83,74,183,0.85))'
					: ''
			})

			rafRef.current = requestAnimationFrame(loop)
		}

		rafRef.current = requestAnimationFrame(loop)
		return () => cancelAnimationFrame(rafRef.current)
	}, [mounted])

    const handleEnter = useCallback(i => {
		setHovered(i)
		hoveredRef.current = i
		setShimmers(prev => ({ ...prev, [i]: false }))
		requestAnimationFrame(() => setShimmers(prev => ({ ...prev, [i]: true })))
	}, [])

    const handleLeave = useCallback(i => {
		setHovered(null)
		hoveredRef.current = null
		setShimmers(prev => ({ ...prev, [i]: false }))
	}, [])

    const handleDrop = useCallback(dropIdx => {
		const dragIdx = dragIndexRef.current
		if (dragIdx === null || dragIdx === dropIdx) {
			setDragOver(null)
			return
		}
		swapRef.current = { [dragIdx]: true, [dropIdx]: true }
		setTimeout(() => {
			swapRef.current = {}
		}, 800)
		setOrder(prev => {
			const next = [...prev]
			;[next[dragIdx], next[dropIdx]] = [next[dropIdx], next[dragIdx]]
			return next
		})
		dragIndexRef.current = null
		setDragOver(null)
	}, [])

    const handleClick = useCallback((e) => {
		const rect = e.currentTarget.getBoundingClientRect()
		const cx = e.clientX - rect.left
		const cy = e.clientY - rect.top
		const id = Date.now()
		const burst = Array.from({ length: 10 }, (_, p) => {
			const angle = Math.random() * 2 * Math.PI
			const dist = 45 + Math.random() * 65
			return {
				id: `${id}-${p}`,
				x: cx,
				y: cy,
				dx: Math.cos(angle) * dist,
				dy: Math.sin(angle) * dist,
				color:
					PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
			}
		})
		setParticles(prev => [...prev, ...burst])
		setTimeout(
			() =>
				setParticles(prev => prev.filter(p => !p.id.startsWith(String(id)))),
			750,
		)
	}, [])

    return (
        <>
            <div
				ref={sceneRef}
				style={{
					width: '100%',
					backgroundImage: `url(${bgImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center -77px',
					backgroundRepeat: 'no-repeat',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					paddingTop: '100px',
					overflow: 'hidden',
					position: 'relative',
				}}
			>
				<div
					style={{
						zIndex: 10,
						animation: mounted
							? 'fadeSlideUp 0.8s cubic-bezier(0.22,1,0.36,1) both'
							: 'none',
						opacity: mounted ? 1 : 0,
					}}
				>
					<Text
						buttonText='Platforma haqida'
						title={st('library_title1', t("pages.raqamliKutibxona.minglab_elektron_kitoblar"))}
						highlight={st('library_title2', '-bir platformada')}
						subtitle={st('library_description1',
							<>{t("pages.raqamliKutibxona.onlayn_kitoblarni_sotib_oling")}<br />{t("pages.raqamliKutibxona.istalgan_qurilmada_oqing")}</>
						)}
						buttonType='button2'
					/>
				</div>

				<div
					className="rk-cards-scene"
					style={{
						position: 'relative',
						width: '900px',
						height: '440px',
						marginTop: '38px',
					}}
				>
					<div
						style={{
							position: 'absolute',
							left: '50%',
							bottom: '12px',
							transform: 'translateX(-50%)',
							width: '240px',
							height: '60px',
							borderRadius: '50%',
							background:
								'radial-gradient(ellipse, rgba(83,74,183,0.5) 0%, rgba(83,74,183,0) 75%)',
							filter: 'blur(20px)',
							animation: mounted ? 'glowPulse 3s ease-in-out infinite' : 'none',
							pointerEvents: 'none',
							zIndex: 0,
						}}
					/>

					{order.map((cardIdx, i) => {
						const pos = POSITIONS[i]
						const isHovered = hoveredIndex === i
						const isOuter = i === 0 || i === POSITIONS.length - 1

						return (
							<div
								key={cardIdx}
								className={isOuter ? 'rk-card-outer' : undefined}
								style={{
									position: 'absolute',
									left: '50%',
									top: '0',
									animation: mounted
										? `cardEntrance 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.08 + 0.1}s both`
										: 'none',
									zIndex: isHovered ? 20 : pos.zIndex,
									cursor: 'grab',
								}}
								onMouseEnter={() => handleEnter(i)}
								onMouseLeave={() => handleLeave(i)}
								onClick={e => handleClick(e, i)}
								draggable
								onDragStart={() => {
									dragIndexRef.current = i
								}}
								onDragOver={e => {
									e.preventDefault()
									setDragOver(i)
								}}
								onDrop={() => handleDrop(i)}
								onDragEnd={() => {
									dragIndexRef.current = null
									setDragOver(null)
								}}
							>
								<div ref={el => (floatRefs.current[i] = el)}>
									<div
										ref={el => (cardRefs.current[i] = el)}
										style={{ transformStyle: 'preserve-3d' }}
									>
										<div
											style={{
												width: '280px',
												height: '351px',
												borderRadius: '40px',
												overflow: 'hidden',
												boxShadow: isHovered
													? HOVER_BOX_SHADOW
													: CARD_BOX_SHADOW,
												transition: 'box-shadow 0.45s ease',
												position: 'relative',
											}}
										>
											<img
												src={IMAGES[cardIdx]}
												alt=''
												style={{
													width: '400px',
													height: '600px',
													objectFit: 'cover',
													transform: isHovered ? 'scale(1.05)' : 'scale(1)',
													transition:
														'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
													display: 'block',
												}} loading='lazy' decoding='async' />
											<div
												style={{
													position: 'absolute',
													inset: 0,
													background: isHovered
														? 'linear-gradient(90deg, rgba(var(--bg-rgb),0.15) 0%, rgba(var(--bg-rgb),0) 15%, rgba(var(--bg-rgb),0) 85%, rgba(var(--bg-rgb),0.15) 100%), linear-gradient(180deg, rgba(var(--bg-rgb),0) 0%, rgba(var(--bg-rgb),0.08) 100%)'
														: 'linear-gradient(90deg, rgba(var(--bg-rgb),0.25) 0%, rgba(var(--bg-rgb),0) 15%, rgba(var(--bg-rgb),0) 85%, rgba(var(--bg-rgb),0.25) 100%), linear-gradient(180deg, rgba(var(--bg-rgb),0) 0%, rgba(var(--bg-rgb),0.22) 100%)',
													transition: 'background 0.4s ease',
													pointerEvents: 'none',
												}}
											/>
											{dragOver === i && (
												<div
													style={{
														position: 'absolute',
														inset: 0,
														borderRadius: '40px',
														boxShadow: '0 0 0 3px rgba(83,74,183,0.8)',
														pointerEvents: 'none',
														zIndex: 10,
													}}
												/>
											)}
											{shimmers[i] && (
												<div
													style={{
														position: 'absolute',
														top: '-60%',
														width: '70px',
														height: '280%',
														background:
															'linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.38) 50%, rgba(255,255,255,0) 100%)',
														transform: 'skewX(-18deg)',
														animation:
															'shimmer 0.65s cubic-bezier(0.22,1,0.36,1) both',
														pointerEvents: 'none',
													}}
												/>
											)}
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>

				{/* ── SCROLLING RIBBON SECTION ── */}
				<div
					style={{
						position: 'relative',
						width: '100%',
						maxWidth: '1440px',
						margin: '0 auto',
						display: 'flex',
						flexDirection: 'column',
						gap: '14px',
						marginTop: '0px',
						overflow: 'hidden',
						zIndex: 10,
						paddingBottom: '0px',
						WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
						maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
					}}
				>

					{[
						// { items: ROW1, anim: 'ribbonScroll 40s linear infinite' },
						// { items: ROW2, anim: 'ribbonScrollReverse 48s linear infinite' },
					].map((row, rowIdx) => (
						<div
							key={rowIdx}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '16px',
								width: 'max-content',
								animation: mounted ? row.anim : 'none',
								willChange: 'transform',
							}}
						>
							{/* Lenta bir xil elementlarni takrorlaydi va tartibi hech qachon o'zgarmaydi —
							    bu yerda indeks kalit to'g'ri yechim */}
							{row.items.map((item, i) => (
								<div
									key={`${item.label}-${i}`}
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '8px',
										width: '221px',
										height: '60px',
										flexShrink: 0,
										borderRadius: '40px',
										border: '1px solid rgba(31, 37, 51, 1)',
										background: 'rgba(var(--card-rgb),1)',
										backdropFilter: 'blur(20px)',
										WebkitBackdropFilter: 'blur(20px)',
										boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.1) inset',
										padding: '6px 12px 6px 6px',
										boxSizing: 'border-box',
										opacity: 1,
									}}
								>
									<div
										style={{
											width: '48px',
											height: '48px',
											borderRadius: '50%',
											flexShrink: 0,
											overflow: 'hidden',
										}}
									>
										<img
											src={item.img}
											alt=''
											style={{
												width: '100%',
												height: '100%',
												objectFit: 'cover',
												display: 'block',
											}} loading='lazy' decoding='async' />
									</div>
									<span
										style={{
											color: '#ffffff',
											fontSize: '14px',
											fontWeight: 500,
											fontFamily: 'var(--font-display)',
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											lineHeight: '1.3',
											letterSpacing: '-0.01em',
										}}
									>
										{item.label}
									</span>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
            <InformationStatistika />
            <FoydalanishJarayoni />
            <ProblemSection />
            <ElektronKutubxona />
            <Kutubxona />
            <FAQSection hideParticles platformStyle module='library' />
            {/*<Testimonials hideParticles platformStyle />*/}
        </>
    );
}

export default RaqamliKutibxona
