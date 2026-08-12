import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import SectionShell from '../../components/shared/SectionShell'
import PagePlaceholder from '../../components/shared/PagePlaceholder'
import { useMenu } from '../../hooks/useMenu'
import { useExternalMenuLink } from '../../hooks/useExternalMenuLink'

const InfoResurses = () => {
	const { t } = useTranslation()
	const menu = useMenu()
	const externalHref = useExternalMenuLink()
	const { pathname } = useLocation()
	const section = menu.axborot

	// `href` bo'lgan bo'limlar tashqi portalga (stat.uz va h.k.) ochiladi,
	// qolganlari odatdagidek ichki sahifaga o'tadi.
	const links = section.links.map(l => ({
		...l,
		href: externalHref('axborot', l.path),
		path: `${section.base}/${l.path}`,
	}))

	// Bola marshrutga to'g'ridan-to'g'ri kirilgan bo'lsa ham (URL orqali, boshqa
	// sahifadagi havoladan) tashqi resursga yo'naltiramiz — havola faqat menyuda
	// emas, sahifaning o'zida ham ishlashi kerak. URL admin panelda bo'sh bo'lsa
	// redirectTo = null va ichki sahifa odatdagidek ochiladi.
	const childPath = pathname.startsWith(`${section.base}/`)
		? pathname.slice(section.base.length + 1).split('/')[0]
		: null
	const redirectTo = childPath ? externalHref('axborot', childPath) : null

	useEffect(() => {
		// replace(): tarixda iz qoldirmaydi, aks holda "Ortga" tugmasi
		// foydalanuvchini shu sahifaga qaytarib, qayta yo'naltirib yuboradi.
		if (redirectTo) window.location.replace(redirectTo)
	}, [redirectTo])

	return (
		<SectionShell
			title={section.title}
			description={t('seo.defaultDescription')}
			links={links}
			showOutlet={!redirectTo}
		>
			{redirectTo ? (
				<section className='flex min-h-[60vh] flex-col items-center justify-center gap-3 px-6 py-16 text-center'>
					<p className='text-[18px]' style={{ color: 'rgba(var(--text-rgb),1)' }}>
						{t('common.redirecting')}
					</p>
					{/* Yo'naltirish biror sababga ko'ra ishlamasa — qo'lda o'tish uchun */}
					<a
						href={redirectTo}
						target='_blank'
						rel='noopener noreferrer'
						className='text-[16px] underline'
						style={{ color: 'rgba(var(--cyan-rgb),1)' }}
					>
						{redirectTo}
					</a>
				</section>
			) : (
				/* Bola marshrut tanlanmagan holat */
				<PagePlaceholder title={section.title} />
			)}
		</SectionShell>
	)
}

export default InfoResurses
