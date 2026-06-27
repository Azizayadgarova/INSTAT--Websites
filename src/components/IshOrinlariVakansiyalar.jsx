import { useState } from 'react'
import bgGlow from '@/assets/bgImg/Background (1).png'
import mapPin from '@/assets/icons/map-pin-line.png'
import { Button2 } from './shared/Button2'
import AnimatedSection from './shared/AnimatedSection'

const JOBS = [
	{
		title: 'Frontend Dasturchi',
		city: 'Toshkent',
		desc: "Zamonaviy web ilovalarni ishlab chiqish, foydalanuvchi interfeysini yaratish. React yoki Vue bilan ishlash tajribasi talab qilinadi.",
		price: '$ 700-1200',
	},
	{
		title: 'UX/UI Dizayner',
		city: 'Toshkent',
		desc: "Mobil va web ilovalar uchun qulay va zamonaviy dizaynlar yaratish. Figma va Adobe vositalarini yaxshi bilish zarur.",
		price: '$ 500-800',
	},
	{
		title: 'SMM Menejer',
		city: 'Samarqand',
		desc: "Ijtimoiy tarmoqlarni yuritish, kontent reja tuzish va reklama kampaniyalarini boshqarish. Kreativ fikrlash muhim.",
		price: '$ 450-600',
	},
	{
		title: 'Haydovchi',
		city: 'Toshkent viloyati',
		desc: "Yuklarni o'z vaqtida yetkazib berish, transport vositasini nazorat qilish va xavfsizlik qoidalariga amal qilish talab etiladi.",
		price: '$ 400-500',
	},
	{
		title: 'Hamshira',
		city: 'Toshkent',
		desc: "Bemorlarga tibbiy yordam ko'rsatish, shifokor ko'rsatmalarini bajarish va hujjatlarni yuritish.",
		price: '$ 500',
	},
	{
		title: 'Qurilish muhandisi',
		city: 'Buxoro',
		desc: "Qurilish loyihalarini nazorat qilish, chizmalar bilan ishlash va jarayonlarni boshqarish.",
		price: '$ 900-1100',
	},
]

const TOTAL_PAGES = 16

function LocationIcon() {
	return (
		<img
			src={mapPin}
			alt=''
			aria-hidden='true'
			width={24}
			height={24}
			style={{ opacity: 1, flexShrink: 0, display: 'block' }}
		/>
	)
}

function JobCard({ job }) {
	return (
		<div
			style={{
				background: 'rgba(22,27,38,1)',
				border: '1px solid rgba(31,37,51,1)',
				borderRadius: '24px',
				padding: '24px',
				display: 'flex',
				flexDirection: 'column',
				gap: '24px',
			}}
		>
			<h3
				style={{
					fontFamily: '"Inter Display",Inter,sans-serif',
					fontWeight: 700,
					fontSize: '24px',
					lineHeight: '32px',
					letterSpacing: '0%',
					color: 'rgba(255,255,255,1)',
					margin: 0,
				}}
			>
				{job.title}
			</h3>

			<div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
				<LocationIcon />
				<span
					style={{
						fontFamily: '"Inter Display",Inter,sans-serif',
						fontWeight: 400,
						fontSize: '16px',
						lineHeight: '24px',
						color: 'rgba(90,98,117,1)',
					}}
				>
					{job.city}
				</span>
			</div>

			<p
				style={{
					fontFamily: '"Inter Display",Inter,sans-serif',
					fontWeight: 400,
					fontSize: '16px',
					lineHeight: '24px',
					color: 'rgba(138,145,163,1)',
					margin: 0,
					flex: 1,
				}}
			>
				{job.desc}
			</p>

			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginTop: '4px',
					gap: '8px',
				}}
			>
				<span
					style={{
						fontFamily: '"Inter Display",Inter,sans-serif',
						fontWeight: 700,
						fontSize: '24px',
						lineHeight: '32px',
						color: 'rgba(225,227,230,1)',
					}}
				>
					{job.price}
				</span>
				<span
					style={{
						fontFamily: '"Inter Display",Inter,sans-serif',
						fontWeight: 400,
						fontSize: '16px',
						lineHeight: '24px',
						color: 'rgba(255,255,255,1)',
					}}
				>
					/oy
				</span>
			</div>

			<button
				style={{
					width: '100%',
					height: '44px',
					borderRadius: '10px',
					border: '1px solid rgba(43,117,204,0.4)',
					background: 'rgba(43,117,204,1)',
					color: '#fff',
					fontSize: '16px',
					fontWeight: 400,
					fontFamily: '"Inter Display",Inter,sans-serif',
					cursor: 'pointer',
					transition: 'filter .2s',
					padding: '0 12px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: '4px',
				}}
				onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.12)' }}
				onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)' }}
			>
				Ariza yuborish
			</button>
		</div>
	)
}

function PagBtn({ children, onClick, active, nav }) {
	const base = nav
		? 'transparent'
		: active
			? 'rgba(43,117,204,1)'
			: 'rgba(22,27,38,1)'
	return (
		<button
			onClick={onClick}
			style={{
				width: '36px',
				height: '36px',
				borderRadius: '8px',
				border: 'none',
				background: base,
				color: active ? '#fff' : 'rgba(150,160,180,1)',
				fontSize: '14px',
				fontWeight: active ? 600 : 400,
				cursor: 'pointer',
				fontFamily: '"Inter Display",Inter,sans-serif',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				transition: 'background .2s',
			}}
		>
			{children}
		</button>
	)
}

function Pagination({ page, setPage, total }) {
	const getPages = () => {
		if (page <= 5) return [1, 2, 3, 4, 5, '...', total]
		if (page >= total - 4)
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
			<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
								fontFamily: '"Inter Display",Inter,sans-serif',
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
					fontFamily: '"Inter Display",Inter,sans-serif',
					fontSize: '14px',
					color: 'rgba(150,160,180,1)',
					background: 'none',
					border: 'none',
					cursor: 'pointer',
					display: 'flex',
					alignItems: 'center',
					gap: '4px',
					minWidth: '60px',
					justifyContent: 'flex-end',
					padding: 0,
				}}
			>
				Barchasini ko'rish <span>›</span>
			</button>
		</div>
	)
}

const IshOrinlariVakansiyalar = () => {
	const [page, setPage] = useState(2)

	return (
		<section
			style={{
				width: '100%',
				maxWidth: '1440px',
				margin: '0 auto',
				background: 'rgba(14,18,27,1)',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: '40px 24px 40px',
				position: 'relative',
				boxSizing: 'border-box',
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
					zIndex: 0,
					pointerEvents: 'none',
				}}
			/>

			<AnimatedSection style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '48px' }}>
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
					<Button2 text='Vakansiyalar' />

					<h2
						style={{
							fontFamily: '"Inter Display",Inter,sans-serif',
							fontWeight: 600,
							fontSize: 'clamp(28px,4vw,48px)',
							lineHeight: 1.1,
							color: '#fff',
							margin: 0,
							letterSpacing: '-0.02em',
						}}
					>
						Karyerangiz uchun eng yaxshi tanlov
					</h2>

					<p
						style={{
							fontFamily: '"Inter Display",Inter,sans-serif',
							fontWeight: 400,
							fontSize: '16px',
							lineHeight: '140%',
							color: 'rgba(202,202,206,1)',
							maxWidth: '620px',
							margin: 0,
						}}
					>
						Eng saralangan vakansiyalarni bir joyda toping. Platformamiz orqali
						mos ishni aniqlang, tezkor murojaat yuboring va karyerangizni
						keyingi bosqichga olib chiqing.
					</p>
				</div>
			</AnimatedSection>

			<div
				style={{
					width: '100%',
					maxWidth: '1200px',
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					gap: '24px',
					marginBottom: '48px',
				}}
			>
				{JOBS.map((job, i) => (
					<JobCard key={i} job={job} />
				))}
			</div>

			<div style={{ width: '100%', maxWidth: '1200px' }}>
				<Pagination page={page} setPage={setPage} total={TOTAL_PAGES} />
			</div>
		</section>
	)
}

export default IshOrinlariVakansiyalar
