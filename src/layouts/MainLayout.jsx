import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useScroll, useTransform, motion, useMotionValue, useSpring } from 'framer-motion'
import Navbar from '../components/Navbar'

const MainLayout = () => {
	const { scrollYProgress } = useScroll()
	const fillWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

	const rawX = useMotionValue(-100)
	const rawY = useMotionValue(-100)
	const hoverScale = useMotionValue(1)

	const ringX = useSpring(rawX, { stiffness: 180, damping: 22 })
	const ringY = useSpring(rawY, { stiffness: 180, damping: 22 })
	const scale = useSpring(hoverScale, { stiffness: 300, damping: 25 })

	// Nuqta ring ichida qoladi: max offset = ring radius(18) - dot radius(3) = 15px
	const dotPosX = useTransform([rawX, ringX], ([raw, ring]) => ring + Math.max(-15, Math.min(15, raw - ring)))
	const dotPosY = useTransform([rawY, ringY], ([raw, ring]) => ring + Math.max(-15, Math.min(15, raw - ring)))

	useEffect(() => {
		const onMove = e => {
			rawX.set(e.clientX)
			rawY.set(e.clientY)
		}
		const onOver = e => {
			const clickable = e.target.closest('a, button, [role="button"], input, select, textarea, label, [tabindex]')
			hoverScale.set(clickable ? 1.6 : 1)
		}

		window.addEventListener('mousemove', onMove)
		window.addEventListener('mouseover', onOver)
		document.body.style.cursor = 'none'

		return () => {
			window.removeEventListener('mousemove', onMove)
			window.removeEventListener('mouseover', onOver)
			document.body.style.cursor = ''
		}
	}, [rawX, rawY, hoverScale])

	return (
		<div className='bg-[rgba(14,18,27,1)] min-h-screen'>
			{/* Custom cursor — ring */}
			<motion.div
				style={{
					position: 'fixed',
					left: ringX,
					top: ringY,
					x: '-50%',
					y: '-50%',
					width: 36,
					height: 36,
					borderRadius: '50%',
					border: '1.5px solid rgba(0,230,252,0.65)',
					boxShadow: '0 0 10px rgba(0,230,252,0.25)',
					pointerEvents: 'none',
					zIndex: 99999,
					scale,
				}}
			/>
			{/* Custom cursor — dot */}
			<motion.div
				style={{
					position: 'fixed',
					left: dotPosX,
					top: dotPosY,
					x: '-50%',
					y: '-50%',
					width: 6,
					height: 6,
					borderRadius: '50%',
					background: 'rgba(0,230,252,1)',
					boxShadow: '0 0 6px rgba(0,230,252,0.8)',
					pointerEvents: 'none',
					zIndex: 99999,
				}}
			/>

			{/* Global scroll progress */}
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

			<Navbar />

			<main className='pt-[80px]'>
				<Outlet />
			</main>
		</div>
	)
}

export default MainLayout
