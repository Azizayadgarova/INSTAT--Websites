import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'

import { ITEMS } from '@/data/article-requirements.data'
import { useDataText } from '@/hooks/useDataText'

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

function useMobile(bp = 768) {
	const [mob, setMob] = useState(false)
	useEffect(() => {
		const check = () => setMob(window.innerWidth < bp)
		check()
		window.addEventListener('resize', check, { passive: true })
		return () => window.removeEventListener('resize', check)
	}, [bp])
	return mob
}

// Mobile: barcha narsalar doimiy ko'rinadi (scroll animatsiyasiz)
function MobileItem({ item, idx }) {
	const dt = useDataText('articleRequirements')
	return (
		<div style={{
			position: 'relative',
			paddingLeft: '36px',
			marginBottom: idx < ITEMS.length - 1 ? '40px' : 0,
		}}>
			{/* Dot */}
			<div style={{
				position: 'absolute',
				left: '0px',
				top: '8px',
				width: '14px',
				height: '14px',
				borderRadius: '50%',
				background: 'rgba(var(--blue-rgb),1)',
				border: '2px solid rgba(var(--blue-rgb),0.4)',
				boxShadow: '0 0 10px rgba(var(--blue-rgb),0.6)',
				zIndex: 1,
			}}/>

			{/* Number */}
			<div style={{ marginBottom: '6px' }}>
				<span style={{
					fontFamily: 'var(--font-display)',
					fontWeight: 700,
					fontSize: '52px',
					lineHeight: 1,
					color: '#ffffff',
					letterSpacing: '-0.04em',
					userSelect: 'none',
				}}>{item.num}</span>
			</div>

			{/* Content */}
			<div>
				<h3 style={{
					fontFamily: 'var(--font-display)',
					fontWeight: 600,
					fontSize: '20px',
					lineHeight: 1.3,
					color: '#ffffff',
					margin: '0 0 8px',
				}}>{dt(item, 'title')}</h3>
				<p style={{
					fontFamily: 'var(--font-display)',
					fontWeight: 400,
					fontSize: '15px',
					lineHeight: 1.7,
					color: 'rgba(160,165,185,1)',
					margin: 0,
				}}>{dt(item, 'desc')}</p>
			</div>
		</div>
	)
}

function AnimatedItem({ item, idx, dotRef, pulseRef, numRef, contentRef }) {
	const dt = useDataText('articleRequirements')
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
				fontFamily: 'var(--font-display)',
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
			<div style={{ padding: '16px 20px', borderRadius: '14px' }}>
				<h3 style={{
					fontFamily: 'var(--font-display)',
					fontWeight: 600,
					fontSize: '30px',
					lineHeight: 1.3,
					color: '#ffffff',
					margin: '0 0 10px',
				}}>{dt(item, 'title')}</h3>
				<p style={{
					fontFamily: 'var(--font-display)',
					fontWeight: 400,
					fontSize: '18px',
					lineHeight: 1.7,
					color: 'rgba(160,165,185,1)',
					margin: 0,
				}}>{dt(item, 'desc')}</p>
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
				border: '2px solid rgba(var(--blue-rgb),0.85)',
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
				background: 'rgba(var(--blue-rgb),1)',
				border: '2px solid rgba(var(--blue-rgb),0.4)',
				boxShadow: '0 0 10px rgba(var(--blue-rgb),0.6)',
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
    const {
        t
    } = useTranslation();

    const [headerRef, headerVisible] = useInView(0.3)
    const isMobile    = useMobile()
    const timelineRef = useRef(null)
    const lineElRef   = useRef(null)
    const dotRefs     = useRef([])
    const pulseRefs   = useRef([])
    const numRefs     = useRef([])
    const contentRefs = useRef([])
    const prevReached = useRef([])

    useEffect(() => {
		const el = document.createElement('style')
		el.setAttribute('data-mt-kf', '1')
		el.textContent = KF
		document.head.appendChild(el)
		return () => document.head.removeChild(el)
	}, [])

    // Desktop scroll animation (mobile da ishlamaydi)
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

				dot.style.opacity   = reached ? 1 : 0
				dot.style.transform = reached
					? 'translateX(-50%) scale(1)'
					: 'translateX(-50%) scale(0)'

				if (pulse) {
					if (reached && !was) {
						pulse.style.animation = 'none'
						void pulse.offsetHeight
						pulse.style.animation = 'mt_pulse 0.7s ease-out both'
					} else if (!reached) {
						pulse.style.animation = 'none'
					}
				}

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

		if (isMobile) return  // mobileda scroll animatsiya yo'q

		window.addEventListener('scroll', onScroll, { passive: true })
		onScroll()
		return () => window.removeEventListener('scroll', onScroll)
	}, [isMobile])

    return (
        <section style={{
			width: '100%',
			background: 'rgba(var(--card-rgb),1)',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			padding: '40px 0 80px',
			boxSizing: 'border-box',
		}}>
            {/* Header */}
            <div ref={headerRef} style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '100%',
				padding: '0 20px',
				boxSizing: 'border-box',
			}}>
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
						fontFamily: 'var(--font-display)',
						fontSize: '12px',
						fontWeight: 500,
						color: 'rgba(180,185,200,1)',
						letterSpacing: '0.02em',
					}}>{t("components.maqolaTalablari.talablar")}</span>
				</div>

				<h2 style={{
					fontFamily: 'var(--font-display)',
					fontWeight: 600,
					fontSize: isMobile ? '30px' : '48px',
					lineHeight: isMobile ? '38px' : '58px',
					color: '#ffffff',
					textAlign: 'center',
					margin: '0 0 14px',
					letterSpacing: '-0.02em',
					opacity:   headerVisible ? 1 : 0,
					animation: headerVisible ? 'mt_fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.1s both' : 'none',
				}}>{t("components.maqolaTalablari.maqola_nashri_talablari")}</h2>

				<p className='text-[14px] md:text-[16px] max-w-[327px] md:max-w-[500px]' style={{
					fontFamily: 'var(--font-display)',
					fontWeight: 400,
					lineHeight: '140%',
					color: 'rgba(202,202,206,1)',
					textAlign: 'center',
					margin: '0px 0 48px',
					opacity:   headerVisible ? 1 : 0,
					animation: headerVisible ? 'mt_fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.2s both' : 'none',
				}}>{t("components.maqolaTalablari.maqolangiz_platformada_elon_qilinishi")}</p>
			</div>
            {/* Mobile timeline — hamma narsa darhol ko'rinadi */}
            {isMobile && (
				<div style={{
					position: 'relative',
					width: '100%',
					padding: '0 20px',
					boxSizing: 'border-box',
				}}>
					{/* Left vertical line */}
					<div style={{
						position: 'absolute',
						left: '27px',
						top: '12px',
						bottom: 0,
						width: '1px',
						background: 'rgba(230,233,234,0.4)',
					}}/>

					{ITEMS.map((item, idx) => (
						<MobileItem key={item.title} item={item} idx={idx} />
					))}
				</div>
			)}
            {/* Desktop timeline — scroll animatsiyali */}
            {!isMobile && (
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
							key={item.title}
							item={item}
							idx={idx}
							dotRef={el     => dotRefs.current[idx]     = el}
							pulseRef={el   => pulseRefs.current[idx]   = el}
							numRef={el     => numRefs.current[idx]     = el}
							contentRef={el => contentRefs.current[idx] = el}
						/>
					))}
				</div>
			)}
        </section>
    );
}
