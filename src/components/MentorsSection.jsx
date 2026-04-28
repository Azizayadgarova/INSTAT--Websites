import { useCallback, useEffect, useRef, useState } from 'react'
import bg from '../assets/bgImg/Background.svg'
import MentorCard from './MentorsSection/MentorCard'
import { CONFIGS, mentors, mod } from './MentorsSection/mentors.data'
import AnimatedSection from './shared/AnimatedSection'
import ParticleBackground from './shared/ParticleBackground'
import SectionBackground from './shared/SectionBackground'
import Text from './shared/Text'

const MentorsSection = () => {
	const [current, setCurrent] = useState(0)
	const [trackW, setTrackW] = useState(800)
	const trackRef = useRef(null)
	const dimScale = trackW <= 1440
		? Math.min(1, Math.max(0.42, trackW / 900))
		: Math.min(1.2, 1 + (trackW - 1440) / 2550)

	const shift = useCallback(dir => setCurrent(prev => mod(prev + dir, mentors.length)), [])

	useEffect(() => {
		const update = () => {
			if (trackRef.current) setTrackW(trackRef.current.offsetWidth)
		}
		update()
		window.addEventListener('resize', update)
		return () => window.removeEventListener('resize', update)
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
	}, [shift])

	return (
		<section
			style={{
				backgroundColor: 'rgba(14,18,27,1)',
				backgroundImage: `url(${bg})`,
				backgroundSize: '1400px 1200px',
				backgroundPosition: 'center 10%',
				backgroundRepeat: 'no-repeat',
				padding: `${trackW > 1440 ? 100 : 40}px 0 0px`,
				overflow: 'hidden',
				position: 'relative',
				zIndex: 1,
				isolation: 'isolate',
				minHeight: `${Math.round(Math.max(500, 950 * dimScale))}px`,
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<ParticleBackground
				count={100}
				height={650}
				opacity={0.8}
				color='255, 255, 255'
				zIndex={1}
			/>
			<SectionBackground />

			<div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
				<AnimatedSection>
					<div style={{ marginBottom: 60 }}>
						<Text
							buttonText='Mentorlar'
							title='Sohasida tajribali mutaxassislar bilan'
							highlight="o'rganing!"
							subtitle={
								<>
									Bizning platforma orqali siz IT va zamonaviy kasblarni <br />
									mahalliy va xorijiy mutaxassislar bilan onlayn o'rganasiz.
								</>
							}
						/>
					</div>

					<div
						style={{ overflowX: 'clip', width: '100%', position: 'relative' }}
					>
						<div
							style={{
								position: 'relative',
								width: '100%',
								height: Math.round(Math.max(300, 620 * dimScale)),
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
										/>
									)
								})}
							</div>
						</div>
					</div>
				</AnimatedSection>
			</div>
		</section>
	)
}

export default MentorsSection
