import { useMemo } from 'react'
import { slides } from './slides'
import { useThreeSlider } from './useThreeSlider'

export default function LiquideSlider() {
	const s = useMemo(
		() => Math.min(window.innerWidth / 1200, window.innerHeight / 1000),
		[],
	)
	const { canvasRef, counterRef, overlayRefs } = useThreeSlider(s)

	return (
		<section
			style={{
				position: 'relative',
				width: '100%',
				height: '100vh',
				overflow: 'hidden',
				background: '#000',
			}}
		>
			<canvas
				ref={canvasRef}
				style={{ position: 'absolute', top: 0, left: 0 }}
			/>

			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '35vh',
					background:
						'linear-gradient(to bottom, rgba(14,18,27,1) 0%, rgba(0,0,0,0) 100%)',
					zIndex: 2,
					pointerEvents: 'none',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					width: '100%',
					height: '40vh',
					background:
						'linear-gradient(to top, rgba(14,18,27,1)  0%, rgba(0,0,0,0) 100%)',
					zIndex: 2,
					pointerEvents: 'none',
				}}
			/>

			<div
				style={{
					position: 'absolute',
					top: '50%',
					width: '100%',
					padding: '0 3rem',
					display: 'flex',
					justifyContent: 'flex-end',
					color: '#fff',
					zIndex: 10,
					pointerEvents: 'none',
					transform: 'translateY(-50%)',
					fontFamily: 'sans-serif',
					fontWeight: 600,
				}}
			>
				<p ref={counterRef} style={{ fontSize: '14px', opacity: 0.4 }} />
			</div>

			<div
				style={{
					position: 'absolute',
					inset: 0,
					pointerEvents: 'none',
					zIndex: 5,
				}}
			>
				{slides.map((slide, i) => (
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
							{slide.title.split('').map((char, j) => {
								const angle =
									(j - (slide.title.length - 1) / 2) *
									(90 / (slide.title.length / 2))
								return (
									<span
										key={j}
										className='anim-char'
										data-rot={angle}
										style={{
											position: 'absolute',
											fontWeight: 900,
											fontSize: `${60 * s}px`,
											color: '#fff',
											height: `${380 * s}px`,
											transformOrigin: 'bottom center',
											transform: `rotate(${angle}deg)`,
											whiteSpace: 'pre',
											display: 'inline-block',
											transition: 'transform 0.1s ease-out',
											letterSpacing: '-2px',
										}}
									>
										{char}
									</span>
								)
							})}
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
							{slide.highlight.split('').map((char, j) => {
								const angle =
									(j - (slide.highlight.length - 1) / 2) *
									(20 / (slide.highlight.length / 5))
								return (
									<span
										key={j}
										className='anim-char'
										data-rot={angle}
										style={{
											position: 'absolute',
											fontWeight: 900,
											fontStyle: 'italic',
											fontSize: `${36 * s}px`,
											color: '#22d3ee',
											height: `${340 * s}px`,
											transformOrigin: 'bottom center',
											transform: `rotate(${angle}deg)`,
											whiteSpace: 'pre',
											display: 'inline-block',
											transition: 'transform 0.1s ease-out',
										}}
									>
										{char}
									</span>
								)
							})}
						</div>

						<p
							style={{
								marginTop: `${160 * s}px`,
								textAlign: 'center',
								color: 'rgba(225,227,234,1)',
								fontSize: `${20 * s}px`,
								maxWidth: '28rem',
								padding: '0 20px',
								lineHeight: 1.5,
								opacity: 0.7,
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
