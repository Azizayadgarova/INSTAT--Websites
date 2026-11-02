import { useTranslation } from 'react-i18next'

/** Fayl PDF'mi (so'rov parametrlari bilan ham) — faqat PDF'ni iframe'da ko'rsatib bo'ladi. */
export const isPdf = url => /\.pdf($|\?)/i.test(url ?? '')

/**
 * "Oldindan ko'rish" tugmasi — "Yuklab olish" tugmasi bilan bir xil ko'rinishda.
 * Bosilganda ota komponent FileDrawer orqali PDF'ni sahifadan chiqmasdan ochadi.
 */
const PreviewButton = ({ onClick, padding = '10px 18px', fontSize = 14, iconSize = 17 }) => {
	const { t } = useTranslation()

	return (
		<button
			type='button'
			onClick={onClick}
			style={{
				display: 'inline-flex',
				alignItems: 'center',
				gap: 8,
				padding,
				borderRadius: 10,
				border: '1px solid rgba(var(--blue-rgb),0.4)',
				background: 'rgba(var(--blue-rgb),0.1)',
				color: '#fff',
				fontSize,
				fontFamily: 'inherit',
				cursor: 'pointer',
			}}
		>
			<svg width={iconSize} height={iconSize} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
				<path d='M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z' stroke='currentColor' strokeWidth='2' strokeLinejoin='round' />
				<circle cx='12' cy='12' r='3' stroke='currentColor' strokeWidth='2' />
			</svg>
			{t('common.preview')}
		</button>
	)
}

export default PreviewButton
