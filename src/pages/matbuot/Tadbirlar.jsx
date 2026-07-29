import { useTranslation } from 'react-i18next'
import PagePlaceholder from '../../components/shared/PagePlaceholder'

const Tadbirlar = () => {
	const { t } = useTranslation()
	return <PagePlaceholder title={t('menu.media.tadbirlar')} />
}

export default Tadbirlar
