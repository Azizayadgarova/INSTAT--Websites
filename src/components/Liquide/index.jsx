import { useMemo } from 'react'
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
	const s = useMemo(
		() => Math.min(window.innerWidth / 1200, window.innerHeight / 1000),
		[],
	)
	const { canvasRef, overlayRefs } = useThreeSlider(s)

	return (
		<section
			style={{
				position: 'relative',
				width: '100%',
				aspectRatio: '1440 / 900',
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
						'linear-gradient(to top, rgba(14,18,27,1) 0%, rgba(14,18,27,0.85) 25%, rgba(0,0,0,0) 100%)',
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
						key={i}
						ref={el => (overlayRefs.current[i] = el)}
						style={{
							position: 'absolute',
							top: '58%',
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
								height: `${200 * s}px`,
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
										fontFamily: '"Inter Display",Inter,sans-serif',
										fontWeight: 900,
										fontSize: `${60 * s}px`,
										color: '#fff',
										height: `${380 * s}px`,
										transformOrigin: 'bottom center',
										transform: `rotate(${angle}deg)`,
										whiteSpace: 'pre',
										display: 'inline-block',
										textTransform: 'uppercase',
										letterSpacing: '-2px',
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
								height: `${80 * s}px`,
								display: 'flex',
								justifyContent: 'center',
								marginTop: `${-75 * s}px`,
							}}
						>
							{slide.hlChars.map(({ char, angle }, j) => (
								<span
									key={j}
									className='anim-char grain-text'
									data-rot={angle}
									style={{
										position: 'absolute',
										fontFamily: '"Inter Display",Inter,sans-serif',
										fontWeight: 900,
										fontSize: `${36 * s}px`,
										color: '#22d3ee',
										height: `${340 * s}px`,
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
								marginTop: `${160 * s}px`,
								fontFamily: '"Inter Display", Inter, sans-serif',
								fontWeight: 400,
								fontSize: '20px',
								lineHeight: '140%',
								letterSpacing: '0%',
								textAlign: 'center',
								color: 'rgba(225,227,234,1)',
								maxWidth: '28rem',
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
