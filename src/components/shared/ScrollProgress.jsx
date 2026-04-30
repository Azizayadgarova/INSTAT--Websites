import { useScroll, useTransform, motion } from 'framer-motion'

const ScrollProgress = () => {
	const { scrollYProgress } = useScroll()
	const fillWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

	return (
		<div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', zIndex: 9999, background: 'rgba(255,255,255,0.05)' }}>
			<motion.div
				style={{
					height: '100%',
					width: fillWidth,
					background: 'rgba(0, 230, 252, 1)',
					boxShadow: '0 0 12px 2px rgba(0,230,252,0.7), 0 0 30px 4px rgba(0,230,252,0.4)',
					borderRadius: '0 2px 2px 0',
					position: 'relative',
				}}
			>
				<motion.div
					style={{
						position: 'absolute',
						right: 0,
						top: '50%',
						transform: 'translateY(-50%)',
						width: '10px',
						height: '10px',
						borderRadius: '50%',
						background: 'rgba(0, 230, 252, 1)',
						boxShadow: '0 0 8px 3px rgba(0,230,252,0.9), 0 0 20px 6px rgba(0,230,252,0.4)',
					}}
				/>
			</motion.div>
		</div>
	)
}

export default ScrollProgress
