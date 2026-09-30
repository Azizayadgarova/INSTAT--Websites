import { useTranslation } from 'react-i18next'
import SectionShell from '../../components/shared/SectionShell'
import PagePlaceholder from '../../components/shared/PagePlaceholder'
import { useMenu } from '../../hooks/useMenu'

const OquvFaoliyati = () => {
	const { t } = useTranslation()
	const menu = useMenu()
	const section = menu.oquvFaoliyati

	const links = section.links.map(l => ({
		...l,
		path: `${section.base}/${l.path}`,
	}))

	return (
		<SectionShell title={section.title} description={t('seo.defaultDescription')} links={links}>
			{/* Bola marshrut tanlanmagan holat */}
			<PagePlaceholder title={section.title} />
		</SectionShell>
	)
}

export default OquvFaoliyati
