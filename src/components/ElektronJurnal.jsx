import img1 from '@/assets/2.png'
import img2 from '@/assets/3.png'
import img3 from '@/assets/4.png'
import img4 from '@/assets/5.png'
import img5 from '@/assets/6.png'
import bgGlow from '@/assets/bgImg/Background (1).png'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import FAQSection from './FAQSection'
import JurnalStatistika from './JurnalStatistika'
import MaqolaTalablari  from './MaqolaTalablari'
import TahririyatAzolari from './TahririyatAzolari'
import { Button } from './shared/Button'
import { Button2 } from './shared/Button2'
import Text from './shared/Text'
import Testimonial from './Testimonial'
import AnimatedSection from './shared/AnimatedSection'

// ─── Data ────────────────────────────────────────────────────────────────────

const CARDS = [
	{
		src: img1,
		backTitle: 'Ilmiy maqolalar',
		backDesc: "Recenzentdan o'tgan sifatli ilmiy ishlar bazasi.",
	},
	{
		src: img2,
		backTitle: 'Xalqaro jurnallar',
		backDesc: "Scopus va Web of Science ro'yxatidagi jurnallar.",
	},
	{
		src: img3,
		backTitle: 'Yagona platforma',
		backDesc: "Nashr qilish, o'qish va hamkorlik — bir joyda.",
	},
	{
		src: img4,
		backTitle: 'Tezkor nashr',
		backDesc: 'Maqolangizni tez va oson nashr qildiring.',
	},
	{
		src: img5,
		backTitle: 'Karyera imkoniyati',
		backDesc: 'Ilmiy faoliyatingizni rivojlantiring va tan oling.',
	},
]

const JOURNALS = [
	{ img: img1, title: "O'zbekistonda qurilish",                          year: '2020 yil 1-son', author: 'Afzal Pulatov',    category: 'Sanoat'           },
	{ img: img2, title: "O'zbekistonda kichik tadbirkorlik",               year: '2020 yil 1-son', author: 'Dilnoza Yusupova', category: 'Makroiqtisodiyot' },
	{ img: img3, title: 'Ayollar va erkaklar',                             year: '2022 yil 1-son', author: 'Malika Xasanova',  category: 'Demografiya'      },
	{ img: img4, title: "O'zbekiston raqamlarda",                          year: '2022 yil 1-son', author: 'Jahongir Toshmatov', category: 'Makroiqtisodiyot' },
	{ img: img5, title: "O'zbekistonda axborotlashgan jamiyat rivojlanishi", year: '2022 yil 1-son', author: 'Afzal Pulatov',   category: "Ta'lim"           },
	{ img: img1, title: "O'zbekistonda ilm-fan va innovatsion faoliyat",   year: '2022 yil 1-son', author: 'Dilnoza Yusupova', category: "Ta'lim"           },
	{ img: img2, title: "O'zbekistonda transport va aloqa",                year: '2018 yil 1-son', author: 'Jahongir Toshmatov', category: 'Sanoat'         },
	{ img: img3, title: "O'zbekiston sanoati",                             year: '2020 yil 1-son', author: 'Malika Xasanova',  category: 'Sanoat'           },
	{ img: img4, title: "O'zbekistonda qishloq xo'jaligi",                year: '2021 yil 1-son', author: 'Afzal Pulatov',    category: "Qishloq xo'jaligi" },
	{ img: img5, title: "Demografik o'zgarishlar tahlili",                year: '2021 yil 2-son', author: 'Malika Xasanova',  category: 'Demografiya'      },
	{ img: img1, title: "Milliy ta'lim tizimi rivojlanishi",              year: '2023 yil 1-son', author: 'Dilnoza Yusupova', category: "Ta'lim"           },
	{ img: img2, title: "Qishloq xo'jaligi statistikasi",                 year: '2022 yil 3-son', author: 'Jahongir Toshmatov', category: "Qishloq xo'jaligi" },
]

const AUTHORS = [
	'Afzal Pulatov',
	'Dilnoza Yusupova',
	'Jahongir Toshmatov',
	'Malika Xasanova',
]
const CATEGORIES = [
	'Makroiqtisodiyot',
	"Qishloq xo'jaligi",
	"Ta'lim",
	'Demografiya',
	'Sanoat',
]

// ─── Carousel constants ───────────────────────────────────────────────────────

const N = CARDS.length
const SPEED = 0.006
const C_W = 294
const C_H = 390
const SPREAD_X = 320
const ROT_Y = 52
const SPREAD_Z = 160
const STAIR_Y = 110
const PCOLORS = ['#00e6fc', '#2b75cc', '#fff', '#00c9ff', '#7b8fff']
let _pid = 0

const KF = `
@keyframes ej_shimmer { 0%{left:-100%} 100%{left:200%} }
@keyframes ej_ripple  { 0%{transform:scale(.5);opacity:.8} 100%{transform:scale(3.5);opacity:0} }
@keyframes ej_holo    { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
@keyframes ej_glow    { 0%,100%{opacity:.45;transform:translateX(-50%) scale(1)} 50%{opacity:1;transform:translateX(-50%) scale(1.3)} }
@keyframes ej_border  { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
@keyframes ej_p       { 0%{transform:translate(0,0) scale(1);opacity:1} 100%{transform:translate(var(--dx),var(--dy)) scale(0);opacity:0} }
@keyframes ej_fadeUp  { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
`

function wrapOffset(raw) {
	let o = raw % N
	if (o > N / 2) o -= N
	if (o < -N / 2) o += N
	return o
}

// ─── Small reusable pieces ────────────────────────────────────────────────────

function Particle({ x, y, dx, dy, color, onDone }) {
	useEffect(() => {
		const t = setTimeout(onDone, 700)
		return () => clearTimeout(t)
	}, [])
	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: y,
				width: 6,
				height: 6,
				borderRadius: '50%',
				background: color,
				pointerEvents: 'none',
				'--dx': `${dx}px`,
				'--dy': `${dy}px`,
				animation: 'ej_p .7s cubic-bezier(.22,1,.36,1) both',
			}}
		/>
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

// ─── Journal card ─────────────────────────────────────────────────────────────

const JournalCard = memo(function JournalCard({ j }) {
	return (
		<div
			style={{
				width: '282px',
				height: '342px',
				borderRadius: '20px',
				boxShadow: '0px 1px 5px 0px rgba(29,36,45,0.2)',
				overflow: 'hidden',
				cursor: 'pointer',
				display: 'flex',
				flexDirection: 'column',
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
			<div
				style={{
					height: '216px',
					flexShrink: 0,
					padding: '24px 24px 0',
					background: 'rgba(31,37,51,1)',
					boxSizing: 'border-box',
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						width: '100%',
						height: '100%',
						borderRadius: '14px 14px 0 0',
						overflow: 'hidden',
					}}
				>
					<img
						src={j.img}
						alt={j.title}
						loading='lazy'
						decoding='async'
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							display: 'block',
							transition: 'transform .4s',
						}}
						onMouseEnter={e =>
							(e.currentTarget.style.transform = 'scale(1.06)')
						}
						onMouseLeave={e => (e.currentTarget.style.transform = '')}
					/>
				</div>
			</div>
			<div
				style={{
					flex: 1,
					padding: '14px 16px 18px',
					background: 'rgba(22,27,38,1)',
					overflow: 'hidden',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
			>
				<p
					style={{
						fontFamily: '"Inter Display",Inter,sans-serif',
						fontWeight: 500,
						fontSize: '20px',
						lineHeight: '120%',
						letterSpacing: '0%',
						color: '#fff',
						margin: '0 0 8px',
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}
				>
					{j.title}
				</p>
				<p
					style={{
						fontFamily: '"Inter Display",Inter,sans-serif',
						fontWeight: 400,
						fontSize: '16px',
						lineHeight: '120%',
						color: 'rgba(188,188,188,1)',
						margin: 0,
					}}
				>
					{j.year}
				</p>
			</div>
		</div>
	)
})

// ─── Filter / search bar ──────────────────────────────────────────────────────

function FilterRow({
	author,
	setAuthor,
	authorOpen,
	setAuthorOpen,
	category,
	setCategory,
	catOpen,
	setCatOpen,
	onSearch,
}) {
	const dropStyle = {
		position: 'absolute',
		top: 'calc(100% + 8px)',
		left: 0,
		zIndex: 200,
		background: 'rgba(18,22,32,0.85)',
		backdropFilter: 'blur(16px)',
		WebkitBackdropFilter: 'blur(16px)',
		border: '1px solid rgba(255,255,255,0.07)',
		borderRadius: '14px',
		overflow: 'hidden',
		boxShadow:
			'0 16px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04) inset',
	}
	const itemStyle = active => ({
		padding: '10px 18px',
		fontSize: '13px',
		cursor: 'pointer',
		fontFamily: '"Inter Display",Inter,sans-serif',
		color: active ? 'rgba(0,230,252,0.9)' : 'rgba(200,205,220,0.75)',
		background: active ? 'rgba(0,230,252,0.06)' : 'transparent',
		borderBottom: '1px solid rgba(255,255,255,0.04)',
		transition: 'background 0.15s, color 0.15s',
	})

	return (
		<div
			style={{
				width: '800px',
				height: '72px',
				borderRadius: '16px',
				padding: '12px',
				boxSizing: 'border-box',
				gap: '10px',
				background: 'rgba(22,27,38,1)',
				border: '1px solid rgba(31,37,51,1)',
				display: 'flex',
				alignItems: 'center',
				marginBottom: '40px',
				position: 'relative',
				zIndex: 1,
			}}
		>
			{/* Authors */}
			<div
				style={{
					position: 'relative',
					
					padding: '0 16px',
					cursor: 'pointer',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
				}}
				onClick={() => {
					setAuthorOpen(p => !p)
					setCatOpen(false)
				}}
			>
				<div
					style={{
						fontSize: '16px',
						color: 'rgba(255, 255, 255, 1)',
						marginBottom: '4px',
						display: 'flex',
						gap: '75px',
						alignItems: 'center',
						fontFamily: '"Inter Display",Inter,sans-serif',
					}}
				>
					Mualliflar{' '}
					<svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
						<path
							d='M6 9l6 6 6-6'
							stroke='white'
							strokeWidth='2.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</div>
				<div
					style={{
						fontSize: '14px',
						color: 'rgba(202,202,206,1)',
						fontWeight: 500,
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
						fontFamily: '"Inter Display",Inter,sans-serif',
					}}
				>
					{author}
				</div>
				{authorOpen && (
					<div style={{ ...dropStyle, minWidth: '190px' }}>
						{AUTHORS.map(a => (
							<div
								key={a}
								style={itemStyle(a === author)}
								onClick={e => {
									e.stopPropagation()
									setAuthor(a)
									setAuthorOpen(false)
								}}
							>
								{a}
							</div>
						))}
					</div>
				)}
			</div>

			<div
				style={{
					width: '1px',
					height: '30px',
					background: 'white',
					flexShrink: 0,
				}}
			/>

			{/* Categories */}
			<div
				style={{
					position: 'relative',
					flex: 1,
					padding: '0 16px',
					cursor: 'pointer',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
				}}
				onClick={() => {
					setCatOpen(p => !p)
					setAuthorOpen(false)
				}}
			>
				<div
					style={{
						fontSize: '16px',
						color: 'white',
						marginBottom: '3px',
						fontFamily: '"Inter Display",Inter,sans-serif',
						display: 'flex',
						alignItems: 'center',
						gap: '46px',
					}}
				>
					Kategoriyalar
					<svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
						<path
							d='M6 9l6 6 6-6'
							stroke='white'
							strokeWidth='2.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</div>
				<div
					style={{
						fontSize: '14px',
						color: '#fff',
						fontWeight: 500,
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
						fontFamily: '"Inter Display",Inter,sans-serif',
					}}
				>
					{category}
				</div>
				{catOpen && (
					<div
						style={{ ...dropStyle, minWidth: '210px' }}
					>
						{CATEGORIES.map(c => (
							<div
								key={c}
								style={itemStyle(c === category)}
								onClick={e => {
									e.stopPropagation()
									setCategory(c)
									setCatOpen(false)
								}}
							>
								{c}
							</div>
						))}
					</div>
				)}
			</div>

			{/* Search */}
			<div style={{ flexShrink: 0 }}>
				<button
					onClick={onSearch}
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '6px',
						background: 'rgba(43,117,204,1)',
						color: '#fff',
						border: 'none',
						borderRadius: '10px',
						padding: '12px 24px',
						fontSize: '14px',
						fontWeight: 500,
						cursor: 'pointer',
						fontFamily: '"Inter Display",Inter,sans-serif',
					}}
				>
					<svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
						<circle cx='11' cy='11' r='7' stroke='white' strokeWidth='2' />
						<path
							d='M16.5 16.5L21 21'
							stroke='white'
							strokeWidth='2'
							strokeLinecap='round'
						/>
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
		if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
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
				width: '1224px',
				maxWidth: '100%',
				position: 'relative',
				zIndex: 1,
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

// ─── Jurnallar section ────────────────────────────────────────────────────────

function JurnallarSection() {
	const [page, setPage]           = useState(1)
	const [author, setAuthor]       = useState(AUTHORS[0])
	const [category, setCategory]   = useState(CATEGORIES[0])
	const [authorOpen, setAuthorOpen] = useState(false)
	const [catOpen, setCatOpen]     = useState(false)
	const [filtered, setFiltered]   = useState(JOURNALS)

	const PER_PAGE = 8

	const handleSearch = () => {
		const result = JOURNALS.filter(j => j.author === author && j.category === category)
		setFiltered(result)
		setPage(1)
	}

	const displayed = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

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
				padding: '40px 0 100px',
				position: 'relative',
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

			<AnimatedSection style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
					<Button2 text='Jurnallar' />

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
						Nufuzli jurnallar va so&apos;nggi nashrlar
					</h2>

					<p
						style={{
							fontFamily: '"Inter Display",Inter,sans-serif',
							fontWeight: 400,
							fontSize: '16px',
							lineHeight: '140%',
							color: 'rgba(202,202,206,1)',
							maxWidth: '500px',
							margin: 0,
						}}
					>
						Platformada chop etilayotgan yetakchi ilmiy jurnallar hamda ularning eng
						yangi sonlari bilan tanishing.
					</p>
				</div>
			</AnimatedSection>

			<div style={{ position: 'relative', zIndex: 10, width: '800px' }}>
				<FilterRow
					author={author}
					setAuthor={setAuthor}
					authorOpen={authorOpen}
					setAuthorOpen={setAuthorOpen}
					category={category}
					setCategory={setCategory}
					catOpen={catOpen}
					setCatOpen={setCatOpen}
					onSearch={handleSearch}
				/>
			</div>

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(4, 282px)',
					gap: '32px',
					justifyContent: 'center',
					marginBottom: '48px',
					position: 'relative',
					zIndex: 1,
				}}
			>
				{displayed.length > 0 ? displayed.map((j, i) => (
					<JournalCard key={i} j={j} />
				)) : (
					<div style={{
						gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0',
						fontFamily: '"Inter Display",Inter,sans-serif',
						fontSize: '16px', color: 'rgba(150,160,180,1)',
					}}>
						Bu tanlov bo'yicha jurnal topilmadi
					</div>
				)}
			</div>

			<Pagination page={page} setPage={setPage} total={Math.ceil(filtered.length / PER_PAGE)} />
		</section>
	)
}

// ─── Carousel card ────────────────────────────────────────────────────────────

const CarouselCard = memo(function CarouselCard({
	card,
	i,
	tf,
	isH,
	isFlip,
	tilt,
	shimmer,
	ripple,
	particles,
	cardRef,
	onMove,
	onEnter,
	onLeave,
	onClick,
	removePart,
}) {
	const cardTransform = isH
		? `translateX(calc(-50% + ${tf.transX}px)) translateY(${tf.transY * 0.3}px) translateZ(${tf.transZ + 60}px) rotateY(0deg) scale(${tf.scale * 1.1})`
		: `translateX(calc(-50% + ${tf.transX}px)) translateY(${tf.transY}px) translateZ(${tf.transZ}px) rotateY(${tf.rotY}deg) scale(${tf.scale})`

	const borderBg = isH
		? 'linear-gradient(270deg,#00e6fc,#2b75cc,#7b8fff,#00e6fc)'
		: tf.abs < 0.5
			? 'linear-gradient(270deg,rgba(0,230,252,.6),rgba(43,117,204,.5),rgba(0,230,252,.6))'
			: 'linear-gradient(270deg,rgba(43,117,204,.35),rgba(0,230,252,.2),rgba(43,117,204,.35))'

	const boxShadow = isH
		? '0 60px 140px rgba(0,0,0,.95), 0 0 90px rgba(0,230,252,.35)'
		: tf.abs < 0.5
			? '0 30px 80px rgba(0,0,0,.75), 0 0 40px rgba(0,230,252,.15)'
			: '0 20px 50px rgba(0,0,0,.6)'

	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: '50%',
				width: C_W,
				transform: cardTransform,
				transformStyle: 'preserve-3d',
				zIndex: isH ? 999 : tf.zIdx,
				opacity: isH ? 1 : tf.opac,
				willChange: 'transform, opacity',
			}}
		>
			{/* Floor glow */}
			<div
				style={{
					position: 'absolute',
					bottom: '-22px',
					left: '50%',
					width: isH ? '210px' : `${140 * tf.scale}px`,
					height: '22px',
					borderRadius: '50%',
					background: isH
						? 'radial-gradient(ellipse,rgba(0,230,252,.75) 0%,transparent 70%)'
						: 'radial-gradient(ellipse,rgba(43,117,204,.38) 0%,transparent 70%)',
					filter: 'blur(10px)',
					transform: 'translateX(-50%)',
					animation: 'ej_glow 3s ease-in-out infinite',
					animationDelay: `${i * 0.35}s`,
					transition: 'width .3s, background .3s',
					pointerEvents: 'none',
				}}
			/>

			{/* Neon border */}
			<div
				style={{
					padding: '2px',
					borderRadius: '22px',
					backgroundImage: borderBg,
					backgroundSize: '400% 400%',
					animation: 'ej_border 2.5s ease infinite',
					boxShadow: isH
						? '0 0 40px rgba(0,230,252,.55)'
						: tf.abs < 0.5
							? '0 0 20px rgba(0,230,252,.25)'
							: 'none',
					transition: 'box-shadow .3s',
				}}
			>
				<div
					ref={cardRef}
					onMouseMove={onMove}
					onMouseEnter={onEnter}
					onMouseLeave={onLeave}
					onClick={onClick}
					style={{
						width: C_W,
						height: C_H,
						borderRadius: '20px',
						cursor: 'pointer',
						position: 'relative',
						transformStyle: 'preserve-3d',
						transform: `perspective(700px) rotateX(${isFlip ? 0 : tilt.rx}deg) rotateY(${isFlip ? 180 : tilt.ry}deg)`,
						transition: isFlip
							? 'transform .7s cubic-bezier(.22,1,.36,1)'
							: isH
								? 'transform .09s linear, box-shadow .3s'
								: 'transform .5s, box-shadow .3s',
						boxShadow,
					}}
				>
					{/* Front */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							borderRadius: '20px',
							overflow: 'hidden',
							backfaceVisibility: 'hidden',
						}}
					>
						<img
							src={card.src}
							alt=''
							loading='lazy'
							decoding='async'
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
								display: 'block',
								transform: isH && !isFlip ? 'scale(1.08)' : 'scale(1)',
								transition: 'transform .5s cubic-bezier(.22,1,.36,1)',
							}}
						/>
						{(isH || tf.abs < 0.5) && !isFlip && (
							<div
								style={{
									position: 'absolute',
									inset: 0,
									backgroundImage:
										'linear-gradient(135deg,rgba(0,230,252,.1) 0%,rgba(123,143,255,.08) 50%,rgba(43,117,204,.1) 100%)',
									backgroundSize: '200% 200%',
									animation: 'ej_holo 3s linear infinite',
									mixBlendMode: 'screen',
									pointerEvents: 'none',
								}}
							/>
						)}
						{shimmer && !isFlip && (
							<div
								style={{
									position: 'absolute',
									top: '-60%',
									width: '70px',
									height: '280%',
									background:
										'linear-gradient(105deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.42) 50%,rgba(255,255,255,0) 100%)',
									transform: 'skewX(-16deg)',
									animation: 'ej_shimmer .8s cubic-bezier(.22,1,.36,1) both',
									pointerEvents: 'none',
								}}
							/>
						)}
						{ripple && !isFlip && (
							<div
								key={ripple.id}
								style={{
									position: 'absolute',
									left: ripple.x - 30,
									top: ripple.y - 30,
									width: 60,
									height: 60,
									borderRadius: '50%',
									border: '2px solid rgba(0,230,252,.85)',
									animation: 'ej_ripple .7s ease-out both',
									pointerEvents: 'none',
								}}
							/>
						)}
						{particles.map(p => (
							<Particle key={p.id} {...p} onDone={() => removePart(p.id)} />
						))}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								borderRadius: '20px',
								boxShadow: isH
									? 'inset 0 0 0 1.5px rgba(0,230,252,.75)'
									: 'none',
								transition: 'box-shadow .3s',
								pointerEvents: 'none',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								bottom: 0,
								left: 0,
								right: 0,
								height: '45%',
								background:
									'linear-gradient(to top,rgba(10,15,28,.65) 0%,transparent 100%)',
								pointerEvents: 'none',
							}}
						/>
					</div>

					{/* Back */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							borderRadius: '20px',
							overflow: 'hidden',
							backfaceVisibility: 'hidden',
							transform: 'rotateY(180deg)',
							background:
								'linear-gradient(145deg,rgba(14,18,27,1) 0%,rgba(22,34,58,1) 60%,rgba(10,30,50,1) 100%)',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							padding: '32px 24px',
							gap: '18px',
							textAlign: 'center',
						}}
					>
						<div
							style={{
								position: 'absolute',
								top: '18%',
								left: '50%',
								transform: 'translateX(-50%)',
								width: '170px',
								height: '170px',
								borderRadius: '50%',
								background:
									'radial-gradient(circle,rgba(0,230,252,.2) 0%,transparent 70%)',
								pointerEvents: 'none',
							}}
						/>
						<div
							style={{
								width: '62px',
								height: '62px',
								borderRadius: '14px',
								zIndex: 1,
								background: 'rgba(0,230,252,.08)',
								border: '1px solid rgba(0,230,252,.3)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<svg width='26' height='26' viewBox='0 0 24 24' fill='none'>
								<path
									d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
									stroke='rgba(0,230,252,1)'
									strokeWidth='1.8'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</div>
						<h3
							style={{
								fontFamily: '"Inter Display",Inter,sans-serif',
								fontWeight: 700,
								fontSize: '19px',
								lineHeight: 1.2,
								color: '#fff',
								margin: 0,
								zIndex: 1,
							}}
						>
							{card.backTitle}
						</h3>
						<p
							style={{
								fontFamily: 'Inter,sans-serif',
								fontWeight: 400,
								fontSize: '13px',
								lineHeight: 1.6,
								color: 'rgba(188,188,188,1)',
								margin: 0,
								zIndex: 1,
							}}
						>
							{card.backDesc}
						</p>
						<div
							style={{
								padding: '9px 20px',
								borderRadius: '100px',
								zIndex: 1,
								background:
									'linear-gradient(90deg,rgba(0,230,252,.15),rgba(43,117,204,.15))',
								border: '1px solid rgba(0,230,252,.35)',
								color: 'rgba(0,230,252,1)',
								fontSize: '13px',
								fontWeight: 600,
								fontFamily: '"Inter Display",Inter,sans-serif',
							}}
						>
							Batafsil →
						</div>
					</div>
				</div>
			</div>
		</div>
	)
})

// ─── Hero section (isolated so 60fps RAF re-renders don't affect rest of page) ─

function HeroSection() {
	const [visible, setVisible] = useState(false)
	const [flipped, setFlipped] = useState({})
	const [hovered, setHovered] = useState(null)
	const [shimmer, setShimmer] = useState({})
	const [tilts, setTilts] = useState(CARDS.map(() => ({ rx: 0, ry: 0 })))
	const [particles, setParticles] = useState([])
	const [ripple, setRipple] = useState(null)
	const [transforms, setTransforms] = useState([])

	const indexRef    = useRef(0)
	const pausedRef   = useRef(false)
	const rafRef      = useRef(null)
	const cardRefs    = useRef([])
	const sectionRef  = useRef(null)
	const visibleRef  = useRef(false)

	useEffect(() => {
		const el = document.createElement('style')
		el.setAttribute('data-ej-kf', '1')
		el.textContent = KF
		document.head.appendChild(el)
		return () => document.head.removeChild(el)
	}, [])

	useEffect(() => {
		const t = setTimeout(() => setVisible(true), 80)
		return () => clearTimeout(t)
	}, [])

	useEffect(() => {
		const loop = () => {
			if (!pausedRef.current) indexRef.current = (indexRef.current + SPEED) % N
			const ci = indexRef.current
			const tfs = CARDS.map((_, i) => {
				const raw = i - ci
				const off = wrapOffset(raw)
				const abs = Math.abs(off)
				const sign = Math.sign(off)
				const t = Math.min(abs / 2, 1)
				const tSq = t * t
				return {
					rotY: sign * Math.min(abs * ROT_Y, ROT_Y),
					transX: off * SPREAD_X,
					transZ: -abs * SPREAD_Z,
					transY: tSq * STAIR_Y,
					scale: 1 - tSq * 0.28,
					opac: abs > 2.2 ? 0 : 1 - Math.min(abs * 0.28, 0.6),
					zIdx: Math.round((1 - abs) * 50) + 50,
					abs,
				}
			})
			setTransforms(tfs)
			if (visibleRef.current) {
				rafRef.current = requestAnimationFrame(loop)
			} else {
				rafRef.current = null
			}
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				visibleRef.current = entry.isIntersecting
				if (entry.isIntersecting && !rafRef.current) {
					rafRef.current = requestAnimationFrame(loop)
				}
			},
			{ threshold: 0.1 },
		)
		if (sectionRef.current) observer.observe(sectionRef.current)
		rafRef.current = requestAnimationFrame(loop)

		return () => {
			cancelAnimationFrame(rafRef.current)
			rafRef.current = null
			observer.disconnect()
		}
	}, [])

	const onMove = useCallback((e, i) => {
		const el = cardRefs.current[i]
		if (!el) return
		const r = el.getBoundingClientRect()
		setTilts(p =>
			p.map((t, idx) =>
				idx === i
					? {
							rx: ((e.clientY - r.top) / r.height - 0.5) * -18,
							ry: ((e.clientX - r.left) / r.width - 0.5) * 20,
						}
					: t,
			),
		)
	}, [])

	const onEnter = useCallback((e, i) => {
		pausedRef.current = true
		setHovered(i)
		setShimmer(p => ({ ...p, [i]: false }))
		requestAnimationFrame(() => setShimmer(p => ({ ...p, [i]: true })))
		const el = cardRefs.current[i]
		if (el) {
			const r = el.getBoundingClientRect()
			setRipple({
				x: e.clientX - r.left,
				y: e.clientY - r.top,
				i,
				id: Date.now(),
			})
		}
	}, [])

	const onLeave = useCallback(i => {
		pausedRef.current = false
		setHovered(null)
		setShimmer(p => ({ ...p, [i]: false }))
		setTilts(p => p.map((t, idx) => (idx === i ? { rx: 0, ry: 0 } : t)))
		setRipple(null)
	}, [])

	const onClick = useCallback((e, i) => {
		setFlipped(p => ({ ...p, [i]: !p[i] }))
		const el = cardRefs.current[i]
		if (!el) return
		const r = el.getBoundingClientRect()
		const cx = e.clientX - r.left,
			cy = e.clientY - r.top
		setParticles(p => [
			...p,
			...Array.from({ length: 14 }, (_, k) => {
				const a = (k / 14) * Math.PI * 2,
					d = 50 + Math.random() * 80
				return {
					id: ++_pid,
					x: cx - 3,
					y: cy - 3,
					i,
					color: PCOLORS[Math.floor(Math.random() * PCOLORS.length)],
					dx: Math.cos(a) * d,
					dy: Math.sin(a) * d,
				}
			}),
		])
	}, [])

	const removePart = useCallback(
		id => setParticles(p => p.filter(x => x.id !== id)),
		[],
	)

	return (
		<section
			ref={sectionRef}
				style={{
					width: '100%',
					backgroundImage: 'url(/BG.png)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					position: 'relative',
					overflow: 'hidden',
					paddingTop: '100px',
				}}
			>
					{/* Hero text */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						textAlign: 'center',
						gap: '24px',
						zIndex: 10,
						position: 'relative',
						opacity: visible ? 1 : 0,
						animation: visible
							? 'ej_fadeUp .9s cubic-bezier(.16,1,.3,1) both'
							: 'none',
					}}
				>
					<Button text='Platforma haqida' variant='dark' />
					<h1
						style={{
							fontFamily: '"Inter Display",Inter,sans-serif',
							fontWeight: 600,
							fontSize: '64px',
							lineHeight: 1.05,
							letterSpacing: '-.03em',
							color: '#fff',
							maxWidth: '1100px',
							margin: 0,
						}}
					>
						Ilmiy jurnallar va maqolalar uchun
						<br />
						<span style={{ color: 'rgba(0,230,252,1)' }}>yagona platforma</span>
					</h1>
					<p
						style={{
							fontFamily: '"Inter Display",Inter,sans-serif',
							fontWeight: 400,
							fontSize: '16px',
							lineHeight: 1.6,
							color: 'rgba(188,188,188,1)',
							maxWidth: '480px',
							margin: 0,
						}}
					>
						Recenzentdan o'tgan ilmiy maqolalar, nufuzli jurnallar va xalqaro
						standartlarga mos nashr imkoniyatlari — barchasi bir joyda.
					</p>
				</div>

				{/* Carousel */}
				<div
					style={{
						position: 'relative',
						width: '100%',
						height: '480px',
						marginTop: '52px',
						perspective: '1100px',
						perspectiveOrigin: '50% 38%',
						opacity: visible ? 1 : 0,
						transition: 'opacity 1s ease .3s',
					}}
				>
					{CARDS.map((card, i) => {
						const tf = transforms[i]
						if (!tf) return null
						return (
							<CarouselCard
								key={i}
								card={card}
								i={i}
								tf={tf}
								isH={hovered === i}
								isFlip={!!flipped[i]}
								tilt={tilts[i]}
								shimmer={!!shimmer[i]}
								ripple={ripple?.i === i ? ripple : null}
								particles={particles.filter(p => p.i === i)}
								cardRef={el => (cardRefs.current[i] = el)}
								onMove={e => onMove(e, i)}
								onEnter={e => onEnter(e, i)}
								onLeave={() => onLeave(i)}
								onClick={e => onClick(e, i)}
								removePart={removePart}
							/>
						)
					})}
				</div>

				{/* CTA button */}
				<div
					style={{
						marginTop: '0px',
						marginBottom: '40px',
						zIndex: 10,
						position: 'relative',
						opacity: visible ? 1 : 0,
						transition: 'opacity .85s ease .6s',
					}}
				>
					<button
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '8px',
							backgroundColor: 'rgba(43,117,204,1)',
							color: '#fff',
							border: 'none',
							borderRadius: '100px',
							padding: '14px 28px',
							fontSize: '16px',
							fontWeight: 500,
							fontFamily: '"Inter Display",Inter,sans-serif',
							cursor: 'pointer',
							transition: 'opacity .2s, transform .2s',
						}}
						onMouseEnter={e => {
							e.currentTarget.style.opacity = '.85'
							e.currentTarget.style.transform = 'scale(1.06)'
						}}
						onMouseLeave={e => {
							e.currentTarget.style.opacity = '1'
							e.currentTarget.style.transform = 'scale(1)'
						}}
					>
						Maqola yuborish
						<svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
							<path
								d='M5 12h14M13 6l6 6-6 6'
								stroke='#fff'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>
				</div>
			</section>
	)
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ElektronJurnal() {
	return (
		<>
			<HeroSection />
			<JurnallarSection />
			<MaqolaTalablari />
			<TahririyatAzolari />
			<JurnalStatistika />
			<FAQSection hideParticles platformStyle />
			<Testimonial hideParticles platformStyle />
		</>
	)
}
