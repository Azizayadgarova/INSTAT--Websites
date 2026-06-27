import img1 from '@/assets/2.png'
import img2 from '@/assets/3.png'
import img3 from '@/assets/4.png'
import img4 from '@/assets/5.png'
import img5 from '@/assets/6.png'
import bgGlow from '@/assets/bgImg/Background (1).png'
import { memo, useEffect, useState } from 'react'
import FAQSection from './FAQSection'
import Testimonial from './Testimonial'
import BlurWords from './shared/BlurWords'
import { Button } from './shared/Button'
import { Button2 } from './shared/Button2'

// ─── Data ─────────────────────────────────────────────────────────────────────

const DATASETS = [
	{ img: img1, title: "Aholini ro'yxatga olish ma'lumotlari",      year: '2023 yil', category: 'Demografiya',        format: 'CSV, XLSX' },
	{ img: img2, title: "Mehnat bozori mikro ma'lumotlari",           year: '2022 yil', category: 'Mehnat',             format: 'CSV, SPSS' },
	{ img: img3, title: "Kichik va o'rta biznes registri",            year: '2023 yil', category: 'Tadbirkorlik',       format: 'XLSX, JSON' },
	{ img: img4, title: "Qishloq xo'jaligi ro'yxati",                year: '2021 yil', category: "Qishloq xo'jaligi", format: 'CSV, XLSX' },
	{ img: img5, title: "Ta'lim statistikasi to'plami",              year: '2023 yil', category: "Ta'lim",             format: 'CSV, SPSS' },
	{ img: img1, title: 'Sog\'liqni saqlash indikatorlari',          year: '2022 yil', category: 'Sog\'liq',           format: 'CSV, XLSX' },
	{ img: img2, title: 'Uy xo\'jaliklari so\'rovi natijalari',      year: '2023 yil', category: 'Ijtimoiy',           format: 'CSV, SPSS' },
	{ img: img3, title: 'Sanoat korxonalari ma\'lumotlari',          year: '2022 yil', category: 'Sanoat',             format: 'XLSX, JSON' },
	{ img: img4, title: 'Narxlar monitoringi to\'plami',             year: '2023 yil', category: 'Iqtisodiyot',        format: 'CSV, XLSX' },
	{ img: img5, title: 'Tashqi savdo statistikasi',                 year: '2022 yil', category: 'Savdo',              format: 'CSV, JSON' },
	{ img: img1, title: 'Uy joyi va kommunal xizmatlar',             year: '2021 yil', category: 'Ijtimoiy',           format: 'CSV, XLSX' },
	{ img: img2, title: 'Transport infratuzilmasi ko\'rsatkichlari', year: '2023 yil', category: 'Transport',           format: 'XLSX, JSON' },
]

const CATEGORIES = ['Demografiya', 'Mehnat', 'Tadbirkorlik', "Qishloq xo'jaligi", "Ta'lim", "Sog'liq", 'Ijtimoiy', 'Sanoat']
const FORMATS    = ['CSV', 'XLSX', 'SPSS', 'JSON']

const STATS = [
	{ value: '340+', label: "Ma'lumotlar to'plami" },
	{ value: '18+',  label: 'Soha bo\'yicha' },
	{ value: '95+',  label: 'Yillik yangilanish (%)' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function PagBtn({ children, onClick, active, nav }) {
	return (
		<button
			onClick={onClick}
			style={{
				width: '36px', height: '36px', borderRadius: '8px',
				border: 'none',
				background: nav ? 'transparent' : active ? 'rgba(43,117,204,1)' : 'rgba(22,27,38,1)',
				color: active ? '#fff' : 'rgba(150,160,180,1)',
				fontSize: '14px', fontWeight: active ? 600 : 400,
				cursor: 'pointer', fontFamily: '"Inter Display",Inter,sans-serif',
				display: 'flex', alignItems: 'center', justifyContent: 'center',
				transition: 'background .2s',
			}}
			onMouseEnter={e => { if (!active && !nav) e.currentTarget.style.background = 'rgba(43,117,204,0.25)' }}
			onMouseLeave={e => { if (!active && !nav) e.currentTarget.style.background = 'rgba(22,27,38,1)' }}
		>
			{children}
		</button>
	)
}

// ─── Dataset card ─────────────────────────────────────────────────────────────

const DatasetCard = memo(function DatasetCard({ d }) {
	return (
		<div
			style={{
				width: '282px', height: '342px', borderRadius: '20px',
				boxShadow: '0px 1px 5px 0px rgba(29,36,45,0.2)',
				overflow: 'hidden', cursor: 'pointer',
				display: 'flex', flexDirection: 'column',
				transition: 'transform .2s, box-shadow .2s',
			}}
			onMouseEnter={e => {
				e.currentTarget.style.transform = 'translateY(-4px)'
				e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,.5)'
			}}
			onMouseLeave={e => {
				e.currentTarget.style.transform = ''
				e.currentTarget.style.boxShadow = '0px 1px 5px 0px rgba(29,36,45,0.2)'
			}}
		>
			<div style={{
				height: '216px', flexShrink: 0, padding: '24px 24px 0',
				background: 'rgba(31,37,51,1)', boxSizing: 'border-box', overflow: 'hidden',
			}}>
				<div style={{ width: '100%', height: '100%', borderRadius: '14px 14px 0 0', overflow: 'hidden' }}>
					<img
						src={d.img} alt={d.title} loading='lazy' decoding='async'
						style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .4s' }}
						onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
						onMouseLeave={e => (e.currentTarget.style.transform = '')}
					/>
				</div>
			</div>
			<div style={{
				flex: 1, padding: '14px 16px 18px',
				background: 'rgba(22,27,38,1)', overflow: 'hidden',
				display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
			}}>
				<p style={{
					fontFamily: '"Inter Display",Inter,sans-serif', fontWeight: 500,
					fontSize: '18px', lineHeight: '120%', color: '#fff',
					margin: '0 0 8px',
					display: '-webkit-box', WebkitLineClamp: 2,
					WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis',
				}}>
					{d.title}
				</p>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<p style={{
						fontFamily: '"Inter Display",Inter,sans-serif', fontWeight: 400,
						fontSize: '14px', color: 'rgba(188,188,188,1)', margin: 0,
					}}>
						{d.year}
					</p>
					<span style={{
						padding: '3px 10px', borderRadius: '100px', fontSize: '12px', fontWeight: 500,
						background: 'rgba(43,117,204,0.15)', color: 'rgba(0,230,252,1)',
						border: '1px solid rgba(0,230,252,0.25)',
						fontFamily: '"Inter Display",Inter,sans-serif',
					}}>
						{d.format}
					</span>
				</div>
			</div>
		</div>
	)
})

// ─── Filter bar ───────────────────────────────────────────────────────────────

function FilterRow({ category, setCategory, catOpen, setCatOpen, format, setFormat, fmtOpen, setFmtOpen, onSearch }) {
	const dropStyle = {
		position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 200,
		background: 'rgba(18,22,32,0.85)', backdropFilter: 'blur(16px)',
		WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)',
		borderRadius: '14px', overflow: 'hidden',
		boxShadow: '0 16px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04) inset',
	}
	const itemStyle = active => ({
		padding: '10px 18px', fontSize: '13px', cursor: 'pointer',
		fontFamily: '"Inter Display",Inter,sans-serif',
		color: active ? 'rgba(0,230,252,0.9)' : 'rgba(200,205,220,0.75)',
		background: active ? 'rgba(0,230,252,0.06)' : 'transparent',
		borderBottom: '1px solid rgba(255,255,255,0.04)',
		transition: 'background 0.15s, color 0.15s',
	})

	return (
		<div style={{
			width: '800px', height: '72px', borderRadius: '16px', padding: '12px',
			boxSizing: 'border-box', gap: '10px', background: 'rgba(22,27,38,1)',
			border: '1px solid rgba(31,37,51,1)', display: 'flex', alignItems: 'center',
			marginBottom: '40px', position: 'relative', zIndex: 1,
		}}>
			{/* Category */}
			<div
				style={{ position: 'relative', padding: '0 16px', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
				onClick={() => { setCatOpen(p => !p); setFmtOpen(false) }}
			>
				<div style={{ fontSize: '16px', color: '#fff', marginBottom: '4px', display: 'flex', gap: '40px', alignItems: 'center', fontFamily: '"Inter Display",Inter,sans-serif' }}>
					Soha
					<svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
						<path d='M6 9l6 6 6-6' stroke='white' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' />
					</svg>
				</div>
				<div style={{ fontSize: '14px', color: 'rgba(202,202,206,1)', fontWeight: 500, fontFamily: '"Inter Display",Inter,sans-serif' }}>
					{category}
				</div>
				{catOpen && (
					<div style={{ ...dropStyle, minWidth: '200px' }}>
						{CATEGORIES.map(c => (
							<div key={c} style={itemStyle(c === category)} onClick={e => { e.stopPropagation(); setCategory(c); setCatOpen(false) }}>{c}</div>
						))}
					</div>
				)}
			</div>

			<div style={{ width: '1px', height: '30px', background: 'white', flexShrink: 0 }} />

			{/* Format */}
			<div
				style={{ position: 'relative', flex: 1, padding: '0 16px', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
				onClick={() => { setFmtOpen(p => !p); setCatOpen(false) }}
			>
				<div style={{ fontSize: '16px', color: '#fff', marginBottom: '3px', fontFamily: '"Inter Display",Inter,sans-serif', display: 'flex', alignItems: 'center', gap: '40px' }}>
					Format
					<svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
						<path d='M6 9l6 6 6-6' stroke='white' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' />
					</svg>
				</div>
				<div style={{ fontSize: '14px', color: 'rgba(202,202,206,1)', fontWeight: 500, fontFamily: '"Inter Display",Inter,sans-serif' }}>
					{format}
				</div>
				{fmtOpen && (
					<div style={{ ...dropStyle, minWidth: '160px' }}>
						{FORMATS.map(f => (
							<div key={f} style={itemStyle(f === format)} onClick={e => { e.stopPropagation(); setFormat(f); setFmtOpen(false) }}>{f}</div>
						))}
					</div>
				)}
			</div>

			{/* Search */}
			<div style={{ flexShrink: 0 }}>
				<button
					onClick={onSearch}
					style={{
						display: 'flex', alignItems: 'center', gap: '6px',
						background: 'rgba(43,117,204,1)', color: '#fff', border: 'none',
						borderRadius: '10px', padding: '12px 24px', fontSize: '14px',
						fontWeight: 500, cursor: 'pointer', fontFamily: '"Inter Display",Inter,sans-serif',
					}}
				>
					<svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
						<circle cx='11' cy='11' r='7' stroke='white' strokeWidth='2' />
						<path d='M16.5 16.5L21 21' stroke='white' strokeWidth='2' strokeLinecap='round' />
					</svg>
					Izlash
				</button>
			</div>
		</div>
	)
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({ page, setPage, total }) {
	const getPages = () => {
		if (page <= 5) return [1, 2, 3, 4, 5, '...', total]
		if (page >= total - 4) return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
		return [1, '...', page - 1, page, page + 1, '...', total]
	}
	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '1224px', maxWidth: '100%', position: 'relative', zIndex: 1 }}>
			<span style={{ fontFamily: '"Inter Display",Inter,sans-serif', fontSize: '14px', color: 'rgba(100,110,130,1)', minWidth: '60px' }}>Sahifa</span>
			<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
				<PagBtn nav onClick={() => setPage(1)}>«</PagBtn>
				<PagBtn nav onClick={() => setPage(p => Math.max(1, p - 1))}>‹</PagBtn>
				{getPages().map((p, i) =>
					p === '...' ? (
						<span key={`d${i}`} style={{ width: '36px', height: '36px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(100,110,130,1)', fontSize: '14px', fontFamily: '"Inter Display",Inter,sans-serif' }}>...</span>
					) : (
						<PagBtn key={p} active={p === page} onClick={() => setPage(p)}>{p}</PagBtn>
					),
				)}
				<PagBtn nav onClick={() => setPage(p => Math.min(total, p + 1))}>›</PagBtn>
				<PagBtn nav onClick={() => setPage(total)}>»</PagBtn>
			</div>
			<button
				onClick={() => setPage(total)}
				style={{ fontFamily: '"Inter Display",Inter,sans-serif', fontSize: '14px', color: 'rgba(150,160,180,1)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', minWidth: '60px', justifyContent: 'flex-end', padding: 0 }}
			>
				Barchasini ko'rish <span>›</span>
			</button>
		</div>
	)
}

// ─── Dataset section ──────────────────────────────────────────────────────────

function DatasetSection() {
	const [page, setPage]           = useState(1)
	const [category, setCategory]   = useState(CATEGORIES[0])
	const [catOpen, setCatOpen]     = useState(false)
	const [format, setFormat]       = useState(FORMATS[0])
	const [fmtOpen, setFmtOpen]     = useState(false)
	const [filtered, setFiltered]   = useState(DATASETS)

	const PER_PAGE = 8

	const handleSearch = () => {
		const result = DATASETS.filter(d => d.category === category && d.format.includes(format))
		setFiltered(result.length ? result : DATASETS)
		setPage(1)
	}

	const displayed = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

	return (
		<section style={{
			width: '100%', maxWidth: '1440px', margin: '0 auto',
			background: 'rgba(14,18,27,1)', display: 'flex', flexDirection: 'column',
			alignItems: 'center', padding: '40px 0 100px', position: 'relative',
		}}>
			<img src={bgGlow} alt='' aria-hidden='true' style={{
				position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
				width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top',
				zIndex: 0, pointerEvents: 'none',
			}} />

			<div style={{ position: 'relative', zIndex: 1, marginBottom: '20px' }}>
				<Button2 text="Ma'lumotlar" />
			</div>

			<div style={{ position: 'relative', zIndex: 1 }}>
				<BlurWords
					text="Mikro ma'lumotlar katalogi"
					delay={0.1}
					style={{
						fontFamily: '"Inter Display",Inter,sans-serif', fontWeight: 600,
						fontSize: '48px', lineHeight: '58px', color: '#fff',
						display: 'block', textAlign: 'center',
					}}
				/>
			</div>

			<p style={{
				position: 'relative', zIndex: 1,
				fontFamily: '"Inter Display",Inter,sans-serif', fontWeight: 400,
				fontSize: '16px', lineHeight: '140%', color: 'rgba(202,202,206,1)',
				textAlign: 'center', maxWidth: '500px', margin: '16px 0 40px',
			}}>
				Statistika agentligi tomonidan yig'ilgan individual darajadagi ma'lumotlar to'plamlari
				bilan ishlang va tadqiqotlaringizni boyiting.
			</p>

			<div style={{ position: 'relative', zIndex: 10, width: '800px' }}>
				<FilterRow
					category={category} setCategory={setCategory}
					catOpen={catOpen} setCatOpen={setCatOpen}
					format={format} setFormat={setFormat}
					fmtOpen={fmtOpen} setFmtOpen={setFmtOpen}
					onSearch={handleSearch}
				/>
			</div>

			<div style={{
				display: 'grid', gridTemplateColumns: 'repeat(4, 282px)',
				gap: '32px', justifyContent: 'center', marginBottom: '48px',
				position: 'relative', zIndex: 1,
			}}>
				{displayed.length > 0 ? displayed.map((d, i) => (
					<DatasetCard key={i} d={d} />
				)) : (
					<div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', fontFamily: '"Inter Display",Inter,sans-serif', fontSize: '16px', color: 'rgba(150,160,180,1)' }}>
						Bu tanlov bo'yicha ma'lumot topilmadi
					</div>
				)}
			</div>

			<Pagination page={page} setPage={setPage} total={Math.ceil(filtered.length / PER_PAGE)} />
		</section>
	)
}

// ─── Statistics block ─────────────────────────────────────────────────────────

function MikroStatistika() {
	return (
		<section style={{ backgroundColor: 'rgba(22,27,38,1)', width: '100%' }}>
			<div style={{ maxWidth: '1440px', margin: '0 auto', padding: '40px 80px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
				<p style={{ fontFamily: '"Inter Display",Inter,sans-serif', fontSize: '36px', fontWeight: 600, color: 'white', margin: '0 0 24px', letterSpacing: '0.01em' }}>
					Statistik ko'rsatkichlar
				</p>
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
					{STATS.map((s, i) => (
						<div key={i} style={{ paddingRight: i < STATS.length - 1 ? '48px' : 0, paddingLeft: i > 0 ? '48px' : 0 }}>
							<div style={{ display: 'flex', alignItems: 'center', gap: '2px', margin: '0 0 35px' }}>
								<span style={{ fontFamily: '"Inter Display",Inter,sans-serif', fontSize: 'clamp(100px, 6vw, 80px)', fontWeight: 600, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em' }}>
									{s.value.replace('+', '').replace('%', '')}
								</span>
								<span style={{ fontFamily: '"Inter Display",Inter,sans-serif', fontSize: 'clamp(100px, 3vw, 40px)', fontWeight: 600, color: '#fff', lineHeight: 1 }}>
									{s.value.includes('%') ? '%' : '+'}
								</span>
							</div>
							<div style={{ height: '1px', background: 'rgba(188,188,188,1)', marginBottom: '25px' }} />
							<p style={{ fontFamily: '"Inter Display",Inter,sans-serif', fontSize: '18px', fontWeight: 500, color: 'rgba(90,98,117,1)', margin: 0 }}>
								{s.label}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const MM_KF = `@keyframes mm_fadeUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }`

function HeroSection() {
	useEffect(() => {
		const el = document.createElement('style')
		el.setAttribute('data-mm2-kf', '1')
		el.textContent = MM_KF
		document.head.appendChild(el)
		return () => document.head.removeChild(el)
	}, [])

	return (
		<section style={{
			width: '100%', backgroundImage: 'url(/BG.png)', backgroundSize: 'cover',
			backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
			display: 'flex', flexDirection: 'column', alignItems: 'center',
			position: 'relative', overflow: 'hidden', paddingTop: '160px',
		}}>
			<div style={{
				display: 'flex', flexDirection: 'column', alignItems: 'center',
				textAlign: 'center', gap: '24px', zIndex: 10, position: 'relative',
				animation: 'mm_fadeUp .9s cubic-bezier(.16,1,.3,1) both',
			}}>
				<Button text='Platforma haqida' variant='dark' />
				<h1 style={{
					fontFamily: '"Inter Display",Inter,sans-serif', fontWeight: 600,
					fontSize: '64px', lineHeight: 1.05, letterSpacing: '-.03em',
					color: '#fff', maxWidth: '1100px', margin: 0,
				}}>
					Tadqiqot uchun <br />
					<span style={{ color: 'rgba(0,230,252,1)' }}>mikro ma'lumotlar</span>
				</h1>
				<p style={{
					fontFamily: '"Inter Display",Inter,sans-serif', fontWeight: 400,
					fontSize: '16px', lineHeight: 1.6, color: 'rgba(188,188,188,1)',
					maxWidth: '480px', margin: 0,
				}}>
					Individual darajadagi statistik ma'lumotlar to'plamlari — tadqiqot, tahlil
					va qarorlar qabul qilish uchun.
				</p>
			</div>

			{/* Feature cards */}
			<div style={{
				display: 'flex', gap: '24px', marginTop: '64px', marginBottom: '40px',
				zIndex: 10, position: 'relative', flexWrap: 'wrap', justifyContent: 'center',
				padding: '0 40px',
			}}>
				{[
					{ icon: '📊', title: 'Anonimlashtirish', desc: "Shaxsiy ma'lumotlar himoyalangan" },
					{ icon: '⬇️', title: 'Yuklab olish',     desc: 'CSV, XLSX, SPSS, JSON formatlari' },
					{ icon: '🔍', title: 'Qidiruv',           desc: "Soha va format bo'yicha filtrlash" },
					{ icon: '📋', title: 'Hujjatlar',         desc: "To'liq metodologiya va meta-data" },
				].map((f, i) => (
					<div key={i} style={{
						width: '220px', padding: '24px', borderRadius: '16px',
						background: 'rgba(22,27,38,0.75)', border: '1px solid rgba(255,255,255,0.08)',
						backdropFilter: 'blur(12px)', textAlign: 'center',
					}}>
						<div style={{ fontSize: '28px', marginBottom: '12px' }}>{f.icon}</div>
						<p style={{ fontFamily: '"Inter Display",Inter,sans-serif', fontWeight: 600, fontSize: '16px', color: '#fff', margin: '0 0 6px' }}>{f.title}</p>
						<p style={{ fontFamily: '"Inter Display",Inter,sans-serif', fontWeight: 400, fontSize: '13px', color: 'rgba(188,188,188,1)', margin: 0 }}>{f.desc}</p>
					</div>
				))}
			</div>
		</section>
	)
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function MikroMalumotlar() {
	return (
		<>
			<HeroSection />
			<DatasetSection />
			<MikroStatistika />
			<FAQSection hideParticles platformStyle />
			<Testimonial hideParticles platformStyle />
		</>
	)
}
