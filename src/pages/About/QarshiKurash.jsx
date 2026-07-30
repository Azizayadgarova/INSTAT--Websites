import { useTranslation } from 'react-i18next'
import pdfIcon from '@/assets/File Format Icons [1.1] (1).png'
import downloadIcon from '@/assets/Vector (17).png'
import { siteCorruptionDocsApi, siteCorruptionVideosApi, siteCorruptionWorksApi } from '@/api/siteContent.api'
import AsyncBoundary from '@/components/shared/AsyncBoundary'
import RichContent from '@/components/shared/RichContent'
import Seo from '@/components/shared/Seo'
import { SkeletonText } from '@/components/shared/Skeleton'
import { useApiResource } from '@/hooks/useApiResource'
import { useSiteData } from '@/hooks/useSiteData'
import { pickField, pickLang, pickPath } from '@/utils/siteContent'

/** Fayl kengaytmasi (PDF, DOCX ...). Topilmasa "FILE". */
const fileExt = url => {
	const m = /\.([a-z0-9]+)(?:\?|#|$)/i.exec(url ?? '')
	return m ? m[1].toUpperCase() : 'FILE'
}

const Badge = ({ text }) => (
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
		{text}
	</span>
)

/** Bo'lim sarlavhasi — yuqoridagi badge (pill) uslubida. */
const SectionTitle = ({ children }) => (
	<div style={{ margin: '40px 0 16px', display: 'inline-flex' }}>
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
			{children}
		</span>
	</div>
)

/** Komissiya a'zosi kartochkasi. */
const PersonCard = ({ role, name }) =>
	name ? (
		<div style={{ paddingLeft: '12px' }}>
			<p
				style={{
					fontFamily: 'Inter Display, sans-serif', fontWeight: 600, fontSize: '16px',
					lineHeight: 1.6, color: 'rgba(255, 255, 255, 1)', margin: '0 0 4px',
				}}
			>
				{role}
			</p>
			<p
				style={{
					fontFamily: 'Inter Display, sans-serif', fontWeight: 400, fontSize: '16px',
					lineHeight: 1.6, color: 'rgba(188, 188, 188, 1)', margin: 0,
				}}
			>
				{name}
			</p>
		</div>
	) : null

/** PDF/hujjat yuklab olish kartochkasi (Tuzilma sahifasidagi bilan bir xil uslub). */
const FileCard = ({ href, title, subtitle }) => {
	const { t } = useTranslation()
	return (
		<div
			className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'
			style={{ background: 'rgba(31, 37, 51, 1)', borderRadius: '16px', padding: '16px', boxSizing: 'border-box' }}
		>
			<div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0 }}>
				<img src={pdfIcon} alt='PDF' style={{ width: '44px', height: '44px', objectFit: 'contain', flexShrink: 0 }} loading='lazy' decoding='async' />
				<div style={{ minWidth: 0 }}>
					<p
						style={{
							fontFamily: 'Inter Display, sans-serif', fontWeight: 600, fontSize: '16px',
							lineHeight: '24px', color: 'rgba(255, 255, 255, 1)', margin: 0,
						}}
					>
						{title}
					</p>
					{subtitle && (
						<p
							style={{
								fontFamily: 'Inter Display, sans-serif', fontWeight: 400, fontSize: '14px',
								lineHeight: '20px', color: 'rgba(148, 155, 171, 1)', margin: '4px 0 0',
							}}
						>
							{subtitle}
						</p>
					)}
				</div>
			</div>

			<a
				href={href || undefined}
				target='_blank'
				rel='noopener noreferrer'
				aria-disabled={!href}
				style={{
					display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
					width: '126px', height: '40px', borderRadius: '10px', padding: '10px',
					background: 'rgba(31, 37, 51, 1)', border: '1px solid rgba(22, 27, 38, 1)',
					boxShadow: '0px 2px 6px 0px rgba(255, 255, 255, 0.2) inset, 0px -2px 4px 0px rgba(14, 18, 27, 1) inset, 0px 16px 24px -8px rgba(24, 27, 37, 0.1), 0px 0px 0px 1px rgba(31, 37, 51, 1)',
					color: href ? 'rgba(255, 255, 255, 1)' : 'rgba(148, 155, 171, 1)',
					fontFamily: 'Inter Display, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px',
					textDecoration: 'none', whiteSpace: 'nowrap', boxSizing: 'border-box', flexShrink: 0,
					opacity: href ? 1 : 0.6, pointerEvents: href ? 'auto' : 'none',
				}}
			>
				<img src={downloadIcon} alt='' aria-hidden='true' style={{ width: '18px', height: '18px', objectFit: 'contain', flexShrink: 0 }} />
				{t('common.download', 'Yuklab olish')}
			</a>
		</div>
	)
}

/** Video kartochkasi — play ikonka + sarlavha, havolani ochadi. */
const VideoCard = ({ label, href }) => (
	<a
		href={href || undefined}
		target={href ? '_blank' : undefined}
		rel={href ? 'noopener noreferrer' : undefined}
		style={{
			display: 'flex', alignItems: 'center', gap: '16px',
			background: 'rgba(31, 37, 51, 1)', borderRadius: '16px', padding: '16px',
			textDecoration: 'none', color: 'inherit', boxSizing: 'border-box',
		}}
	>
		<span style={{ flexShrink: 0, width: '44px', height: '44px', borderRadius: '12px', display: 'grid', placeItems: 'center', background: 'linear-gradient(180deg,#3E8BE6,#2B6FC4)' }}>
			<svg width='18' height='18' viewBox='0 0 24 24' fill='#fff' aria-hidden='true'>
				<path d='M8 5v14l11-7z' />
			</svg>
		</span>
		<p
			style={{
				fontFamily: 'Inter Display, sans-serif', fontWeight: 600, fontSize: '16px',
				lineHeight: '24px', color: 'rgba(255, 255, 255, 1)', margin: 0, minWidth: 0,
			}}
		>
			{label}
		</p>
	</a>
)

const QarshiKurash = () => {
	const { t, i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const { data: kv, loading, error, retry } = useSiteData(d => d.byModuleKey.corruption ?? {})
	const { data: docsData, loading: docsLoading, error: docsError, retry: docsRetry } =
		useApiResource(() => siteCorruptionDocsApi.getAllFlat(), [])
	const { data: videosData, loading: videosLoading, error: videosError, retry: videosRetry } =
		useApiResource(() => siteCorruptionVideosApi.getAllFlat(), [])
	const { data: worksData, loading: worksLoading, error: worksError, retry: worksRetry } =
		useApiResource(() => siteCorruptionWorksApi.getAllFlat(), [])

	const val = key => pickLang(kv?.[key], lang)
	const attachment = pickPath(kv?.corruption_phone)
	const docs = Array.isArray(docsData) ? docsData : []
	const videos = Array.isArray(videosData) ? videosData : []
	const works = Array.isArray(worksData) ? worksData : []

	return (
		<div style={{ width: '100%', padding: '59px 0 80px 0' }}>
			<Seo title={t('menu.about.qarshi-kurash')} />

			<div style={{ marginBottom: '20px', display: 'inline-flex' }}>
				<Badge text={t('menu.about.title')} />
			</div>

			<h1 className='gradient-heading' style={{ marginBottom: '32px' }}>
				Korrupsiyaga qarshi kurash
			</h1>

			<AsyncBoundary
				loading={loading}
				error={error}
				onRetry={retry}
				isEmpty={!kv || Object.keys(kv).length === 0}
				skeleton={<SkeletonText lines={6} />}
			>
				{/* Idoraviy komissiya tarkibi */}
				<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
					<PersonCard role={kv?.corruption_chairman?.label} name={val('corruption_chairman')} />
					<PersonCard role={kv?.corruption_deputy_chairman?.label} name={val('corruption_deputy_chairman')} />
					<PersonCard role={kv?.corruption_secretary?.label} name={val('corruption_secretary')} />
				</div>

				{/* Idoraviy komissiyaning asosiy vazifalari */}
				{val('corruption_tasks') && (
					<>
						<SectionTitle>{kv?.corruption_tasks?.label}</SectionTitle>
						<RichContent html={val('corruption_tasks')} />
					</>
				)}
			</AsyncBoundary>

			{/* Me'yoriy-huquqiy baza */}
			<SectionTitle>{t('menu.about.qarshi-kurash-docs', "Me'yoriy-huquqiy baza")}</SectionTitle>
			<AsyncBoundary loading={docsLoading} error={docsError} onRetry={docsRetry}
				isEmpty={docs.length === 0} skeleton={<SkeletonText lines={3} />}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
					{docs.map(doc => (
						<FileCard
							key={doc.id}
							href={doc.path}
							title={pickField(doc, 'label', lang)}
							subtitle={[doc.number, doc.date].filter(Boolean).join(' · ') || (doc.path ? fileExt(doc.path) : 'PDF')}
						/>
					))}
				</div>
			</AsyncBoundary>

			{/* Videoroliklar */}
			<SectionTitle>{t('menu.about.qarshi-kurash-videos', 'Videoroliklar')}</SectionTitle>
			<AsyncBoundary loading={videosLoading} error={videosError} onRetry={videosRetry}
				isEmpty={videos.length === 0} skeleton={<SkeletonText lines={2} />}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
					{videos.map(video => (
						<VideoCard key={video.id} label={pickField(video, 'label', lang)} href={video.link} />
					))}
				</div>
			</AsyncBoundary>

			{/* Ishonch telefoni */}
			{(attachment || kv?.corruption_phone?.label) && (
				<>
					<SectionTitle>{kv?.corruption_phone?.label ?? t('menu.about.qarshi-kurash-phone', 'Ishonch telefoni')}</SectionTitle>
					{attachment && (
						<img src={attachment} alt={kv?.corruption_phone?.label ?? ''} loading='lazy' decoding='async'
							style={{ maxWidth: '100%', borderRadius: '16px' }} />
					)}
				</>
			)}

			{/* Amalga oshirilgan ishlar */}
			<SectionTitle>{t('menu.about.qarshi-kurash-works', 'Amalga oshirilgan ishlar')}</SectionTitle>
			<AsyncBoundary loading={worksLoading} error={worksError} onRetry={worksRetry}
				isEmpty={works.length === 0} skeleton={<SkeletonText lines={3} />}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
					{works.map(work => (
						<FileCard
							key={work.id}
							href={work.path}
							title={pickField(work, 'label', lang)}
							subtitle={[work.number, work.date].filter(Boolean).join(' · ') || (work.path ? fileExt(work.path) : 'PDF')}
						/>
					))}
				</div>
			</AsyncBoundary>
		</div>
	)
}

export default QarshiKurash
