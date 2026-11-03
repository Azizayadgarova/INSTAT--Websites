import { useTranslation } from 'react-i18next'
import InnerPage from '@/components/inner/InnerPage'
import Materials from '@/components/inner/Materials'

const OquvUslubiyMateriallar = () => {
	const { t } = useTranslation()
	return (
		<InnerPage title={t('menu.oquvFaoliyati.oquv-uslubiy-materiallar')}>
			<Materials />
		</InnerPage>
	)
}

export default OquvUslubiyMateriallar
