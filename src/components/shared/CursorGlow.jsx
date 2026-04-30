import { useEffect, useRef } from 'react'

const CursorGlow = () => {
	const largeRef = useRef(null)
	const smallRef = useRef(null)

	useEffect(() => {
		const large = largeRef.current
		const small = smallRef.current
		if (!large || !small) return

		let mouseX = -400, mouseY = -400
		let largeX = -400, largeY = -400
		let smallX = -400, smallY = -400
		let rafId

		const onMove = e => {
			mouseX = e.clientX
			mouseY = e.clientY
		}

		const tick = () => {
			largeX += (mouseX - 250 - largeX) * 0.2
			largeY += (mouseY - 250 - largeY) * 0.2

			smallX += (mouseX - 50 + 150 - smallX) * 0.8
			smallY += (mouseY - 50 + 150 - smallY) * 0.8

			large.style.transform = `translate(${largeX}px, ${largeY}px)`
			small.style.transform = `translate(${smallX}px, ${smallY}px)`

			rafId = requestAnimationFrame(tick)
		}

		window.addEventListener('mousemove', onMove, { passive: true })
		rafId = requestAnimationFrame(tick)

		return () => {
			window.removeEventListener('mousemove', onMove)
			cancelAnimationFrame(rafId)
		}
	}, [])

	return (
		<>
			<div
				ref={largeRef}
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: 500,
					height: 500,
					borderRadius: '50%',
					background:
						'radial-gradient(circle, rgba(0,230,252,0.06) 0%, rgba(43,117,204,0.025) 45%, transparent 70%)',
					pointerEvents: 'none',
					zIndex: 9990,
					mixBlendMode: 'screen',
					willChange: 'transform',
				}}
			/>
			<div
				ref={smallRef}
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: 100,
					height: 100,
					borderRadius: '50%',
					background:
						'radial-gradient(circle, rgba(0,230,252,0.22) 0%, rgba(0,180,220,0.08) 50%, transparent 70%)',
					pointerEvents: 'none',
					zIndex: 9991,
					mixBlendMode: 'screen',
					willChange: 'transform',
				}}
			/>
		</>
	)
}

export default CursorGlow
