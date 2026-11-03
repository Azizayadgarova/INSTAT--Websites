import { useTranslation } from 'react-i18next'
import InnerPage from '@/components/inner/InnerPage'
import NewsList from '@/components/inner/NewsList'

const Yangiliklar = () => {
	const { t } = useTranslation()
	return (
		<InnerPage title={t('menu.media.yangiliklar')}>
			<NewsList />
		</InnerPage>
	)
}

export default Yangiliklar
