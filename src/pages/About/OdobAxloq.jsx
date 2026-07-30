import { useTranslation } from 'react-i18next'
import ContentPage from '@/components/shared/ContentPage'

const Page = () => {
	const { t } = useTranslation()
	return (
		<div style={{ paddingTop: '59px' }}>
			<ContentPage module='odob' title={t('menu.about.odob-axloq')} badge={t('menu.about.title')} />
		</div>
	)
}

export default Page
