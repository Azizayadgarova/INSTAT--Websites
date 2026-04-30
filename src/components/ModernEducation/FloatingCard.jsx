import { memo } from 'react'
import { motion, useTransform } from 'framer-motion'
import { BUTTON_TEXT } from './cards'

const FloatingCard = memo(({ card, index, progress }) => {
	const step = 0.2
	const start = index * step
	const mid = start + step
	const end = start + step * 2

	const z = useTransform(progress, [0, mid, end], [index * -1200, 50, 1200])
	const scale = useTransform(progress, [start, mid, end], [1 - index * 0.18, 1.15, 1.5])

	const grayscaleValue = useTransform(progress, [start, mid - 0.05, mid], [1, 0.5, 0])
	const brightnessValue = useTransform(progress, [start, mid], [0.4, 1])
	const blurValue = useTransform(progress, [start, mid - 0.05, mid], [index * 4, index * 2, 0])

	const filter = useTransform(
		[blurValue, grayscaleValue, brightnessValue],
		([b, g, br]) => `blur(${b}px) grayscale(${g}) brightness(${br})`,
	)

	const initialYPos = index * 30 + parseInt(card.startY)
	const y = useTransform(
		progress,
		[start, mid, end],
		[`${initialYPos}%`, '0%', '-250%'],
	)
	const x = useTransform(
		progress,
		[start, mid, end],
		[`${card.startX}`, '0%', `${card.exitX}`],
	)

	const opacity = useTransform(progress, [start, mid, end - 0.1, end], [0.6, 1, 1, 0])

	return (
		<motion.div
			style={{
				position: 'absolute',
				left: '50%',
				top: '50%',
				x: '-50%',
				y: '-50%',
				translateX: x,
				translateY: y,
				translateZ: z,
				scale,
				opacity,
				filter,
				zIndex: 100 - index,
			}}
			className='[will-change:transform,filter,opacity]'
		>
			<div className='flex items-center gap-6'>
				<div className='relative w-64 h-44 md:w-[720px] md:h-[350px] rounded-3xl overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.9)]'>
					<img
						src={card.img}
						alt={card.title}
						width={720}
						height={350}
						loading='lazy'
						decoding='async'
						className='w-full h-full object-cover transition-colors duration-300'
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90' />
				</div>

				<div className='flex flex-col px-4 max-w-lg'>
					<span className='px-4 py-1.5 mb-3 text-xs w-fit font-medium text-[rgba(0,230,252,1)] bg-[rgba(22,27,38,1)] rounded-full border-none backdrop-blur-sm'>
						{card.tags}
					</span>

					<h3 className='text-white text-3xl md:text-5xl font-semibold leading-tight tracking-tight'>
						{card.title}
						<span className='bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'>
							{card.highlight}
						</span>
					</h3>

					<p className='text-white/60 text-sm md:text-base mt-4 leading-relaxed'>
						{card.description}
					</p>

					<button className='mt-6 w-fit px-6 py-3 rounded-xl bg-white/5 text-white border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)]'>
						{BUTTON_TEXT}
					</button>
				</div>
			</div>
		</motion.div>
	)
})

export default FloatingCard
