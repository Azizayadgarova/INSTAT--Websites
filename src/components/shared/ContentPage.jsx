import { useTranslation } from 'react-i18next'
import { useSiteData } from '@/hooks/useSiteData'
import { pickLang, pickPath } from '@/utils/siteContent'
import AsyncBoundary from './AsyncBoundary'
import RichContent from './RichContent'
import Seo from './Seo'
import { SkeletonText } from './Skeleton'

const isImage = url => /\.(png|jpe?g|webp|gif|svg)$/i.test(url ?? '')

const Attachment = ({ path, label }) => {
	const { t } = useTranslation()
	if (!path) return null
	if (isImage(path)) {
		return <img src={path} alt={label ?? ''} loading='lazy' decoding='async'
			style={{ maxWidth: '100%', borderRadius: 12, marginTop: 20 }} />
	}
	return (
		<a href={path} target='_blank' rel='noopener noreferrer'
			style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 20, padding: '12px 20px', borderRadius: 10, border: '1px solid rgba(var(--blue-rgb),0.4)', background: 'rgba(var(--blue-rgb),0.1)', color: '#fff', textDecoration: 'none', fontSize: 15 }}>
			<svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
				<path d='M12 3v12m0 0l-4-4m4 4l4-4M5 21h14' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
			</svg>
			{t('common.download', 'Yuklab olish')}
		</a>
	)
}

const ContentPage = ({ module, contentKey, title, description, showTitle = false }) => {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
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

	return (
		<section>
			<Seo title={title} description={description} />
			{showTitle && <h1 className='mb-6 text-[26px] font-semibold text-white md:text-[32px]'>{title}</h1>}
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
