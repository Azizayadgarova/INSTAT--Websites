import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSiteData } from '@/hooks/useSiteData'
import { pickLang, pickLangLabel, pickPath } from '@/utils/siteContent'
import AsyncBoundary from './AsyncBoundary'
import DocCard from './DocCard'
import FileDrawer from './FileDrawer'
import RichContent from './RichContent'
import Seo from './Seo'
import { SkeletonText } from './Skeleton'

const isImage = url => /\.(png|jpe?g|webp|gif|svg)$/i.test(url ?? '')

/** `onPreview` berilsa va fayl PDF bo'lsa — "Oldindan ko'rish" tugmasi chiqadi. Rasm bo'lsa rasmning o'zi. */
const Attachment = ({ path, label, description, onPreview, compact }) => {
	if (!path) return null
	if (isImage(path)) {
		return <img src={path} alt={label ?? ''} loading='lazy' decoding='async'
			style={{ maxWidth: '100%', borderRadius: 12, marginTop: 20 }} />
	}
	return (
		<DocCard
			title={label}
			description={description}
			path={path}
			compact={compact}
			onPreview={onPreview ? () => onPreview({ src: path, title: label }) : undefined}
		/>
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
						const path = pickPath(it)
						const onPreview = previewable ? setPreview : undefined
						// Faylli yozuv — hujjat kartasi (sarlavha + matn + tugmalar), matnli yozuv — oddiy blok
						if (path && !isImage(path)) {
							return (
								<div key={it.id} style={{ marginBottom: 24 }}>
									<Attachment path={path} label={label} description={pickLang(it, lang)} onPreview={onPreview} />
								</div>
							)
						}
						return (
							<article key={it.id} style={{ marginBottom: 32 }}>
								{label && <h2 className='mb-3 text-[20px] font-semibold text-white md:text-[24px]'>{label}</h2>}
								<RichContent html={pickLang(it, lang)} />
								<Attachment path={path} label={label} onPreview={onPreview} />
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
