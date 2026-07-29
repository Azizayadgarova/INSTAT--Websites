import { motion } from 'framer-motion'
import { memo, useId } from 'react'
import { useNavigate } from 'react-router-dom'
import { EASE_SMOOTH } from '../../constants/animations'

const AboutCard = memo(({ label, style, delay = 0, xFrom = 0, to, mobile }) => {
	const uid = useId().replace(/:/g, '')
	const gradId = `figmaGlowGrad-${uid}`
	const navigate = useNavigate()

	return (
		<motion.div
			className='group'
			initial={{ opacity: 0, x: mobile ? 0 : xFrom, y: mobile ? 10 : 0 }}
			animate={{ opacity: 1, x: 0, y: 0 }}
			transition={{ duration: 0.5, delay, ease: EASE_SMOOTH }}
			onClick={() => to && navigate(to)}
			style={mobile ? {
				position: 'relative',
				width: '100%',
				height: '52px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: '12px',
				background: 'rgba(var(--card-rgb),0.85)',
				border: '1.5px solid #2F3A44',
				backdropFilter: 'blur(10px)',
				color: 'rgba(251, 251, 251, 1)',
				fontFamily: 'var(--font-inter)',
				fontSize: '16px',
				fontWeight: 400,
				lineHeight: '100%',
				textAlign: 'center',
				cursor: to ? 'pointer' : 'default',
				boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
				overflow: 'hidden',
			} : {
				position: 'absolute',
				...style,
				width: '280px',
				height: '52px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: '12px',
				background: 'rgba(var(--card-rgb),0.85)',
				border: '1.5px solid #2F3A44',
				backdropFilter: 'blur(10px)',
				color: 'rgba(251, 251, 251, 1)',
				fontFamily: 'var(--font-inter)',
				fontSize: '24px',
				fontWeight: 400,
				lineHeight: '100%',
				letterSpacing: '0%',
				textAlign: 'center',
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
