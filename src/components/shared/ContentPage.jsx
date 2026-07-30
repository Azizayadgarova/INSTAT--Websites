import { useTranslation } from 'react-i18next'
import { useSiteData } from '@/hooks/useSiteData'
import { pickLang, pickPath } from '@/utils/siteContent'
import pdfIcon from '@/assets/File Format Icons [1.1] (1).png'
import downloadIcon from '@/assets/Vector (17).png'
import AsyncBoundary from './AsyncBoundary'
import RichContent from './RichContent'
import Seo from './Seo'
import { SkeletonText } from './Skeleton'

const isImage = url => /\.(png|jpe?g|webp|gif|svg)$/i.test(url ?? '')

const Badge = ({ text }) => (
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
		{text}
	</span>
)

/** Fayl kengaytmasi (PDF, DOCX ...). Topilmasa "FILE". */
const fileExt = url => {
	const m = /\.([a-z0-9]+)(?:\?|#|$)/i.exec(url ?? '')
	return m ? m[1].toUpperCase() : 'FILE'
}

const Attachment = ({ path, label }) => {
	const { t } = useTranslation()
	if (!path) return null
	if (isImage(path)) {
		return <img src={path} alt={label ?? ''} loading='lazy' decoding='async'
			style={{ maxWidth: '100%', borderRadius: 12, marginTop: 20 }} />
	}

	const title = (label || '').trim() || t('common.download', 'Yuklab olish')
	const subtitle = fileExt(path)

	return (
		<div
			className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'
			style={{
				background: 'rgba(31, 37, 51, 1)',
				borderRadius: '16px',
				padding: '16px',
				marginTop: '20px',
				boxSizing: 'border-box',
			}}
		>
			<div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0 }}>
				<img
					src={pdfIcon}
					alt='PDF'
					style={{ width: '44px', height: '44px', objectFit: 'contain', flexShrink: 0 }}
					loading='lazy'
					decoding='async'
				/>
				<div style={{ minWidth: 0 }}>
					<p
						style={{
							fontFamily: 'Inter Display, sans-serif',
							fontWeight: 600,
							fontSize: '16px',
							lineHeight: '24px',
							color: 'rgba(255, 255, 255, 1)',
							margin: 0,
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						{title}
					</p>
					<p
						style={{
							fontFamily: 'Inter Display, sans-serif',
							fontWeight: 400,
							fontSize: '14px',
							lineHeight: '20px',
							color: 'rgba(148, 155, 171, 1)',
							margin: 0,
						}}
					>
						{subtitle}
					</p>
				</div>
			</div>

			<a
				href={path}
				target='_blank'
				rel='noopener noreferrer'
				style={{
					display: 'inline-flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: '4px',
					width: '126px',
					height: '40px',
					borderRadius: '10px',
					padding: '10px',
					background: 'rgba(31, 37, 51, 1)',
					border: '1px solid rgba(22, 27, 38, 1)',
					boxShadow:
						'0px 2px 6px 0px rgba(255, 255, 255, 0.2) inset, 0px -2px 4px 0px rgba(14, 18, 27, 1) inset, 0px 16px 24px -8px rgba(24, 27, 37, 0.1), 0px 0px 0px 1px rgba(31, 37, 51, 1)',
					color: 'rgba(255, 255, 255, 1)',
					fontFamily: 'Inter Display, sans-serif',
					fontWeight: 500,
					fontSize: '14px',
					lineHeight: '20px',
					textDecoration: 'none',
					whiteSpace: 'nowrap',
					boxSizing: 'border-box',
					flexShrink: 0,
				}}
			>
				<img src={downloadIcon} alt='' aria-hidden='true' style={{ width: '18px', height: '18px', objectFit: 'contain', flexShrink: 0 }} />
				{t('common.download', 'Yuklab olish')}
			</a>
		</div>
	)
}

const ContentPage = ({ module, contentKey, title, description, showTitle = false, badge }) => {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const { data, loading, error, retry } = useSiteData(d => d.byModule[module] ?? [])

	const stringItems = (data ?? []).filter(it => it.type === 'string')
	const main = contentKey ? (data ?? []).find(it => it.key === contentKey) : stringItems[0]
	const attachments = (data ?? []).filter(it => it.type === 'file' && it.path)

	return (
		<section>
			<Seo title={title} description={description} />
			{badge && (
				<div style={{ marginBottom: '20px', display: 'inline-flex' }}>
					<Badge text={badge} />
				</div>
			)}
			{(showTitle || badge) && title && (
				<h1 className='gradient-heading' style={{ marginBottom: '32px' }}>{title}</h1>
			)}
			<AsyncBoundary loading={loading} error={error} onRetry={retry}
				isEmpty={!main && attachments.length === 0} skeleton={<SkeletonText lines={8} />}>
				{contentKey
					? <RichContent html={pickLang(main, lang)} />
					: stringItems.map(it => <RichContent key={it.id} html={pickLang(it, lang)} />)}
				{attachments.map(it => <Attachment key={it.id} path={pickPath(it)} label={it.label} />)}
			</AsyncBoundary>
		</section>
	)
}
export default ContentPage
