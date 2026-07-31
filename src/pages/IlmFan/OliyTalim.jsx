import { useTranslation } from 'react-i18next'
import ContentPage from '@/components/shared/ContentPage'

const Page = () => {
	const { t } = useTranslation()
	return <ContentPage module='science' contentKey='postgraduate' title={t('menu.science.oliy-talim')} />
}

export default Page
