import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

const CursorGlow = () => {
	const rawX = useMotionValue(-400)
	const rawY = useMotionValue(-400)

	const x = useSpring(rawX, { stiffness: 55, damping: 16 })
	const y = useSpring(rawY, { stiffness: 55, damping: 16 })

	const xFast = useSpring(rawX, { stiffness: 200, damping: 28 })
	const yFast = useSpring(rawY, { stiffness: 200, damping: 28 })

	useEffect(() => {
		const move = e => {
			rawX.set(e.clientX - 250)
			rawY.set(e.clientY - 250)
		}
		window.addEventListener('mousemove', move)
		return () => window.removeEventListener('mousemove', move)
	}, [rawX, rawY])

	return (
		<>
			<motion.div
				style={{
					position: 'fixed',
					left: x,
					top: y,
					width: 500,
					height: 500,
					borderRadius: '50%',
					background:
						'radial-gradient(circle, rgba(0,230,252,0.06) 0%, rgba(43,117,204,0.025) 45%, transparent 70%)',
					pointerEvents: 'none',
					zIndex: 9990,
					mixBlendMode: 'screen',
				}}
			/>
			<motion.div
				style={{
					position: 'fixed',
					left: xFast,
					top: yFast,
					width: 100,
					height: 100,
					marginLeft: 150,
					marginTop: 150,
					borderRadius: '50%',
					background:
						'radial-gradient(circle, rgba(0,230,252,0.22) 0%, rgba(0,180,220,0.08) 50%, transparent 70%)',
					pointerEvents: 'none',
					zIndex: 9991,
					mixBlendMode: 'screen',
				}}
			/>
		</>
	)
}

export default CursorGlow
