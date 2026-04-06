import { useRef } from 'react'
import { useScroll, useSpring } from 'framer-motion'
import { cards } from './cards'
import FloatingCard from './FloatingCard'

export default function ModernEducation() {
	const containerRef = useRef(null)

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end'],
	})

	const smooth = useSpring(scrollYProgress, {
		stiffness: 35,
		damping: 25,
	})

	return (
		<div ref={containerRef} className='relative bg-[rgba(14,18,27,1)] w-full h-[600vh]'>
			<div className='sticky top-0 h-screen overflow-hidden [perspective:2000px]'>
				{cards.map((card, index) => (
					<FloatingCard
						key={`${card.id}-${index}`}
						card={card}
						index={index}
						progress={smooth}
					/>
				))}
			</div>
		</div>
	)
}
