import { useTranslation } from 'react-i18next'
import Cooperation from '@/components/inner/Cooperation'
import InnerPage from '@/components/inner/InnerPage'

const Page = () => {
	const { t } = useTranslation()
	return (
		<InnerPage title={t('menu.media.hamkorlik')}>
			<Cooperation />
		</InnerPage>
	)
}

export default Page
