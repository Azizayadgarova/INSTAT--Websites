import { useEffect, useRef, useState } from 'react'

const ITEMS = [
	{
		num: '01',
		title: 'Standart strukturaga rioya qiling',
		desc: "Maqola 2500–3000 so'zdan iborat bo'lishi va quyidagi bo'limlarni o'z ichiga olishi kerak: Kirish, Adabiyotlar tahlili, Tadqiqot metodologiyasi, Tahlil va natijalar, Xulosa va takliflar.",
		flip: false,
	},
	{
		num: '02',
		title: 'UDK raqami majburiy',
		desc: "Har bir maqolaga UDK kodi qo'yiladi (udc.online orqali). Maqola sarlavhasi aniq, ilmiy va mazmunni to'liq aks ettirishi lozim.",
		flip: true,
	},
	{
		num: '03',
		title: "Muallif ma'lumotlari to'liq ko'rsatilishi",
		desc: "Ism-familiya, ilmiy daraja, lavozim, tashkilot, shahar/davlat, e-mail va telefon raqam asosiy matn tilida ko'rsatilishi shart.",
		flip: false,
	},
	{
		num: '04',
		title: '3 tilda annotatsiya',
		desc: "Annotatsiya o'zbek, rus va ingliz tillarida (250–300 so'z) beriladi. Kalit so'zlar 15–20 ta miqdorda o'zbek va ingliz tillarida taqdim etiladi.",
		flip: true,
	},
	{
		num: '05',
		title: "Natijalar va xulosalar asoslangan bo'lishi kerak",
		desc: "Metodlar takrorlanadigan darajada aniq yoziladi, natijalar dalillar bilan ko'rsatiladi va yakunda aniq ilmiy xulosa hamda amaliy takliflar beriladi.",
		flip: false,
	},
]

const KF = `
@keyframes mt_fadeUp { from { opacity:0; transform:translateY(32px) } to { opacity:1; transform:translateY(0) } }
@keyframes mt_pulse  { 0% { transform:translateX(-50%) scale(1); opacity:0.85; } 100% { transform:translateX(-50%) scale(3.4); opacity:0; } }
`

function useInView(threshold = 0.15) {
	const ref = useRef(null)
	const [visible, setVisible] = useState(false)
	useEffect(() => {
		const el = ref.current
		if (!el) return
		const obs = new IntersectionObserver(
			([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
			{ threshold }
		)
		obs.observe(el)
		return () => obs.disconnect()
	}, [threshold])
	return [ref, visible]
}

function AnimatedItem({ item, idx, dotRef, pulseRef, numRef, contentRef }) {
	const numBlock = (
		<div
			ref={numRef}
			style={{
				flex: 1,
				display: 'flex',
				alignItems: 'center',
				justifyContent: item.flip ? 'flex-start' : 'flex-end',
				paddingRight: item.flip ? 0 : '100px',
				paddingLeft:  item.flip ? '100px' : 0,
				opacity: 0,
				willChange: 'transform, opacity',
			}}
		>
			<span style={{
				fontFamily: '"Inter Display",Inter,sans-serif',
				fontWeight: 700,
				fontSize: '72px',
				lineHeight: 1,
				color: '#ffffff',
				letterSpacing: '-0.04em',
				userSelect: 'none',
			}}>{item.num}</span>
		</div>
	)

	const contentBlock = (
		<div
			ref={contentRef}
			style={{
				flex: 1,
				paddingLeft:  item.flip ? 0 : '100px',
				paddingRight: item.flip ? '100px' : 0,
				opacity: 0,
				willChange: 'transform, opacity',
			}}
		>
			<div style={{
				padding: '16px 20px',
				borderRadius: '14px',
			}}>
				<h3 style={{
					fontFamily: '"Inter Display",Inter,sans-serif',
					fontWeight: 600,
					fontSize: '30px',
					lineHeight: 1.3,
					color: '#ffffff',
					margin: '0 0 10px',
				}}>{item.title}</h3>
				<p style={{
					fontFamily: '"Inter Display",Inter,sans-serif',
					fontWeight: 400,
					fontSize: '18px',
					lineHeight: 1.7,
					color: 'rgba(160,165,185,1)',
					margin: 0,
				}}>{item.desc}</p>
			</div>
		</div>
	)

	return (
		<div style={{
			display: 'flex',
			alignItems: 'flex-start',
			position: 'relative',
			minHeight: '140px',
			marginBottom: idx < ITEMS.length - 1 ? '60px' : 0,
		}}>
			{item.flip ? contentBlock : numBlock}

			{/* Pulse ring */}
			<div ref={pulseRef} style={{
				position: 'absolute',
				left: '50%',
				top: '16px',
				width: '16px',
				height: '16px',
				borderRadius: '50%',
				border: '2px solid rgba(43,117,204,0.85)',
				opacity: 0,
				pointerEvents: 'none',
				zIndex: 0,
			}}/>

			{/* Dot */}
			<div ref={dotRef} style={{
				position: 'absolute',
				left: '50%',
				top: '16px',
				width: '16px',
				height: '16px',
				borderRadius: '50%',
				background: 'rgba(43,117,204,1)',
				border: '2px solid rgba(43,117,204,0.4)',
				boxShadow: '0 0 10px rgba(43,117,204,0.6)',
				zIndex: 1,
				opacity: 0,
				transform: 'translateX(-50%) scale(0)',
				transition: 'opacity 0.3s ease, transform 0.4s cubic-bezier(.22,1,.36,1)',
			}}/>

			{item.flip ? numBlock : contentBlock}
		</div>
	)
}

export default function MaqolaTalablari() {
	const [headerRef, headerVisible] = useInView(0.3)
	const timelineRef  = useRef(null)
	const lineElRef    = useRef(null)
	const dotRefs      = useRef([])
	const pulseRefs    = useRef([])
	const numRefs      = useRef([])
	const contentRefs  = useRef([])
	const prevReached  = useRef([])

	useEffect(() => {
		const el = document.createElement('style')
		el.setAttribute('data-mt-kf', '1')
		el.textContent = KF
		document.head.appendChild(el)
		return () => document.head.removeChild(el)
	}, [])

	useEffect(() => {
		const onScroll = () => {
			const tl   = timelineRef.current
			const line = lineElRef.current
			if (!tl || !line) return
			const vh = window.innerHeight

			// Line
			const r        = tl.getBoundingClientRect()
			const progress = Math.min(1, Math.max(0, (vh - r.top) / (r.height + vh * 0.2)))
			line.style.transform = `translateX(-50%) scaleY(${progress})`
			line.style.opacity   = progress > 0 ? 1 : 0

			// Items
			ITEMS.forEach((item, idx) => {
				const dot   = dotRefs.current[idx]
				const pulse = pulseRefs.current[idx]
				const numEl = numRefs.current[idx]
				const conEl = contentRefs.current[idx]
				if (!dot) return

				const dr      = dot.getBoundingClientRect()
				const reached = dr.top + dr.height / 2 < vh * 0.82
				const was     = prevReached.current[idx]

				// Dot
				dot.style.opacity   = reached ? 1 : 0
				dot.style.transform = reached ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(0)'

				// Pulse — faqat yangi paydo bo'lganda
				if (pulse) {
					if (reached && !was) {
						pulse.style.animation = 'none'
						void pulse.offsetHeight
						pulse.style.animation = 'mt_pulse 0.7s ease-out both'
					} else if (!reached) {
						pulse.style.animation = 'none'
					}
				}

				// Num
				if (numEl) {
					const dir = item.flip ? 1 : -1
					if (reached) {
						numEl.style.transition = 'opacity 0.6s ease, transform 0.7s cubic-bezier(.22,1,.36,1)'
						numEl.style.opacity    = 1
						numEl.style.transform  = 'perspective(800px) rotateY(0deg) translateX(0px) translateZ(0px)'
					} else {
						numEl.style.transition = 'opacity 0.35s ease, transform 0.4s ease'
						numEl.style.opacity    = 0
						numEl.style.transform  = `perspective(800px) rotateY(${50 * dir}deg) translateX(${80 * dir}px) translateZ(-140px)`
					}
				}

				// Content
				if (conEl) {
					const dir = item.flip ? -1 : 1
					if (reached) {
						conEl.style.transition = 'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(.22,1,.36,1) 0.1s'
						conEl.style.opacity    = 1
						conEl.style.transform  = 'perspective(800px) rotateY(0deg) translateX(0px) translateZ(0px)'
					} else {
						conEl.style.transition = 'opacity 0.35s ease, transform 0.4s ease'
						conEl.style.opacity    = 0
						conEl.style.transform  = `perspective(800px) rotateY(${50 * dir}deg) translateX(${80 * dir}px) translateZ(-100px)`
					}
				}

				prevReached.current[idx] = reached
			})
		}

		window.addEventListener('scroll', onScroll, { passive: true })
		onScroll()
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	return (
		<section style={{
			width: '100%',
			background: 'rgba(22,27,38,1)',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			padding: '40px 0 80px',
			boxSizing: 'border-box',
		}}>
				{/* Header */}
			<div ref={headerRef} style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
				<div style={{
					display: 'inline-flex',
					alignItems: 'center',
					background: 'rgba(255,255,255,0.06)',
					border: '1px solid rgba(255,255,255,0.1)',
					borderRadius: '100px',
					padding: '5px 16px',
					marginBottom: '24px',
					opacity:   headerVisible ? 1 : 0,
					animation: headerVisible ? 'mt_fadeUp 0.6s cubic-bezier(.22,1,.36,1) 0s both' : 'none',
				}}>
					<span style={{
						fontFamily: '"Inter Display",Inter,sans-serif',
						fontSize: '12px',
						fontWeight: 500,
						color: 'rgba(180,185,200,1)',
						letterSpacing: '0.02em',
					}}>Talablar</span>
				</div>

				<h2 style={{
					fontFamily: '"Inter Display",Inter,sans-serif',
					fontWeight: 600,
					fontSize: '48px',
					lineHeight: '58px',
					color: '#ffffff',
					textAlign: 'center',
					margin: '0 0 14px',
					letterSpacing: '-0.02em',
					opacity:   headerVisible ? 1 : 0,
					animation: headerVisible ? 'mt_fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.1s both' : 'none',
				}}>
					Maqola nashri talablari
				</h2>

				<p style={{
					fontFamily: '"Inter Display",Inter,sans-serif',
					fontWeight: 400,
					fontSize: '16px',
					lineHeight: '140%',
					color: 'rgba(202,202,206,1)',
					textAlign: 'center',
					maxWidth: '500px',
					margin: '0px 0 48px',
					opacity:   headerVisible ? 1 : 0,
					animation: headerVisible ? 'mt_fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.2s both' : 'none',
				}}>
					Maqolangiz platformada e'lon qilinishi uchun quyidagi majburiy talablarga to'liq mos bo'lishi shart.
				</p>
			</div>

			{/* Timeline */}
			<div ref={timelineRef} style={{
				position: 'relative',
				width: '100%',
				maxWidth: '1000px',
				padding: '0 24px',
				boxSizing: 'border-box',
			}}>
				<div ref={lineElRef} style={{
					position: 'absolute',
					left: '50%',
					top: '20px',
					bottom: 0,
					width: '1px',
					background: 'rgba(230,233,234,1)',
					transformOrigin: 'top center',
					transform: 'translateX(-50%) scaleY(0)',
					opacity: 0,
				}}/>

				{ITEMS.map((item, idx) => (
					<AnimatedItem
						key={idx}
						item={item}
						idx={idx}
						dotRef={el     => dotRefs.current[idx]     = el}
						pulseRef={el   => pulseRefs.current[idx]   = el}
						numRef={el     => numRefs.current[idx]     = el}
						contentRef={el => contentRefs.current[idx] = el}
					/>
				))}
			</div>
		</section>
	)
}
