import { useTranslation } from 'react-i18next'
import bgGlow from '@/assets/bgImg/Background (1).png'
import mapPin from '@/assets/icons/map-pin-line.png'
import { Button2 } from './shared/Button2'
import AnimatedSection from './shared/AnimatedSection'

import { JOBS } from '@/data/jobs.data'
import { useDataText } from '@/hooks/useDataText'

function LocationIcon() {
	return (
		<img
			src={mapPin}
			alt=''
			aria-hidden='true'
			width={24}
			height={24}
			style={{ opacity: 1, flexShrink: 0, display: 'block' }} loading='lazy' decoding='async' />
	)
}

function JobCard({ job }) {
	const dt = useDataText('jobs')
    const {
        t
    } = useTranslation();

    return (
        <div
			className='p-4 md:p-6 gap-4 md:gap-6'
			style={{
				background: 'rgba(var(--card-rgb),1)',
				border: '1px solid rgba(31,37,51,1)',
				borderRadius: '24px',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
            <h3
				className='text-[18px] md:text-[24px]'
				style={{
					fontFamily: 'var(--font-display)',
					fontWeight: 700,
					lineHeight: '1.3',
					letterSpacing: '0%',
					color: 'rgba(255,255,255,1)',
					margin: 0,
				}}
			>
				{dt(job, 'title')}
			</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
				<LocationIcon />
				<span
					className='text-[13px] md:text-[16px]'
					style={{
						fontFamily: 'var(--font-display)',
						fontWeight: 400,
						lineHeight: '24px',
						color: 'rgba(90,98,117,1)',
					}}
				>
					{dt(job, 'city')}
				</span>
			</div>
            <p
				className='text-[13px] md:text-[16px]'
				style={{
					fontFamily: 'var(--font-display)',
					fontWeight: 400,
					lineHeight: '1.6',
					color: 'rgba(var(--muted-rgb),1)',
					margin: 0,
					flex: 1,
				}}
			>
				{dt(job, 'desc')}
			</p>
            <div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginTop: '4px',
					gap: '8px',
				}}
			>
				<span
					className='text-[18px] md:text-[24px]'
					style={{
						fontFamily: 'var(--font-display)',
						fontWeight: 700,
						lineHeight: '32px',
						color: 'rgba(225,227,230,1)',
					}}
				>
					{job.price}
				</span>
				<span
					className='text-[13px] md:text-[16px]'
					style={{
						fontFamily: 'var(--font-display)',
						fontWeight: 400,
						lineHeight: '24px',
						color: 'rgba(255,255,255,1)',
					}}
				>{t("components.ishOrinlariVakansiyalar.oy")}</span>
			</div>
            <button
				style={{
					width: '100%',
					height: '44px',
					borderRadius: '10px',
					border: '1px solid rgba(var(--blue-rgb),0.4)',
					background: 'rgba(var(--blue-rgb),1)',
					color: '#fff',
					fontSize: '16px',
					fontWeight: 400,
					fontFamily: 'var(--font-display)',
					cursor: 'pointer',
					transition: 'filter .2s',
					padding: '0 12px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: '4px',
				}}
				onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.12)' }}
				onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)' }}
			>{t("components.ishOrinlariVakansiyalar.ariza_yuborish")}</button>
        </div>
    );
}

const IshOrinlariVakansiyalar = () => {
    const {
        t
    } = useTranslation();

    return (
        <section
			style={{
				width: '100%',
				maxWidth: '1440px',
				margin: '0 auto',
				background: 'rgba(var(--bg-rgb),1)',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: '40px 24px 40px',
				position: 'relative',
				boxSizing: 'border-box',
			}}
		>
            <img
				src={bgGlow}
				alt=''
				aria-hidden='true'
				style={{
					position: 'absolute',
					top: 0,
					left: '50%',
					transform: 'translateX(-50%)',
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					objectPosition: 'center top',
					zIndex: 0,
					pointerEvents: 'none',
				}} loading='lazy' decoding='async' />
            <AnimatedSection style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '48px' }}>
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
					<Button2 text='Vakansiyalar' />

					<h2
						className='text-[28px] md:text-[48px]'
						style={{
							fontFamily: 'var(--font-display)',
							fontWeight: 600,
							lineHeight: 1.1,
							color: '#fff',
							margin: 0,
							letterSpacing: '-0.02em',
						}}
					>{t("components.ishOrinlariVakansiyalar.karyerangiz_uchun_eng_yaxshi")}</h2>

					<p
						className='text-[14px] md:text-[16px] max-w-[327px] md:max-w-[620px]'
						style={{
							fontFamily: 'var(--font-display)',
							fontWeight: 400,
							lineHeight: '140%',
							color: 'rgba(202,202,206,1)',
							margin: 0,
						}}
					>{t("components.ishOrinlariVakansiyalar.eng_saralangan_vakansiyalarni_bir")}</p>
				</div>
			</AnimatedSection>
            <div
				className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
				style={{
					width: '100%',
					maxWidth: '1200px',
					gap: '24px',
					marginBottom: '48px',
				}}
			>
				{JOBS.map(job => (
					<JobCard key={job.id} job={job} />
				))}
			</div>
        </section>
    );
}

export default IshOrinlariVakansiyalar
