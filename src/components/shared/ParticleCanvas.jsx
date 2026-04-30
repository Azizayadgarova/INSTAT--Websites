import { memo, useEffect, useRef } from 'react'

const ParticleCanvas = memo(() => {
	const canvasRef = useRef(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext('2d')

		const resize = () => {
			canvas.width = canvas.offsetWidth
			canvas.height = canvas.offsetHeight
		}
		resize()
		window.addEventListener('resize', resize)

		const particles = Array.from({ length: 20 }, () => ({
			x: Math.random() * canvas.width,
			y: Math.random() * 120,
			r: Math.random() * 0.6 + 0.2,
			speedY: -(Math.random() * 0.4 + 0.1),
			speedX: (Math.random() - 0.5) * 0.2,
			opacity: Math.random() * 0.8 + 0.2,
			pulse: Math.random() * Math.PI * 2,
			pulseSpeed: Math.random() * 0.02 + 0.008,
		}))

		const G = 20
		const gCanvas = document.createElement('canvas')
		gCanvas.width = G
		gCanvas.height = G
		const gCtx = gCanvas.getContext('2d')
		const grad = gCtx.createRadialGradient(G / 2, G / 2, 0, G / 2, G / 2, G / 2)
		grad.addColorStop(0, 'rgba(0, 230, 252, 1)')
		grad.addColorStop(0.5, 'rgba(0, 180, 220, 0.4)')
		grad.addColorStop(1, 'rgba(0, 180, 220, 0)')
		gCtx.beginPath()
		gCtx.arc(G / 2, G / 2, G / 2, 0, Math.PI * 2)
		gCtx.fillStyle = grad
		gCtx.fill()

		let raf
		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			ctx.fillStyle = 'rgba(180, 245, 255, 1)'
			particles.forEach(p => {
				p.pulse += p.pulseSpeed
				p.y += p.speedY
				p.x += p.speedX

				if (p.y < -10) { p.y = canvas.height; p.x = Math.random() * canvas.width }
				if (p.x < 0) p.x = canvas.width
				if (p.x > canvas.width) p.x = 0

				const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse))
				const r5 = p.r * 5
				ctx.globalAlpha = alpha
				ctx.drawImage(gCanvas, p.x - r5, p.y - r5, r5 * 2, r5 * 2)
				ctx.beginPath()
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
				ctx.fill()
			})
			ctx.globalAlpha = 1
			raf = requestAnimationFrame(draw)
		}

		raf = requestAnimationFrame(draw)

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) { cancelAnimationFrame(raf); raf = null }
				else if (raf === null) raf = requestAnimationFrame(draw)
			},
			{ threshold: 0 },
		)
		observer.observe(canvas)

		return () => {
			cancelAnimationFrame(raf)
			window.removeEventListener('resize', resize)
			observer.disconnect()
		}
	}, [])

	return (
		<canvas
			ref={canvasRef}
			aria-hidden='true'
			style={{
				position: 'absolute',
				top: '-130px',
				left: '50%',
				transform: 'translateX(-50%)',
				width: '45%',
				height: '160px',
				pointerEvents: 'none',
				zIndex: 0,
			}}
		/>
	)
})

export default ParticleCanvas
