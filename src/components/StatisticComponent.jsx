import { memo, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import img from '@/assets/Illustration.png'

const stats = [
	{ number: 10000, suffix: '+', label: 'Foydalanuvchilar' },
	{ number: 50, suffix: '+', label: 'Hamkorlar' },
	{ number: 100, suffix: '+', label: 'Ekspertlar' },
	{ number: 5, suffix: '+', label: 'Platforma faoliyati' },
]

function CountUp({ target, suffix, inView }) {
	const [count, setCount] = useState(0)

	useEffect(() => {
		if (!inView) return
		const duration = 1800
		const startTime = performance.now()
		let raf

		const tick = (now) => {
			const t = Math.min((now - startTime) / duration, 1)
			setCount(Math.floor(t * target))
			if (t < 1) raf = requestAnimationFrame(tick)
			else setCount(target)
		}

		raf = requestAnimationFrame(tick)
		return () => cancelAnimationFrame(raf)
	}, [inView, target])

	return (
		<span>
			{count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{suffix}
		</span>
	)
}

const StatisticComponent = () => {
	const ref = useRef(null)
	const inView = useInView(ref, { once: true, margin: '-80px' })

	return (
		<div
			ref={ref}
			className="relative w-full min-h-[407px] flex items-center justify-center overflow-hidden py-10 lg:py-0"
		>
			<img
				src={img}
				alt=''
				aria-hidden='true'
				loading='lazy'
				decoding='async'
				className='absolute inset-0 w-full h-full object-contain pointer-events-none'
			/>
			<div
				className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
				style={{
					width: 'min(600px, 90vw)',
					height: 'min(600px, 90vw)',
					borderRadius: '50%',
					background: 'radial-gradient(circle, #00E6FC 0%, #2B75CC 36%, transparent 30%)',
					opacity: 0.16,
					filter: 'blur(40px)',
				}}
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-wrap justify-center gap-[38px] z-10 px-4">
				{stats.map((stat, index) => (
					<motion.div
						key={index}
						className="flex flex-col items-center"
						initial={{ opacity: 0, y: 40 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
					>
						<h2 className="text-[32px] md:text-[48px] font-semibold text-white leading-tight">
							<CountUp target={stat.number} suffix={stat.suffix} inView={inView} />
						</h2>
						<p className="text-[14px] md:text-[16px] text-gray-300 font-medium mt-2">
							{stat.label}
						</p>
					</motion.div>
				))}
			</div>
		</div>
	)
}

export default memo(StatisticComponent)
