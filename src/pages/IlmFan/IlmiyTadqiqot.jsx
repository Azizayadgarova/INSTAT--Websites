import { useTranslation } from 'react-i18next'
import ContentPage from '@/components/shared/ContentPage'

const Page = () => {
	const { t } = useTranslation()
	return <ContentPage module='science' contentKey='science_programme' title={t('menu.science.ilmiy-tadqiqot')} />
}

export default Page
