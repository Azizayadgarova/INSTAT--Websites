import { useState } from 'react'
import { Button } from '../../components/shared/Button'
import heroImg from '@/assets/f516843fe3b59d12e4f470312ad04916ab60c75f.jpg'

const STATS = [
	{ value: '200 M+',  label: 'Platformadagi faolik' },
	{ value: '45 000+', label: "O'quvchilar soni" },
	{ value: '120+',    label: 'Mavjud kurslar' },
	{ value: '8 500+',  label: 'Muvaffaqiyatli bitiruvchilar' },
]

const CIRCLE_SIZES = [1130, 850, 570, 300]
const GRAD_ID = 'cg1'

// Orqa fon doiralari — tepadan 40px gap
function CirclesBg() {
	const svgSize = 1200
	const cx = svgSize / 2
	const cy = svgSize / 2

	return (
		<svg
			width={svgSize}
			height={svgSize}
			style={{
				position: 'absolute',
				// outer circle edge = cy - r = 600 - 565 = 35px from SVG top
				// We want circle top to be 40px from section top → SVG top = 40 - 35 = 5px
				top: '5px',
				left: '50%',
				transform: 'translateX(-50%)',
				pointerEvents: 'none',
				zIndex: 0,
			}}
		>
			<defs>
				<linearGradient id={GRAD_ID} x1='0' y1='0' x2='0' y2='1'>
					<stop offset='-17.26%' stopColor='#050315' />
					<stop offset='19.39%'  stopColor='#2B75CC' />
					<stop offset='54.93%'  stopColor='#050315' />
				</linearGradient>
			</defs>
			{CIRCLE_SIZES.map(size => (
				<circle
					key={size}
					cx={cx}
					cy={cy}
					r={size / 2}
					stroke={`url(#${GRAD_ID})`}
					strokeWidth='1'
					fill='none'
				/>
			))}
		</svg>
	)
}

// Matn orqasidagi glow
function TextGlow() {
	return (
		<div
			style={{
				position: 'absolute',
				top: '40px',
				left: '50%',
				transform: 'translateX(-50%)',
				width: '700px',
				height: '400px',
				background: 'radial-gradient(ellipse at 50% 20%, rgba(43,117,204,0.45) 0%, rgba(43,117,204,0.15) 40%, transparent 70%)',
				filter: 'blur(24px)',
				pointerEvents: 'none',
				zIndex: 0,
			}}
		/>
	)
}

function HeroImage() {
	const [hovered, setHovered] = useState(false)

	return (
		<div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', borderRadius: '16px', overflow: 'hidden' }}>
			<img
				src={heroImg}
				alt="Onlayn ta'lim"
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				style={{
					width: '100%',
					height: '596px',
					objectFit: 'cover',
					display: 'block',
					filter: hovered ? 'grayscale(0%)' : 'grayscale(100%)',
					transition: 'filter 0.5s ease',
					cursor: 'none',
				}}
			/>
		</div>
	)
}

export default function OnlaynTalim() {
	return (
		<div style={{ fontFamily: 'Inter, sans-serif', color: '#fff' }}>

			{/* Hero */}
			<section
				style={{
					position: 'relative',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					textAlign: 'center',
					padding: '80px 120px 0',
					gap: '24px',
					overflow: 'hidden',
				}}
			>
				<CirclesBg />
				<TextGlow />

				{/* Text */}
				<div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
					<Button text="Onlayn ta'lim" />

					<h1
						style={{
							fontFamily: 'Inter, sans-serif',
							fontWeight: 600,
							fontSize: '64px',
							lineHeight: '110%',
							letterSpacing: '-2px',
							color: '#fff',
							maxWidth: '800px',
							margin: 0,
						}}
					>
						Bilim va ko'nikmalarni
						<br />
						<span style={{ color: '#00E6FC' }}>tizimli rivojlantirish</span>
					</h1>

					<p style={{ color: 'rgba(188,188,188,1)', fontSize: '18px', lineHeight: '1.6', maxWidth: '600px', margin: 0 }}>
						Zamonaviy ta'lim metodlari asosida ishlab chiqilgan kurslar orqali
						bilimlaringizni chuqurlashtiring.
					</p>
				</div>

				{/* Image */}
				<div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
					<HeroImage />
				</div>
			</section>

			{/* Stats bar */}
			<div
				style={{
					display: 'flex',
					width: '100%',
					borderTop: '1px solid rgba(0,230,252,0.15)',
					borderBottom: '1px solid rgba(0,230,252,0.4)',
				}}
			>
				{STATS.map((stat, i) => (
					<div
						key={stat.value}
						style={{
							flex: 1,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							padding: '28px 32px',
							gap: '10px',
							borderLeft: i > 0
								? '1px solid rgba(255,255,255,0.08)'
								: 'none',
							position: 'relative',
						}}
					>
						{/* Cyan tick at top of divider */}
						{i > 0 && (
							<span
								style={{
									position: 'absolute',
									top: 0,
									left: '-1px',
									width: '1px',
									height: '32px',
									background: 'linear-gradient(180deg, #00E6FC 0%, rgba(0,230,252,0) 100%)',
								}}
							/>
						)}

						<span
							style={{
								fontSize: '52px',
								fontWeight: 700,
								color: '#fff',
								lineHeight: 1,
								letterSpacing: '-1px',
							}}
						>
							{stat.value}
						</span>
						<span style={{ fontSize: '14px', color: 'rgba(188,188,188,1)', fontWeight: 400 }}>
							{stat.label}
						</span>
					</div>
				))}
			</div>

		</div>
	)
}
