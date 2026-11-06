import { useTranslation } from 'react-i18next'
import { siteScienceProgramsApi } from '@/api/siteContent.api'
import AsyncBoundary from '@/components/shared/AsyncBoundary'
import DocList from '@/components/shared/DocList'
import Seo from '@/components/shared/Seo'
import { SkeletonText } from '@/components/shared/Skeleton'
import { useSiteList } from '@/hooks/useSiteList'
import { toDoc } from '@/utils/siteContent'

/** Ilmiy tadqiqot dasturi — /api/site-science-programs/ (ko'p yozuv, har birida PDF) */
const IlmiyTadqiqot = () => {
	const { t } = useTranslation()
	const { items, loading, error, retry } = useSiteList('site-science-programs', siteScienceProgramsApi, toDoc)

	return (
		<section>
			<Seo title={t('menu.science.ilmiy-tadqiqot')} />
			<AsyncBoundary loading={loading} error={error} onRetry={retry} isEmpty={items.length === 0} skeleton={<SkeletonText lines={5} />}>
				<DocList items={items} previewable />
			</AsyncBoundary>
		</section>
	)
}

export default IlmiyTadqiqot
