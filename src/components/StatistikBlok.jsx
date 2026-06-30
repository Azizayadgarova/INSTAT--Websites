import React from 'react'
import { motion } from 'framer-motion'
import bgImage from '@/assets/Union.png'

const vp = { once: true, amount: 0.2 }

const stats = [
	{
		value: '120+',
		label: "Statistik ma'lumotlar\nto'plami",
		circle: {
			top: 300,
			left: -42,
		},
		labelStyle: {
			top: 200,
			left: -40,
			width: 180,
		},
	},
	{
		value: '500+',
		label: "Ma'lumotlar davri",
		circle: {
			top: 95,
			left: 242,
		},
		labelStyle: {
			top: 200,
			left: 560,
			width: 220,
		},
	},
	{
		value: '25 yil',
		label: "Statistik ko'rsatkichlar",
		circle: {
			top: 300,
			left: 528,
		},
		labelStyle: {
			top: 370,
			left: 260,
			width: 240,
		},
	},
	{
		value: '14',
		label: 'Hududiy qamrov',
		circle: {
			top: 95,
			left: 810,
		},
		labelStyle: {
			top: 370,
			left: 820,
			width: 220,
		},
	},
]

const StatistikBlok = () => {
	return (
		<section
			style={{
				width: '1100px',
				height: '700px',
				margin: '0 auto',
				position: 'relative',
				overflow: 'hidden',
	
			}}
		>
			{/* Background */}
			<div
				style={{
					position: 'absolute',
					bottom: 40,
					left: 0,
					width: '100%',
					height: '450px',
					backgroundImage: `url(${bgImage})`,
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					backgroundSize: '100% 100%',
					zIndex: 1,
				}}
			/>

			{/* Content */}
			<div
				style={{
					position: 'relative',
					zIndex: 2,
					width: '100%',
					height: '100%',
					padding: '80px 60px',
					boxSizing: 'border-box',
				}}
			>
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={vp}
					transition={{ duration: 0.6 }}
					style={{
						fontSize: '36px',
						fontWeight: 600,
						color: '#fff',
						margin: 0,
					}}
				>
					Statistik blok
				</motion.h2>

				<div
					style={{
						position: 'relative',
						width: '500px',
						height: '550px',
					}}
				>
					{stats.map((item, index) => (
						<React.Fragment key={index}>
							{/* Label */}
							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={vp}
								transition={{
									duration: 0.6,
									delay: index * 0.15,
								}}
								style={{
									position: 'absolute',
									...item.labelStyle,
									color: '#8F96A3',
									fontSize: '28px',
									lineHeight: '30px',
									fontWeight: 500,
									whiteSpace: 'pre-line',
								}}
							>
								{item.label}
							</motion.div>

							{/* Circle */}
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={vp}
								transition={{
									duration: 0.6,
									delay: index * 0.2,
								}}
								style={{
									position: 'absolute',
									top: item.circle.top,
									left: item.circle.left,
									width: '210px',
									height: '210px',
									borderRadius: '50%',
							
									background: 'rgba(var(--card-rgb),1)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: '#fff',
									fontSize:
										item.value === '25 yil'
											? '44px'
											: '54px',
									fontWeight: 600,
								}}
							>
								{item.value}
							</motion.div>
						</React.Fragment>
					))}
				</div>
			</div>
		</section>
	)
}

export default StatistikBlok