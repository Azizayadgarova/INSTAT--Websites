import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import React from 'react'
import bgImage from '@/assets/Union.png'
import bgMobile from '@/assets/Union (2).png'
import { useSectionStats } from '@/hooks/useSectionStats'
import { useSectionText } from '@/hooks/useSectionText'

const vp = { once: true, amount: 0.2 }

// Raqam (`value`) va izoh (`label`) backend'ning micro_data modulidan keladi;
// doira/matn koordinatalari maketga bog'liq, shuning uchun frontendda qoladi.
const STATS_FALLBACK = [
	{
		key: 'micro_data_set',
		value: '500+',
		label: "Statistik ma'lumotlar\nto'plami",
		circle: { top: 300, left: -42 },
		labelStyle: { top: 180, left: -55, width: 320 ,  },
	},
	{
		key: 'micro_data_period',
		value: '25 yil',
		label: "Ma'lumotlar davri",
		circle: { top: 95, left: 242 },
		labelStyle: { top: 172, left: 510, width: 280 },
	},
	{
		key: 'micro_data_indicator',
		value: '120+',
		label: "Statistik ko'rsatkichlar",
		circle: { top: 300, left: 528 },
		labelStyle: { top: 400, left: 200, width: 300},
	},
	{
		key: 'micro_data_region',
		value: '14',
		label: 'Hududiy qamrov',
		circle: { top: 95, left: 810 },
		labelStyle: { top: 395, left: 820, width: 290 },
	},
]

// Uzun qiymatlar ("25 yil") doiraga sig'ishi uchun shrift kichikroq
const valueFont = (value, long, short) => ((value ?? '').length > 4 ? long : short)

const mobilePositions = [
	{
		circle: { top: 142, left: 60 },
		label:  { top: 180, left: 230, textAlign: 'left' , width: 155 },
	},
	{
		circle: { top: 305, left: 225 },
		label:  { top: 355, left: 40, textAlign: 'left', width: 155 },
	},
	{
		circle: { top: 475, left: 60 },
		label:  { top: 530, left: 230, textAlign: 'left' , width:200 },
	},
	{
		circle: { top: 645, left: 225 },
		label:  { top: 673, left: 40, textAlign: 'left', width: 155 },
	},
]

const StatistikBlok = () => {
    const {
        t
    } = useTranslation();

    const st = useSectionText('micro_data')
    const stats = useSectionStats('micro_data', STATS_FALLBACK)
    const title = st('micro_data_title6', t("components.statistikBlok.statistik_blok"))

    return (
        <section style={{ width: '100%' }}>
            {/* DESKTOP */}
            <div
				className='hidden md:block'
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
					>{title}</motion.h2>

					<div
						style={{
							position: 'relative',
							width: '500px',
							height: '550px',
						}}
					>
						{stats.map((item, index) => (
							<React.Fragment key={item.key}>
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
										fontSize: valueFont(item.value, '44px', '54px'),
										fontWeight: 600,
									}}
								>
									{item.value}
								</motion.div>
							</React.Fragment>
						))}
					</div>
				</div>
			</div>
            {/* MOBILE */}
            <div
				className='block md:hidden'
				style={{
					position: 'relative',
					height: '820px',
					overflow: 'hidden',
					backgroundColor: 'rgba(var(--card-rgb),1)',
				}}
			>
				{/* Background */}
				<img
					src={bgMobile}
					alt=''
					aria-hidden='true'
					style={{
						position: 'absolute',
						top: '125px',
						left: '50%',
						transform: 'translateX(-50%)',
						width: '327px',
						height: '667px',
						zIndex: 0,
						pointerEvents: 'none',
					}} loading='lazy' decoding='async' />

				{/* Title */}
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={vp}
					transition={{ duration: 0.6 }}
					style={{
						position: 'absolute',
						top: '40px',
						left: '20px',
						zIndex: 2,
						fontFamily: 'var(--font-display)',
						fontSize: '28px',
						fontWeight: 600,
						color: '#fff',
						margin: 0,
					}}
				>{title}</motion.h2>

				{/* Circles & labels */}
				{stats.map((item, index) => {
					const pos = mobilePositions[index]
					return (
						<React.Fragment key={item.key}>
							{/* Circle */}
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={vp}
								transition={{ duration: 0.6, delay: index * 0.15 }}
								style={{
									position: 'absolute',
									top: pos.circle.top,
									left: pos.circle.left,
									width: '130px',
									height: '130px',
									borderRadius: '50%',
									background: 'rgba(var(--card-rgb),1)',
									border: '1.5px solid rgba(255,255,255,0.08)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: '#fff',
									fontSize: valueFont(item.value, '24px', '30px'),
									fontWeight: 700,
									fontFamily: 'var(--font-display)',
									zIndex: 2,
								}}
							>
								{item.value}
							</motion.div>

							{/* Label */}
							<motion.p
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={vp}
								transition={{ duration: 0.6, delay: index * 0.15 + 0.1 }}
								style={{
									position: 'absolute',
									top: pos.label.top,
									left: pos.label.left,
									width: pos.label.width ?? 140,
									zIndex: 2,
									fontFamily: 'var(--font-display)',
									color: '#8F96A3',
									fontSize: '16px',
									lineHeight: '22px',
									fontWeight: 500,
									margin: 0,
									whiteSpace: 'pre-line',
									textAlign: pos.label.textAlign,
								}}
							>
								{item.label}
							</motion.p>
						</React.Fragment>
					)
				})}
			</div>
        </section>
    );
}

export default StatistikBlok
