import { useTranslation } from 'react-i18next'
import LinkResourcePage from '@/components/shared/LinkResourcePage'

const Page = () => {
	const { t } = useTranslation()
	return <LinkResourcePage itemKey='agro_stat' title={t('menu.axborot.qishloq-xojaligi')} />
}

export default Page
