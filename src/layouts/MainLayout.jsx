import { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { useScroll, useTransform, motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/shared/ScrollToTop'

const MainLayout = () => {
	const { scrollYProgress } = useScroll()
	const fillWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

	const ringRef = useRef(null)
	const dotRef = useRef(null)

	useEffect(() => {
		const ring = ringRef.current
		const dot = dotRef.current
		if (!ring || !dot) return

		let mouseX = -100, mouseY = -100
		let ringX = -100, ringY = -100
		let targetScale = 1, currentScale = 1
		let rafId

		const onMove = e => {
			mouseX = e.clientX
			mouseY = e.clientY
		}

		const onOver = e => {
			const clickable = e.target.closest('a, button, [role="button"], input, select, textarea, label, [tabindex]')
			targetScale = clickable ? 1.6 : 1
		}

		const tick = () => {
			ringX += (mouseX - ringX) * 0.45
			ringY += (mouseY - ringY) * 0.45
			currentScale += (targetScale - currentScale) * 0.18

			const maxOffset = 15
			const dx = Math.max(-maxOffset, Math.min(maxOffset, mouseX - ringX))
			const dy = Math.max(-maxOffset, Math.min(maxOffset, mouseY - ringY))

			ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px) scale(${currentScale})`
			dot.style.transform = `translate(${ringX + dx - 3}px, ${ringY + dy - 3}px)`

			rafId = requestAnimationFrame(tick)
		}

		window.addEventListener('mousemove', onMove, { passive: true })
		window.addEventListener('mouseover', onOver, { passive: true })
		document.body.style.cursor = 'none'
		rafId = requestAnimationFrame(tick)

		return () => {
			window.removeEventListener('mousemove', onMove)
			window.removeEventListener('mouseover', onOver)
			cancelAnimationFrame(rafId)
			document.body.style.cursor = ''
		}
	}, [])

	return (
		<div className='bg-[rgba(14,18,27,1)] min-h-screen'>
			<ScrollToTop />
			{/* Custom cursor — ring */}
			<div
				ref={ringRef}
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: 36,
					height: 36,
					borderRadius: '50%',
					border: '1.5px solid rgba(0,230,252,0.65)',
					boxShadow: '0 0 10px rgba(0,230,252,0.25)',
					pointerEvents: 'none',
					zIndex: 99999,
					willChange: 'transform',
				}}
			/>
			{/* Custom cursor — dot */}
			<div
				ref={dotRef}
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: 6,
					height: 6,
					borderRadius: '50%',
					background: 'rgba(0,230,252,1)',
					boxShadow: '0 0 6px rgba(0,230,252,0.8)',
					pointerEvents: 'none',
					zIndex: 99999,
					willChange: 'transform',
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
