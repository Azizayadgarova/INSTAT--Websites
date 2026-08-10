import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import rectImg from '@/assets/Rectangle 3442.webp'
import bgGlow from '@/assets/bgImg/Background (1).png'
import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars
import { Button2 } from './shared/Button2'
import AnimatedSection from './shared/AnimatedSection'

const vp = { once: true, amount: 0.2 }

const darkCard = {
	borderRadius: '20px',
	background: 'rgba(var(--card-rgb),1)',
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
    const {
        t
    } = useTranslation();

    const [hov, setHov] = useState({
		img: false, top: false, mid: false, blue: false, botL: false, botR: false,
	})

    const enter = k => () => setHov(h => ({ ...h, [k]: true }))
    const leave = k => () => setHov(h => ({ ...h, [k]: false }))
    const dc = k => hov[k] ? 'rgba(215,235,255,0.88)' : 'rgba(var(--text-rgb),1)'

    return (
        <section
			className='relative w-full py-10 px-4 md:py-10 md:px-[120px] overflow-hidden'
			style={{ background: '#0A0F1A', boxSizing: 'border-box' }}
		>
            <img
				src={bgGlow}
				alt=''
				aria-hidden='true'
				style={{
					position: 'absolute', top: 0, left: '50%',
					transform: 'translateX(-50%)',
					width: '100%', height: '100%',
					objectFit: 'cover', objectPosition: 'center top',
					pointerEvents: 'none', zIndex: 0, opacity: 0.7,
				}} loading='lazy' decoding='async' />
            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>

				{/* ── Header ── */}
				<AnimatedSection style={{ marginBottom: '32px' }}>
					<div className='flex flex-col items-center gap-4 text-center'>
						<Button2 text={t('components.mikroImkoniyatlar.afzalliklar', 'Afzalliklar')} />
						<h2
							className='text-[32px] md:text-[48px]'
							style={{
								fontFamily: 'var(--font-display)',
								fontWeight: 600, color: '#fff',
								margin: 0, letterSpacing: '-0.02em', lineHeight: 1.25,
							}}
						>{t("components.mikroImkoniyatlar.platformaning_asosiy_imkoniyatlari")}</h2>
						<p
							className='text-[14px] md:text-[15px] max-w-full md:max-w-[540px]'
							style={{
								fontFamily: 'Inter,sans-serif',
								lineHeight: 1.7, color: 'rgba(155,163,185,1)', margin: 0,
							}}
						>{t("components.mikroImkoniyatlar.mikro_malumotlar_laboratoriyasi_foydalan")}</p>
					</div>
				</AnimatedSection>

				{/* ── Bento grid ── */}
				<div className='flex flex-col md:flex-row gap-3 md:gap-5 md:h-[524px] items-stretch'>

					{/* Left: large image card */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={vp}
						transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
						whileHover={{ scale: 1.012 }}
						onMouseEnter={enter('img')}
						onMouseLeave={leave('img')}
						className='w-full h-[260px] md:w-[400px] md:h-auto flex-shrink-0'
						style={{ ...darkCard, position: 'relative', cursor: 'default' }}
					>
						<img
							src={rectImg} alt=''
							style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} loading='lazy' decoding='async' />
						<motion.div
							animate={{ opacity: hov.img ? 0 : 1 }}
							transition={{ duration: 0.35, ease: 'easeInOut' }}
							style={{
								position: 'absolute', inset: 0,
								background: 'linear-gradient(to top, rgba(5,8,20,0.96) 0%, rgba(5,8,20,0.45) 50%, transparent 100%)',
							}}
						/>
						<BlueOverlay visible={hov.img} />
						<div className='absolute bottom-0 left-0 right-0 p-5 md:p-8' style={{ zIndex: 1 }}>
							<h3
								className='text-[20px] md:text-[30px]'
								style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: '#fff', margin: '0 0 6px', lineHeight: 1.2 }}
							>{t("components.mikroImkoniyatlar.har_bir_detalni_aniqlik")}</h3>
							<p
								className='text-[13px] md:text-[15px]'
								style={{ fontFamily: 'Inter,sans-serif', lineHeight: 1.65, color: dc('img'), margin: 0, transition: 'color 0.35s ease' }}
							>{t("components.mikroImkoniyatlar.katta_hajmdagi_mikro_malumotlarni")}</p>
						</div>
					</motion.div>

					{/* Right column */}
					<div className='flex-1 flex flex-col gap-3 md:gap-4'>

						{/* Top card */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={vp}
							transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
							whileHover={{ scale: 1.012 }}
							onMouseEnter={enter('top')}
							onMouseLeave={leave('top')}
							className='md:flex-1 p-5 md:py-6 md:px-11'
							style={{ ...darkCard, display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'default', position: 'relative' }}
						>
							<BlueOverlay visible={hov.top} />
							<div style={{ position: 'relative', zIndex: 1 }}>
								<h3
									className='text-[20px] md:text-[32px]'
									style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: '#fff', margin: '0 0 8px', lineHeight: 1.2 }}
								>{t("components.mikroImkoniyatlar.tadqiqotlar_uchun_tayyor_platforma")}</h3>
								<p
									className='text-[14px] md:text-[18px]'
									style={{ fontFamily: 'Inter,sans-serif', lineHeight: 1.68, color: dc('top'), margin: 0, maxWidth: '520px', transition: 'color 0.35s ease' }}
								>{t("components.mikroImkoniyatlar.statistik_modellar_eksperimental_tahlill")}</p>
							</div>
						</motion.div>

						{/* Inner row: Soniyalar + Doimiy */}
						<div className='flex flex-col md:flex-row gap-3 md:gap-4 md:flex-1'>

							<motion.div
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={vp}
								transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
								whileHover={{ scale: 1.015 }}
								onMouseEnter={enter('mid')}
								onMouseLeave={leave('mid')}
								className='flex-1 p-5 md:py-6 md:px-9'
								style={{ ...darkCard, display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'default', position: 'relative' }}
							>
								<BlueOverlay visible={hov.mid} />
								<div style={{ position: 'relative', zIndex: 1 }}>
									<h3
										className='text-[17px] md:text-[32px]'
										style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: '#fff', margin: '0 0 6px', lineHeight: 1.2 }}
									>{t("components.mikroImkoniyatlar.soniyalar_ichida_natija")}</h3>
									<p
										className='text-[13px] md:text-[18px]'
										style={{ fontFamily: 'Inter,sans-serif', lineHeight: 1.68, color: dc('mid'), margin: 0, transition: 'color 0.35s ease' }}
									>{t("components.mikroImkoniyatlar.kuchli_hisoblash_tizimi_orqali")}</p>
								</div>
							</motion.div>

							{/* Blue card */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={vp}
								transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
								whileHover={{ scale: 1.015 }}
								onMouseEnter={enter('blue')}
								onMouseLeave={leave('blue')}
								className='flex-1 p-5 md:py-6 md:px-9'
								style={{ ...darkCard, display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'default', position: 'relative' }}
							>
								<BlueOverlay visible={hov.blue} />
								<div style={{ position: 'relative', zIndex: 1 }}>
									<h3
										className='text-[17px] md:text-[32px]'
										style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: '#fff', margin: '0 0 6px', lineHeight: 1.2 }}
									>{t("components.mikroImkoniyatlar.doimiy_yangilanadigan_manbalar")}</h3>
									<p
										className='text-[13px] md:text-[14px]'
										style={{ fontFamily: 'Inter,sans-serif', lineHeight: 1.68, color: dc('blue'), margin: 0, transition: 'color 0.35s ease' }}
									>{t("components.mikroImkoniyatlar.turli_sohalarga_oid_dolzarb")}</p>
								</div>
							</motion.div>
						</div>
					</div>
				</div>

				{/* ── Bottom row ── */}
				<div className='flex flex-col md:flex-row gap-3 md:gap-5 mt-3 md:mt-5'>

					<motion.div
						initial={{ opacity: 0, y: 28 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={vp}
						transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
						whileHover={{ scale: 1.012 }}
						onMouseEnter={enter('botL')}
						onMouseLeave={leave('botL')}
						className='w-full md:w-[800px] h-auto md:h-[250px] p-6 md:py-6 md:px-10'
						style={{ ...darkCard, cursor: 'default', position: 'relative' }}
					>
						<BlueOverlay visible={hov.botL} />
						<div style={{ position: 'relative', zIndex: 1 }}>
							<h3
								className='text-[20px] md:text-[32px] w-full md:w-[500px]'
								style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: '#fff', margin: '0 0 8px', lineHeight: 1.25 }}
							>{t("components.mikroImkoniyatlar.murakkab_malumotlarni_sodda_korinishda")}</h3>
							<p
								className='text-[14px] md:text-[18px] w-full md:w-[500px]'
								style={{ fontFamily: 'Inter,sans-serif', lineHeight: 1.68, color: dc('botL'), margin: 0, transition: 'color 0.35s ease' }}
							>{t("components.mikroImkoniyatlar.interaktiv_grafiklar_va_dashboardlar")}</p>
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
						className='flex-1 p-6 md:py-9 md:px-10'
						style={{ ...darkCard, cursor: 'default', position: 'relative' }}
					>
						<BlueOverlay visible={hov.botR} />
						<div style={{ position: 'relative', zIndex: 1 }}>
							<h3
								className='text-[20px] md:text-[32px]'
								style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: '#fff', margin: '0 0 8px', lineHeight: 1.25 }}
							>{t("components.mikroImkoniyatlar.ishonchli_himoya_tizimi")}</h3>
							<p
								className='text-[14px] md:text-[18px]'
								style={{
									fontFamily: 'Inter,sans-serif', lineHeight: 1.68,
									color: hov.botR ? 'rgba(215,235,255,0.88)' : 'rgba(155,163,185,1)',
									margin: 0, transition: 'color 0.35s ease',
								}}
							>{t("components.mikroImkoniyatlar.barcha_malumotlar_zamonaviy_xavfsizlik")}</p>
						</div>
					</motion.div>
				</div>

			</div>
        </section>
    );
}
