import { useTranslation } from 'react-i18next'
import { siteScienceResearchesApi } from '@/api/siteContent.api'
import AsyncBoundary from '@/components/shared/AsyncBoundary'
import DocList from '@/components/shared/DocList'
import Seo from '@/components/shared/Seo'
import { SkeletonText } from '@/components/shared/Skeleton'
import { useSiteList } from '@/hooks/useSiteList'
import { toDoc } from '@/utils/siteContent'

/** Institut tadqiqotlari — /api/site-science-researches/ (ko'p yozuv, har birida PDF) */
const InstitutTadqiqotlari = () => {
	const { t } = useTranslation()
	const { items, loading, error, retry } = useSiteList('site-science-researches', siteScienceResearchesApi, toDoc)

	return (
		<section>
			<Seo title={t('menu.science.institut-tadqiqotlari')} />
			<AsyncBoundary loading={loading} error={error} onRetry={retry} isEmpty={items.length === 0} skeleton={<SkeletonText lines={5} />}>
				<DocList items={items} previewable />
			</AsyncBoundary>
		</section>
	)
}

export default InstitutTadqiqotlari
