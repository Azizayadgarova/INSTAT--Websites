import { lazy, Suspense, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/shared/ScrollToTop'
import TopFooter from '../components/TopFooter'
import Footer from '../components/Footer'

const AppPromoSection = lazy(() => import('../components/AppPromoSection'))

const MainLayout = () => {
	const progressRef = useRef(null)
	const ringRef = useRef(null)
	const dotRef = useRef(null)

	useEffect(() => {
		const bar = progressRef.current
		if (!bar) return
		const onScroll = () => {
			const { scrollY } = window
			const max = document.documentElement.scrollHeight - window.innerHeight
			bar.style.width = max > 0 ? `${(scrollY / max) * 100}%` : '0%'
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

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

		let lastTarget = null
		const onOver = e => {
			if (e.target === lastTarget) return
			lastTarget = e.target
			const clickable = e.target.closest('a, button, [role="button"], input, select, textarea, label, [tabindex]')
			targetScale = clickable ? 1.6 : 1
		}

		const tick = () => {
			rafId = requestAnimationFrame(tick)

			ringX += (mouseX - ringX) * 0.25
			ringY += (mouseY - ringY) * 0.25
			currentScale += (targetScale - currentScale) * 0.18

			ring.style.transform = `translate3d(${(ringX - 18) | 0}px, ${(ringY - 18) | 0}px, 0) scale(${currentScale})`
			dot.style.transform  = `translate3d(${(mouseX - 3) | 0}px, ${(mouseY - 3) | 0}px, 0)`
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
					pointerEvents: 'none',
					zIndex: 99999,
					willChange: 'transform',
				}}
			/>

			{/* Global scroll progress */}
			<div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', zIndex: 9999, background: 'rgba(255,255,255,0.05)' }}>
				<div
					ref={progressRef}
					style={{
						height: '100%',
						width: '0%',
						background: 'rgba(0, 230, 252, 1)',
						boxShadow: '0 0 12px 2px rgba(0,230,252,0.7), 0 0 30px 4px rgba(0,230,252,0.4)',
						borderRadius: '0 2px 2px 0',
						position: 'relative',
					}}
				>
					<div
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
				</div>
			</div>

			<Navbar />

			<main className='pt-20 relative'>
				<Outlet />
			</main>
			<Suspense fallback={null}>
				<AppPromoSection />
			</Suspense>
			<TopFooter />
			<Footer />
		</div>
	)
}

export default MainLayout
