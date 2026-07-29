import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://instat.uz'

/**
 * Har bir sahifaga o‘z title/description/canonical'ini beradi.
 * Ishlatish:  <Seo title='Rahbariyat' description='...' />
 */
const Seo = ({ title, description, image, noindex = false }) => {
	const { t, i18n } = useTranslation()
	const { pathname } = useLocation()

	const siteName = t('seo.siteName')
	const fullTitle = title ? `${title} | ${siteName}` : t('seo.defaultTitle')
	const desc = description ?? t('seo.defaultDescription')
	const url = `${SITE_URL}${pathname}`

	return (
		<Helmet>
			<html lang={i18n.resolvedLanguage} />
			<title>{fullTitle}</title>
			<meta name='description' content={desc} />
			<link rel='canonical' href={url} />
			{noindex && <meta name='robots' content='noindex, nofollow' />}

			<meta property='og:type' content='website' />
			<meta property='og:site_name' content={siteName} />
			<meta property='og:title' content={fullTitle} />
			<meta property='og:description' content={desc} />
			<meta property='og:url' content={url} />
			{image && <meta property='og:image' content={image} />}

			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={fullTitle} />
			<meta name='twitter:description' content={desc} />
		</Helmet>
	)
}

export default Seo
