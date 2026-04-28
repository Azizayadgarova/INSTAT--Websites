import { motion } from 'framer-motion'

const AnimatedSection = ({ children, delay = 0, className, style }) => (
	<motion.div
		initial={{ opacity: 0, y: 56, filter: 'blur(14px)' }}
		whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
		viewport={{ once: true, margin: '-70px' }}
		transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
		className={className}
		style={{ willChange: 'opacity, transform, filter', ...style }}
	>
		{children}
	</motion.div>
)

export default AnimatedSection
