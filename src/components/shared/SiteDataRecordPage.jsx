import { useTranslation } from 'react-i18next'
import { useSiteData } from '@/hooks/useSiteData'
import { pickLang, pickLangLabel, pickPath } from '@/utils/siteContent'
import AsyncBoundary from './AsyncBoundary'
import RichContent from './RichContent'
import Seo from './Seo'
import { SkeletonText } from './Skeleton'

/**
 * site-data'dagi bitta yozuvni (module + key) sarlavha + matn + ilova sifatida
 * chiqaradi. Sarlavha: label_<lang> (bo'sh bo'lsa label), matn: value_<lang>
 * (bo'sh bo'lsa value), ilova: shu yozuvning `path` maydoni — mavjud bo'lsa
 * "Yuklab olish" tugmasi ko'rsatiladi.
 *
 *   <SiteDataRecordPage module='educational_activity' contentKey='educational_activity_programme' />
 */
const SiteDataRecordPage = ({ module, contentKey }) => {
	const { t, i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const { data: record, loading, error, retry } = useSiteData(d => d.byModuleKey[module]?.[contentKey] ?? null)

	const title = pickLangLabel(record, lang)
	const body = pickLang(record, lang)
	const path = pickPath(record)

	return (
		<section>
			<Seo title={title} />
			<AsyncBoundary loading={loading} error={error} onRetry={retry} isEmpty={!loading && !error && !record} skeleton={<SkeletonText lines={8} />}>
				{title && <h1 className='mb-6 text-[26px] font-semibold text-white md:text-[32px]'>{title}</h1>}
				<RichContent html={body} />
				{path && (
					<a
						href={path}
						target='_blank'
						rel='noopener noreferrer'
						style={{
							display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 20,
							padding: '12px 20px', borderRadius: 10,
							border: '1px solid rgba(var(--blue-rgb),0.4)', background: 'rgba(var(--blue-rgb),0.1)',
							color: '#fff', textDecoration: 'none', fontSize: 15,
						}}
					>
						<svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
							<path d='M12 3v12m0 0l-4-4m4 4l4-4M5 21h14' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
						</svg>
						{t('common.download', 'Yuklab olish')}
					</a>
				)}
			</AsyncBoundary>
		</section>
	)
}

export default SiteDataRecordPage
