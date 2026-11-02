import { useTranslation } from 'react-i18next'
import PostgraduateList from '@/components/shared/PostgraduateList'
import Seo from '@/components/shared/Seo'

/** Ma'lumot statik (@/data/postgraduate.data) — ilgari backend'dagi `postgraduate` jadvali chiqarilgan edi. */
const Page = () => {
	const { t } = useTranslation()
	return (
		<section>
			<Seo title={t('menu.science.oliy-talim')} />
			<PostgraduateList />
		</section>
	)
}

export default Page
