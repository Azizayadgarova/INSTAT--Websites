import { useEffect, useRef } from 'react'

const isTouchOnly = () =>
	typeof window !== 'undefined' &&
	window.matchMedia('(hover: none) and (pointer: coarse)').matches

const CursorRing = () => {
	const ringRef = useRef(null)
	const dotRef  = useRef(null)

	useEffect(() => {
		if (isTouchOnly()) return

		const ring = ringRef.current
		const dot  = dotRef.current
		if (!ring || !dot) return

		let mouseX = -100, mouseY = -100
		let ringX  = -100, ringY  = -100
		let targetScale = 1, currentScale = 1
		let rafId

		const onMove = e => { mouseX = e.clientX; mouseY = e.clientY }
		let lastTarget = null
		const onOver = e => {
			if (e.target === lastTarget) return
			lastTarget = e.target
			const clickable = e.target.closest('a, button, [role="button"], input, select, textarea, label, [tabindex]')
			targetScale = clickable ? 1.6 : 1
		}

		const tick = () => {
			if (document.hidden) {
				rafId = requestAnimationFrame(tick)
				return
			}

			ringX += (mouseX - ringX) * 0.25
			ringY += (mouseY - ringY) * 0.25
			currentScale += (targetScale - currentScale) * 0.18

			ring.style.transform = `translate3d(${(ringX - 18) | 0}px, ${(ringY - 18) | 0}px, 0) scale(${currentScale})`
			dot.style.transform  = `translate3d(${(mouseX - 3) | 0}px, ${(mouseY - 3) | 0}px, 0)`

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

	if (isTouchOnly()) return null

	return (
		<>
			<div ref={ringRef} style={{
				position: 'fixed', top: 0, left: 0,
				width: 36, height: 36, borderRadius: '50%',
				border: '1.5px solid rgba(0,230,252,0.65)',
				pointerEvents: 'none', zIndex: 99999,
				willChange: 'transform',
			}} />
			<div ref={dotRef} style={{
				position: 'fixed', top: 0, left: 0,
				width: 6, height: 6, borderRadius: '50%',
				background: 'rgba(0,230,252,1)',
				pointerEvents: 'none', zIndex: 99999,
				willChange: 'transform',
			}} />
		</>
	)
}

export default CursorRing
