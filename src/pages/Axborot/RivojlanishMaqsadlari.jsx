import { useTranslation } from 'react-i18next'
import LinkResourcePage from '@/components/shared/LinkResourcePage'

const Page = () => {
	const { t } = useTranslation()
	return <LinkResourcePage itemKey='nsdg_stat' title={t('menu.axborot.rivojlanish-maqsadlari')} />
}

export default Page
