import { useTranslation } from 'react-i18next'
import PagePlaceholder from '../../components/shared/PagePlaceholder'

const Yangiliklar = () => {
	const { t } = useTranslation()
	return <PagePlaceholder title={t('menu.media.yangiliklar')} />
}

export default Yangiliklar
