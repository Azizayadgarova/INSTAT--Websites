import { useEffect, useRef } from 'react'

const CursorRing = () => {
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
		<>
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
		</>
	)
}

export default CursorRing
