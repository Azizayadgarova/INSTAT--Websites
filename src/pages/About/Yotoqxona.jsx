import { useTranslation } from 'react-i18next'
import ContentPage from '@/components/shared/ContentPage'

const Page = () => {
	const { t } = useTranslation()
	return <ContentPage module='hotel' contentKey='hotel_text' title={t('menu.about.yotoqhona')} />
}

export default Page
