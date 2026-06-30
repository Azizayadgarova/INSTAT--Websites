import { useState } from 'react'

const TEMPLATES = [
	{
		bg: 'linear-gradient(135deg, rgba(45,212,191,1) 0%, rgba(20,184,166,1) 100%)',
		icon: 'book',
		title: "Platformadagi eng so'nggi yangilanishlar, yangi kurslar va imkoniyatlarni birinchi bo'lib bilib oling.",
	},
	{
		bg: 'linear-gradient(135deg, rgba(40,46,62,1) 0%, rgba(24,28,38,1) 100%)',
		icon: 'person',
		title: "Ta'lim jarayonidagi yangiliklar va foydali imkoniyatlarni birinchi bo'lib oling.",
	},
	{
		bg: 'linear-gradient(135deg, rgba(30,41,59,1) 0%, rgba(15,23,42,1) 100%)',
		icon: 'monitor',
		title: "Kurslar, tadbirlar, tanlovlar va yangi loyihalar haqidagi dolzarb ma'lumotlar.",
	},
	{
		bg: 'linear-gradient(135deg, rgba(45,212,191,1) 0%, rgba(20,184,166,1) 100%)',
		icon: 'paper-plane',
		title: "Barcha muhim voqealar, yangilanishlar va e'lonlar bir sahifada.",
	},
	{
		bg: 'linear-gradient(135deg, rgba(250,204,21,1) 0%, rgba(234,179,8,1) 100%)',
		icon: 'event',
		title: 'Yangi bilimlar, yangi imkoniyatlar va yangi natijalar sari qadam.',
	},
	{
		bg: 'linear-gradient(135deg, rgba(40,46,62,1) 0%, rgba(24,28,38,1) 100%)',
		icon: 'group',
		title: 'Platformamizdagi eng qiziqarli yangiliklar va foydali yangilanishlar.',
	},
]

const ITEMS_PER_PAGE = 12
const TOTAL_PAGES = 16
const ALL_DATA = Array.from({ length: TOTAL_PAGES * ITEMS_PER_PAGE }, (_, i) => ({
	id: i,
	...TEMPLATES[i % TEMPLATES.length],
	date: '23.01.2026',
}))

const ThumbIcon = ({ type }) => {
	const common = { width: 40, height: 40, viewBox: '0 0 24 24', fill: 'none' }
	switch (type) {
		case 'book':
			return (
				<svg {...common}>
					<path d='M4 5a2 2 0 012-2h7v16H6a2 2 0 00-2 2V5z' stroke='rgba(255,255,255,0.85)' strokeWidth='1.6' strokeLinejoin='round' />
					<path d='M20 5a2 2 0 00-2-2h-7v16h7a2 2 0 012 2V5z' stroke='rgba(255,255,255,0.85)' strokeWidth='1.6' strokeLinejoin='round' />
				</svg>
			)
		case 'person':
			return (
				<svg {...common}>
					<circle cx='12' cy='8' r='4' stroke='rgba(255,255,255,0.85)' strokeWidth='1.6' />
					<path d='M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8' stroke='rgba(255,255,255,0.85)' strokeWidth='1.6' strokeLinecap='round' />
				</svg>
			)
		case 'monitor':
			return (
				<svg {...common}>
					<rect x='3' y='4' width='18' height='12' rx='2' stroke='rgba(255,255,255,0.85)' strokeWidth='1.6' />
					<path d='M8 20h8M12 16v4' stroke='rgba(255,255,255,0.85)' strokeWidth='1.6' strokeLinecap='round' />
				</svg>
			)
		case 'paper-plane':
			return (
				<svg {...common}>
					<path d='M21 3L3 10.5l7 2.5 2.5 7L21 3z' stroke='rgba(255,255,255,0.85)' strokeWidth='1.6' strokeLinejoin='round' />
				</svg>
			)
		case 'event':
			return (
				<svg {...common}>
					<rect x='3' y='5' width='18' height='16' rx='2' stroke='rgba(255,255,255,0.85)' strokeWidth='1.6' />
					<path d='M3 10h18M8 3v4M16 3v4' stroke='rgba(255,255,255,0.85)' strokeWidth='1.6' strokeLinecap='round' />
				</svg>
			)
		case 'group':
			return (
				<svg {...common}>
					<circle cx='9' cy='8' r='3' stroke='rgba(255,255,255,0.85)' strokeWidth='1.6' />
					<circle cx='17' cy='9' r='2.5' stroke='rgba(255,255,255,0.85)' strokeWidth='1.6' />
					<path d='M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 20c0-2.2-.8-4.1-2.1-5.4' stroke='rgba(255,255,255,0.85)' strokeWidth='1.6' strokeLinecap='round' />
				</svg>
			)
		default:
			return null
	}
}

const NewsCard = ({ item }) => (
	<div style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
		<div
			style={{
				width: '259px',
				height: '150px',
				borderRadius: '12px',
				background: item.bg,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				overflow: 'hidden',
				opacity: 1,
				transform: 'rotate(0deg)',
			}}
		>
			{item.icon === 'event' ? (
				<span
					style={{
						fontFamily: 'Inter Display, sans-serif',
						fontWeight: 700,
						fontSize: '13px',
						letterSpacing: '0.05em',
						color: 'rgba(120,53,15,1)',
						background: 'rgba(255,255,255,0.35)',
						padding: '6px 14px',
						borderRadius: '999px',
					}}
				>
					UPCOMING EVENTS
				</span>
			) : (
				<ThumbIcon type={item.icon} />
			)}
		</div>
		<span
			style={{
				fontFamily: 'Inter Display, sans-serif',
				fontWeight: 400,
				fontSize: '14px',
				lineHeight: '18px',
				letterSpacing: '-0.01em',
				color: 'rgba(255,255,255,1)',
				textAlign: 'right',
				marginTop: '8px',
			}}
		>
			{item.date}
		</span>
		<p
			style={{
				fontFamily: 'Inter Display, sans-serif',
				fontWeight: 500,
				fontSize: '18px',
				lineHeight: '24px',
				letterSpacing: '-0.01em',
				color: 'rgba(255,255,255,1)',
				margin: '8px 0 0',
				display: '-webkit-box',
				WebkitLineClamp: 2,
				WebkitBoxOrient: 'vertical',
				overflow: 'hidden',
			}}
		>
			{item.title}
		</p>
	</div>
)

const PagBtn = ({ children, onClick, active, nav }) => (
	<button
		onClick={onClick}
		style={{
			width: '36px',
			height: '36px',
			borderRadius: '8px',
			border: 'none',
			background: nav ? 'transparent' : active ? 'rgba(var(--blue-rgb),1)' : 'rgba(var(--card-rgb),1)',
			color: active ? '#fff' : 'rgba(150,160,180,1)',
			fontSize: '14px',
			fontWeight: active ? 600 : 400,
			cursor: 'pointer',
			fontFamily: 'Inter Display, sans-serif',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			transition: 'background 0.2s',
		}}
	>
		{children}
	</button>
)

const Pagination = ({ page, setPage, total }) => {
	const getPages = () => {
		if (page <= 5) return [1, 2, 3, 4, 5, '...', total]
		if (page >= total - 4) return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
		return [1, '...', page - 1, page, page + 1, '...', total]
	}

	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
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
							fontFamily: 'Inter Display, sans-serif',
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
		</div>
	)
}

const UmumiyMalumot = () => {
	const [page, setPage] = useState(1)

	const displayed = ALL_DATA.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

	return (
		<div style={{ width: '100%', padding: '59px 0 80px 0' }}>
			<div style={{ marginBottom: '24px', display: 'inline-flex' }}>
				<span
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: '8px',
						padding: '4px 16px',
						borderRadius: '8px',
						background: 'rgba(255, 255, 255, 0.04)',
						fontFamily: 'Inter Display, sans-serif',
						fontWeight: 600,
						fontSize: '16px',
						lineHeight: '28px',
						letterSpacing: '-0.02em',
						color: 'rgba(255, 255, 255, 1)',
					}}
				>
					Yangiliklar
				</span>
			</div>

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					columnGap: '16px',
					rowGap: '16px',
					marginBottom: '40px',
				}}
			>
				{displayed.map(item => (
					<NewsCard key={item.id} item={item} />
				))}
			</div>

			<Pagination page={page} setPage={setPage} total={TOTAL_PAGES} />
		</div>
	)
}

export default UmumiyMalumot
