import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSiteData } from '@/hooks/useSiteData'
import { pickLang, pickLangLabel, pickPath } from '@/utils/siteContent'
import AsyncBoundary from './AsyncBoundary'
import FileDrawer from './FileDrawer'
import RichContent from './RichContent'
import Seo from './Seo'
import { SkeletonText } from './Skeleton'

const isImage = url => /\.(png|jpe?g|webp|gif|svg)$/i.test(url ?? '')
const isPdf = url => /\.pdf($|\?)/i.test(url ?? '')

const buttonStyle = {
	display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderRadius: 10,
	border: '1px solid rgba(var(--blue-rgb),0.4)', background: 'rgba(var(--blue-rgb),0.1)',
	color: '#fff', textDecoration: 'none', fontSize: 15, cursor: 'pointer', fontFamily: 'inherit',
}

/** `onPreview` berilsa va fayl PDF bo'lsa — yuklab olish yonida "Ko'rish" tugmasi chiqadi. */
const Attachment = ({ path, label, onPreview }) => {
	const { t } = useTranslation()
	if (!path) return null
	if (isImage(path)) {
		return <img src={path} alt={label ?? ''} loading='lazy' decoding='async'
			style={{ maxWidth: '100%', borderRadius: 12, marginTop: 20 }} />
	}
	return (
		<div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 20 }}>
			<a href={path} target='_blank' rel='noopener noreferrer' style={buttonStyle}>
				<svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
					<path d='M12 3v12m0 0l-4-4m4 4l4-4M5 21h14' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
				</svg>
				{t('common.download', 'Yuklab olish')}
			</a>
			{onPreview && isPdf(path) && (
				<button type='button' onClick={() => onPreview({ src: path, title: label })} style={buttonStyle}>
					<svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
						<path d='M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z' stroke='currentColor' strokeWidth='2' strokeLinejoin='round' />
						<circle cx='12' cy='12' r='3' stroke='currentColor' strokeWidth='2' />
					</svg>
					{t('common.preview', "Ko'rish")}
				</button>
			)}
		</div>
	)
}

/**
 * `showLabels` — har bir yozuv `label` sarlavhasi + matni bilan alohida blok bo'lib chiqadi.
 * `previewable` — PDF fayllar uchun drawer orqali ko'rish tugmasi qo'shiladi.
 */
const ContentPage = ({ module, contentKey, title, description, showTitle = false, showLabels = false, previewable = false }) => {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const [preview, setPreview] = useState(null)
	const { data, loading, error, retry } = useSiteData(d => d.byModule[module] ?? [])

	const stringItems = (data ?? []).filter(it => it.type === 'string')
	const main = contentKey ? (data ?? []).find(it => it.key === contentKey) : stringItems[0]
	// Fayl kalitlari matn kalitidan farq qiladi (`odob` -> `odob_file`), shuning
	// uchun aniq moslik ham, `<contentKey>_` prefiksi ham hisobga olinadi.
	// `contentKey` berilmasa — modulning barcha fayllari ko'rsatiladi.
	const attachments = (data ?? []).filter(
		it =>
			it.type === 'file' &&
			it.path &&
			(!contentKey || it.key === contentKey || it.key?.startsWith(`${contentKey}_`)),
	)

	// showLabels: matn va fayl yozuvlari bitta ro'yxatda, har biri o'z sarlavhasi bilan
	const entries = (data ?? []).filter(
		it =>
			(it.type === 'string' || (it.type === 'file' && it.path)) &&
			(!contentKey || it.key === contentKey || it.key?.startsWith(`${contentKey}_`)),
	)

	return (
		<section>
			<Seo title={title} description={description} />
			{showTitle && <h1 className='mb-6 text-[26px] font-semibold text-white md:text-[32px]'>{title}</h1>}
			<AsyncBoundary loading={loading} error={error} onRetry={retry}
				isEmpty={showLabels ? entries.length === 0 : !main && attachments.length === 0} skeleton={<SkeletonText lines={8} />}>
				{showLabels ? (
					entries.map(it => {
						const label = pickLangLabel(it, lang)
						return (
							<article key={it.id} style={{ marginBottom: 32 }}>
								{label && <h2 className='mb-3 text-[20px] font-semibold text-white md:text-[24px]'>{label}</h2>}
								<RichContent html={pickLang(it, lang)} />
								<Attachment path={pickPath(it)} label={label} onPreview={previewable ? setPreview : undefined} />
							</article>
						)
					})
				) : (
					<>
						{contentKey
							? <RichContent html={pickLang(main, lang)} />
							: stringItems.map(it => <RichContent key={it.id} html={pickLang(it, lang)} />)}
						{attachments.map(it => <Attachment key={it.id} path={pickPath(it)} label={it.label} />)}
					</>
				)}
			</AsyncBoundary>
			{previewable && (
				<FileDrawer open={!!preview} onClose={() => setPreview(null)} title={preview?.title} src={preview?.src} />
			)}
		</section>
	)
}
export default ContentPage
