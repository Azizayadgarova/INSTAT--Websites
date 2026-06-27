import { useEffect, useRef, useState } from 'react'

const STATS = [
	{ raw: 12000, display: '12 000', label: 'Maqolalar' },
	{ raw: 150,   display: '150',    label: 'Jurnal'     },
	{ raw: 4000,  display: '4 000',  label: 'Mualliflar' },
]

function formatNum(n, hasSpace) {
	if (!hasSpace) return String(n)
	return n >= 1000
		? Math.floor(n / 1000) + ' ' + String(n % 1000).padStart(3, '0')
		: String(n)
}

function StatItem({ stat, animate }) {
	const [count, setCount] = useState(0)
	const rafRef  = useRef(null)
	const hasSpace = stat.display.includes(' ')

	useEffect(() => {
		if (!animate) return
		const duration = 1600
		const start    = performance.now()
		const tick = (now) => {
			const p    = Math.min((now - start) / duration, 1)
			const ease = 1 - Math.pow(1 - p, 3)
			setCount(Math.round(ease * stat.raw))
			if (p < 1) rafRef.current = requestAnimationFrame(tick)
		}
		rafRef.current = requestAnimationFrame(tick)
		return () => cancelAnimationFrame(rafRef.current)
	}, [animate, stat.raw])

	const displayed = animate ? formatNum(count, hasSpace) : stat.display

	return (
		<div
			style={{
				opacity: animate ? 1 : 0,
				transform: animate ? 'translateY(0)' : 'translateY(24px)',
				transition: 'opacity 0.6s ease, transform 0.6s ease',
			}}
		>
			<div style={{ display: 'flex', alignItems: 'center', gap: '2px', margin: '0 0 35px' }}>
				<span
					style={{
						fontFamily: '"Inter Display",Inter,sans-serif',
						fontSize: 'clamp(52px, 6vw, 96px)',
						fontWeight: 600,
						color: '#fff',
						lineHeight: 1,
						letterSpacing: '-0.02em',
					}}
				>
					{displayed}
				</span>
				<span
					style={{
						fontFamily: '"Inter Display",Inter,sans-serif',
						fontSize: 'clamp(30px, 3vw, 52px)',
						fontWeight: 600,
						color: '#fff',
						lineHeight: 1,
					}}
				>
					+
				</span>
			</div>
			<div style={{ height: '1px', background: 'rgba(188,188,188,1)', marginBottom: '25px' }} />
			<p
				style={{
					fontFamily: '"Inter Display",Inter,sans-serif',
					fontSize: 'clamp(14px, 1.2vw, 18px)',
					fontWeight: 500,
					color: 'rgba(90,98,117,1)',
					margin: 0,
				}}
			>
				{stat.label}
			</p>
		</div>
	)
}

export default function JurnalStatistika() {
	const [animate, setAnimate] = useState(false)
	const sectionRef = useRef(null)

	useEffect(() => {
		const obs = new IntersectionObserver(
			([entry]) => { if (entry.isIntersecting) { setAnimate(true); obs.disconnect() } },
			{ threshold: 0.2 },
		)
		if (sectionRef.current) obs.observe(sectionRef.current)
		return () => obs.disconnect()
	}, [])

	return (
		<section ref={sectionRef} style={{ backgroundColor: 'rgba(22,27,38,1)', width: '100%' }}>
			<div
				style={{
					maxWidth: '1440px',
					margin: '0 auto',
					padding: '40px 80px',
					boxSizing: 'border-box',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<p
					style={{
						fontFamily: '"Inter Display",Inter,sans-serif',
						fontSize: 'clamp(22px, 2.5vw, 36px)',
						fontWeight: 600,
						color: 'white',
						margin: '0 0 24px',
						letterSpacing: '0.01em',
						opacity: animate ? 1 : 0,
						transform: animate ? 'translateY(0)' : 'translateY(16px)',
						transition: 'opacity 0.5s ease, transform 0.5s ease',
					}}
				>
					Statistik blok
				</p>

				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
					{STATS.map((s, i) => (
						<div
							key={i}
							style={{
								paddingRight: i < STATS.length - 1 ? '48px' : 0,
								paddingLeft: i > 0 ? '48px' : 0,
								transitionDelay: `${i * 0.12}s`,
							}}
						>
							<StatItem stat={s} animate={animate} />
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
