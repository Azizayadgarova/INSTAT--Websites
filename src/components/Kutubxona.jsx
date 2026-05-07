import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import bgGlow from '@/assets/bgImg/Background (1).png'
import BlurWords from './shared/BlurWords'
import { Button2 } from './shared/Button2'

const vp = { once: true, amount: 0.2 }
const DURATION = 3500

const data = [
	{
		id: '01',
		sub: 'Onlayn qidiruv',
		title: 'Kitobni toping',
		desc: "Har bir kitob sahifasida real vaqt ma'lumotlari ko'rsatiladi.",
		img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794',
	},
	{
		id: '02',
		sub: 'Navigatsiya',
		title: 'Oson navigatsiya',
		desc: "Kutubxonada yo'qolib qolmaysiz.",
		img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
	},
	{
		id: '03',
		sub: 'Qidiruv',
		title: 'Tez topish',
		desc: 'Kerakli kitobni tez topasiz.',
		img: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353',
	},
	{
		id: '04',
		sub: 'Bron',
		title: 'Kitobni oling',
		desc: 'Kutmasdan olib ketish.',
		img: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d',
	},
]

const Kutubxona = () => {
	const [active, setActive] = useState(0)
	const [paused, setPaused] = useState(false)

	// mouse tilt
	const tiltX = useMotionValue(0)
	const tiltY = useMotionValue(0)
	const springX = useSpring(tiltX, { stiffness: 160, damping: 20 })
	const springY = useSpring(tiltY, { stiffness: 160, damping: 20 })
	const wheelRef = useRef(null)

	// auto-play
	useEffect(() => {
		if (paused) return
		const t = setTimeout(() => setActive(a => (a + 1) % data.length), DURATION)
		return () => clearTimeout(t)
	}, [active, paused])

	const getOffset = (i) => {
		let diff = i - active
		if (diff > 2) diff -= data.length
		if (diff < -2) diff += data.length
		return diff
	}

	const handleMouseMove = (e) => {
		if (!wheelRef.current) return
		const rect = wheelRef.current.getBoundingClientRect()
		const cx = rect.left + rect.width / 2
		const cy = rect.top + rect.height / 2
		tiltY.set(((e.clientX - cx) / rect.width) * 12)
		tiltX.set(((cy - e.clientY) / rect.height) * 12)
	}

	const handleMouseLeave = () => {
		tiltX.set(0)
		tiltY.set(0)
	}

	return (
		<section
			className="relative w-full bg-[#0E121B] flex flex-col items-center overflow-hidden py-[40px] pb-[100px]"
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
		>
			{/* BACKGROUND */}
			<motion.img
				initial={{ opacity: 0, scale: 1.05 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1.2 }}
				src={bgGlow}
				className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] pointer-events-none"
			/>

			{/* HEADER */}
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={vp}
				transition={{ duration: 0.6 }}
				className="z-10 flex flex-col items-center text-center gap-5 max-w-[890px] px-6 mb-[80px]"
			>
				<Button2 text="Kutubxona" />
				<BlurWords
					text="Oflayn kutubxona – to'liq nazorat"
					delay={0.08}
					step={0.06}
					style={{ fontWeight: 600, fontSize: '48px', color: '#fff' }}
				/>
				<p className="text-[#CACACE] text-[16px] text-center">
					<BlurWords
						text="Oldindan rejalashtiring: kitobning mavjudligini bilib oling, uning aniq joylashuvini toping va kutubxonada ortiqcha kutmasdan oling!"
						delay={0.08}
						step={0.04}
					/>
				</p>
			</motion.div>

			{/* MAIN */}
			<div className="z-10 w-full max-w-300 flex gap-10 px-6">

				{/* LEFT */}
				<div className="flex-1">

					<motion.p
						key={`sub-${active}`}
						initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
						animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
						transition={{ duration: 0.5 }}
						className="text-[#6B7280]"
					>
						{data[active].sub}
					</motion.p>

					<motion.h2
						key={`title-${active}`}
						initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(10px)' }}
						animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
						transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
						className="text-white text-[42px] mb-6"
					>
						{data[active].title}
					</motion.h2>

					{/* 3D WHEEL + mouse tilt */}
					<motion.div
						ref={wheelRef}
						onMouseMove={handleMouseMove}
						onMouseLeave={handleMouseLeave}
						style={{ rotateX: springX, rotateY: springY, perspective: 1400 }}
						className="h-[260px] flex items-center justify-center"
					>
						<div className="relative w-[320px] h-[220px]" style={{ transformStyle: 'preserve-3d' }}>
							{data.map((item, i) => {
								const offset = getOffset(i)
								const isActive = offset === 0

								return (
									<motion.div
										key={i}
										onClick={() => setActive(i)}
										animate={{
											rotateX: offset * -55,
											y: offset * 90,
											z: isActive ? 260 : -120,
											scale: isActive ? 1 : 0.82,
											opacity: Math.abs(offset) > 2 ? 0 : isActive ? 1 : 0.5,
											filter: isActive ? 'blur(0px)' : 'blur(1.2px)',
										}}
										transition={{ type: 'spring', stiffness: 120, damping: 18 }}
										className="absolute w-full h-full rounded-[18px] overflow-hidden cursor-pointer bg-black"
										style={{
											transformStyle: 'preserve-3d',
											boxShadow: isActive
												? '0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(43,117,204,0.25)'
												: '0 15px 40px rgba(0,0,0,0.3)',
										}}
									>
										<motion.img
											src={item.img}
											className="w-full h-full object-cover"
											animate={{ scale: isActive ? 1.05 : 1 }}
											transition={{ duration: 0.6 }}
										/>

										<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

										{/* shine sweep on active */}
										{isActive && (
											<motion.div
												key={`shine-${active}`}
												initial={{ x: '-120%', opacity: 0.7 }}
												animate={{ x: '220%', opacity: 0 }}
												transition={{ duration: 1.0, ease: 'easeOut', delay: 0.08 }}
												style={{
													position: 'absolute', inset: 0,
													background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%)',
													pointerEvents: 'none',
												}}
											/>
										)}

										<motion.div
											className="absolute bottom-0 p-3 text-white w-full"
											animate={{ y: isActive ? 0 : 10, opacity: isActive ? 1 : 0.7 }}
										>
											<p className="text-[13px]">{item.desc}</p>
										</motion.div>
									</motion.div>
								)
							})}
						</div>
					</motion.div>
				</div>

				{/* RIGHT — numbers + progress */}
				<div className="flex flex-col justify-between items-end min-h-[300px]">
					{data.map((item, i) => (
						<div
							key={i}
							onClick={() => setActive(i)}
							className="flex items-center gap-3 cursor-pointer"
						>
							<motion.span
								whileHover={{ scale: 1.2 }}
								animate={{
									scale: i === active ? 1.3 : 1,
									opacity: i === active ? 1 : 0.4,
									color: i === active ? '#ffffff' : '#6B7280',
								}}
								transition={{ duration: 0.3 }}
								style={{ fontSize: '16px', fontWeight: 600 }}
							>
								{item.id}
							</motion.span>

							{/* progress track */}
							<div style={{
								width: 3, height: 36, borderRadius: 99,
								background: 'rgba(255,255,255,0.08)',
								overflow: 'hidden', position: 'relative',
							}}>
								{i === active && (
									<motion.div
										key={`prog-${active}`}
										initial={{ scaleY: 0 }}
										animate={{ scaleY: paused ? undefined : 1 }}
										transition={{ duration: DURATION / 1000, ease: 'linear' }}
										style={{
											position: 'absolute', inset: 0,
											borderRadius: 99,
											background: 'linear-gradient(180deg, #2B75CC, rgba(43,117,204,0.4))',
											transformOrigin: 'top',
										}}
									/>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default Kutubxona
