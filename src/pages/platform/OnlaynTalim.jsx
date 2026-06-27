import heroImg from '@/assets/f516843fe3b59d12e4f470312ad04916ab60c75f.jpg'
import groupImg0 from '@/assets/Group 1000002879.png'
import groupImg1 from '@/assets/Group 1000002880.png'
import groupImg2 from '@/assets/Group 1000002880 (1).png'
import groupImg3 from '@/assets/Rectangle 4412.png'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import FAQSection from '../../components/FAQSection'
import LazyLoad from '../../components/shared/LazyLoad'
import Text from '../../components/shared/Text'
import ModernEducation from '../../components/ModernEducation'
import CoursesSection from '../../components/CoursesSection'
const MentorsSection = lazy(() => import('../../components/MentorsSection'))

const ONLAYN_CARDS = [
	{
		id: 1,
		title: 'Global tajribaga ega ',
		highlight: 'mentorlar',
		tags: "Global mentorlik",
		description: "Dunyoning turli davlatlaridan tajribali mutaxassislar bilan zamonaviy kasblarni real tajriba asosida o'rganing. Barcha darslar amaliy misollar bilan tushuntiriladi.",
		img: groupImg0,
		startX: '-10%', startY: -10, exitX: '-100%', plainText: true,
	},
	{
		id: 2,
		title: "Amaliy va natijaga yo'naltirilgan ",
		highlight: "ta'lim",
		tags: "Amaliy ta'lim",
		description: "Har bir kurs real loyihalar va amaliy topshiriqlar asosida tuzilgan. Siz faqat nazariya emas, balki ish jarayonida kerak bo'ladigan ko'nikmalarni egalaysiz.",
		img: groupImg1,
		startX: '50%', startY: 30, exitX: '150%', plainText: true,
	},
	{
		id: 3,
		title: "Moslashuvchan va qulay ",
		highlight: "o'rganish",
		tags: "Moslashuvchan ta'lim",
		description: "Platformadan istalgan vaqtda va istalgan qurilmadan foydalanib o'qish mumkin. Darslar sizning vaqtingiz va sur'atiningizga moslashtirilgan.",
		img: groupImg2,
		startX: '-55%', startY: 60, exitX: '-180%', plainText: true,
	},
	{
		id: 4,
		title: "Sertifikat va karyera ",
		highlight: "imkoniyati",
		tags: "Karyera rivojlanishi",
		description: "Kurslarni muvaffaqiyatli yakunlagan talabalar sertifikatga ega bo'lishadi. Bu esa ishga kirish va professional rivojlanishda katta imkoniyat yaratadi.",
		img: groupImg3,
		startX: '40%', startY: -100, exitX: '120%', plainText: true, stayOnExit: true,
	},
]

const STATS = [
	{ value: '200 M+', label: 'Platformadagi faollik' },
	{ value: '45 000+', label: "O'quvchilar soni" },
	{ value: '120+', label: 'Mavjud kurslar' },
	{ value: '8 500+', label: 'Muvaffaqiyatli bitiruvchilar' },
]

const CIRCLE_SIZES = [1130, 850, 570, 300]
const GRAD_ID = 'cg1'

// IntersectionObserver hook
function useInView(threshold = 0.15) {
	const ref = useRef(null)
	const [inView, setInView] = useState(false)
	useEffect(() => {
		const el = ref.current
		if (!el) return
		const obs = new IntersectionObserver(
			([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
			{ threshold }
		)
		obs.observe(el)
		return () => obs.disconnect()
	}, [threshold])
	return [ref, inView]
}

// CountUp hook — "200 M+" → animatsiya qiladi, keyin original qiymatni ko'rsatadi
function useCountUp(targetStr, started) {
	const [display, setDisplay] = useState(targetStr)
	useEffect(() => {
		if (!started) return
		const match = targetStr.match(/^([\d\s]+)(.*)$/)
		if (!match) return
		const rawNum = parseInt(match[1].replace(/\s/g, ''), 10)
		const suffix = match[2]
		const duration = 1600
		let startTs = null
		const step = (ts) => {
			if (!startTs) startTs = ts
			const p = Math.min((ts - startTs) / duration, 1)
			if (p >= 1) {
				setDisplay(targetStr)
				return
			}
			const eased = 1 - Math.pow(2, -10 * p)
			const cur = Math.floor(eased * rawNum)
			const formatted = rawNum >= 1000
				? cur.toLocaleString('fr-FR').replace(/,/g, ' ')
				: String(cur)
			setDisplay(formatted + suffix)
			requestAnimationFrame(step)
		}
		requestAnimationFrame(step)
	}, [started, targetStr])
	return display
}

// Aylanuvchi + pulslanuvchi circles
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
				top: '5px',
				left: '50%',
				transform: 'translateX(-50%)',
				pointerEvents: 'none',
				zIndex: 0,
				animation: 'circleRotate 80s linear infinite',
			}}
		>
			<defs>
				<linearGradient id={GRAD_ID} x1='0' y1='0' x2='0' y2='1'>
					<stop offset='0%' stopColor='rgba(43,117,204,1)' />
					<stop offset='100%' stopColor='rgba(43,117,204,1)' />
				</linearGradient>
			</defs>
			{CIRCLE_SIZES.map((size, i) => (
				<circle
					key={size}
					cx={cx}
					cy={cy}
					r={size / 2}
					stroke={`url(#${GRAD_ID})`}
					strokeWidth='1'
					strokeOpacity='0.35'
					fill='none'
					style={{
						animation: `circlePulse ${4 + i}s ease-in-out infinite`,
						animationDelay: `${i * 0.5}s`,
					}}
				/>
			))}
		</svg>
	)
}

// Nafas oluvchi glow
function TextGlow() {
	return (
		<div
			style={{
				position: 'absolute',
				bottom: '200px',
				top: '150px',
				left: '50%',
				transform: 'translateX(-50%)',
				width: '1300px',
				height: '200px',
				background:
					'radial-gradient(circle at center, rgba(0,230,252,0.4) 0%, rgba(0,230,252,0.2) 40%, rgba(0,230,252,0.07) 65%, transparent 85%)',
				filter: 'blur(55px)',
				pointerEvents: 'none',
				zIndex: 0,
				animation: 'glowBreath 5s ease-in-out infinite',
			}}
		/>
	)
}

const PARTICLE_DATA = Array.from({ length: 20 }, (_, i) => ({
	id: i,
	left: `${5 + Math.random() * 90}%`,
	size: `${1.5 + Math.random() * 2.5}px`,
	delay: `${Math.random() * 7}s`,
	dur: `${6 + Math.random() * 6}s`,
}))

// Suzib chiquvchi zarrachalar
function Particles() {
	const pts = PARTICLE_DATA

	return (
		<div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
			{pts.map(p => (
				<div
					key={p.id}
					style={{
						position: 'absolute',
						bottom: '-8px',
						left: p.left,
						width: p.size,
						height: p.size,
						borderRadius: '50%',
						background: 'rgba(0,230,252,0.55)',
						animation: `particleDrift ${p.dur} linear ${p.delay} infinite`,
					}}
				/>
			))}
		</div>
	)
}

// Hero rasm — scroll reveal + hover
function HeroImage() {
	const [hovered, setHovered] = useState(false)
	const [ref, inView] = useInView(0.1)

	return (
		<div
			ref={ref}
			style={{
				maxWidth: '1200px',
				margin: '0 auto',
				borderRadius: '16px',
				overflow: 'hidden',
				boxShadow: '0px 0px 240px 0px rgba(0, 0, 0, 0.24)',
				opacity: inView ? 1 : 0,
				transform: inView ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.97)',
				transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)',
			}}
		>
			<img
				src={heroImg}
				alt="Onlayn ta'lim"
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				className='w-full h-55 md:h-149 object-cover'
				style={{
					filter: hovered ? 'grayscale(0%)' : 'grayscale(100%)',
					transform: hovered ? 'scale(1.03)' : 'scale(1)',
					transition: 'filter 0.5s ease, transform 0.6s ease',
				}}
			/>
		</div>
	)
}

// Hero matn — mount bo'lganda yuqoriga chiqadi
function HeroText() {
	const [visible, setVisible] = useState(false)
	useEffect(() => {
		const t = setTimeout(() => setVisible(true), 80)
		return () => clearTimeout(t)
	}, [])

	return (
		<div
			style={{
				position: 'relative',
				zIndex: 1,
				opacity: visible ? 1 : 0,
				transform: visible ? 'translateY(0)' : 'translateY(36px)',
				transition: 'opacity 0.85s ease 0.1s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s',
			}}
		>
			<Text
				buttonText="Onlayn ta'lim"
				title="Bilim va ko'nikmalarni"
				highlight='tizimli rivojlantirish'
				subtitle={
					<>
						Zamonaviy ta'lim metodlari asosida ishlab chiqilgan kurslar orqali
						<br className='hidden md:block' />
						{' '}bilimlaringizni chuqurlashtiring
					</>
				}
				buttonType='button2'
			/>
		</div>
	)
}

// Stat kartochka — countup + slide-in
function StatCard({ stat, index, started, isLast }) {
	const display = useCountUp(stat.value, started)
	return (
		<div
			className='relative flex flex-col items-center justify-center py-[27px] px-4 text-center'
			style={{
				opacity: started ? 1 : 0,
				transform: started ? 'translateY(0)' : 'translateY(28px)',
				transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`,
			}}
		>
			{/* MOBILE: gorizontal chiziq (1-qator pastida) */}
			{index < 2 && (
				<div className='md:hidden absolute bottom-0 left-0 right-0 h-px' style={{
					background: 'linear-gradient(90deg, transparent 0%, #2B75CC 50%, transparent 100%)',
					boxShadow: '0 0 6px rgba(43,117,204,0.7)',
				}} />
			)}
			{/* MOBILE: vertikal chiziq (chap ustun o'ngida) */}
			{index % 2 === 0 && (
				<div className='md:hidden absolute top-0 right-0 w-px h-full' style={{
					background: 'linear-gradient(180deg, transparent 0%, #2B75CC 50%, transparent 100%)',
					boxShadow: '0 0 6px rgba(43,117,204,0.7)',
				}} />
			)}
			{/* MOBILE: corner neon — markaz tomonga */}
			{index === 0 && <div className='md:hidden absolute bottom-0 right-0 w-1/5 h-px' style={{ background: 'linear-gradient(270deg, #2B75CC, transparent)' }} />}
			{index === 0 && <div className='md:hidden absolute bottom-0 left-0 w-1/5 h-px' style={{ background: 'linear-gradient(90deg, #2B75CC, transparent)' }} />}
			{index === 1 && <div className='md:hidden absolute bottom-0 left-0 w-1/5 h-px' style={{ background: 'linear-gradient(90deg, #2B75CC, transparent)' }} />}
			{index === 1 && <div className='md:hidden absolute bottom-0 right-0 w-1/5 h-px' style={{ background: 'linear-gradient(270deg, #2B75CC, transparent)' }} />}
			{index === 2 && <div className='md:hidden absolute top-0 right-0 w-1/5 h-px' style={{ background: 'linear-gradient(270deg, #2B75CC, transparent)' }} />}
			{index === 2 && <div className='md:hidden absolute top-0 left-0 w-1/5 h-px' style={{ background: 'linear-gradient(90deg, #2B75CC, transparent)' }} />}
			{index === 3 && <div className='md:hidden absolute top-0 left-0 w-1/5 h-px' style={{ background: 'linear-gradient(90deg, #2B75CC, transparent)' }} />}
			{index === 3 && <div className='md:hidden absolute top-0 right-0 w-1/5 h-px' style={{ background: 'linear-gradient(270deg, #2B75CC, transparent)' }} />}

			{/* DESKTOP: TOP LEFT NEON */}
			{index !== 0 && <div className='hidden md:block absolute top-0 left-0 w-1/6 h-px bg-linear-to-r from-[#2B75CC] via-[#2B75CC]/70 to-transparent' />}
			{/* DESKTOP: TOP RIGHT NEON */}
			{!isLast && <div className='hidden md:block absolute top-0 right-0 w-1/6 h-px bg-linear-to-l from-[#2B75CC] via-[#2B75CC]/70 to-black' />}
			{/* DESKTOP: BOTTOM LEFT NEON */}
			{index !== 0 && <div className='hidden md:block absolute bottom-0 left-0 w-1/6 h-px bg-linear-to-r from-[#2B75CC] via-[#2B75CC]/70 to-black' />}
			{/* DESKTOP: BOTTOM RIGHT NEON */}
			{!isLast && <div className='hidden md:block absolute bottom-0 right-0 w-1/6 h-px bg-linear-to-l from-[#2B75CC] via-[#2B75CC]/70 to-black' />}

			{/* DESKTOP: VERTICAL SEPARATOR */}
			{!isLast && (
				<div className='hidden md:block absolute top-0 right-0 w-px h-full' style={{
					background: 'linear-gradient(180deg, #2B75CC 0%, rgba(43,117,204,0.4) 10%, transparent 28%, transparent 72%, rgba(43,117,204,0.4) 90%, #2B75CC 100%)',
					boxShadow: '0 0 8px rgba(43,117,204,0.6)',
				}} />
			)}

			<h2 className='text-[28px] md:text-[42px] whitespace-nowrap' style={{
				fontFamily: '"Inter Display", Inter, sans-serif',
				fontWeight: 600,
				lineHeight: '1.2',
				letterSpacing: '-0.03em',
				color: '#fff',
				marginBottom: '8px',
			}}>
				{started ? display : stat.value}
			</h2>
			<p style={{
				fontFamily: '"Inter Display", Inter, sans-serif',
				fontWeight: 400,
				fontSize: '16px',
				lineHeight: '22px',
				letterSpacing: '-0.02em',
				color: 'rgba(188,188,188,1)',
				textAlign: 'center',
			}}>
				{stat.label}
			</p>
		</div>
	)
}

const OT_KF = `
@keyframes circleRotate {
	from { transform: translateX(-50%) rotate(0deg); }
	to   { transform: translateX(-50%) rotate(360deg); }
}
@keyframes circlePulse {
	0%, 100% { stroke-opacity: 0.25; }
	50%       { stroke-opacity: 0.6; }
}
@keyframes glowBreath {
	0%, 100% { opacity: 0.75; transform: translateX(-50%) scale(1); }
	50%       { opacity: 1;    transform: translateX(-50%) scale(1.1); }
}
@keyframes particleDrift {
	0%   { transform: translateY(0) translateX(0);    opacity: 0; }
	8%   { opacity: 1; }
	92%  { opacity: 1; }
	100% { transform: translateY(-130px) translateX(14px); opacity: 0; }
}
`

export default function OnlaynTalim() {
	const [statsRef, statsInView] = useInView(0.3)

	useEffect(() => {
		const el = document.createElement('style')
		el.setAttribute('data-ot-kf', '1')
		el.textContent = OT_KF
		document.head.appendChild(el)
		return () => document.head.removeChild(el)
	}, [])

	return (
		<div
			style={{
				color: '#fff',
				background: 'rgba(14, 18, 27, 1)',
				minHeight: '100vh',
			}}
		>
			{/* HERO */}
			<section className='relative flex flex-col items-center pt-20 md:pt-25 px-4 md:px-30 pb-0 gap-6 overflow-hidden'>
				<CirclesBg />
				<TextGlow />
				<Particles />

				<HeroText />

				<div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
					<HeroImage />
				</div>
			</section>

			{/* STATS */}
			<div ref={statsRef} className='w-full flex justify-center relative z-10 mt-[40px] px-4'>
				<div className='w-full max-w-[1000px]'>

					{/* Stats grid */}
					<div className='grid grid-cols-2 md:grid-cols-4'>
						{STATS.map((stat, i) => (
							<StatCard key={i} stat={stat} index={i} started={statsInView} isLast={i === STATS.length - 1} />
						))}
					</div>

				</div>
			</div>

			{/* LAZY SECTIONS — o'zgarishsiz */}
				<LazyLoad fallback={<div style={{ minHeight: '850px', background: 'rgba(14,18,27,1)' }} />}>
				<Suspense fallback={<div style={{ minHeight: '850px', background: 'rgba(14,18,27,1)' }} />}>
					<ModernEducation
						customCards={ONLAYN_CARDS}
						cardHeight={100}
						hideParticles
						headerProps={{
							buttonText: "Platforma haqida",
							buttonType: "button2",
							title: "Zamonaviy ta’lim,",
							highlight: "Global imkoniyatlar!",
							highlightColor: "#ffffff",
							subtitle: <>Bizning platforma orqali siz IT va zamonaviy kasblarni<br />mahalliy va xorijiy mutaxassislar bilan onlayn o’rganasiz.</>,
							hideParticles: true,
							titleStyle: { color: "#fff" },
							subtitleStyle: { fontSize: "16px" },
						}}
					/>
				</Suspense>
			</LazyLoad>
			<CoursesSection />
			<LazyLoad fallback={<div style={{ minHeight: '850px', background: 'rgba(14,18,27,1)' }} />}>
				<Suspense fallback={<div style={{ minHeight: '850px', background: 'rgba(14,18,27,1)' }} />}>
					<MentorsSection variant='online' />
				</Suspense>
			</LazyLoad>
			<LazyLoad fallback={<div style={{ minHeight: '850px', background: 'rgba(14,18,27,1)' }} />}>
				<Suspense fallback={<div style={{ minHeight: '850px', background: 'rgba(14,18,27,1)' }} />}>
					<FAQSection hideParticles platformStyle />
				</Suspense>
			</LazyLoad>
		</div>
	)
}