import bgGlow from '@/assets/bgImg/Background (1).png'
import { useState } from 'react'
import briefcaseIcon from '../assets/icons/briefcase-2-line.png'
import AnimatedSection from './shared/AnimatedSection'
const CATEGORIES = [
	{ name: 'Frontend Dasturchi', count: "320 ta ish o'rinlari" },
	{ name: 'Ofis Menejeri', count: "190 ta ish o'rinlari" },
	{ name: 'Sotuv Menejeri', count: "340 ta ish o'rinlari" },
	{ name: 'Haydovchi', count: '410 ta ish' },
	{ name: 'Qurilish Muhandisi', count: "150 ta ish o'rinlari" },
	{ name: 'Hamshira', count: "130 ta ish o'rinlari" },
	{ name: "Ingliz tili o'qituvchisi", count: "170 ta ish o'rinlari" },
	{ name: 'Ofitsiant', count: "260 ta ish o'rinlari" },
	{ name: 'Tozalovchi', count: "120 ta ish o'rinlari" },
	{ name: 'Operator', count: "200 ta ish o'rinlari" },
	{ name: 'SMM Menejer', count: "275 ta ish o'rinlari" },
	{ name: 'UX/UI Dizayner', count: "210 ta ish o'rinlari" },
]

const TOTAL_PAGES = 16

function PagBtn({ children, onClick, active, nav }) {
	return (
		<button
			onClick={onClick}
			style={{
				width: '36px',
				height: '36px',
				borderRadius: '8px',
				border: 'none',
				background: nav
					? 'transparent'
					: active
						? 'rgba(var(--blue-rgb),1)'
						: 'rgba(var(--card-rgb),1)',
				color: active ? '#fff' : 'rgba(150,160,180,1)',
				fontSize: '14px',
				fontWeight: active ? 600 : 400,
				cursor: 'pointer',
				fontFamily: 'var(--font-display)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				transition: 'background 0.2s',
			}}
			onMouseEnter={e => {
				if (!active && !nav)
					e.currentTarget.style.background = 'rgba(var(--blue-rgb),0.25)'
			}}
			onMouseLeave={e => {
				if (!active && !nav)
					e.currentTarget.style.background = 'rgba(var(--card-rgb),1)'
			}}
		>
			{children}
		</button>
	)
}

function Pagination({ page, setPage, total }) {
	const getPages = () => {
		if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
		if (page <= 4) return [1, 2, 3, 4, 5, '...', total]
		if (page >= total - 3)
			return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
		return [1, '...', page - 1, page, page + 1, '...', total]
	}

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				width: '100%',
				maxWidth: '1200px',
			}}
		>
			<span
				style={{
					fontFamily: 'var(--font-display)',
					fontSize: '14px',
					color: 'rgba(100,110,130,1)',
					minWidth: '60px',
				}}
			>
				Sahifa
			</span>
			<div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
				<PagBtn nav onClick={() => setPage(1)}>«</PagBtn>
				<PagBtn nav onClick={() => setPage(p => Math.max(1, p - 1))}>‹</PagBtn>
				{getPages().map((p, i) =>
					p === '...' ? (
						<span
							key={`d${i}`}
							style={{
								width: '36px',
								height: '36px',
								display: 'inline-flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: 'rgba(100,110,130,1)',
								fontSize: '14px',
							}}
						>
							...
						</span>
					) : (
						<PagBtn key={p} active={p === page} onClick={() => setPage(p)}>
							{p}
						</PagBtn>
					),
				)}
				<PagBtn nav onClick={() => setPage(p => Math.min(total, p + 1))}>›</PagBtn>
				<PagBtn nav onClick={() => setPage(total)}>»</PagBtn>
			</div>
			<button
				onClick={() => setPage(total)}
				style={{
					fontFamily: 'var(--font-display)',
					fontSize: '14px',
					color: 'rgba(150,160,180,1)',
					background: 'none',
					border: 'none',
					cursor: 'pointer',
					display: 'flex',
					alignItems: 'center',
					gap: '4px',
					minWidth: '120px',
					justifyContent: 'flex-end',
					padding: 0,
				}}
			>
				Barchasini ko&apos;rish <span>›</span>
			</button>
		</div>
	)
}

export default function IshOrinlariKategoriyalar() {
	const [page, setPage] = useState(2)

	return (
		<section
			style={{
				position: 'relative',
				background: '#0E121B',
				padding: '40px 24px 80px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				overflow: 'hidden',
			}}
		>
			{/* Background glow */}
			<img
				src={bgGlow}
				alt=''
				aria-hidden='true'
				style={{
					position: 'absolute',
					top: 0,
					left: '50%',
					transform: 'translateX(-50%)',
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					objectPosition: 'center top',
					pointerEvents: 'none',
					zIndex: 0,
					opacity: 0.6,
				}}
			/>

			{/* Header */}
			<AnimatedSection style={{ position: 'relative', zIndex: 1, marginBottom: '48px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
					<span
						style={{
							display: 'inline-block',
							padding: '5px 15px',
							borderRadius: '100px',
							border: '1px solid rgba(255,255,255,0.1)',
							background: 'rgba(255,255,255,0.04)',
							color: 'rgba(var(--text-rgb),1)',
							fontSize: '13px',
							fontFamily: 'var(--font-display)',
						}}
					>
						Kategoriyalar
					</span>

					<h2
						style={{
							fontFamily: 'var(--font-display)',
							fontWeight: 700,
							fontSize: 'clamp(28px, 3.5vw, 48px)',
							lineHeight: 1.1,
							letterSpacing: '-.02em',
							color: '#fff',
							margin: 0,
						}}
					>
						Siz uchun mos kategoriyani tanlang
					</h2>

					<p
						style={{
							fontFamily: 'var(--font-display)',
							fontWeight: 400,
							fontSize: '16px',
							lineHeight: 1.65,
							color: 'rgba(var(--muted-rgb),1)',
							maxWidth: '480px',
							margin: 0,
						}}
					>
						Eng talab yuqori bo&apos;lgan kategoriyalar orasidan o&apos;zingizga
						mos ishni toping va faoliyatingizni rivojlantiring
					</p>
				</div>
			</AnimatedSection>

			{/* Grid */}
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(4, 276px)',
					gap: '16px',
					marginBottom: '40px',
				}}
			>
				{CATEGORIES.map((cat, i) => (
					<div
						key={i}
						style={{
							width: 276,
							height: 188,
							background: 'rgba(var(--card-rgb),1)',
							borderRadius: 12,
							padding: 24,
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							gap: 32,
							cursor: 'pointer',
							transition: 'background .18s',
						}}
						onMouseEnter={e => {
							e.currentTarget.style.background = 'rgba(30,37,52,1)'
						}}
						onMouseLeave={e => {
							e.currentTarget.style.background = 'rgba(var(--card-rgb),1)'
						}}
					>
						{/* Icon */}
						<img
							src={briefcaseIcon}
							alt=''
							style={{ width: 40, height: 40, objectFit: 'contain' }}
						/>

						{/* Text group */}
						<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
							<span
								style={{
									fontFamily: 'var(--font-display)',
									fontWeight: 500,
									fontSize: 24,
									lineHeight: '24px',
									color: 'rgba(255,255,255,1)',
									display: 'block',
									whiteSpace: 'nowrap',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
								}}
							>
								{cat.name}
							</span>

							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									marginTop: '12px',
								}}
							>
								<span
									style={{
										fontFamily: 'var(--font-display)',
										fontWeight: 400,
										fontSize: 20,
										lineHeight: '28px',
										color: 'rgba(var(--muted-rgb),1)',
									}}
								>
									{cat.count}
								</span>

								<div
									style={{
										width: 28,
										height: 28,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										color: 'rgba(255,255,255,0.7)',
										fontSize: 18,
										fontWeight: 'bold',

										flexShrink: 0,
									}}
								>
									→
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Pagination */}
			<Pagination page={page} setPage={setPage} total={TOTAL_PAGES} />
		</section>
	)
}
