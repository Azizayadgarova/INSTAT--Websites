import { useState } from 'react'
import rectImg from '@/assets/Rectangle 3442.png'
import bgGlow from '@/assets/bgImg/Background (1).png'
import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars
import { Button2 } from './shared/Button2'
import AnimatedSection from './shared/AnimatedSection'

const vp = { once: true, amount: 0.2 }

const darkCard = {
	borderRadius: '20px',
	background: 'rgba(22,27,38,1)',
	border: 'none',
	boxSizing: 'border-box',
	overflow: 'hidden',
}

const blueGrad =
	'radial-gradient(168.28% 138% at 18.75% 23.4%, #2B75CC 8.65%, #00E6FC 100%)'

const BlueOverlay = ({ visible }) => (
	<motion.div
		animate={{ opacity: visible ? 1 : 0 }}
		transition={{ duration: 0.35, ease: 'easeInOut' }}
		style={{
			position: 'absolute',
			inset: 0,
			background: blueGrad,
			borderRadius: '20px',
			pointerEvents: 'none',
			zIndex: 0,
		}}
	/>
)

export default function MikroImkoniyatlar() {
	const [hov, setHov] = useState({ img: false, top: false, mid: false, blue: false, botL: false, botR: false })

	const enter = (k) => () => setHov((h) => ({ ...h, [k]: true }))
	const leave = (k) => () => setHov((h) => ({ ...h, [k]: false }))
	const dc = (k) => (hov[k] ? 'rgba(215,235,255,0.88)' : 'rgba(188,188,188,1)')

	return (
		<section
			style={{
				position: 'relative',
				background: '#0A0F1A',
				padding: '40px 120px 80px',
				width: '100%',
				boxSizing: 'border-box',
				overflow: 'hidden',
			}}
		>
			{/* Background glow */}
			<img
				src={bgGlow}
				alt=""
				aria-hidden="true"
				style={{
					position: 'absolute',
					top: 0,
					left: '50%',
					transform: 'translateX(-50%)',
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					objectPosition: 'center top',
					pointerEvents: 'none',
					zIndex: 0,
					opacity: 0.7,
				}}
			/>

			<div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
				{/* ── Header ── */}
				<AnimatedSection style={{ marginBottom: '52px' }}>
					<div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
						<Button2 text='Afzalliklar' />

						<h2
							style={{
								fontFamily: '"Inter Display",Inter,sans-serif',
								fontWeight: 600,
								fontSize: 'clamp(28px,4vw,48px)',
								color: '#fff',
								margin: 0,
								letterSpacing: '-0.02em',
							}}
						>
							Platformaning asosiy imkoniyatlari
						</h2>

						<p
							style={{
								fontFamily: 'Inter,sans-serif',
								fontSize: '15px',
								lineHeight: 1.7,
								color: 'rgba(155,163,185,1)',
								maxWidth: '540px',
								margin: 0,
							}}
						>
							Mikro-ma&apos;lumotlar laboratoriyasi foydalanuvchilarga statistik
							ma&apos;lumotlardan samarali foydalanish uchun zamonaviy va qulay
							imkoniyatlarni taqdim etadi.
						</p>
					</div>
				</AnimatedSection>

				{/* ── Bento grid ── */}
				<div
					style={{
						display: 'flex',
						gap: '20px',
						height: '524px',
						alignItems: 'stretch',
					}}
				>
					{/* Left: large image card */}
					<motion.div
						initial={{ opacity: 0, x: -40 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={vp}
						transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
						whileHover={{ scale: 1.012 }}
						onMouseEnter={enter('img')}
						onMouseLeave={leave('img')}
						style={{
							...darkCard,
							width: '400px',
							flexShrink: 0,
							position: 'relative',
							cursor: 'default',
						}}
					>
						<img
							src={rectImg}
							alt=''
							style={{
								position: 'absolute',
								inset: 0,
								width: '100%',
								height: '100%',
								objectFit: 'cover',
							}}
						/>
						{/* dark-to-bottom overlay */}
						<motion.div
							animate={{ opacity: hov.img ? 0 : 1 }}
							transition={{ duration: 0.35, ease: 'easeInOut' }}
							style={{
								position: 'absolute',
								inset: 0,
								background:
									'linear-gradient(to top, rgba(5,8,20,0.96) 0%, rgba(5,8,20,0.45) 50%, transparent 100%)',
							}}
						/>
						<BlueOverlay visible={hov.img} />
						<div
							style={{
								position: 'absolute',
								bottom: 0,
								left: 0,
								right: 0,
								padding: '32px',
								zIndex: 1,
							}}
						>
							<h3
								style={{
									fontFamily: '"Inter Display",Inter,sans-serif',
									fontWeight: 600,
									fontSize: '30px',
									color: '#fff',
									margin: '0 0 12px',
									lineHeight: 1.2,
								}}
							>
								Har bir detalni aniqlik bilan ko&apos;ring
							</h3>
							<p
								style={{
									fontFamily: 'Inter,sans-serif',
									fontSize: '15px',
									lineHeight: 1.65,
									color: dc('img'),
									margin: 0,
									transition: 'color 0.35s ease',
								}}
							>
								Katta hajmdagi mikro ma&apos;lumotlarni zamonaviy analitik
								vositalar yordamida chuqur tahlil qiling va muhim
								tendensiyalarni aniqlang.
							</p>
						</div>
					</motion.div>

					{/* Right column */}
					<div
						style={{
							flex: 1,
							display: 'flex',
							flexDirection: 'column',
							gap: '16px',
						}}
					>
						{/* Top card */}
						<motion.div
							initial={{ opacity: 0, x: 40 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={vp}
							transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
							whileHover={{ scale: 1.012 }}
							onMouseEnter={enter('top')}
							onMouseLeave={leave('top')}
							style={{
								...darkCard,
								flex: 1,
								padding: '24px 44px',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								cursor: 'default',
								position: 'relative',
							}}
						>
							<BlueOverlay visible={hov.top} />
							<div style={{ position: 'relative', zIndex: 1 }}>
								<h3
									style={{
										fontFamily: '"Inter Display",Inter,sans-serif',
										fontWeight: 500,
										fontSize: '32px',
										color: '#fff',
										margin: '0 0 14px',
										lineHeight: 1.2,
									}}
								>
									Tadqiqotlar uchun tayyor platforma
								</h3>
								<p
									style={{
										fontFamily: 'Inter,sans-serif',
										fontSize: '18px',
										lineHeight: 1.68,
										width: '400px',
										color: dc('top'),
										margin: 0,
										maxWidth: '520px',
										transition: 'color 0.35s ease',
									}}
								>
									Statistik modellar, eksperimental tahlillar va ilmiy ishlanmalar
									uchun maxsus ishlab chiqilgan muhit.
								</p>
							</div>
						</motion.div>

						{/* Inner bottom row */}
						<div style={{ display: 'flex', gap: '16px', flex: 1 }}>
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={vp}
								transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
								whileHover={{ scale: 1.015 }}
								onMouseEnter={enter('mid')}
								onMouseLeave={leave('mid')}
								style={{
									...darkCard,
									flex: 1,
									padding: '24px 36px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									cursor: 'default',
									position: 'relative',
								}}
							>
								<BlueOverlay visible={hov.mid} />
								<div style={{ position: 'relative', zIndex: 1 }}>
									<h3
										style={{
											fontFamily: '"Inter Display",Inter,sans-serif',
											fontWeight: 500,
											fontSize: '32px',
											color: '#fff',
											margin: '0 0 12px',
											lineHeight: 1.2,
										}}
									>
										Soniyalar ichida natija
									</h3>
									<p
										style={{
											fontFamily: 'Inter,sans-serif',
											fontSize: '18px',
											lineHeight: 1.68,
											color: dc('mid'),
											margin: 0,
											transition: 'color 0.35s ease',
										}}
									>
										Kuchli hisoblash tizimi orqali ma&apos;lumotlarni tezkor olish
										imkoniyati.
									</p>
								</div>
							</motion.div>

							{/* Blue card — gray by default, blue on hover */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={vp}
								transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
								whileHover={{ scale: 1.015 }}
								onMouseEnter={enter('blue')}
								onMouseLeave={leave('blue')}
								style={{
									...darkCard,
									flex: 1,
									padding: '24px 36px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									cursor: 'default',
									position: 'relative',
								}}
							>
								<BlueOverlay visible={hov.blue} />
								<div style={{ position: 'relative', zIndex: 1 }}>
									<h3
										style={{
											fontFamily: '"Inter Display",Inter,sans-serif',
											fontWeight: 500,
											fontSize: '32px',
											color: '#fff',
											margin: '0 0 10px',
											lineHeight: 1.2,
										}}
									>
										Doimiy yangilanadigan manbalar
									</h3>
									<p
										style={{
											fontFamily: 'Inter,sans-serif',
											fontSize: '14px',
											lineHeight: 1.68,
											color: dc('blue'),
											margin: 0,
											transition: 'color 0.35s ease',
										}}
									>
										Turli sohalarga oid dolzarb va ishonchli mikro
										ma&apos;lumotlar bazasi
									</p>
								</div>
							</motion.div>
						</div>
					</div>
				</div>

				{/* ── Bottom row ── */}
				<div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
					<motion.div
						initial={{ opacity: 0, y: 28 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={vp}
						transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
						whileHover={{ scale: 1.012 }}
						onMouseEnter={enter('botL')}
						onMouseLeave={leave('botL')}
						style={{
							...darkCard,
							width: '800px',
							height: '250px',
							padding: '24px 40px',
							cursor: 'default',
							position: 'relative',
						}}
					>
						<BlueOverlay visible={hov.botL} />
						<div style={{ position: 'relative', zIndex: 1 }}>
							<h3
								style={{
									fontFamily: '"Inter Display",Inter,sans-serif',
									fontWeight: 500,
									fontSize: '32px',
									color: '#fff',
									margin: '0 0 12px',
									lineHeight: 1.25,
									width: '500px',
								}}
							>
								Murakkab ma&apos;lumotlarni sodda ko&apos;rinishda
							</h3>
							<p
								style={{
									fontFamily: 'Inter,sans-serif',
									fontSize: '18px',
									lineHeight: 1.68,
									color: dc('botL'),
									margin: 0,
									width: '500px',
									transition: 'color 0.35s ease',
								}}
							>
								Interaktiv grafiklar va dashboardlar orqali natijalarni tushunarli
								va vizual tarzda namoyish eting.
							</p>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 28 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={vp}
						transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
						whileHover={{ scale: 1.012 }}
						onMouseEnter={enter('botR')}
						onMouseLeave={leave('botR')}
						style={{
							...darkCard,
							flex: 1,
							padding: '36px 40px',
							cursor: 'default',
							position: 'relative',
						}}
					>
						<BlueOverlay visible={hov.botR} />
						<div style={{ position: 'relative', zIndex: 1 }}>
							<h3
								style={{
									fontFamily: '"Inter Display",Inter,sans-serif',
									fontWeight: 500,
									fontSize: '32px',
									color: '#fff',
									margin: '0 0 12px',
									lineHeight: 1.25,
								}}
							>
								Ishonchli himoya tizimi
							</h3>
							<p
								style={{
									fontFamily: 'Inter,sans-serif',
									fontSize: '18px',
									lineHeight: 1.68,
									color: hov.botR ? 'rgba(215,235,255,0.88)' : 'rgba(155,163,185,1)',
									margin: 0,
									transition: 'color 0.35s ease',
								}}
							>
								Barcha ma&apos;lumotlar zamonaviy xavfsizlik standartlari asosida
								himoyalangan
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
