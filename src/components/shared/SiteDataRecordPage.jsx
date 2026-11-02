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

/**
 * site-data'dagi bitta yozuvni (module + key) sarlavha + matn + ilova sifatida
 * chiqaradi. Sarlavha: label_<lang> (bo'sh bo'lsa label), matn: value_<lang>
 * (bo'sh bo'lsa value), ilova: shu yozuvning `path` maydoni — mavjud bo'lsa hammasi
 * DocCard (hujjat kartasi) bo'lib chiqadi: "Yuklab olish" tugmasi bilan. `previewable` bo'lsa va ilova
 * PDF bo'lsa, yonida "Oldindan ko'rish" tugmasi ham chiqadi (PDF o'ng paneldagi iframe'da ochiladi).
 *
 *   <SiteDataRecordPage module='educational_activity' contentKey='educational_activity_programme' />
 */
const SiteDataRecordPage = ({ module, contentKey, previewable = false }) => {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const [previewOpen, setPreviewOpen] = useState(false)
	const { data: record, loading, error, retry } = useSiteData(d => d.byModuleKey[module]?.[contentKey] ?? null)

	const title = pickLangLabel(record, lang)
	const body = pickLang(record, lang)
	const path = pickPath(record)
	// Matnda jadval bo'lsa u kartaga sig'maydi: jadval yuqorida, fayl kartasi (PDF) uning pastida turadi
	const hasTable = /<table[\s>]/i.test(body ?? '')

	return (
		<section>
			<Seo title={title} />
			<AsyncBoundary loading={loading} error={error} onRetry={retry} isEmpty={!loading && !error && !record} skeleton={<SkeletonText lines={8} />}>
				{path && !hasTable ? (
					<DocCard title={title} description={body} path={path} onPreview={previewable ? () => setPreviewOpen(true) : undefined} />
				) : (
					<>
						{title && <h1 className='mb-6 text-[26px] font-semibold text-white md:text-[32px]'>{title}</h1>}
						<RichContent html={body} />
						{path && (
							<div style={{ marginTop: 40 }}>
								<DocCard title={title} path={path} onPreview={previewable ? () => setPreviewOpen(true) : undefined} />
							</div>
						)}
					</>
				)}
			</AsyncBoundary>
			{previewable && path && (
				<FileDrawer open={previewOpen} onClose={() => setPreviewOpen(false)} title={title} src={path} />
			)}
		</section>
	)
}

export default SiteDataRecordPage
