import bgGlow from '@/assets/bgImg/Background (1).png'
import { useState } from 'react'
import { Button2 } from './shared/Button2'
import AnimatedSection from './shared/AnimatedSection'

const ALL_DATA = [
	{
		title: "Aholi soni va demografik o'sish",
		category: 'Demografiya',
		location: "O'zbekiston, hududlar kesimida",
		years: '2000 — 2024',
		published: '2025 yil mart',
	},
	{
		title: "Tug'ilish va o'lim statistikasi",
		category: 'Demografiya',
		location: "O'zbekiston",
		years: '2005 — 2024',
		published: '2025 yil fevral',
	},
	{
		title: "YaIM va iqtisodiy o'sish ko'rsatkichlari",
		category: 'Iqtisodiyot',
		location: "O'zbekiston",
		years: '2005 — 2024',
		published: '2025 yil fevral',
	},
	{
		title: 'Bandlik va ishsizlik darajasi',
		category: 'Mehnat bozori',
		location: "O'zbekiston, hududlar kesimida",
		years: '2010 — 2024',
		published: '2025 yil fevral',
	},
	{
		title: "Inflyatsiya va iste'mol narxlari indeksi",
		category: 'Iqtisodiyot',
		location: "O'zbekiston, hududlar kesimida",
		years: '2010 — 2024',
		published: '2025 yil yanvar',
	},
	{
		title: "O'rtacha ish haqi statistikasi",
		category: 'Mehnat bozori',
		location: "O'zbekiston, viloyatlar kesimida",
		years: '2012 — 2024',
		published: '2025 yil mart',
	},
	{
		title: 'Transport vositalari soni',
		category: 'Transport',
		location: "O'zbekiston",
		years: '2008 — 2024',
		published: '2025 yil fevral',
	},
	{
		title: "Yo'lovchi va yuk tashish statistikasi",
		category: 'Transport',
		location: "O'zbekiston, hududlar kesimida",
		years: '2010 — 2024',
		published: '2025 yil mart',
	},
	{
		title: "Qishloq xo'jaligi mahsulotlari hajmi",
		category: "Qishloq xo'j",
		location: "O'zbekiston, viloyatlar kesimida",
		years: '2003 — 2024',
		published: '2025 yil fevral',
	},
	{
		title: 'Eksport va import dinamikasi',
		category: 'Tashqi savdo',
		location: "O'zbekiston",
		years: '2000 — 2024',
		published: '2025 yil mart',
	},
	{
		title: 'Davlat byudjeti daromad va xarajatlari',
		category: 'Moliya',
		location: "O'zbekiston",
		years: '2005 — 2024',
		published: '2025 yil yanvar',
	},
	{
		title: 'Sanoat ishlab chiqarish indeksi',
		category: 'Sanoat',
		location: "O'zbekiston, hududlar kesimida",
		years: '2007 — 2024',
		published: '2025 yil fevral',
	},
	{
		title: "Ta'lim muassasalari va o'quvchilar soni",
		category: "Ta'lim",
		location: "O'zbekiston, viloyatlar kesimida",
		years: '2000 — 2024',
		published: '2025 yil mart',
	},
	{
		title: 'Aholining real daromadlari',
		category: 'Iqtisodiyot',
		location: "O'zbekiston, hududlar kesimida",
		years: '2010 — 2024',
		published: '2025 yil fevral',
	},
	{
		title: "Kichik va o'rta biznes statistikasi",
		category: 'Tadbirkorlik',
		location: "O'zbekiston",
		years: '2015 — 2024',
		published: '2025 yil yanvar',
	},
	{
		title: 'Turizm va mehmonxona statistikasi',
		category: 'Turizm',
		location: "O'zbekiston, viloyatlar kesimida",
		years: '2018 — 2024',
		published: '2025 yil mart',
	},
]

const ITEMS_PER_PAGE = 8

function IconPin() {
	return (
		<svg
			width='20'
			height='20'
			viewBox='0 0 24 24'
			fill='none'
			style={{ flexShrink: 0 }}
		>
			<path
				d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z'
				stroke='white'
				strokeWidth='1.8'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<circle cx='12' cy='9' r='2.5' stroke='white' strokeWidth='1.8' />
		</svg>
	)
}

function IconClock() {
	return (
		<svg
			width='20'
			height='20'
			viewBox='0 0 24 24'
			fill='none'
			style={{ flexShrink: 0 }}
		>
			<circle cx='12' cy='12' r='9' stroke='white' strokeWidth='1.8' />
			<path
				d='M12 7v5l3 3'
				stroke='white'
				strokeWidth='1.8'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

function IconEdit() {
	return (
		<svg
			width='20'
			height='20'
			viewBox='0 0 24 24'
			fill='none'
			style={{ flexShrink: 0 }}
		>
			<path
				d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5'
				stroke='white'
				strokeWidth='1.8'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M17.5 2.5a2.121 2.121 0 013 3L12 14l-4 1 1-4 8.5-8.5z'
				stroke='white'
				strokeWidth='1.8'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

function DataCard({ item }) {
	const [hov, setHov] = useState(false)

	return (
		<div
			onMouseEnter={() => setHov(true)}
			onMouseLeave={() => setHov(false)}
			style={{
				background: hov ? 'rgba(30,36,50,1)' : 'rgba(22,27,38,1)',
				border: `1px solid ${hov ? 'rgba(43,117,204,0.35)' : 'rgba(31,37,51,1)'}`,
				borderRadius: '20px',
				padding: '18px 20px',
				cursor: 'pointer',
				display: 'flex',
				flexDirection: 'column',
				gap: '8px',
				width: '282px',
				minHeight: '198px',
				height: '100%',
				boxSizing: 'border-box',
				transition:
					'background 0.22s, border-color 0.22s, transform 0.22s, box-shadow 0.22s',
				transform: hov ? 'translateY(-3px)' : 'none',
				boxShadow: hov
					? '0 12px 40px rgba(0,0,0,0.4)'
					: '0px 1px 5px 0px rgba(29,36,45,0.2)',
			}}
		>
			<div style={{ height: '82px', overflow: 'hidden' }}>
				<h3
					style={{
						fontFamily: '"Inter Display",Inter,sans-serif',
						fontWeight: 500,
						fontSize: '20px',
						lineHeight: 1.35,
						color: '#FFFFFF',
						margin: '0 0 6px',
						minHeight: '54px',
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
					}}
				>
					{item.title}
				</h3>
				<span
					style={{
						fontFamily: '"Inter Display",Inter,sans-serif',
						fontSize: '16px',
						fontWeight: 400,
						color: 'rgba(188,188,188,1)',
					}}
				>
					{item.category}
				</span>
			</div>

			<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
				<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
					<IconPin />
					<span
						style={{
							fontFamily: '"Inter Display",Inter,sans-serif',
							fontSize: '14px',
							color: 'rgba(255,255,255,1)',
						}}
					>
						{item.location}
					</span>
				</div>
				<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
					<IconClock />
					<span
						style={{
							fontFamily: '"Inter Display",Inter,sans-serif',
							fontSize: '14px',
							color: 'rgba(255,255,255,1)',
						}}
					>
						{item.years}
					</span>
				</div>
				<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
					<IconEdit />
					<span
						style={{
							fontFamily: '"Inter Display",Inter,sans-serif',
							fontSize: '14px',
							color: 'rgba(255,255,255,1)',
						}}
					>
						{item.published}
					</span>
				</div>
			</div>
		</div>
	)
}

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
						? 'rgba(43,117,204,1)'
						: 'rgba(22,27,38,1)',
				color: active ? '#fff' : 'rgba(150,160,180,1)',
				fontSize: '14px',
				fontWeight: active ? 600 : 400,
				cursor: 'pointer',
				fontFamily: '"Inter Display",Inter,sans-serif',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				transition: 'background 0.2s',
			}}
			onMouseEnter={e => {
				if (!active && !nav)
					e.currentTarget.style.background = 'rgba(43,117,204,0.25)'
			}}
			onMouseLeave={e => {
				if (!active && !nav)
					e.currentTarget.style.background = 'rgba(22,27,38,1)'
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
					fontFamily: '"Inter Display",Inter,sans-serif',
					fontSize: '14px',
					color: 'rgba(100,110,130,1)',
					minWidth: '60px',
				}}
			>
				Sahifa
			</span>
			<div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
				<PagBtn nav onClick={() => setPage(1)}>
					«
				</PagBtn>
				<PagBtn nav onClick={() => setPage(p => Math.max(1, p - 1))}>
					‹
				</PagBtn>
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
				<PagBtn nav onClick={() => setPage(p => Math.min(total, p + 1))}>
					›
				</PagBtn>
				<PagBtn nav onClick={() => setPage(total)}>
					»
				</PagBtn>
			</div>
			<button
				onClick={() => setPage(total)}
				style={{
					fontFamily: '"Inter Display",Inter,sans-serif',
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
				Barchasini ko'rish <span>›</span>
			</button>
		</div>
	)
}

export default function NufuzliNashrlar() {
	const [page, setPage] = useState(1)

	const totalPages = Math.ceil(ALL_DATA.length / ITEMS_PER_PAGE)
	const displayed = ALL_DATA.slice(
		(page - 1) * ITEMS_PER_PAGE,
		page * ITEMS_PER_PAGE,
	)

	return (
		<section
			style={{
				position: 'relative',
				background: 'rgba(10,15,26,1)',
				padding: '40px 120px 100px',
				width: '100%',
				boxSizing: 'border-box',
				overflow: 'hidden',
			}}
		>
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

			<div
				style={{
					maxWidth: '1200px',
					margin: '0 auto',
					position: 'relative',
					zIndex: 1,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				{/* Header */}
				<AnimatedSection style={{ marginBottom: '52px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
						<Button2 text='Jurnallar' />

						<h2
							style={{
								fontFamily: '"Inter Display",Inter,sans-serif',
								fontWeight: 600,
								fontSize: 'clamp(28px,4vw,48px)',
								color: '#fff',
								margin: 0,
								letterSpacing: '-0.02em',
							}}
						>
							Nufuzli jurnallar va so&apos;nggi nashrlar
						</h2>

						<p
							style={{
								fontFamily: 'Inter,sans-serif',
								fontSize: '15px',
								lineHeight: 1.65,
								color: 'rgba(155,163,185,1)',
								maxWidth: '480px',
								margin: 0,
							}}
						>
							Platformada chop etilayotgan yetakchi ilmiy jurnallar hamda ularning
							eng yangi sonlari bilan tanishing.
						</p>
					</div>
				</AnimatedSection>

				{/* Grid */}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(4, 282px)',
						gap: '20px',
						width: '100%',
						marginBottom: '48px',
					}}
				>
					{displayed.map((item, i) => (
						<DataCard key={i} item={item} />
					))}
				</div>

				{/* Pagination */}
				<Pagination page={page} setPage={setPage} total={totalPages} />
			</div>
		</section>
	)
}
