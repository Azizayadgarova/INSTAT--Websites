import bgOnline from '@/assets/bgImg/Background (1).png'
import { useEffect, useRef, useState } from 'react'
import MentorCard from './MentorsSection/MentorCard'
import { BASE_H, BASE_W, CONFIGS, mod } from './MentorsSection/mentors.data'

const PX = '?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'

const members = [
	{
		name: 'Ziyayev Zohidjon Muratovich',
		role: "Bosh muharrir o'rinbosari",
		exp: '15+ yil tajriba',
		photo: `https://images.pexels.com/photos/27792904/pexels-photo-27792904.jpeg${PX}`,
	},
	{
		name: 'Dilnoza Yusupova',
		role: 'Ilmiy kotib',
		exp: '10+ yil tajriba',
		photo: `https://images.pexels.com/photos/12067199/pexels-photo-12067199.jpeg${PX}`,
	},
	{
		name: 'Jahongir Toshmatov',
		role: "Tahririyat a'zosi",
		exp: '12+ yil tajriba',
		photo: `https://images.pexels.com/photos/10811824/pexels-photo-10811824.jpeg${PX}`,
	},
	{
		name: 'Malika Xasanova',
		role: "Tahririyat a'zosi",
		exp: '8+ yil tajriba',
		photo: `https://images.pexels.com/photos/10482924/pexels-photo-10482924.jpeg${PX}`,
	},
	{
		name: 'Alisher Nazarov',
		role: "Tahririyat a'zosi",
		exp: '9+ yil tajriba',
		photo: `https://images.pexels.com/photos/36771042/pexels-photo-36771042.jpeg${PX}`,
	},
	{
		name: 'Gulnora Karimova',
		role: "Tahririyat a'zosi",
		exp: '7+ yil tajriba',
		photo: `https://images.pexels.com/photos/7158703/pexels-photo-7158703.jpeg${PX}`,
	},
	{
		name: 'Bobur Xolmatov',
		role: "Tahririyat a'zosi",
		exp: '11+ yil tajriba',
		photo: `https://images.pexels.com/photos/8617730/pexels-photo-8617730.jpeg${PX}`,
	},
]

export default function TahririyatAzolari() {
	const [current, setCurrent]     = useState(0)
	const [bgVisible, setBgVisible] = useState(false)
	const [trackW, setTrackW]       = useState(800)
	const bgRef    = useRef(null)
	const trackRef = useRef(null)
	const timerRef = useRef(null)
	const dimScale = Math.min(1, Math.max(0.42, trackW / 900))

	const startTimer = () => {
		clearInterval(timerRef.current)
		timerRef.current = setInterval(() => {
			setCurrent(prev => mod(prev + 1, members.length))
		}, 3500)
	}

	const shift = dir => {
		setCurrent(prev => mod(prev + dir, members.length))
		startTimer()
	}

	useEffect(() => {
		startTimer()
		return () => clearInterval(timerRef.current)
	}, [])

	useEffect(() => {
		const update = () => {
			if (trackRef.current) setTrackW(trackRef.current.offsetWidth)
		}
		update()
		window.addEventListener('resize', update)
		return () => window.removeEventListener('resize', update)
	}, [])

	useEffect(() => {
		const el = bgRef.current?.parentElement
		if (!el) return
		const obs = new IntersectionObserver(
			([entry]) => setBgVisible(entry.isIntersecting),
			{ threshold: 0.05 },
		)
		obs.observe(el)
		return () => obs.disconnect()
	}, [])

	return (
		<section style={{
			backgroundColor: 'rgba(var(--bg-rgb),1)',
			marginTop: 0,
			padding: '40px 0 0',
			overflow: 'hidden',
			position: 'relative',
			zIndex: 1,
			isolation: 'isolate',
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		}}>
			<img
				ref={bgRef}
				src={bgOnline}
				alt=''
				style={{
					position: 'absolute',
					top: 0, left: '50%',
					transform: 'translateX(-50%)',
					width: '100%', height: '100%',
					objectFit: 'cover', objectPosition: 'center top',
					zIndex: 0, pointerEvents: 'none',
					opacity: bgVisible ? 1 : 0,
					transition: 'opacity 2.4s cubic-bezier(0.16,1,0.3,1)',
				}}
			/>

			<div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
				{/* Header */}
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 0 }}>
					<div style={{
						display: 'inline-flex', alignItems: 'center',
						background: 'rgba(255,255,255,0.06)',
						border: '1px solid rgba(255,255,255,0.1)',
						borderRadius: '100px', padding: '5px 16px', marginBottom: '20px',
					}}>
						<span style={{
							fontFamily: 'var(--font-display)',
							fontSize: '13px', fontWeight: 500,
							color: 'rgba(180,185,200,1)', letterSpacing: '0.02em',
						}}>Hodimlar</span>
					</div>

					<h2 className='text-[32px] md:text-[48px] px-4 md:px-0' style={{
						fontFamily: 'var(--font-display)',
						fontWeight: 600, lineHeight: 1.1,
						color: '#fff', margin: '0 0 16px', letterSpacing: '-0.02em',
					}}>Tahririyat a'zolari</h2>

					<p className='text-[14px] md:text-[16px] max-w-[327px] md:max-w-[520px] px-4 md:px-0' style={{
						fontFamily: 'var(--font-display)',
						fontWeight: 400, lineHeight: 1.65,
						color: 'rgba(202,202,206,1)',
						margin: '0 0 0',
					}}>
						Platformada chop etilayotgan yetakchi ilmiy jurnallar hamda ularning eng yangi sonlari bilan tanishing.
					</p>
				</div>

				{/* Carousel */}
				<div style={{ overflowX: 'clip', width: '100%', position: 'relative' }}>
					<div style={{
						position: 'relative',
						width: '100%',
						height: Math.round(Math.max(300, 500 * dimScale)),
					}}>
						<div
							ref={trackRef}
							style={{ position: 'relative', width: '100%', height: '100%' }}
						>
							{CONFIGS.map(cfg => {
								const idx = mod(current + cfg.offset, members.length)
								return (
									<MentorCard
										key={cfg.offset}
										mentor={members[idx]}
										cfg={cfg}
										trackW={trackW}
										dimScale={dimScale}
										isActive={cfg.offset === 0}
										onShift={shift}
										hideExtra
									/>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
