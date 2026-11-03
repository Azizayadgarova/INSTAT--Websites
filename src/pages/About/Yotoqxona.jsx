import { useTranslation } from 'react-i18next'
import Dormitory from '@/components/inner/Dormitory'
import InnerPage from '@/components/inner/InnerPage'

const Page = () => {
	const { t } = useTranslation()
	return (
		<InnerPage title={t('menu.about.yotoqhona')}>
			<Dormitory />
		</InnerPage>
	)
}

export default Page
