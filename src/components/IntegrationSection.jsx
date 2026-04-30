import { useEffect, useRef, useState } from 'react'
import AnimatedSection from './shared/AnimatedSection'
import SectionBackground from './shared/SectionBackground'
import logo1 from '@/assets/ClickUp (1).png'
import logo2 from '@/assets/image 21.png'
import logo3 from '@/assets/Frame 2147238272 (7).png'
import logo4 from '@/assets/Frame 2147238272 (8).png'
import logo5 from '@/assets/image 17.png'
import logo6 from '@/assets/Frame 2147238272 (9).png'
import logo7 from '@/assets/image 17 (1).png'
import centeralIcon from '@/assets/Group 1707483799 (5).png'
import Text from './shared/Text'

const integrations = [
	{ id: 1, icon: logo1 },
	{ id: 2, icon: logo2 },
	{ id: 3, icon: logo3 },
	{ id: 4, icon: logo4 },
	{ id: 5, icon: logo5 },
	{ id: 6, icon: logo6 },
	{ id: 7, icon: logo7 },
]

const radius = 360
const arcRadius = radius * 0.9
const centerOffset = 80
const total = integrations.length
const baseAngles = integrations.map((_, i) => i * (180 / total))
const circleCenterY = -(radius - arcRadius)

const IntegrationSection = () => {
	const sectionRef = useRef(null)
	const angleRef = useRef(0)
	const rafRef = useRef(null)
	const pausedRef = useRef(false)
	const visibleRef = useRef(false)
	const iconRefs = useRef([])
	const [containerScale, setContainerScale] = useState(1)

	useEffect(() => {
		const updateScale = () => {
			setContainerScale(Math.min(1, Math.max(0.35, (window.innerWidth - 32) / 900)))
		}
		updateScale()
		window.addEventListener('resize', updateScale)
		return () => window.removeEventListener('resize', updateScale)
	}, [])

	useEffect(() => {
		const speed = 0.08

		const updateIcons = (angle) => {
			integrations.forEach((_, index) => {
				const el = iconRefs.current[index]
				if (!el) return

				const a = (baseAngles[index] + angle) % 180
				const rad = (a * Math.PI) / 180
				const x = Math.cos(rad) * arcRadius
				const y = circleCenterY + Math.sin(rad) * arcRadius
				const edgeFade = a < 8 ? (a / 8) ** 3 : a > 172 ? ((180 - a) / 8) ** 3 : 1
				const sinVal = Math.sin(rad)
				const depthScale = 0.7 + 0.3 * sinVal
				const translateZ = sinVal * 80

				el.style.left = `calc(50% + ${x}px)`
				el.style.top = `${y}px`
				el.style.transform = `translate(-50%, -50%) scale(${depthScale}) translateZ(${translateZ}px)`
				el.style.opacity = edgeFade
				el.style.zIndex = Math.round(40 + sinVal * 20)
				el.style.pointerEvents = edgeFade > 0.3 ? 'auto' : 'none'
			})
		}

		const animate = () => {
			if (!pausedRef.current) {
				angleRef.current = (angleRef.current + speed) % 180
			}
			updateIcons(angleRef.current)
			if (visibleRef.current) rafRef.current = requestAnimationFrame(animate)
			else rafRef.current = null
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				visibleRef.current = entry.isIntersecting
				if (entry.isIntersecting && !rafRef.current) {
					rafRef.current = requestAnimationFrame(animate)
				}
			},
			{ threshold: 0 },
		)

		if (sectionRef.current) observer.observe(sectionRef.current)
		visibleRef.current = true
		rafRef.current = requestAnimationFrame(animate)

		return () => {
			visibleRef.current = false
			cancelAnimationFrame(rafRef.current)
			observer.disconnect()
		}
	}, [])

	return (
		<section
			ref={sectionRef}
			className='relative w-full bg-[rgba(14,18,27,1)] flex flex-col items-center justify-start overflow-hidden py-10 font-sans text-white'
			style={{ perspective: '1200px', minHeight: `${Math.max(880, 600 * containerScale)}px` }}
		>
			<SectionBackground />

			<AnimatedSection style={{ position: 'relative', zIndex: 50, width: '100%' }}>
				<div className='text-center mb-14'>
					<Text
						buttonText='Platforma haqida'
						title='Integratsiyalashgan'
						highlight='platformalar'
						subtitle={
							<>Ta'lim jarayonini qulay va samarali qiluvchi integratsiyalar</>
						}
					/>
				</div>
			</AnimatedSection>

			<div
				className='relative w-full max-w-[900px] flex justify-center'
				style={{
					transformStyle: 'preserve-3d',
					transform: `scale(${containerScale}) rotateX(18deg)`,
					transformOrigin: 'center top',
				}}
			>
				<div
					className='relative z-50 flex items-center justify-center overflow-hidden'
					style={{
						width: '144px',
						height: '144px',
						background: 'linear-gradient(180deg, #38A0FF 0%, #2D3D99 100%)',
						borderRadius: '999px',
						padding: '8px',
						transformStyle: 'preserve-3d',
						transform: 'translateZ(60px)',
						boxShadow: '0px 10px 30px rgba(0,0,0,0.4), 0px 1px 2px rgba(0,0,0,0.2)',
					}}
				>
					<img className='w-[85px] h-[69px]' src={centeralIcon} alt='Instat logo' loading='lazy' decoding='async' />
				</div>

				<div
					className='absolute z-10 rounded-full'
					style={{
						width: '320px',
						height: '320px',
						top: `${centerOffset - 150}px`,
						background: 'conic-gradient(from 180deg at 50% 50%, #2B75CC 0deg, #fff 90deg, #ffffff 180deg, #fff 360deg)',
						WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
						WebkitMaskComposite: 'destination-out',
						maskComposite: 'exclude',
						padding: '1.5px',
						clipPath: 'inset(50% 0% 0% 0%)',
					}}
				/>

				<div
					className='absolute z-10 rounded-full opacity-50'
					style={{
						width: `${radius * 1.8}px`,
						height: `${radius * 1.8}px`,
						top: `${centerOffset - radius}px`,
						left: '50%',
						transform: 'translateX(-50%)',
						background: 'conic-gradient(from 180deg at 50% 50%, #2B75CC 0deg, #fff 90deg, #ffffff 180deg, #fff 360deg)',
						WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
						WebkitMaskComposite: 'destination-out',
						maskComposite: 'exclude',
						padding: '1.5px',
						clipPath: 'inset(50% 0% 0% 0%)',
					}}
				/>

				<div className='absolute w-full' style={{ top: `${centerOffset}px` }}>
					{integrations.map((item, index) => (
						<div
							key={item.id}
							ref={el => (iconRefs.current[index] = el)}
							className='absolute'
							style={{ willChange: 'transform, opacity' }}
							onMouseEnter={() => { pausedRef.current = true }}
							onMouseLeave={() => { pausedRef.current = false }}
						>
							<div
								className='w-20 h-20 rounded-full flex items-center justify-center p-4 cursor-pointer bg-white'
								style={{ boxShadow: '0px 8px 16px rgba(0,0,0,0.3), 0px 2px 4px rgba(0,0,0,0.2)', transition: 'box-shadow 0.3s, transform 0.3s' }}
								onMouseEnter={e => {
									e.currentTarget.style.boxShadow = '0 0 28px 10px rgba(56,160,255,0.45), 0px 8px 16px rgba(0,0,0,0.3)'
									e.currentTarget.style.transform = 'scale(1.12)'
								}}
								onMouseLeave={e => {
									e.currentTarget.style.boxShadow = '0px 8px 16px rgba(0,0,0,0.3), 0px 2px 4px rgba(0,0,0,0.2)'
									e.currentTarget.style.transform = 'scale(1)'
								}}
							>
								<img src={item.icon} alt='' aria-hidden='true' className='w-[40px] h-[40px] object-contain' loading='lazy' decoding='async' />
							</div>

							<div
								className='absolute top-full left-0 w-20 h-20 rounded-full flex items-center justify-center p-4 overflow-hidden bg-white pointer-events-none'
								style={{
									marginTop: '3px',
									transform: 'scaleY(-1)',
									opacity: 0.15,
									WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 65%)',
									maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 65%)',
								}}
							>
								<img src={item.icon} alt='' aria-hidden='true' className='w-[40px] h-[40px] object-contain' loading='lazy' decoding='async' />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default IntegrationSection
