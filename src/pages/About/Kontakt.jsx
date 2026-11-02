import { useTranslation } from 'react-i18next'
import ContactPanel from '@/components/shared/ContactPanel'
import Seo from '@/components/shared/Seo'

const Kontakt = () => {
	const { t } = useTranslation()
	return (
		<section>
			<Seo title={t('menu.about.kontakt')} />
			<ContactPanel />
		</section>
	)
}

export default Kontakt
