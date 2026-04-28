import { memo, useEffect, useRef } from 'react'

const ParticleBackground = memo(({
	count = 100,
	height = 650,
	opacity = 0.8,
	color = '255, 255, 255',
	zIndex = 1,
	style = {},
}) => {
	const canvasRef = useRef(null)

	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		let animationFrameId = null
		let particles = []

		const resize = () => {
			canvas.width = window.innerWidth
			canvas.height = height
		}

		class Particle {
			constructor() {
				this.reset()
			}
			reset() {
				this.x = Math.random() * canvas.width
				this.y = Math.random() * canvas.height
				this.size = Math.random() * 1.5 + 0.2
				this.speedY = Math.random() * 0.15 + 0.05
				this.opacity = Math.random() * 0.6 + 0.1
				// fillStyle string qayta ishlatiladi — har draw da string yaratilmaydi
				this._fill = `rgba(${color}, ${this.opacity})`
			}
			update() {
				this.y -= this.speedY
				if (this.y < 0) this.reset()
			}
			draw() {
				ctx.fillStyle = this._fill
				ctx.beginPath()
				ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
				ctx.fill()
			}
		}

		const init = () => {
			resize()
			particles = Array.from({ length: count }, () => new Particle())
		}

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			particles.forEach(p => {
				p.update()
				p.draw()
			})
			animationFrameId = requestAnimationFrame(animate)
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					if (animationFrameId === null) animate()
				} else {
					cancelAnimationFrame(animationFrameId)
					animationFrameId = null
				}
			},
			{ threshold: 0 },
		)

		window.addEventListener('resize', resize)
		init()
		observer.observe(canvas)

		return () => {
			window.removeEventListener('resize', resize)
			cancelAnimationFrame(animationFrameId)
			observer.disconnect()
		}
	}, [count, height, color])

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: `${height}px`,
				pointerEvents: 'none',
				zIndex,
				opacity,
				maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
				WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
				...style,
			}}
		/>
	)
})

export default ParticleBackground
