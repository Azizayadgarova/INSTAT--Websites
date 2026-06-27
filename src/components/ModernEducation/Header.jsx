import bg from '@/assets/bgImg/Background (1).png'
import { useEffect, useRef, useState } from 'react'
import AnimatedSection from '../shared/AnimatedSection'
import ParticleBackground from '../shared/ParticleBackground'
import Text from '../shared/Text'

export default function ModernEducationHeader({ headerProps = {} }) {
	const bgRef = useRef(null)
	const [bgVisible, setBgVisible] = useState(false)

	useEffect(() => {
		const el = bgRef.current?.parentElement
		if (!el) return
		const observer = new IntersectionObserver(
			([entry]) => setBgVisible(entry.isIntersecting),
			{ threshold: 0.05 },
		)
		observer.observe(el)
		return () => observer.disconnect()
	}, [])

	const {
		buttonText = 'Bizning platformalar',
		buttonType,
		title = 'Barcha imkoniyatlar',
		highlight = 'bir joyda',
		highlightColor,
		subtitle = (
			<>
				Beshta platforma orqali o'qish, tadqiqot qilish, bilim olish va
				professional <br className='hidden md:block' />
				rivojlanish imkoniyatlari.
			</>
		),
		hideParticles = false,
		titleStyle,
		titleClassName = '',
		subtitleStyle,
	} = headerProps

	return (
		<section
			className='relative w-full flex flex-col items-center justify-start font-sans text-white'
			style={{
				overflow: 'hidden',
				minHeight: 'auto',
				backgroundColor: 'rgba(14,18,27,1)',
			}}
		>
			<img
				ref={bgRef}
				src={bg}
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

			{!hideParticles && (
				<ParticleBackground
					count={40}
					height={650}
					opacity={0.8}
					color='255, 255, 255'
					zIndex={2}
				/>
			)}

			<AnimatedSection
				style={{
					position: 'relative',
					zIndex: 50,
					width: '100%',
					paddingTop: '40px',
					paddingBottom: '40px',
				}}
			>
				<div className='text-center'>
					<Text
						buttonText={buttonText}
						buttonType={buttonType}
						title={title}
						highlight={highlight}
						highlightColor={highlightColor}
						subtitle={subtitle}
						titleStyle={titleStyle}
						titleClassName={titleClassName}
						subtitleStyle={subtitleStyle}
					/>
				</div>
			</AnimatedSection>
		</section>
	)
}
