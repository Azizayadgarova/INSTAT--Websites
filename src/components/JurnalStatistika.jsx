import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { useSiteText } from '@/hooks/useSiteText'

const STATS = [
	{ key: 'article_numbers', raw: 12000, display: '12 000', label: 'Maqolalar' },
	{ key: 'article_editions', raw: 150, display: '150', label: 'Jurnal' },
	{ key: 'article_authors', raw: 4000, display: '4 000', label: 'Mualliflar' },
]

function formatNum(n, hasSpace) {
	if (!hasSpace) return String(n)
	return n >= 1000
		? Math.floor(n / 1000) + ' ' + String(n % 1000).padStart(3, '0')
		: String(n)
}

function StatItem({ stat, animate }) {
	const [count, setCount] = useState(0)
	const rafRef = useRef(null)
	const hasSpace = stat.display.includes(' ')

	useEffect(() => {
		if (!animate) return
		const duration = 1600
		const start = performance.now()
		const tick = now => {
			const p = Math.min((now - start) / duration, 1)
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
			{/* Mobile: label → raqam → divider */}
			<div className='flex flex-col gap-3 pb-0 md:hidden'>
				<p
					style={{
						fontFamily: 'var(--font-display)',
						fontSize: '18px',
						fontWeight: 500,
						lineHeight: 1.4,
						letterSpacing: '-0.02em',
						color: 'rgba(90,98,117,1)',
						margin: 0,
					}}
				>
					{stat.label}
				</p>
				<div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
					<span
						style={{
							fontFamily: 'var(--font-display)',
							fontSize: '60px',
							fontWeight: 600,
							color: '#fff',
							lineHeight: 1,
							letterSpacing: '-0.03em',
						}}
					>
						{displayed}
					</span>
					<span
						style={{
							fontFamily: 'var(--font-display)',
							fontSize: '60px',
							fontWeight: 600,
							color: '#fff',
							lineHeight: 1,
							letterSpacing: '-0.03em',
						}}
					>
						+
					</span>
				</div>
				<div style={{ height: '1px', background: 'rgba(var(--text-rgb),1)', marginTop: '8px', marginBottom: '16px' }} />
			</div>

			{/* Desktop: raqam → divider → label */}
			<div className='hidden md:block'>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '2px',
						margin: '0 0 35px',
					}}
				>
					<span
						style={{
							fontFamily: 'var(--font-display)',
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
							fontFamily: 'var(--font-display)',
							fontSize: 'clamp(52px, 6vw, 96px)',
							fontWeight: 600,
							color: '#fff',
							lineHeight: 1,
						}}
					>
						+
					</span>
				</div>
				<div
					style={{
						height: '1px',
						background: 'rgba(var(--text-rgb),1)',
						marginBottom: '25px',
					}}
				/>
				<p
					style={{
						fontFamily: 'var(--font-display)',
						fontSize: 'clamp(14px, 1.2vw, 18px)',
						fontWeight: 500,
						color: 'rgba(90,98,117,1)',
						margin: 0,
					}}
				>
					{stat.label}
				</p>
			</div>
		</div>
	)
}

export default function JurnalStatistika() {
    const {
        t
    } = useTranslation();

    const [animate, setAnimate] = useState(false)
    const sectionRef = useRef(null)

    // Raqamlar backend'dan — site-data (module: article). Qiymatdan raqam ajratiladi.
    const st = useSiteText('article')
    const resolvedStats = STATS.map(s => {
        const v = st(s.key, '')
        if (!v) return s
        const raw = parseInt(v.replace(/[^\d]/g, ''), 10) || s.raw
        const display = v.replace(/\s*\+\s*$/, '').trim() || s.display
        return { ...s, raw, display }
    })

    useEffect(() => {
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setAnimate(true)
					obs.disconnect()
				}
			},
			{ threshold: 0.2 },
		)
		if (sectionRef.current) obs.observe(sectionRef.current)
		return () => obs.disconnect()
	}, [])

    return (
        <section
			ref={sectionRef}
			style={{ backgroundColor: 'rgba(var(--card-rgb),1)', width: '100%' }}
		>
            <div
				className='w-full max-w-[1440px] mx-auto px-6 py-10'
				style={{
					boxSizing: 'border-box',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<p
					className='text-[32px] leading-[40px] md:text-[clamp(20px,2.5vw,36px)] md:leading-normal'
					style={{
						fontFamily: 'var(--font-display)',
						fontWeight: 600,
						color: 'white',
						margin: '0 0 24px',
						letterSpacing: '-0.03em',
						opacity: animate ? 1 : 0,
						transform: animate ? 'translateY(0)' : 'translateY(16px)',
						transition: 'opacity 0.5s ease, transform 0.5s ease',
					}}
				>{t("components.jurnalStatistika.statistik_blok")}</p>

				<div className='grid grid-cols-1 md:grid-cols-3 md:gap-[42px]'>
					{resolvedStats.map((s, i) => (
						<div
							key={s.label}
							style={{ transitionDelay: `${i * 0.12}s` }}
						>
							<StatItem stat={s} animate={animate} />
						</div>
					))}
				</div>
			</div>
        </section>
    );
}
