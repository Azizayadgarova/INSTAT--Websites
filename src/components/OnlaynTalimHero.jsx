import heroImg from '@/assets/Image (2).webp'

const stats = [
	{ value: '200 M+', label: 'Platformadagi faollik' },
	{ value: '45 000+', label: "O'quvchilar soni" },
	{ value: '120+', label: 'Mavjud kurslar' },
	{ value: '8 500+', label: 'Muvaffaqiyatli bitiruvchilar' },
]

export default function OnlaynTalimHero() {
	return (
		<section
			style={{
				width: '100%',
				background: 'rgba(14,18,27,1)',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: '60px 24px 0',
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			{/* Badge */}
			<span
				style={{
					display: 'inline-flex',
					alignItems: 'center',
					padding: '4px 16px',
					borderRadius: '8px',
					background: 'rgba(255,255,255,0.06)',
					fontFamily: 'var(--font-display)',
					fontWeight: 500,
					fontSize: '14px',
					color: 'rgba(255,255,255,0.7)',
					marginBottom: '24px',
					letterSpacing: '-0.01em',
				}}
			>
				Onlayn ta'lim
			</span>

			{/* Title */}
			<h1
				style={{
					fontFamily: 'var(--font-display)',
					fontWeight: 700,
					fontSize: 'clamp(32px, 5vw, 64px)',
					lineHeight: 1.1,
					letterSpacing: '-0.03em',
					textAlign: 'center',
					color: '#fff',
					margin: 0,
					marginBottom: '20px',
				}}
			>
				Bilim va ko'nikmalarni
				<br />
				<span style={{ color: 'rgba(0,230,252,1)' }}>tizimli rivojlantirish</span>
			</h1>

			{/* Subtitle */}
			<p
				style={{
					fontFamily: 'var(--font-display)',
					fontWeight: 400,
					fontSize: '16px',
					lineHeight: 1.7,
					color: 'rgba(202,202,206,1)',
					textAlign: 'center',
					maxWidth: '520px',
					margin: 0,
					marginBottom: '48px',
				}}
			>
				Zamonaviy ta'lim metodlari asosida ishlab chiqilgan kurslar orqali
				bilimlaringizni chuqurlashtiring.
			</p>

			{/* Hero image */}
			<div
				style={{
					width: '100%',
					maxWidth: '900px',
					borderRadius: '24px 24px 0 0',
					overflow: 'hidden',
					position: 'relative',
				}}
			>
				<img
					src={heroImg}
					alt="Onlayn ta'lim"
					style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
					loading='eager'
					decoding='async'
				/>
				{/* bottom fade */}
				<div
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: 0,
						height: '120px',
						background: 'linear-gradient(to bottom, transparent, rgba(14,18,27,1))',
					}}
				/>
			</div>

			{/* Stats */}
			<div
				style={{
					width: '100%',
					maxWidth: '900px',
					display: 'flex',
					justifyContent: 'space-around',
					flexWrap: 'wrap',
					gap: '24px',
					padding: '32px 24px',
					background: 'rgba(14,18,27,1)',
				}}
			>
				{stats.map(({ value, label }) => (
					<div key={label} style={{ textAlign: 'center' }}>
						<p
							style={{
								fontFamily: 'var(--font-display)',
								fontWeight: 700,
								fontSize: 'clamp(24px, 3vw, 36px)',
								color: '#fff',
								margin: 0,
								lineHeight: 1.1,
							}}
						>
							{value}
						</p>
						<p
							style={{
								fontFamily: 'var(--font-display)',
								fontWeight: 400,
								fontSize: '14px',
								color: 'rgba(153,160,174,1)',
								margin: '6px 0 0',
							}}
						>
							{label}
						</p>
					</div>
				))}
			</div>
		</section>
	)
}
