import { useTranslation } from 'react-i18next'
import ContentPage from '@/components/shared/ContentPage'

const Page = () => {
	const { t } = useTranslation()
	return (
		<div style={{ paddingTop: '59px' }}>
			<ContentPage
				module='science'
				contentKey='science_programme'
				title={t('menu.science.ilmiy-tadqiqot')}
				badge={t('menu.science.title')}
			/>
		</div>
	)
}

export default Page
