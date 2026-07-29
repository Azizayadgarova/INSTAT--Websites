import { useTranslation } from 'react-i18next'
import ContentPage from '@/components/shared/ContentPage'

const Page = () => {
	const { t } = useTranslation()
	return <ContentPage module='odob' title={t('menu.about.odob-axloq')} />
}

export default Page
