import { useRef, useEffect } from 'react'
import { useScroll, useSpring } from 'framer-motion'
import { cards, BUTTON_TEXT } from './cards'
import FloatingCard from './FloatingCard'
import GridCard from './GridCard'
import ModernEducationHeader from './Header'
import ParticleBackground from '../shared/ParticleBackground'

function MobileCard({ card }) {
  return (
    <div className='flex flex-col gap-4 mx-auto' style={{ width: '100%', maxWidth: '327px' }}>
      <div className='relative overflow-hidden' style={{ width: '100%', height: '240px', borderRadius: '16px', opacity: 1 }}>
        <img
          src={card.img}
          alt={card.title}
          loading='lazy'
          decoding='async'
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent' />
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: '26px',
          lineHeight: '36px',
          letterSpacing: '-0.03em',
          textAlign: 'center',
          color: '#fff',
          margin: 0,
        }}
      >
        {card.title}
        <span style={{ color: '#fff' }}>
          {card.highlight}
        </span>
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '-0.02em',
          textAlign: 'center',
          color: 'rgba(var(--muted-rgb),1)',
          margin: 0,
        }}
      >
        {card.description}
      </p>
    </div>
  )
}

export default function ModernEducation({ headerProps, variant = 'scroll', customCards, cardHeight = 140, hideParticles = false } = {}) {
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
		if (variant === 'grid') return

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
	}, [variant, scrollYProgress, smooth])

	const displayCards = customCards || cards

	return (
		<div className='relative isolate bg-[rgba(var(--bg-rgb),1)] w-full' style={{ paddingBottom: 0 }}>
			<ModernEducationHeader headerProps={headerProps}>
				{/* MOBILE: oddiy vertikal ro'yxat, animatsiyasiz */}
				<div className='flex md:hidden flex-col gap-10 w-full px-5 pb-10'>
					{displayCards.map((card) => (
						<MobileCard key={card.id} card={card} />
					))}
				</div>

				{/* DESKTOP: scroll animation, o'zgarishsiz */}
				<div className='hidden md:block'>
					{variant === 'grid' ? (
						<div className='w-full py-8 md:py-16'>
							{displayCards.map((card, i) => (
								<GridCard key={card.id} card={card} index={i} />
							))}
						</div>
					) : (
						<div ref={containerRef} className='relative' style={{ position: 'relative' }}>
							<div className='sticky top-0 h-screen overflow-hidden [perspective:2000px]'>
								{!hideParticles && <ParticleBackground count={40} height={650} opacity={0.8} color='255, 255, 255' zIndex={1} />}
								{displayCards.map((card, index) => (
									<FloatingCard
										key={`${card.id}-${index}`}
										card={card}
										index={index}
										progress={smooth}
										totalCards={displayCards.length}
									/>
								))}
							</div>
							<div style={{ height: `${displayCards.length * cardHeight}vh` }} />
						</div>
					)}
				</div>
			</ModernEducationHeader>
		</div>
	)
}

