import { memo, useId } from 'react'
import { motion } from 'framer-motion'

const AboutCard = memo(({ label, style, delay = 0, xFrom = 0 }) => {
	const uid = useId().replace(/:/g, '')
	const gradId = `figmaGlowGrad-${uid}`

	return (
		<motion.div
			className='group'
			initial={{ opacity: 0, x: xFrom }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
			style={{
				position: 'absolute',
				...style,
				width: '280px',
				height: '52px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: '12px',
				background: 'rgba(22, 27, 38, 0.85)',
				border: '1.5px solid #2F3A44',
				backdropFilter: 'blur(10px)',
				color: 'rgba(210, 230, 255, 0.95)',
				fontSize: '16px',
				fontWeight: 500,
				zIndex: 20,
				cursor: 'pointer',
				boxShadow: '0 8px 500px rgba(0, 0, 0, 0.4)',
				overflow: 'hidden',
			}}
		>
			<svg className='absolute inset-0 w-full h-full overflow-visible pointer-events-none'>
				<defs>
					<linearGradient id={gradId} x1='100%' y1='0%' x2='0%' y2='0%'>
						<stop offset='20%' stopColor='rgba(105,170,251,1)' stopOpacity='1' />
						<stop offset='80%' stopColor='rgba(39,66,92,0)' stopOpacity='0' />
					</linearGradient>
				</defs>
				<rect
					x='0.75'
					y='0.75'
					width='calc(100% - 1.5px)'
					height='calc(100% - 1.5px)'
					rx='12'
					fill='none'
					stroke={`url(#${gradId})`}
					strokeWidth='1'
					strokeDasharray='10 45'
					pathLength='100'
					style={{
						animation: 'cardSpin 15s linear infinite',
						filter: 'drop-shadow(0 0 2px #69AAFB)',
					}}
				/>
			</svg>
			{label}
		</motion.div>
	)
})

export default AboutCard
