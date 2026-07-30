import { useTranslation } from 'react-i18next'
import { useSiteData } from '@/hooks/useSiteData'
import Seo from '@/components/shared/Seo'
import pdfIcon from '@/assets/File Format Icons [1.1] (1).png'
import downloadIcon from '@/assets/Vector (17).png'

/** Fayl kengaytmasi (PDF, DOCX ...). Topilmasa "FILE". */
const fileExt = url => {
	const m = /\.([a-z0-9]+)(?:\?|#|$)/i.exec(url ?? '')
	return m ? m[1].toUpperCase() : 'FILE'
}

const Badge = ({ text }) => (
	<span
		style={{
			display: 'inline-flex',
			alignItems: 'center',
			padding: '4px 16px',
			borderRadius: '8px',
			background: 'rgba(255, 255, 255, 0.04)',
			fontFamily: 'Inter Display, sans-serif',
			fontWeight: 600,
			fontSize: '16px',
			lineHeight: '28px',
			letterSpacing: '-0.02em',
			color: 'rgba(255, 255, 255, 1)',
		}}
	>
		{text}
	</span>
)

/** PDF/hujjat yuklab olish kartochkasi. */
const FileCard = ({ href, title, subtitle }) => {
	const { t } = useTranslation()
	return (
		<div
			className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'
			style={{
				background: 'rgba(31, 37, 51, 1)',
				borderRadius: '16px',
				padding: '16px',
				boxSizing: 'border-box',
			}}
		>
			<div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0 }}>
				{/* PDF ikonka */}
				<img
					src={pdfIcon}
					alt='PDF'
					style={{ width: '44px', height: '44px', objectFit: 'contain', flexShrink: 0 }}
					loading='lazy'
					decoding='async'
				/>
				<div style={{ minWidth: 0 }}>
					<p
						style={{
							fontFamily: 'Inter Display, sans-serif',
							fontWeight: 600,
							fontSize: '16px',
							lineHeight: '24px',
							color: 'rgba(255, 255, 255, 1)',
							margin: 0,
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						{title}
					</p>
					{subtitle && (
						<p
							style={{
								fontFamily: 'Inter Display, sans-serif',
								fontWeight: 400,
								fontSize: '14px',
								lineHeight: '20px',
								color: 'rgba(148, 155, 171, 1)',
								margin: 0,
							}}
						>
							{subtitle}
						</p>
					)}
				</div>
			</div>

			<a
				href={href || undefined}
				target='_blank'
				rel='noopener noreferrer'
				aria-disabled={!href}
				style={{
					display: 'inline-flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: '4px',
					width: '126px',
					height: '40px',
					borderRadius: '10px',
					padding: '10px',
					background: 'rgba(31, 37, 51, 1)',
					border: '1px solid rgba(22, 27, 38, 1)',
					boxShadow:
						'0px 2px 6px 0px rgba(255, 255, 255, 0.2) inset, 0px -2px 4px 0px rgba(14, 18, 27, 1) inset, 0px 16px 24px -8px rgba(24, 27, 37, 0.1), 0px 0px 0px 1px rgba(31, 37, 51, 1)',
					color: href ? 'rgba(255, 255, 255, 1)' : 'rgba(148, 155, 171, 1)',
					fontFamily: 'Inter Display, sans-serif',
					fontWeight: 500,
					fontSize: '14px',
					lineHeight: '20px',
					textDecoration: 'none',
					whiteSpace: 'nowrap',
					boxSizing: 'border-box',
					flexShrink: 0,
					opacity: href ? 1 : 0.6,
					pointerEvents: href ? 'auto' : 'none',
				}}
			>
				<img src={downloadIcon} alt='' aria-hidden='true' style={{ width: '18px', height: '18px', objectFit: 'contain', flexShrink: 0 }} />
				{t('common.download', 'Yuklab olish')}
			</a>
		</div>
	)
}

/**
 * Tuzilma sahifasi — tashkiliy tuzilma hujjati (API: module=structure, key=structure).
 * Kontakt bloki bu yerdan Rahbariyat sahifasiga ko'chirilgan (ContactSection).
 */
const Tuzilma = () => {
	const { t } = useTranslation()
	const item = useSiteData(d => d.byModuleKey.structure?.structure ?? null).data

	const href = item?.path ?? ''
	const title = (item?.label || '').trim() || t('menu.about.tuzilma')
	const subtitle = href ? fileExt(href) : 'PDF'

	return (
		<div style={{ width: '100%', padding: '59px 0 80px 0' }}>
			<Seo title={t('menu.about.tuzilma')} />

			<div style={{ marginBottom: '20px', display: 'inline-flex' }}>
				<Badge text={t('menu.about.title')} />
			</div>

			<h1 className='gradient-heading' style={{ marginBottom: '32px' }}>
				{t('menu.about.tuzilma')}
			</h1>

			<FileCard href={href} title={title} subtitle={subtitle} />
		</div>
	)
}

export default Tuzilma
