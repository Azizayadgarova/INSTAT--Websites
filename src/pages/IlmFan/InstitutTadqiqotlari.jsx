import { useTranslation } from 'react-i18next'
import ContentPage from '@/components/shared/ContentPage'

const Page = () => {
	const { t } = useTranslation()
	return (
		<ContentPage
			module='science'
			contentKey='science_research'
			title={t('menu.science.institut-tadqiqotlari')}
			showLabels
			previewable
		/>
	)
}

export default Page
