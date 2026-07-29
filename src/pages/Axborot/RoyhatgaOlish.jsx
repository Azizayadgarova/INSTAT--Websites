import { useTranslation } from 'react-i18next'
import LinkResourcePage from '@/components/shared/LinkResourcePage'

const Page = () => {
	const { t } = useTranslation()
	return <LinkResourcePage itemKey='aholi_stat' title={t('menu.axborot.royhatga-olish')} />
}

export default Page
