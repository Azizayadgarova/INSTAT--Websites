import { useTranslation } from 'react-i18next'
import GeneralInfo from '@/components/home/GeneralInfo'
import Seo from '@/components/shared/Seo'

/** Statik sahifa (@/data/generalInfo.data) — ilgari backend'dagi `about` matni va "Huquqiy asos" chiqarilgan edi. */
const UmumiyMalumot = () => {
	const { t } = useTranslation()
	return (
		<section>
			<Seo title={t('menu.about.umumiy-malumot')} />
			<GeneralInfo />
		</section>
	)
}

export default UmumiyMalumot
