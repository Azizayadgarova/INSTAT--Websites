import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import bgGlow from '@/assets/bgImg/Background (1).png'
import BlurWords from './shared/BlurWords'
import { Button2 } from './shared/Button2'

const vp = { once: true, amount: 0.1 }
const DURATION = 4000

const data = [
	{
		id: '01',
		title: 'Onlayn qidiruv',
		desc: "Har bir kitob sahifasida uning real vaqtdagi mavjudlik holati ko'rsatiladi. Tizim orqali kutubxonada nechta nusxa borligi, qaysi bo'lim yoki javonda joylashgani haqida aniq ma'lumot olishingiz mumkin. Agar kitobning elektron versiyasi mavjud bo'lsa, bu ham alohida belgilab qo'yiladi.",
		img: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=700&q=80',
	},
	{
		id: '02',
		title: 'Kitobni toping',
		desc: "Har bir kitob sahifasida uning real vaqtdagi mavjudlik holati ko'rsatiladi. Tizim orqali kutubxonada nechta nusxa borligi, qaysi bo'lim yoki javonda joylashgani haqida aniq ma'lumot olishingiz mumkin. Agar kitobning elektron versiyasi mavjud bo'lsa, bu ham alohida belgilab qo'yiladi.",
		img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=700&q=80',
	},
	{
		id: '03',
		title: 'Oson navigatsiya',
		desc: "Kutubxonada yo'qolib qolmaysiz. Har bir bo'lim, shkaf va javon aniq belgilangan. Siz qidirayotgan kitob qayerda turganini ko'rishingiz va to'g'ridan-to'g'ri unga yo'nalish olishingiz mumkin. Navigatsiya tizimi sizga eng qisqa yo'lni ko'rsatadi.",
		img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&q=80',
	},
	{
		id: '04',
		title: 'Kitobni oling',
		desc: "Kerakli kitobni oldindan bron qiling va kutmasdan olib keting. Tizim sizga qachon kitob qaytarilishini va qachon tayyorligini avtomatik ravishda xabar beradi. Bir necha daqiqa ichida kitob sizning qo'lingizda bo'ladi.",
		img: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=700&q=80',
	},
]

const TiltCard = ({ src, alt = '' }) => {
	const ref = useRef(null)
	const mx = useMotionValue(0)
	const my = useMotionValue(0)

	const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 200, damping: 24 })
	const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 200, damping: 24 })

	const shineX = useTransform(mx, [-0.5, 0.5], [0, 100])
	const shineY = useTransform(my, [-0.5, 0.5], [0, 100])
	const shine = useTransform(
		[shineX, shineY],
		([sx, sy]) =>
			`radial-gradient(circle at ${sx}% ${sy}%, rgba(255,255,255,0.22) 0%, rgba(var(--blue-rgb),0.08) 40%, transparent 65%)`
	)

	const onMove = (e) => {
		const r = ref.current.getBoundingClientRect()
		mx.set((e.clientX - r.left) / r.width - 0.5)
		my.set((e.clientY - r.top) / r.height - 0.5)
	}
	const onLeave = () => { mx.set(0); my.set(0) }

	return (
		<div
			ref={ref}
			onMouseMove={onMove}
			onMouseLeave={onLeave}
			className='w-full h-[220px] md:w-[500px] md:h-[320px] flex-shrink-0'
			style={{ perspective: 900 }}
		>
			<motion.div
				initial={{ opacity: 0, rotateX: 35, y: -50, scale: 0.85 }}
				animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
				transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
				style={{
					rotateX,
					rotateY,
					transformStyle: 'preserve-3d',
					width: '100%',
					height: '100%',
					borderRadius: 16,
					overflow: 'hidden',
					position: 'relative',
					boxShadow: 'none',
				}}
			>
				<img
					src={src}
					style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} alt={alt} loading='lazy' decoding='async' />
				<motion.div
					style={{
						position: 'absolute', inset: 0,
						background: shine,
						pointerEvents: 'none',
						mixBlendMode: 'overlay',
					}}
				/>
				<div
					style={{
						position: 'absolute', inset: 0, borderRadius: 16,
						boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
						pointerEvents: 'none',
					}}
				/>
			</motion.div>
		</div>
	)
}

const Kutubxona = () => {
	const [active, setActive] = useState(0)
	const [paused, setPaused] = useState(false)
	const bgRef = useRef(null)
	const [bgVisible, setBgVisible] = useState(false)

	useEffect(() => {
		if (paused) return
		const t = setTimeout(() => setActive(a => (a + 1) % data.length), DURATION)
		return () => clearTimeout(t)
	}, [active, paused])

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
		<section
			className="relative w-full bg-[#0E121B] flex flex-col items-center overflow-hidden py-[40px] pb-10"
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
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
				}} loading='lazy' decoding='async' />

			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={vp}
				transition={{ duration: 0.6 }}
				className="z-10 flex flex-col items-center text-center gap-5 max-w-[890px] px-6 mb-15"
			>
				<Button2 text="Kutubxona" />
				<BlurWords
					text="Oflayn kutubxona – to'liq nazorat"
					delay={0.08}
					step={0.06}
					className='text-[32px] md:text-[48px]'
					style={{ fontWeight: 600, color: '#fff' }}
				/>
				<p className="text-[#CACACE] text-[14px] md:text-[16px] max-w-[327px] md:max-w-none text-center">
					<BlurWords
						text="Oldindan rejalashtiring: kitobning mavjudligini bilib oling, uning aniq joylashuvini toping va kutubxonada ortiqcha kutmasdan oling!"
						delay={0.08}
						step={0.04}
					/>
				</p>
			</motion.div>

<div className="z-10 w-full max-w-275 px-6">
				{data.map((item, i) => {
					const isActive = i === active
					return (
						<motion.div
							key={item.id}
							className={`cursor-pointer border-b border-white/8 ${i === 0 ? 'border-t' : ''}`}
							onClick={() => setActive(i)}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
						>
							<motion.div
								className={`flex items-center justify-between pt-5 select-none ${isActive ? 'pb-2' : 'pb-5'}`}
								whileHover={!isActive ? { x: 7 } : {}}
								transition={{ type: 'spring', stiffness: 380, damping: 32 }}
							>
								<h3
									style={{
										fontFamily: 'var(--font-display)',
										fontWeight: 600,
										fontSize: isActive ? 'clamp(28px, 7vw, 56px)' : 'clamp(18px, 5vw, 48px)',
										lineHeight: 1.1,
										letterSpacing: '0em',
										color: isActive ? '#ffffff' : 'rgba(90, 98, 117, 1)',
										transition:
											'color 0.3s ease, font-size 0.35s ease, font-weight 0.3s ease',
									}}
								>
									{item.title}
								</h3>

								<span
									style={{
										fontFamily: 'var(--font-display)',
										fontWeight: 500,
										fontSize: 'clamp(16px, 4vw, 32px)',
										lineHeight: '40px',
										letterSpacing: '-0.005em',
										color: isActive ? 'rgba(255, 255, 255, 1)' : 'rgba(90, 98, 117, 1)',
										marginLeft: 16,
										flexShrink: 0,
									}}
								>
									{item.id}
								</span>
							</motion.div>

							<AnimatePresence initial={false}>
								{isActive && (
									<motion.div
										key="content"
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: 'auto', opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
										className="overflow-hidden"
									>
										{/* Mobile: rasm to'liq kenglik + matn pastda */}
										<div className="md:hidden flex flex-col gap-4 pb-6">
											<TiltCard src={item.img} alt={item.title} />
											<motion.p
												initial={{ opacity: 0, y: -16 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.4, delay: 0.18 }}
												style={{
													fontFamily: 'var(--font-display)',
													fontWeight: 400,
													fontSize: '14px',
													lineHeight: '1.65',
													color: 'rgba(var(--muted-rgb),1)',
												}}
											>
												{item.desc}
											</motion.p>
										</div>

										{/* Desktop: rasm + matn yonma-yon */}
										<div className="hidden md:flex gap-10 pb-10 items-start pl-2 pt-0">
											<TiltCard src={item.img} alt={item.title} />
											<motion.p
												initial={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
												animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
												transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
												style={{
													fontFamily: 'var(--font-display)',
													fontWeight: 500,
													fontSize: '24px',
													lineHeight: '32px',
													letterSpacing: '-0.015em',
													color: 'rgba(var(--muted-rgb),1)',
												}}
											>
												{item.desc}
											</motion.p>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					)
				})}
			</div>
		</section>
	)
}

export default Kutubxona
