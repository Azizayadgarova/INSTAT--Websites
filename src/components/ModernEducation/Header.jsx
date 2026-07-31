import bg from '@/assets/bgImg/Background (1).png'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AnimatedSection from '../shared/AnimatedSection'
import ParticleBackground from '../shared/ParticleBackground'
import Text from '../shared/Text'
import useSectionText from "@/hooks/useSectionText.js";

export default function ModernEducationHeader({ headerProps = {}, children }) {
	const { t } = useTranslation()

	const bgRef = useRef(null)
	const [bgVisible, setBgVisible] = useState(false)
	const st = useSectionText('main')

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
		title =st('main_title3',  'Barcha imkoniyatlar').split(" ").slice(0, -2).join(" "),
		highlight = st('main_title3',  'Barcha imkoniyatlar').split(" ").slice( -2).join(" "),
		highlightColor,
		subtitle = (
			<>
				{st('main_description3',  t('components.header.beshta_platforma_orqali_oqish')).split(" ").slice(0, -2).join(" ")}
				<br className='hidden md:block' />
				{st('main_description3',  t('components.header.rivojlanish_imkoniyatlari')).split(" ").slice( -2).join(" ")}
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
				minHeight: 380,
				backgroundColor: 'rgba(var(--bg-rgb),1)',
			}}
		>
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: 'calc(380px + 100vh)',
					overflow: 'hidden',
					zIndex: 0,
					pointerEvents: 'none',
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
						opacity: bgVisible ? 1 : 0,
						transition: 'opacity 2.4s cubic-bezier(0.16, 1, 0.3, 1)',
					}}
					loading='lazy'
					decoding='async'
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
			</div>

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

			{children && (
				<div style={{ position: 'relative', zIndex: 50, width: '100%' }}>
					{children}
				</div>
			)}
		</section>
	)
}
