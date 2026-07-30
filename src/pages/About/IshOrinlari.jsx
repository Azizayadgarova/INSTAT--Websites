import { useTranslation } from 'react-i18next'
import { useVacancies } from '@/hooks/useVacancies'

const VacancyCard = ({ job }) => {
	const { t } = useTranslation()
	return (
		<div
			style={{
				background: 'rgba(255, 255, 255, 0.04)',
				border: '1px solid rgba(31,37,51,1)',
				borderRadius: '24px',
				padding: '24px',
				display: 'flex',
				flexDirection: 'column',
				gap: '14px',
			}}
		>
			<h3
				style={{
					margin: 0,
					fontFamily: 'Inter Display, sans-serif',
					fontWeight: 600,
					fontSize: '24px',
					lineHeight: '32px',
					letterSpacing: '0',
					color: 'rgba(225, 227, 234, 1)',
				}}
			>
				{job.position}
			</h3>

			{job.direction && (
				<span
					style={{
						fontSize: '14px',
						lineHeight: 1.5,
						color: 'rgba(90,98,117,1)',
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
					}}
				>
					{job.direction}
				</span>
			)}

			{job.requirements && (
				<p
					style={{
						margin: 0,
						fontSize: '14px',
						lineHeight: 1.6,
						color: 'rgba(var(--muted-rgb),1)',
						flex: 1,
						display: '-webkit-box',
						WebkitLineClamp: 3,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
					}}
				>
					{job.requirements}
				</p>
			)}

			{job.salary && (
				<span
					style={{
						fontFamily: 'Inter Display, sans-serif',
						fontWeight: 600,
						fontSize: '24px',
						lineHeight: '32px',
						letterSpacing: '0',
						color: 'rgba(225, 227, 234, 1)',
					}}
				>
					{job.salary}
				</span>
			)}

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
					marginTop: 'auto',
				}}
				onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.12)' }}
				onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)' }}
			>
				{t('components.ishOrinlariVakansiyalar.ariza_yuborish')}
			</button>
		</div>
	)
}

const IshOrinlari = () => {
	const { t } = useTranslation()
	const { items, loading, error, retry } = useVacancies()

	return (
		<section style={{ width: '100%', padding: '59px 0 80px 0' }}>
			<div style={{ marginBottom: '20px', display: 'inline-flex' }}>
				<span
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: '8px',
						padding: '4px 16px',
						borderRadius: '8px',
						background: 'rgba(255, 255, 255, 0.04)',
						fontFamily: 'Inter Display, sans-serif',
						fontWeight: 600,
						fontSize: '16px',
						lineHeight: '28px',
						letterSpacing: '-0.02em',
						color: 'rgba(255, 255, 255, 1)',
					}}
				>
					{t('menu.about.title')}
				</span>
			</div>

			<h1 className='gradient-heading' style={{ marginBottom: '32px' }}>
				{t('menu.about.ish-orinlar')}
			</h1>

			{loading && <p style={{ color: 'rgba(var(--muted-rgb),1)' }}>{t('common.loading', 'Yuklanmoqda...')}</p>}

			{error && (
				<div style={{ color: 'rgba(var(--muted-rgb),1)' }}>
					<p>{t('common.error', 'Xatolik yuz berdi')}</p>
					<button onClick={retry} style={{ color: 'rgba(var(--blue-rgb),1)', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
						{t('common.retry', 'Qayta urinish')}
					</button>
				</div>
			)}

			{!loading && !error && (
				<div className='grid gap-6' style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
					{items.map(job => (
						<VacancyCard key={job.id} job={job} />
					))}
				</div>
			)}
		</section>
	)
}

export default IshOrinlari
