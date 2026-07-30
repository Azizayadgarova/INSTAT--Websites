import { useTranslation } from 'react-i18next'
import { siteEventsApi } from '@/api/siteContent.api'
import { useApiResource } from '@/hooks/useApiResource'
import { pickField, mediaUrl } from '@/utils/siteContent'
import AsyncBoundary from '@/components/shared/AsyncBoundary'
import Seo from '@/components/shared/Seo'
import { SkeletonText } from '@/components/shared/Skeleton'

const EventCard = ({ event, lang, t }) => {
	const label = pickField(event, 'label', lang)
	const href = mediaUrl(event.path)

	return (
		<div
			className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'
			style={{
				background: 'rgba(255, 255, 255, 0.04)',
				border: '1px solid rgba(31,37,51,1)',
				borderRadius: '16px',
				padding: '20px 24px',
				boxSizing: 'border-box',
			}}
		>
			<span
				style={{
					fontFamily: 'Inter Display, sans-serif',
					fontWeight: 500,
					fontSize: '16px',
					lineHeight: 1.5,
					color: 'rgba(225, 227, 234, 1)',
					minWidth: 0,
				}}
			>
				{label}
			</span>

			{href && (
				<a
					href={href}
					target='_blank'
					rel='noopener noreferrer'
					style={{
						flexShrink: 0,
						display: 'inline-flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '40px',
						padding: '0 16px',
						borderRadius: '10px',
						background: 'rgba(var(--blue-rgb),1)',
						color: '#fff',
						fontFamily: 'Inter Display, sans-serif',
						fontWeight: 500,
						fontSize: '14px',
						textDecoration: 'none',
						whiteSpace: 'nowrap',
					}}
				>
					{t('common.download', 'Yuklab olish')}
				</a>
			)}
		</div>
	)
}

const Tadbirlar = () => {
	const { t, i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const { data, loading, error, retry } = useApiResource(() => siteEventsApi.getAllFlat(), [])
	const events = Array.isArray(data) ? data : []

	return (
		<section style={{ width: '100%', padding: '59px 0 80px 0' }}>
			<Seo title={t('menu.media.tadbirlar')} />

			<div style={{ marginBottom: '20px', display: 'inline-flex' }}>
				<span
					style={{
						display: 'inline-flex',
						alignItems: 'center',
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
					{t('menu.media.title')}
				</span>
			</div>

			<h1 className='gradient-heading' style={{ marginBottom: '32px' }}>
				Tadbirlar
			</h1>

			<AsyncBoundary
				loading={loading}
				error={error}
				onRetry={retry}
				isEmpty={events.length === 0}
				skeleton={<SkeletonText lines={6} />}
			>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
					{events.map(event => (
						<EventCard key={event.id} event={event} lang={lang} t={t} />
					))}
				</div>
			</AsyncBoundary>
		</section>
	)
}

export default Tadbirlar
