import { memo, useEffect, useRef } from 'react'
import lobus from '../assets/Countries.png'
import fotIcon1 from '../assets/icons/fUwXkleZJbkDUDDvw93zVo3gnls.svg fill.png'
import fotIcon2 from '../assets/EeUrJQfpXibXJa3MotZvgAm9tsY.svg fill.png'
import fotIcon3 from '../assets/iBEROwOJyQaiqZZ4k8N5Sj51w.svg.png'
import icon1 from '../assets/icons/InstatIcon.png'

const HEADING = {
	fontFamily: 'Inter Display, sans-serif',
	fontWeight: 600,
	fontSize: '20px',
	lineHeight: '28px',
	letterSpacing: '-0.03em',
	color: 'rgba(255,255,255,1)',
}

const LINK = {
	fontFamily: 'Inter Display, sans-serif',
	fontWeight: 400,
	fontSize: '18px',
	lineHeight: '28px',
	letterSpacing: '-0.01em',
	color: 'rgba(188,188,188,1)',
	cursor: 'pointer',
}

const LETTERS = 'INSTAT'.split('')
const saytlar = [
	'Raqamli kutubxona',
	'Onlayn kurslar',
	"Mikro ma'lumotlar",
	'Elektron jurnal',
]
const support = ['FAQ', "Biz bilan bog'lanish"]
const huquqiy = ['Maxfiylik siyosati', 'Xizmat shartlari', 'Cookie siyosati']
const SOCIAL = [fotIcon1, fotIcon3, fotIcon2]

const GlowText = memo(() => {
	const containerRef = useRef(null)
	const cacheRef = useRef([])
	const rafRef = useRef(null)

	useEffect(() => {
		const updateCache = () => {
			const spans = containerRef.current?.querySelectorAll('.gl')
			if (!spans) return
			cacheRef.current = [...spans].map(s => {
				const r = s.getBoundingClientRect()
				return { s, cx: r.left + r.width / 2, cy: r.top + r.height / 2 }
			})
		}

		updateCache()
		window.addEventListener('scroll', updateCache, { passive: true })
		window.addEventListener('resize', updateCache, { passive: true })

		const onMove = e => {
			if (rafRef.current) return
			const x = e.clientX,
				y = e.clientY
			rafRef.current = requestAnimationFrame(() => {
				rafRef.current = null
				cacheRef.current.forEach(({ s, cx, cy }) => {
					s.style.color =
						Math.hypot(x - cx, y - cy) < 140
							? 'rgba(188,188,188,1)'
							: 'rgba(36,39,48,1)'
				})
			})
		}

		window.addEventListener('mousemove', onMove, { passive: true })
		return () => {
			window.removeEventListener('scroll', updateCache)
			window.removeEventListener('resize', updateCache)
			window.removeEventListener('mousemove', onMove)
			if (rafRef.current) cancelAnimationFrame(rafRef.current)
		}
	}, [])

	return (
		<div
			ref={containerRef}
			style={{
				position: 'absolute',
				bottom: '-80px',
				left: '50%',
				transform: 'translateX(-50%)',
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'flex-end',
				pointerEvents: 'none',
				userSelect: 'none',
			}}
		>
			{LETTERS.map((ch, i) => (
				<span
					key={i}
					className='gl'
					style={{
						fontFamily: 'Inter Display, sans-serif',
						fontWeight: 700,
						fontSize: 'clamp(140px, 20vw, 330px)',
						lineHeight: 1,
						color: 'rgba(36,39,48,1)',
						display: 'inline-block',
						letterSpacing: '-0.02em',
						transition: 'color 0.2s',
					}}
				>
					{ch}
				</span>
			))}
		</div>
	)
})

const Footer = () => (
	<footer className='bg-[#0E121B] relative overflow-hidden'>
		<div className='max-w-[1200px] mx-auto px-6'>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 py-8 md:py-0'>
				<div className='flex flex-col sm:col-span-2 md:col-span-1'>
					<img
						src={icon1}
						alt='INSTAT'
						className='w-auto max-w-[200px] md:max-w-[220px]'
						style={{
							height: '36.76px',
							objectFit: 'contain',
							filter: 'brightness(0) invert(1)',
						}}
					/>
					<p
						style={{
							...LINK,
							lineHeight: '26px',
							letterSpacing: '-0.02em',
							marginTop: '20px',
						}}
					>
						Kadrlar malakasini oshirish va statistik tadqiqotlar instituti
					</p>
				</div>

				<div>
					<h4 style={HEADING}>Saytlar</h4>
					<ul
						style={{
							marginTop: '20px',
							display: 'flex',
							flexDirection: 'column',
							gap: '14px',
						}}
					>
						{saytlar.map(item => (
							<li
								key={item}
								style={LINK}
								className='hover:text-white transition'
							>
								{item}
							</li>
						))}
					</ul>
				</div>

				<div>
					<h4 style={HEADING}>{"Qo'llab quvvatlash"}</h4>
					<ul
						style={{
							marginTop: '20px',
							display: 'flex',
							flexDirection: 'column',
							gap: '14px',
						}}
					>
						{support.map(item => (
							<li
								key={item}
								style={LINK}
								className='hover:text-white transition'
							>
								{item}
							</li>
						))}
					</ul>
				</div>

				<div>
					<h4 style={HEADING}>Huquqiy</h4>
					<ul
						style={{
							marginTop: '20px',
							display: 'flex',
							flexDirection: 'column',
							gap: '14px',
						}}
					>
						{huquqiy.map(item => (
							<li
								key={item}
								style={LINK}
								className='hover:text-white transition'
							>
								{item}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>

		<div
			className='relative flex justify-center items-end'
			style={{ minHeight: '380px', overflow: 'hidden' }}
		>
			<img
				src={lobus}
				alt=''
				aria-hidden='true'
				className='absolute w-full h-full max-w-[1000px] bottom-0'
			/>
			<GlowText />
		</div>

		<div className='max-w-[1200px] mx-auto px-6 border-t border-white/10 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10'>
			<p style={{ ...LINK, fontSize: '13px', color: 'rgba(255,255,255,1)' }}>
				© Instat Inc. Barcha huquqlar himoyalangan.
			</p>
			<div className='flex gap-3'>
				{SOCIAL.map((icon, i) => (
					<div
						key={i}
						className='w-10 h-10 rounded-xl flex items-center justify-center hover:opacity-80 transition'
						style={{
							background:
								'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)',
						}}
					>
						<img src={icon} alt='' className='w-5 h-5' />
					</div>
				))}
			</div>
		</div>
	</footer>
)

export default Footer
