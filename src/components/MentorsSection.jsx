import bgOnline from '@/assets/bgImg/Background (1).png'

const bg = '/bgImg/Background.svg'
import { useEffect, useRef, useState } from 'react'
import MentorCard from './MentorsSection/MentorCard'
import { CONFIGS, mentors, mod } from './MentorsSection/mentors.data'
import ParticleBackground from './shared/ParticleBackground'
import SectionBackground from './shared/SectionBackground'
import Text from './shared/Text'

const MentorsSection = ({ variant }) => {
	const isOnline = variant === 'online'
	const [current, setCurrent] = useState(0)
	const bgRef = useRef(null)
	const [bgVisible, setBgVisible] = useState(false)
	const [trackW, setTrackW] = useState(800)
	const trackRef = useRef(null)
	const isMobile = trackW < 640
	const dimScale = isMobile
		? Math.min(1, trackW / 568)
		: Math.min(1, Math.max(0.42, trackW / 900))

	const shift = dir => setCurrent(prev => mod(prev + dir, mentors.length))

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
		const bgObs = new IntersectionObserver(
			([entry]) => setBgVisible(entry.isIntersecting),
			{ threshold: 0.05 },
		)
		bgObs.observe(el)
		return () => bgObs.disconnect()
	}, [])

	useEffect(() => {
		let id = null
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					id = setInterval(() => shift(1), 3000)
				} else {
					clearInterval(id)
					id = null
				}
			},
			{ threshold: 0.2 },
		)
		if (trackRef.current) observer.observe(trackRef.current)
		return () => {
			clearInterval(id)
			observer.disconnect()
		}
	}, [])

	return (
		<section
			style={{
				backgroundColor: 'rgba(var(--bg-rgb),1)',
				backgroundImage: isOnline ? undefined : `url(${bg})`,
				backgroundSize: isOnline ? undefined : '1400px 1200px',
				backgroundPosition: isOnline ? undefined : 'center 10%',
				backgroundRepeat: isOnline ? undefined : 'no-repeat',
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
			}}
		>
			{isOnline && (
				<img
					ref={bgRef}
					src={bgOnline}
					alt=''
					style={{
						position: 'absolute',
						top: 0,
						left: '50%',
						transform: 'translateX(-50%)',
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						objectPosition: 'center top',
						zIndex: 0,
						pointerEvents: 'none',
						opacity: bgVisible ? 1 : 0,
						transition: 'opacity 2.4s cubic-bezier(0.16, 1, 0.3, 1)',
					}}
				/>
			)}
			{!isOnline && (
				<ParticleBackground
					count={40}
					height={650}
					opacity={0.8}
					color='255, 255, 255'
					zIndex={1}
				/>
			)}
			{!isOnline && <SectionBackground />}

			<div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
				<div>
					<div style={{ marginBottom: 0 }}>
						<Text
							buttonText='Mentorlar'
							title='Sohasida tajribali mutaxassislar bilan'
							highlight="o'rganing!"
							subtitle={
								<>
									Bizning platforma orqali siz IT va zamonaviy kasblarni{' '}
									<br className='hidden sm:block' />
									mahalliy va xorijiy mutaxassislar bilan onlayn o'rganasiz.
								</>
							}
							buttonType={isOnline ? 'button2' : 'button1'}
							titleStyle={
								isOnline ? { color: '#fff' } : undefined
							}
							highlightColor={isOnline ? '#fff' : undefined}
							subtitleStyle={isOnline ? { fontSize: '16px' } : undefined}
						/>
					</div>

					<div
						style={{ overflowX: 'clip', width: '100%', position: 'relative' }}
					>
						<div
							style={{
								position: 'relative',
								width: '100%',
								height: Math.round(Math.max(isMobile ? 480 : 300, 620 * dimScale)),
							}}
						>
							<div
								ref={trackRef}
								style={{ position: 'relative', width: '100%', height: '100%' }}
							>
								{CONFIGS.map(cfg => {
									const idx = mod(current + cfg.offset, mentors.length)
									return (
										<MentorCard
											key={cfg.offset}
											mentor={mentors[idx]}
											cfg={cfg}
											trackW={trackW}
											dimScale={dimScale}
											isActive={cfg.offset === 0}
											onShift={shift}
											isMobile={isMobile}
										/>
									)
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default MentorsSection
