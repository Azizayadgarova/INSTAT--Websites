import { useTranslation } from 'react-i18next'
import Seo from './Seo'

/**
 * Kontenti hali tayyor bo'lmagan sahifalar uchun.
 * Bo'sh <div> o'rniga: to'g'ri <h1>, SEO meta va noindex (bo'sh sahifa indekslanmasin).
 */
const PagePlaceholder = ({ title, description }) => {
	const { t } = useTranslation()

	return (
		<section className='flex min-h-[60vh] flex-col items-center justify-center gap-3 px-6 py-16 text-center'>
			<Seo title={title} description={description} noindex />
			<h1 className='text-[28px] font-semibold text-white md:text-[36px]'>{title}</h1>
			<p className='text-[18px]' style={{ color: 'rgba(var(--text-rgb),1)' }}>
				{t('common.comingSoon')}
			</p>
			<p className='max-w-[420px] text-[14px]' style={{ color: 'rgba(var(--muted-rgb),1)' }}>
				{t('common.comingSoonHint')}
			</p>
		</section>
	)
}

export default PagePlaceholder
