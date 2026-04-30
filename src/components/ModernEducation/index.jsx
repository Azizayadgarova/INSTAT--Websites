import { useRef, useEffect } from 'react'
import { useScroll, useSpring } from 'framer-motion'
import { cards } from './cards'
import FloatingCard from './FloatingCard'
import ModernEducationHeader from './Header'
import ParticleBackground from '../shared/ParticleBackground'

export default function ModernEducation() {
	const containerRef = useRef(null)

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end'],
	})

	const smooth = useSpring(scrollYProgress, {
		stiffness: 70,
		damping: 28,
	})

	useEffect(() => {
		let lastTouchY = 0
		let bodyLocked = false

		const lockBody = () => {
			if (bodyLocked) return
			bodyLocked = true
			document.body.style.overflow = 'hidden'
		}

		const unlockBody = () => {
			if (!bodyLocked) return
			bodyLocked = false
			document.body.style.overflow = ''
		}

		const unsubY = scrollYProgress.on('change', sy => {
			if (sy >= 0.999 && smooth.get() < 0.999) lockBody()
		})

		const unsubS = smooth.on('change', sm => {
			if (sm >= 0.999) unlockBody()
		})

		const shouldBlock = (scrollingDown) =>
			scrollingDown && scrollYProgress.get() >= 0.99 && smooth.get() < 0.999

		const handleWheel = (e) => {
			if (shouldBlock(e.deltaY > 0)) e.preventDefault()
		}

		const handleTouchStart = (e) => {
			lastTouchY = e.touches[0].clientY
		}

		const handleTouchMove = (e) => {
			const delta = lastTouchY - e.touches[0].clientY
			lastTouchY = e.touches[0].clientY
			if (shouldBlock(delta > 0)) e.preventDefault()
		}

		window.addEventListener('wheel', handleWheel, { passive: false })
		window.addEventListener('touchstart', handleTouchStart, { passive: true })
		window.addEventListener('touchmove', handleTouchMove, { passive: false })

		return () => {
			unlockBody()
			unsubY()
			unsubS()
			window.removeEventListener('wheel', handleWheel)
			window.removeEventListener('touchstart', handleTouchStart)
			window.removeEventListener('touchmove', handleTouchMove)
		}
	}, [scrollYProgress, smooth])

	return (
		<div className='relative bg-[rgba(14,18,27,1)] w-full'>
			<ModernEducationHeader />
			<div ref={containerRef} className='relative'>
				<div className='sticky top-0 h-screen overflow-hidden [perspective:2000px]'>
					<ParticleBackground count={100} height={650} opacity={0.8} color='255, 255, 255' zIndex={1} />
					{cards.map((card, index) => (
						<FloatingCard
							key={`${card.id}-${index}`}
							card={card}
							index={index}
							progress={smooth}
						/>
					))}
				</div>
				<div className='h-[700vh]' />
			</div>
		</div>
	)
}
