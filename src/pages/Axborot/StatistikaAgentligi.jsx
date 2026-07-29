import { useTranslation } from 'react-i18next'
import LinkResourcePage from '@/components/shared/LinkResourcePage'

const Page = () => {
	const { t } = useTranslation()
	return <LinkResourcePage itemKey='lib_stat' title={t('menu.axborot.statistika-agentligi')} />
}

export default Page
