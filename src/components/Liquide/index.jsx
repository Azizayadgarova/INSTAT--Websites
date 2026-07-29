import { useMemo, useState, useEffect } from 'react'
import { slides } from './slides'
import { useThreeSlider } from './useThreeSlider'

const preSlides = slides.map(slide => ({
	...slide,
	titleChars: slide.title.split('').map((char, j) => ({
		char,
		angle: (j - (slide.title.length - 1) / 2) * (90 / (slide.title.length / 2)),
	})),
	hlChars: slide.highlight.split('').map((char, j) => ({
		char,
		angle: (j - (slide.highlight.length - 1) / 2) * (20 / (slide.highlight.length / 5)),
	})),
}))

export default function LiquideSlider() {
	const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
	const [winSize, setWinSize] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }))
	useEffect(() => {
		const handler = () => {
			setIsMobile(window.innerWidth < 768)
			setWinSize({ w: window.innerWidth, h: window.innerHeight })
		}
		window.addEventListener('resize', handler, { passive: true })
		return () => window.removeEventListener('resize', handler)
	}, [])

	const s = useMemo(
		() => isMobile
			? Math.min(winSize.w / 600, winSize.h / 700)
			: Math.min(winSize.w / 1200, winSize.h / 1000),
		[isMobile, winSize],
	)
	const { canvasRef, overlayRefs } = useThreeSlider(s)

	return (
		<section
			style={{
				position: 'relative',
				width: '100%',
				aspectRatio: isMobile ? '375 / 840' : '1440 / 900',
				overflow: 'hidden',
				background: '#000',
			}}
		>
			<canvas
				ref={canvasRef}
				style={{ position: 'absolute', top: 0, left: 0 }}
			/>

			<svg width='0' height='0' style={{ position: 'absolute' }} aria-hidden='true'>
				<filter id='liquide-grain'>
					<feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='7' result='noise' />
					<feDisplacementMap in='SourceGraphic' in2='noise' scale='3' />
				</filter>
			</svg>

			<div
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					width: '100%',
					height: '60vh',
					background:
						'linear-gradient(to top, rgba(var(--bg-rgb),1) 0%, rgba(var(--bg-rgb),0.85) 25%, rgba(0,0,0,0) 100%)',
					zIndex: 2,
					pointerEvents: 'none',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '45%',
					height: '100%',
					background:
						'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%)',
					zIndex: 2,
					pointerEvents: 'none',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					top: 0,
					right: 0,
					width: '45%',
					height: '100%',
					background:
						'linear-gradient(to left, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%)',
					zIndex: 2,
					pointerEvents: 'none',
				}}
			/>


			<div
				style={{
					position: 'absolute',
					inset: 0,
					pointerEvents: 'none',
					zIndex: 5,
				}}
			>
				{preSlides.map((slide, i) => (
					<div
						key={slide.id ?? slide.title ?? i}
						ref={el => (overlayRefs.current[i] = el)}
						style={{
							position: 'absolute',
							top: isMobile ? '52%' : '58%',
							left: 0,
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							willChange: 'transform, opacity',
						}}
					>
						<div
							style={{
								position: 'relative',
								width: '100%',
								height: isMobile ? '100px' : `${200 * s}px`,
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							{slide.titleChars.map(({ char, angle }, j) => (
								<span
									key={j}
									className='anim-char grain-text'
									data-rot={angle}
									style={{
										position: 'absolute',
										fontFamily: 'var(--font-display)',
										fontWeight: 900,
										fontSize: isMobile ? '18px' : `${60 * s}px`,
										color: '#fff',
										height: isMobile ? '140px' : `${380 * s}px`,
										transformOrigin: 'bottom center',
										transform: `rotate(${angle}deg)`,
										whiteSpace: 'pre',
										display: 'inline-block',
										textTransform: 'uppercase',
										letterSpacing: '-1px',
										transition: 'transform 0.1s ease-out',
									}}
								>
									{char}
								</span>
							))}
						</div>

						<div
							style={{
								position: 'relative',
								width: '100%',
								height: isMobile ? '40px' : `${80 * s}px`,
								display: 'flex',
								justifyContent: 'center',
								marginTop: isMobile ? '-38px' : `${-75 * s}px`,
							}}
						>
							{slide.hlChars.map(({ char, angle }, j) => (
								<span
									key={j}
									className='anim-char grain-text'
									data-rot={angle}
									style={{
										position: 'absolute',
										fontFamily: 'var(--font-display)',
										fontWeight: 900,
										fontSize: isMobile ? '13px' : `${36 * s}px`,
										color: '#22d3ee',
										height: isMobile ? '120px' : `${340 * s}px`,
										transformOrigin: 'bottom center',
										transform: `rotate(${angle}deg)`,
										whiteSpace: 'pre',
										display: 'inline-block',
										textTransform: 'uppercase',
										transition: 'transform 0.1s ease-out',
									}}
								>
									{char}
								</span>
							))}
						</div>

						<p
							style={{
								marginTop: isMobile ? '80px' : `${160 * s}px`,
								fontFamily: 'var(--font-display)',
								fontWeight: 400,
								fontSize: isMobile ? '13px' : '20px',
								lineHeight: '140%',
								letterSpacing: '0%',
								textAlign: 'center',
								color: 'rgba(225,227,234,1)',
								maxWidth: isMobile ? '85%' : '28rem',
								padding: '0 20px',
							}}
						>
							{slide.desc}
						</p>
					</div>
				))}
			</div>
		</section>
	)
}
