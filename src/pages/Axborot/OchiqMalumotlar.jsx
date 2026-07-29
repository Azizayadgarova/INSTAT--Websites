import { useTranslation } from 'react-i18next'
import LinkResourcePage from '@/components/shared/LinkResourcePage'

const Page = () => {
	const { t } = useTranslation()
	return <LinkResourcePage itemKey='data_egov' title={t('menu.axborot.ochiq-malumotlar')} />
}

export default Page
