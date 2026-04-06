import { useEffect, useRef } from 'react'

const ParticleCanvas = () => {
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

		const particles = Array.from({ length: 60 }, () => ({
			x: Math.random() * 1200,
			y: Math.random() * 180,
			r: Math.random() * 1.4 + 0.3,
			speedY: Math.random() * 0.5 + 0.15,
			speedX: (Math.random() - 0.5) * 0.25,
			opacity: Math.random() * 0.8 + 0.15,
			pulse: Math.random() * Math.PI * 2,
			pulseSpeed: Math.random() * 0.02 + 0.008,
		}))

		let raf
		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			particles.forEach(p => {
				p.pulse += p.pulseSpeed
				p.y += p.speedY // pastga tushadi — mainbg ga kiradi
				p.x += p.speedX

				if (p.y > canvas.height + 10) {
					p.y = -10
					p.x = Math.random() * canvas.width
					p.opacity = Math.random() * 0.8 + 0.15
				}
				if (p.x < 0) p.x = canvas.width
				if (p.x > canvas.width) p.x = 0

				const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse))

				const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5)
				glow.addColorStop(0, `rgba(0, 230, 252, ${alpha})`)
				glow.addColorStop(0.5, `rgba(0, 180, 220, ${alpha * 0.4})`)
				glow.addColorStop(1, 'rgba(0, 180, 220, 0)')
				ctx.beginPath()
				ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2)
				ctx.fillStyle = glow
				ctx.fill()

				ctx.beginPath()
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
				ctx.fillStyle = `rgba(180, 245, 255, ${alpha})`
				ctx.fill()
			})

			raf = requestAnimationFrame(draw)
		}
		draw()

		return () => {
			cancelAnimationFrame(raf)
			window.removeEventListener('resize', resize)
		}
	}, [])

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: 'absolute',
				top: '-120px',
				left: 0,
				width: '100%',
				height: '180px',
				pointerEvents: 'none',
				zIndex: 10,
			}}
		/>
	)
}
export default ParticleCanvas
