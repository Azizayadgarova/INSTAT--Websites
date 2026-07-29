import { useTranslation } from 'react-i18next'
import { useDataText } from '@/hooks/useDataText'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Button2 } from './shared/Button2'
import Diagram from './ProblemSection/Diagram'
import { problems } from '../data/problems.data'
import { fadeUp, fadeLeft, VP_LOW } from '../constants/animations'

const vp = VP_LOW

const ProblemSection = () => {
	const dt = useDataText('problems')
    const {
        t
    } = useTranslation();

    const [active, setActive] = useState(0)
    const [displayIdx, setDisplayIdx] = useState(0)

    useEffect(() => {
		if (displayIdx === active) return
		const dir = active > displayIdx ? 1 : -1
		const isLast = displayIdx + dir === active
		const t = setTimeout(() => setDisplayIdx(p => p + dir), isLast ? 220 : 130)
		return () => clearTimeout(t)
	}, [displayIdx, active])

    const handleSelect = (i) => setActive(i)

    return (
        <section
			style={{
				width: '100%',
				backgroundColor: 'rgba(var(--card-rgb),1)',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				position: 'relative',
				overflow: 'hidden',
				paddingTop: '0px',
				paddingBottom: '80px',
			}}
		>
            {/* Header */}
            <div
				style={{
					position: 'relative',
					zIndex: 1,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					textAlign: 'center',
					gap: '20px',
					padding: '40px 24px 48px',
				}}
			>
				<motion.div variants={fadeUp} initial='hidden' whileInView='visible' viewport={vp} custom={0}>
					<Button2 text='Foydalanish jarayoni' />
				</motion.div>

				<motion.h2
					variants={fadeUp}
					initial='hidden'
					whileInView='visible'
					viewport={vp}
					custom={1}
					className='text-[32px] leading-[40px] md:text-[48px] md:leading-[58px]'
					style={{
						fontFamily: 'var(--font-display)',
						fontWeight: 600,
						color: '#ffffff',
						margin: 0,
					}}
				>{t("components.problemSection.kitob_izlashdan_charchadingizmi")}</motion.h2>

				<motion.p
					variants={fadeUp}
					initial='hidden'
					whileInView='visible'
					viewport={vp}
					custom={2}
					className='text-[14px] max-w-[327px] md:text-[16px] md:max-w-[560px]'
					style={{
						fontFamily: 'var(--font-display)',
						fontWeight: 400,
						lineHeight: '140%',
						color: 'rgba(202, 202, 206, 1)',
						textAlign: 'center',
						margin: 0,
					}}
				>{t("components.problemSection.biz_har_bir_foydalanuvchi")}</motion.p>
			</div>
            {/* 2-column layout */}
            <div
				className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[48px]'
				style={{
					position: 'relative',
					zIndex: 1,
					width: '100%',
					maxWidth: '1200px',
					padding: '0 24px',
					alignItems: 'stretch',
					boxSizing: 'border-box',
				}}
			>
				{/* Diagram — mobile da birinchi (DOM da birinchi), desktop da o'ngga */}
				<div className='md:order-last' style={{ minHeight: '340px' }}>
					<Diagram active={displayIdx} direction={active >= displayIdx ? 1 : -1} />
				</div>

				{/* Muammo ro'yxati — mobile da ikkinchi, desktop da chapga */}
				<div className='md:order-first' style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
					{problems.map((p, i) => (
						<motion.div
							key={dt(p, 'title')}
							variants={fadeLeft}
							initial='hidden'
							whileInView='visible'
							viewport={vp}
							custom={i}
							onClick={() => handleSelect(i)}
							style={{ position: 'relative', paddingLeft: '20px', cursor: 'pointer' }}
						>
							<div
								style={{
									position: 'absolute', left: 0, top: 0, bottom: 0,
									width: '3px', borderRadius: '3px',
									background: 'rgba(var(--card-rgb),1)',
								}}
							/>
							<motion.div
								initial={false}
								animate={{ scaleY: active === i ? 1 : 0, opacity: active === i ? 1 : 0 }}
								transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
								style={{
									position: 'absolute', left: 0, top: 0, bottom: 0,
									width: '3px', borderRadius: '3px',
									background: 'linear-gradient(180deg, #2B75CC 0%, rgba(var(--blue-rgb),0.4) 100%)',
									transformOrigin: 'top',
								}}
							/>
							<div
								style={{
									width: '48px', height: '48px', borderRadius: '10px',
									backgroundColor: 'rgba(34, 37, 48, 1)',
									border: '1px solid rgba(255, 255, 255, 0.04)',
									display: 'flex', alignItems: 'center', justifyContent: 'center',
									marginBottom: '16px',
								}}
							>
								<img src={p.icon} alt='' style={{ width: '22px', height: '22px', objectFit: 'contain', opacity: 0.9 }} loading='lazy' decoding='async' />
							</div>
							<h3 style={{
								fontFamily: 'var(--font-display)',
								fontWeight: 600, fontSize: '24px', lineHeight: '28px',
								color: '#ffffff', margin: '0 0 10px 0',
							}}>
								{dt(p, 'title')}
							</h3>
							<p style={{
								fontFamily: 'var(--font-inter)',
								fontWeight: 400, fontSize: '16px', lineHeight: '160%',
								color: 'rgba(var(--muted-rgb),1)', margin: 0,
							}}>
								{dt(p, 'description')}
							</p>
						</motion.div>
					))}
				</div>
			</div>
        </section>
    );
}

export default ProblemSection
