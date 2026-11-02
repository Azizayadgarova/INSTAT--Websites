import { useTranslation } from 'react-i18next'

import { siteEventsApi } from '@/api/siteContent.api'
import AsyncBoundary from '@/components/shared/AsyncBoundary'
import DocList from '@/components/shared/DocList'
import Seo from '@/components/shared/Seo'
import { SkeletonText } from '@/components/shared/Skeleton'
import { useSiteList } from '@/hooks/useSiteList'
import { toDoc } from '@/utils/siteContent'

const Tadbirlar = () => {
	const { t } = useTranslation()
	const { items, loading, error, retry } = useSiteList('site-events', siteEventsApi, toDoc)

	return (
		<section>
			<Seo title={t('menu.media.tadbirlar')} />
			<AsyncBoundary
				loading={loading}
				error={error}
				onRetry={retry}
				isEmpty={items.length === 0}
				skeleton={<SkeletonText lines={5} />}
			>
				<DocList items={items} />
			</AsyncBoundary>
		</section>
	)
}

export default Tadbirlar
