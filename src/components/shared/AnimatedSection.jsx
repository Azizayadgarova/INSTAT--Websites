import { motion } from 'framer-motion'
import { useCallback, useRef } from 'react'
import { EASE_SMOOTH } from '../../constants/animations'

const AnimatedSection = ({ children, delay = 0, className, style }) => {
	const ref = useRef(null)
	const onComplete = useCallback(() => {
		if (ref.current) ref.current.style.willChange = 'auto'
	}, [])

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 56, filter: 'blur(14px)' }}
			whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
			viewport={{ once: true, margin: '-70px' }}
			transition={{ duration: 1.1, ease: EASE_SMOOTH, delay }}
			className={className}
			style={{ willChange: 'opacity, transform, filter', ...style }}
			onAnimationComplete={onComplete}
		>
			{children}
		</motion.div>
	)
}

export default AnimatedSection
