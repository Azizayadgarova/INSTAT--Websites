import { useTranslation } from 'react-i18next'
import ContentPage from '@/components/shared/ContentPage'

const Page = () => {
	const { t } = useTranslation()
	return <ContentPage module='press' title={t('menu.media.hamkorlik')} />
}

export default Page
