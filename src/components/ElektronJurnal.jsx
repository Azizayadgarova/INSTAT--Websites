import img1 from '@/assets/2.webp'
import img2 from '@/assets/3.webp'
import img3 from '@/assets/4.webp'
import img4 from '@/assets/5.webp'
import img5 from '@/assets/6.webp'
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
const SPEED = 0.004
const C_W = 294
const C_H = 390
const RADIUS = 360          // radius of the 3D ring
const ANGLE_STEP = 360 / N  // angular gap between cards on the ring
const DRAG_PER_CARD = 150   // px of horizontal drag to advance one card
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
@media (max-width: 767px) { .ej-carousel { transform: scale(0.72); transform-origin: center top; } }
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
			? 'rgba(var(--blue-rgb),1)'
			: 'rgba(var(--card-rgb),1)'
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
				fontFamily: 'var(--font-display)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				transition: 'background .2s',
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

// ─── Journal card ─────────────────────────────────────────────────────────────

const JournalCard = memo(function JournalCard({ j }) {
	return (
		<div
			className='w-[282px] md:w-full mx-auto md:mx-0'
			style={{
				height: '342px',
				borderRadius: '20px',
				backgroundColor: 'rgba(22,27,38,1)',
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
					background: 'rgba(var(--card-rgb),1)',
					overflow: 'hidden',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
			>
				<p
					style={{
						fontFamily: 'var(--font-display)',
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
						fontFamily: 'var(--font-display)',
						fontWeight: 400,
						fontSize: '16px',
						lineHeight: '120%',
						color: 'rgba(var(--text-rgb),1)',
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
		fontFamily: 'var(--font-display)',
		color: active ? 'rgba(var(--cyan-rgb),0.9)' : 'rgba(200,205,220,0.75)',
		background: active ? 'rgba(var(--cyan-rgb),0.06)' : 'transparent',
		borderBottom: '1px solid rgba(255,255,255,0.04)',
		transition: 'background 0.15s, color 0.15s',
	})

	return (
		<div
			className='w-[327px] md:w-full mx-auto md:mx-0'
			style={{
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
						fontFamily: 'var(--font-display)',
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
						fontFamily: 'var(--font-display)',
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
				className='hidden md:block'
				style={{
					width: '1px',
					height: '30px',
					background: 'white',
					flexShrink: 0,
				}}
			/>

			{/* Categories */}
			<div
				className='hidden md:flex flex-col justify-center'
				style={{
					position: 'relative',
					flex: 1,
					padding: '0 16px',
					cursor: 'pointer',
					height: '100%',
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
						fontFamily: 'var(--font-display)',
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
						fontFamily: 'var(--font-display)',
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
					className='h-[48px] rounded-[12px] md:rounded-[10px] px-[14px] md:px-[24px]'
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '4px',
						background: 'rgba(43,117,204,1)',
						color: '#fff',
						border: '1px solid rgba(255,255,255,0.15)',
						fontSize: '14px',
						fontWeight: 500,
						cursor: 'pointer',
						fontFamily: 'var(--font-display)',
						flexShrink: 0,
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
			className='justify-center md:justify-between'
			style={{
				display: 'flex',
				alignItems: 'center',
				width: '100%',
				maxWidth: '1224px',
				position: 'relative',
				zIndex: 1,
			}}
		>
			<span
				className='hidden md:inline'
				style={{
					fontFamily: 'var(--font-display)',
					fontSize: '14px',
					color: 'rgba(100,110,130,1)',
					minWidth: '60px',
				}}
			>
				Sahifa
			</span>
			<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
				<span className='hidden md:contents'>
					<PagBtn nav onClick={() => setPage(1)}>«</PagBtn>
				</span>
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
								fontFamily: 'var(--font-display)',
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
				<span className='hidden md:contents'>
					<PagBtn nav onClick={() => setPage(total)}>»</PagBtn>
				</span>
			</div>
			<button
				className='hidden md:flex'
				onClick={() => setPage(total)}
				style={{
					fontFamily: 'var(--font-display)',
					fontSize: '14px',
					color: 'rgba(150,160,180,1)',
					background: 'none',
					border: 'none',
					cursor: 'pointer',
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
				background: 'rgba(var(--bg-rgb),1)',
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
				}} loading='lazy' decoding='async' />

			<AnimatedSection style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
					<Button2 text='Jurnallar' />

					<h2
						style={{
							fontFamily: 'var(--font-display)',
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
							fontFamily: 'var(--font-display)',
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

			<div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '800px' }}>
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
				className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center md:justify-items-stretch'
				style={{
					gap: '20px',
					marginBottom: '48px',
					position: 'relative',
					zIndex: 1,
					width: '100%',
					maxWidth: '1200px',
				}}
			>
				{displayed.length > 0 ? displayed.map((j, i) => (
					<JournalCard key={i} j={j} />
				)) : (
					<div style={{
						gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0',
						fontFamily: 'var(--font-display)',
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
			? 'linear-gradient(270deg,rgba(var(--cyan-rgb),.6),rgba(var(--blue-rgb),.5),rgba(var(--cyan-rgb),.6))'
			: 'linear-gradient(270deg,rgba(var(--blue-rgb),.35),rgba(var(--cyan-rgb),.2),rgba(var(--blue-rgb),.35))'

	const boxShadow = isH
		? '0 60px 140px rgba(0,0,0,.95), 0 0 90px rgba(var(--cyan-rgb),.35)'
		: tf.abs < 0.5
			? '0 30px 80px rgba(0,0,0,.75), 0 0 40px rgba(var(--cyan-rgb),.15)'
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
						? 'radial-gradient(ellipse,rgba(var(--cyan-rgb),.75) 0%,transparent 70%)'
						: 'radial-gradient(ellipse,rgba(var(--blue-rgb),.38) 0%,transparent 70%)',
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
						? '0 0 40px rgba(var(--cyan-rgb),.55)'
						: tf.abs < 0.5
							? '0 0 20px rgba(var(--cyan-rgb),.25)'
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
										'linear-gradient(135deg,rgba(var(--cyan-rgb),.1) 0%,rgba(123,143,255,.08) 50%,rgba(var(--blue-rgb),.1) 100%)',
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
									border: '2px solid rgba(var(--cyan-rgb),.85)',
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
									? 'inset 0 0 0 1.5px rgba(var(--cyan-rgb),.75)'
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
								'linear-gradient(145deg,rgba(var(--bg-rgb),1) 0%,rgba(22,34,58,1) 60%,rgba(10,30,50,1) 100%)',
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
									'radial-gradient(circle,rgba(var(--cyan-rgb),.2) 0%,transparent 70%)',
								pointerEvents: 'none',
							}}
						/>
						<div
							style={{
								width: '62px',
								height: '62px',
								borderRadius: '14px',
								zIndex: 1,
								background: 'rgba(var(--cyan-rgb),.08)',
								border: '1px solid rgba(var(--cyan-rgb),.3)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<svg width='26' height='26' viewBox='0 0 24 24' fill='none'>
								<path
									d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
									stroke='rgba(var(--cyan-rgb),1)'
									strokeWidth='1.8'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</div>
						<h3
							style={{
								fontFamily: 'var(--font-display)',
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
								color: 'rgba(var(--text-rgb),1)',
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
									'linear-gradient(90deg,rgba(var(--cyan-rgb),.15),rgba(var(--blue-rgb),.15))',
								border: '1px solid rgba(var(--cyan-rgb),.35)',
								color: 'rgba(var(--cyan-rgb),1)',
								fontSize: '13px',
								fontWeight: 600,
								fontFamily: 'var(--font-display)',
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

function useIsMobile(bp = 768) {
	const [mob, setMob] = useState(false)
	useEffect(() => {
		const check = () => setMob(window.innerWidth < bp)
		check()
		window.addEventListener('resize', check, { passive: true })
		return () => window.removeEventListener('resize', check)
	}, [bp])
	return mob
}

function HeroSection() {
	const isMobile = useIsMobile()
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

	// Hand-drag (rotate the ring by pointer)
	const draggingRef     = useRef(false)
	const dragStartXRef   = useRef(0)
	const dragStartIdxRef = useRef(0)
	const movedRef        = useRef(false)

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
			// Auto-rotate unless hovered or being dragged by hand
			if (!pausedRef.current && !draggingRef.current)
				indexRef.current = (indexRef.current + SPEED) % N
			const ci = indexRef.current
			const tfs = CARDS.map((_, i) => {
				const off = wrapOffset(i - ci)
				const angle = off * ANGLE_STEP        // this card's angle on the ring
				const rad = (angle * Math.PI) / 180
				const cos = Math.cos(rad)
				const sin = Math.sin(rad)
				const depth = (cos + 1) / 2           // 1 = front, 0 = directly behind
				return {
					rotY: angle,                      // card faces outward along the ring
					transX: sin * RADIUS,             // circular X placement
					transZ: (cos - 1) * RADIUS,       // front card at Z=0, rest curve back
					transY: 0,
					scale: 0.82 + depth * 0.18,
					opac: 0.35 + depth * 0.65,
					zIdx: Math.round(depth * 100),
					abs: Math.abs(off),
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
		if (draggingRef.current) return
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
		if (draggingRef.current) return
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
		if (movedRef.current) return   // ignore click that was actually a drag
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

	// ── Hand-drag: rotate the ring by pointer (mouse + touch) ──
	const onDragStart = useCallback(e => {
		draggingRef.current = true
		movedRef.current = false
		dragStartXRef.current = e.clientX
		dragStartIdxRef.current = indexRef.current
		pausedRef.current = true
		setHovered(null)
		e.currentTarget.setPointerCapture?.(e.pointerId)
	}, [])

	const onDragMove = useCallback(e => {
		if (!draggingRef.current) return
		const dx = e.clientX - dragStartXRef.current
		if (Math.abs(dx) > 4) movedRef.current = true
		// drag left → advance forward through the ring
		let idx = dragStartIdxRef.current - dx / DRAG_PER_CARD
		indexRef.current = ((idx % N) + N) % N
	}, [])

	const onDragEnd = useCallback(e => {
		if (!draggingRef.current) return
		draggingRef.current = false
		pausedRef.current = false
		e.currentTarget?.releasePointerCapture?.(e.pointerId)
	}, [])

	return (
		<section
			ref={sectionRef}
				style={{
					width: '100%',
					backgroundImage: 'url(/BG.webp)',
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
							fontFamily: 'var(--font-display)',
							fontWeight: 600,
							fontSize: 'clamp(32px, 8.33vw, 64px)',
							lineHeight: 1.1,
							letterSpacing: '-.03em',
							color: '#fff',
							maxWidth: '1100px',
							margin: 0,
						}}
					>
						Ilmiy jurnallar va maqolalar uchun
						<br />
						<span style={{ color: 'rgba(var(--cyan-rgb),1)' }}>yagona platforma</span>
					</h1>
					<p
						style={{
							fontFamily: 'var(--font-display)',
							fontWeight: 400,
							fontSize: '16px',
							lineHeight: 1.6,
							color: 'rgba(var(--text-rgb),1)',
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
					className='ej-carousel'
					onPointerDown={onDragStart}
					onPointerMove={onDragMove}
					onPointerUp={onDragEnd}
					onPointerCancel={onDragEnd}
					style={{
						position: 'relative',
						width: '100%',
						height: isMobile ? `${C_H}px` : '480px',
						marginTop: isMobile ? '32px' : '52px',
						perspective: '1100px',
						perspectiveOrigin: '50% 38%',
						opacity: visible ? 1 : 0,
						transition: 'opacity 1s ease .3s',
						cursor: 'grab',
						touchAction: 'pan-y',
						userSelect: 'none',
						WebkitUserSelect: 'none',
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
							backgroundColor: 'rgba(var(--blue-rgb),1)',
							color: '#fff',
							border: 'none',
							borderRadius: '100px',
							padding: '14px 28px',
							fontSize: '16px',
							fontWeight: 500,
							fontFamily: 'var(--font-display)',
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
