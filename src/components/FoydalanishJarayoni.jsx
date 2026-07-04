import bgGlow from '@/assets/bgImg/Background (1).png'
import icon1 from '@/assets/icons/Vector (2).png'
import icon2 from '@/assets/icons/Vector (3).png'
import icon3 from '@/assets/icons/Vector (4).png'
import icon4 from '@/assets/icons/Vector (5).png'
import illus1 from '@/assets/Illus.png'
import illus2 from '@/assets/Illustration (2).png'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion' // eslint-disable-line no-unused-vars
import { useEffect, useRef, useState } from 'react'
import AnimatedSection from './shared/AnimatedSection'
import { Button2 } from './shared/Button2'

const leftFeatures = [
	{
		icon: icon1,
		title: 'Keng qamrovli Qidiruv',
		description:
			"Janr, muallif yoki kalit so'zlar orqali kitoblarni tez va aniq toping. Shu bilan birga, kam uchraydigan va noyob asarlarni ham kashf etishingiz mumkin.",
	},
	{
		icon: icon2,
		title: "Moslashuvchan O'qish Tajribasi",
		description:
			"Kitoblarni istalgan qurilmada o'qing va o'qish parametrlarini shaxsiy ehtiyojlaringizga moslang. Yorqinlik, shrift va sahifa aylantirishni sozlash orqali maksimal qulaylikka erishing.",
	},
]

const rightFeatures = [
	{
		icon: icon3,
		title: 'Xavfsiz va Qulay Xarid',
		description:
			"Tanlangan kitobni bir necha soniyada sotib oling yoki bepul asarlardan foydalaning. To'lov jarayoni xavfsiz va tezkor bo'lib, sizga ishonchli xarid imkonini beradi.",
	},
	{
		icon: icon4,
		title: 'Shaxsiy Kutubxona Boshqaruvi',
		description:
			"Sotib olingan va saqlangan kitoblaringizni bitta joyda boshqaring. Kutubxonangizni mavzular bo'yicha tartiblang va istalgan vaqtda tezkor kirish imkoniyatidan foydalaning.",
	},
]

const vp = { once: true, amount: 0.2 }

/* ── Magnetic hover wrapper ── */
const MagneticWrap = ({ children, fromLeft, delay }) => {
	const ref = useRef(null)
	const [shimmer, setShimmer] = useState(false)

	const mx = useMotionValue(0)
	const my = useMotionValue(0)
	const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
		stiffness: 220,
		damping: 22,
	})
	const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
		stiffness: 220,
		damping: 22,
	})

	const onMove = e => {
		const r = ref.current.getBoundingClientRect()
		mx.set((e.clientX - r.left) / r.width - 0.5)
		my.set((e.clientY - r.top) / r.height - 0.5)
	}
	const onEnter = () => {
		setShimmer(false)
		requestAnimationFrame(() => setShimmer(true))
	}
	const onLeave = () => {
		mx.set(0)
		my.set(0)
		setShimmer(false)
	}

	return (
		<motion.div
			initial={{
				opacity: 0,
				rotateY: fromLeft ? 60 : -60,
				x: fromLeft ? -24 : 24,
			}}
			whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
			viewport={vp}
			transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
			style={{ transformStyle: 'preserve-3d', perspective: '900px' }}
		>
			<motion.div
				ref={ref}
				onMouseMove={onMove}
				onMouseEnter={onEnter}
				onMouseLeave={onLeave}
				style={{
					rotateX: rx,
					rotateY: ry,
					transformStyle: 'preserve-3d',
					position: 'relative',
					borderRadius: '17px',
				}}
			>
				{/* Shimmer sweep */}
				{shimmer && (
					<div
						style={{
							position: 'absolute',
							inset: 0,
							borderRadius: '17px',
							overflow: 'hidden',
							pointerEvents: 'none',
							zIndex: 10,
						}}
					>
						<div
							style={{
								position: 'absolute',
								top: '-60%',
								width: '45%',
								height: '260%',
								background:
									'linear-gradient(105deg,rgba(255,255,255,0) 0%,rgba(255,255,255,0.09) 50%,rgba(255,255,255,0) 100%)',
								transform: 'skewX(-15deg)',
								animation:
									'shimmerSweep 0.65s cubic-bezier(0.22,1,0.36,1) both',
							}}
						/>
					</div>
				)}
				{children}
			</motion.div>
		</motion.div>
	)
}

/* ── Static feature card (vizual o'zgarmaydi) ── */
const FeatureCard = ({ icon, title, description }) => (
	<div
		style={{
			backgroundColor: 'rgba(var(--card-rgb),1)',
			border: '1px solid rgba(255, 255, 255, 0.08)',
			borderRadius: '16px',
			padding: '24px',
			display: 'flex',
			flexDirection: 'column',
			gap: '10px',
			width: '100%',
			height: '376px',
			boxSizing: 'border-box',
		}}
	>
		<div
			style={{
				width: '76px',
				height: '76px',
				backgroundColor: 'rgba(255,255,255,0.04)',
				borderRadius: '10px',
				border: '1px solid rgba(255,255,255,0.04)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				marginBottom: '40px',
				flexShrink: 0,
			}}
		>
			<img
				src={icon}
				alt=''
				style={{ width: '33px', height: '28px', objectFit: 'contain' }}
			/>
		</div>
		<h3
			style={{
				fontFamily: 'var(--font-display)',
				fontWeight: 700,
				fontSize: '24px',
				lineHeight: '28px',
				color: 'rgba(230,230,233,1)',
				margin: '0 0 12px 0',
			}}
		>
			{title}
		</h3>
		<p
			style={{
				fontFamily: 'var(--font-inter)',
				fontWeight: 400,
				fontSize: '16px',
				lineHeight: '22px',
				color: 'rgba(202, 202, 206, 1)',
				margin: 0,
			}}
		>
			{description}
		</p>
	</div>
)

const FoydalanishJarayoni = () => {
	const bgRef = useRef(null)
	const [bgVisible, setBgVisible] = useState(false)

	useEffect(() => {
		const el = bgRef.current?.parentElement
		if (!el) return
		const observer = new IntersectionObserver(
			([entry]) => setBgVisible(entry.isIntersecting),
			{ threshold: 0.05 },
		)
		observer.observe(el)
		return () => observer.disconnect()
	}, [])

	return (
		<>
			<section
				style={{
					width: '100%',
					maxWidth: '1440px',
					margin: '0 auto',
					backgroundColor: 'rgba(var(--bg-rgb),1)',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					position: 'relative',
					overflow: 'hidden',
					paddingBottom: '40px',
				}}
			>
				<img
					ref={bgRef}
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
						opacity: bgVisible ? 1 : 0,
						transition: 'opacity 2.4s cubic-bezier(0.16, 1, 0.3, 1)',
					}}
				/>

				{/* Header */}
				<AnimatedSection
					style={{
						position: 'relative',
						zIndex: 1,
						paddingTop: '40px',
						paddingBottom: '48px',
						width: '100%',
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							textAlign: 'center',
							gap: '20px',
						}}
					>
						<Button2 text='Foydalanish jarayoni' />

						<h2
							className='text-[36px] leading-[44px] md:text-[48px] md:leading-[54px]'
							style={{
								fontFamily: 'var(--font-display)',
								fontWeight: 600,
								color: '#ffffff',
								margin: 0,
								letterSpacing: '-0.02em',
							}}
						>
							Platforma Qanday Ishlaydi?
						</h2>

						<p
							className='text-[14px] max-w-[327px] md:text-[16px] md:max-w-[560px]'
							style={{
								fontFamily: 'var(--font-display)',
								fontWeight: 400,
								lineHeight: '140%',
								color: 'rgba(202, 202, 206, 1)',
								textAlign: 'center',
								margin: 0,
							}}
						>
							Raqamli kutubxonadan foydalanish jarayoni — kitob tanlash, xarid
							qilish va platforma ichida o&apos;qish bosqichlari haqida qisqacha
							ma&apos;lumot.
						</p>
					</div>
				</AnimatedSection>

				{/* Grid: mobile=1ustun, desktop=3ustun */}
				<div
					className='grid grid-cols-1 lg:grid-cols-3'
					style={{
						position: 'relative',
						zIndex: 1,
						width: '100%',
						maxWidth: '1200px',
						gap: '25px',
						padding: '0 24px',
					}}
				>
					{/* 1 — left[0]: desktop col-1 row-1 */}
					<div className='lg:col-start-1 lg:row-start-1'>
						<MagneticWrap fromLeft delay={0}>
							<FeatureCard {...leftFeatures[0]} />
						</MagneticWrap>
					</div>

					{/* 2 — illus1: desktop col-2 row-1 */}
					<motion.div
						className='lg:col-start-2 lg:row-start-1'
						initial={{ opacity: 0, scale: 0.97, y: 30 }}
						whileInView={{ opacity: 1, scale: 1, y: 0 }}
						viewport={vp}
						transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0 }}
						style={{ borderRadius: '16px', overflow: 'hidden', width: '100%', height: '376px', border: '1px solid rgba(255,255,255,0.08)' }}
					>
						<img src={illus1} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
					</motion.div>

					{/* 3 — right[0]: desktop col-3 row-1 */}
					<div className='lg:col-start-3 lg:row-start-1'>
						<MagneticWrap fromLeft={false} delay={0}>
							<FeatureCard {...rightFeatures[0]} />
						</MagneticWrap>
					</div>

					{/* 4 — left[1]: desktop col-1 row-2 */}
					<div className='lg:col-start-1 lg:row-start-2'>
						<MagneticWrap fromLeft delay={0.15}>
							<FeatureCard {...leftFeatures[1]} />
						</MagneticWrap>
					</div>

					{/* 5 — illus2: desktop col-2 row-2 */}
					<motion.div
						className='lg:col-start-2 lg:row-start-2'
						initial={{ opacity: 0, scale: 0.97, y: 30 }}
						whileInView={{ opacity: 1, scale: 1, y: 0 }}
						viewport={vp}
						transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
						style={{ borderRadius: '16px', overflow: 'hidden', width: '100%', height: '376px', border: '1px solid rgba(255,255,255,0.08)' }}
					>
						<img src={illus2} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
					</motion.div>

					{/* 6 — right[1]: desktop col-3 row-2 */}
					<div className='lg:col-start-3 lg:row-start-2'>
						<MagneticWrap fromLeft={false} delay={0.15}>
							<FeatureCard {...rightFeatures[1]} />
						</MagneticWrap>
					</div>
				</div>
			</section>
		</>
	)
}

export default FoydalanishJarayoni
