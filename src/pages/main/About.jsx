import { lazy, memo, Suspense, useEffect, useId, useRef } from 'react'
import mainbg from '../../assets/bgImg/Group2.png'
import bg from '../../assets/bgImg/Vektor.svg'
import glowImg from '../../assets/Glow (6).png'
import instanIcon from '../../assets/logoInstat.png'
import Education from '../../components/Education'
import { Button } from '../../components/shared/Button'

// Kritik rasmlarni import qilamiz — preload uchun
import _pre1 from '../../assets/bg1.jpg?format=webp&quality=72'
import _pre2 from '../../assets/bg2.jpg?format=webp&quality=72'
import _pre3 from '../../assets/bg3.jpg?format=webp&quality=72'
import _pre4 from '../../assets/bg1.jpg'

const PRELOAD_IMGS = [_pre1, _pre2, _pre3, _pre4]

const ModernEducation = lazy(() => import('../../components/ModernEducation'))
const Liquide = lazy(() => import('../../components/Liquide'))
const HeroZoom = lazy(() => import('../../components/HeroZoom'))

const ParticleCanvas = memo(() => {
	const canvasRef = useRef(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext('2d')

		const resize = () => {
			canvas.width = canvas.offsetWidth
			canvas.height = canvas.offsetHeight
		}
		resize()
		window.addEventListener('resize', resize)

		const particles = Array.from({ length: 20 }, () => ({
			x: Math.random() * canvas.width,
			y: Math.random() * 120,
			r: Math.random() * 0.6 + 0.2,
			speedY: -(Math.random() * 0.4 + 0.1),
			speedX: (Math.random() - 0.5) * 0.2,
			opacity: Math.random() * 0.8 + 0.2,
			pulse: Math.random() * Math.PI * 2,
			pulseSpeed: Math.random() * 0.02 + 0.008,
		}))

		let raf
		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			particles.forEach(p => {
				p.pulse += p.pulseSpeed
				p.y += p.speedY
				p.x += p.speedX

				if (p.y < -10) {
					p.y = canvas.height
					p.x = Math.random() * canvas.width
				}
				if (p.x < 0) p.x = canvas.width
				if (p.x > canvas.width) p.x = 0

				const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse))

				const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5)
				glow.addColorStop(0, `rgba(0, 230, 252, ${alpha})`)
				glow.addColorStop(0.5, `rgba(0, 180, 220, ${alpha * 0.4})`)
				glow.addColorStop(1, 'rgba(0, 180, 220, 0)')

				ctx.beginPath()
				ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2)
				ctx.fillStyle = glow
				ctx.fill()

				ctx.beginPath()
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
				ctx.fillStyle = `rgba(180, 245, 255, ${alpha})`
				ctx.fill()
			})

			raf = requestAnimationFrame(draw)
		}

		raf = requestAnimationFrame(draw)

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) {
					cancelAnimationFrame(raf)
					raf = null
				} else if (raf === null) {
					raf = requestAnimationFrame(draw)
				}
			},
			{ threshold: 0 },
		)
		observer.observe(canvas)

		return () => {
			cancelAnimationFrame(raf)
			window.removeEventListener('resize', resize)
			observer.disconnect()
		}
	}, [])

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: 'absolute',
				top: '-130px',
				left: '50%',
				transform: 'translateX(-50%)',
				width: '45%',
				height: '160px',
				pointerEvents: 'none',
				zIndex: 0,
			}}
		/>
	)
})

const Card = memo(({ label, style }) => {
	const uid = useId().replace(/:/g, '')
	const gradId = `figmaGlowGrad-${uid}`
	return (
		<div
			className='group'
			style={{
				position: 'absolute',
				...style,
				width: '280px',
				height: '52px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: '12px',
				background: 'rgba(22, 27, 38, 0.85)',
				border: '1.5px solid #2F3A44',
				backdropFilter: 'blur(10px)',
				color: 'rgba(210, 230, 255, 0.95)',
				fontSize: '16px',
				fontWeight: 500,
				zIndex: 20,
				transition: '0.3s',
				cursor: 'pointer',
				boxShadow: '0 8px 500px rgba(0, 0, 0, 0.4)',
				overflow: 'hidden',
			}}
		>
			<svg className='absolute inset-0 w-full h-full overflow-visible pointer-events-none'>
				<defs>
					<linearGradient id={gradId} x1='100%' y1='0%' x2='0%' y2='0%'>
						<stop offset='20%' stopColor='rgba(105,170,251,1)' stopOpacity='1' />
						<stop offset='80%' stopColor='rgba(39,66,92,0)' stopOpacity='0' />
					</linearGradient>
				</defs>
				<rect
					x='0.75'
					y='0.75'
					width='calc(100% - 1.5px)'
					height='calc(100% - 1.5px)'
					rx='12'
					fill='none'
					stroke={`url(#${gradId})`}
					strokeWidth='1'
					strokeDasharray='10 45'
					pathLength='100'
					style={{
						animation: 'cardSpin 15s linear infinite',
						filter: 'drop-shadow(0 0 2px #69AAFB)',
					}}
				/>
			</svg>
			{label}
		</div>
	)
})
const About = () => {
	const lc = 'rgba(43, 117, 204, 0.4)'
	const sw = '1.8'

	// Sahifa ochilishi bilanoq barcha og'ir rasmlarni browser cachega yuklaydi
	// Liquide/HeroZoom lazy load bo'lganda rasmlar tayyor bo'ladi → "sekin ochilish" yo'qoladi
	useEffect(() => {
		PRELOAD_IMGS.forEach(src => {
			const link = document.createElement('link')
			link.rel = 'preload'
			link.as = 'image'
			link.href = src
			document.head.appendChild(link)
		})
	}, [])

	return (
		<div className='relative flex items-center flex-col min-h-screen w-full bg-[rgba(14,18,27,1)]'>
			<img
				src={bg}
				alt='Background'
				width={1440}
				height={700}
				fetchPriority='high'
				loading='eager'
				decoding='async'
				className='absolute inset-0 w-[80%] h-[969px] mx-auto -z-0'
			/>
			<div className='absolute inset-0 bg-[rgba(14,18,27,1)] opacity-40 -z-0' />

			<div className='pt-[40px] z-30 flex flex-col items-center'>
				<div className='pt-[40px]'>
					<Button text="O'zbekiston Respublikasi Prezidenti huzuridagi Statistika agentligi" />
				</div>
				<div className='text-center mt-[24px]'>
					<h1 className='font-inter text-[64px] font-semibold pt-[15px] text-[rgba(188,188,188,1)]'>
						"Ma'lumotlar va tahlil ilmi"
						<br />
						<span className='text-[rgba(0,230,252,1)]'>
							Raqamli ta'lim platformasi
						</span>
					</h1>
					<p className='text-[rgba(188,188,188,1)] text-[18px]'>
						Ta'lim, ilm-fan va karyera uchun yagona raqamli platforma
					</p>
				</div>
			</div>

			<div className='relative w-full max-w-[1200px] mt-[90px]'>
				<ParticleCanvas />

				<div
					className='absolute inset-0 rounded-[40px] blur-[80px] opacity-70'
					style={{
						background: `
							radial-gradient(circle at top, rgba(56,160,255,1), transparent 500%),
							radial-gradient(circle at left, rgba(56,160,255,1), transparent 20%),
							radial-gradient(circle at right, rgba(56,160,255,1), transparent 20%)
						`,
					}}
				/>

				<img
					src={glowImg}
					alt=''
					style={{
						position: 'absolute',
						top: '-55px',
						left: '50%',
						transform: 'translateX(-50%)',
						width: '65%',
						height: 'auto',
						pointerEvents: 'none',
						zIndex: 1,
						userSelect: 'none',
					}}
				/>

				<div
					className='relative w-full h-[550px] rounded-[40px] border z-10'
					style={{
						backgroundImage: `url(${mainbg})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				>
					<svg
						className='absolute inset-0 w-full h-full pointer-events-none z-10'
						viewBox='0 0 1200 550'
					>
						<defs>
							<linearGradient
								id='lineGradient'
								x1='0%'
								y1='0%'
								x2='100%'
								y2='0%'
							>
								<stop offset='0%' stopColor='transparent' />
								<stop offset='50%' stopColor='#00E6FC' />
								<stop offset='100%' stopColor='transparent' />
							</linearGradient>
						</defs>

						<g fill='none' stroke={lc} strokeWidth={sw}>
							{/* CHAP TOMON - Barcha chiziqlar 600, 275 dan boshlanadi */}
							{/* Yuqori chap (Onlayn ta'lim) */}
							<path d='M 600 275 C 500 275, 450 110, 355 110' />
							{/* O'rta chap (Bo'sh ish o'rinlari) */}
							<path d='M 600 275 L 355 275' />
							{/* Pastki chap (Mikro ma'lumotlar) */}
							<path d='M 600 275 C 500 275, 450 440, 355 440' />

							{/* O'NG TOMON - Barcha chiziqlar 600, 275 dan boshlanadi */}
							{/* Yuqori o'ng (Raqamli kutubxona) */}
							<path d='M 600 275 C 700 275, 750 110, 845 110' />
							{/* O'rta o'ng (Samaradorlik tizimi) */}
							<path d='M 600 275 L 845 275' />
							{/* Pastki o'ng (Elektron jurnal) */}
							<path d='M 600 275 C 700 275, 750 440, 845 440' />

							{/* HARAKATLANUVCHI EFFEKT (Animatsiya uchun) */}
							<path d='M 600 275 C 500 275, 450 110, 355 110' />
							<path d='M 600 275 L 845 275' />
						</g>
					</svg>
					<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20'>
						<div
							style={{
								position: 'relative',
								width: '280px',
								height: '280px',
								borderRadius: '50%',
								padding: '2.33px',
								background:
									'linear-gradient(180deg, rgba(43,117,204,0.7) 0%, rgba(43,117,204,0.4) 30%, rgba(43,117,204,0.2) 49.99%, rgba(74,74,74,0.4) 70%, rgba(74,74,74,0) 100%)',
							}}
						>
							<div
								style={{
									width: '100%',
									height: '100%',
									borderRadius: '50%',
									background: 'rgba(22, 27, 38, 1)',
									boxShadow: `
										0px 5px 40px 0px rgba(255, 255, 255, 0.06) inset,
										0px 0px 60px 10px rgba(43, 117, 204, 0.3),
										0px 0px 120px 20px rgba(43, 117, 204, 0.15)
									`,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<div className='absolute inset-0 rounded-full bg-blue-500/10 blur-2xl animate-pulse'></div>
								<img
									src={instanIcon}
									alt='logo'
									className='w-[220px] h-[220px] object-contain relative z-10 drop-shadow-2xl'
								/>
							</div>
						</div>
					</div>

					<Card label="Onlayn ta'lim" style={{ left: '75px', top: '85px' }} />
					<Card
						label="Bo'sh ish o'rinlari"
						style={{ left: '75px', top: '250px' }}
					/>
					<Card
						label="Mikro ma'lumotlar"
						style={{ left: '75px', top: '415px' }}
					/>
					<Card
						label='Raqamli kutubxona'
						style={{ right: '75px', top: '85px' }}
					/>
					<Card
						label='Samaradorlik tizimi'
						style={{ right: '75px', top: '250px' }}
					/>
					<Card
						label='Elektron jurnal'
						style={{ right: '75px', top: '415px' }}
					/>
				</div>
			</div>
	<HeroZoom />
			<Education />
			<Suspense
				fallback={
					<div style={{ minHeight: '100vh', background: 'rgba(14,18,27,1)' }} />
				}
			>
				<ModernEducation />
			</Suspense>
			<Suspense
				fallback={<div style={{ height: '100vh', background: '#000' }} />}
			>
				<Liquide />
			</Suspense>
			<Suspense
				fallback={<div style={{ height: '100vh', background: '#000' }} />}
			>
			
			</Suspense>
			
		</div>
	)
}

export default About
