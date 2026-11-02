import { useTranslation } from 'react-i18next'
import RichContent from './RichContent'
import { isPdf } from './PreviewButton'
import './doc-card.css'

const BADGE_COLORS = { PDF: '#e5484d', DOC: '#2B75CC', DOCX: '#2B75CC', XLS: '#2fa36b', XLSX: '#2fa36b', PPT: '#e8833a', PPTX: '#e8833a' }

/** Fayl kengaytmasi ("/files/a.PDF?x=1" -> "PDF"); topilmasa "FILE". */
const extOf = url => (/\.([a-z0-9]{2,5})(?:$|[?#])/i.exec(url ?? '')?.[1] ?? 'file').toUpperCase()

const DownloadIcon = () => (
	<svg viewBox='0 0 24 24' fill='none' aria-hidden='true'>
		<path d='M12 3v12m0 0l-4-4m4 4l4-4M5 21h14' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
)

const EyeIcon = () => (
	<svg viewBox='0 0 24 24' fill='none' aria-hidden='true'>
		<path d='M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z' stroke='currentColor' strokeWidth='2' strokeLinejoin='round' />
		<circle cx='12' cy='12' r='3' stroke='currentColor' strokeWidth='2' />
	</svg>
)

/**
 * Hujjat kartasi (dizayn: chapda "varaq" rasmi + format belgisi, o'ngda sarlavha, matn,
 * Format/Til teglari va "Yuklab olish" / "Oldindan ko'rish" tugmalari).
 *
 * `path` — fayl manzili (yuklab olish). `onPreview` berilsa va fayl PDF bo'lsa, "Oldindan ko'rish"
 * tugmasi chiqadi (ochish — ota komponentdagi FileDrawer).
 * `description` — oddiy matn yoki HTML (RichContent). `kicker` — yuqoridagi yorliq (standart: "Hujjat").
 * `compact` — ro'yxatdagi ixcham ko'rinish (kichik rasm, tavsifsiz).
 * `heading` — sarlavha tegi (sahifada h2 — yon mundarijaga tushadi; ro'yxatda h3).
 */
const DocCard = ({ title, description, kicker, path, onPreview, compact = false, heading: Heading = 'h2' }) => {
	const { t } = useTranslation()
	const ext = extOf(path)

	return (
		<article className={`dc${compact ? ' sm' : ''}`}>
			{/*<div className='dc-art' aria-hidden='true' style={{ '--dc-badge': BADGE_COLORS[ext] ?? '#6b7385' }}>*/}
			{/*	<span className='dc-badge'>{ext}</span>*/}
			{/*	<div className='dc-paper'>*/}
			{/*		<i className='dc-ring' />*/}
			{/*		<i className='dc-bar a' />*/}
			{/*		<i className='dc-bar b' />*/}
			{/*		<i className='dc-lines' />*/}
			{/*	</div>*/}
			{/*</div>*/}
			<div className='dc-b'>
				<div className='dc-k'>{kicker || t('common.docKicker')}</div>
				{title && <Heading className='dc-t'>{title}</Heading>}
				{!compact && description && (
					<div className='dc-d'>
						<RichContent html={description} />
					</div>
				)}
				<div className='dc-tags'>
					<span>
						{t('common.docFormat')}: <b>{ext}</b>
					</span>
					<span>
						{t('common.docLang')}: <b>{t('common.docLangName')}</b>
					</span>
				</div>
				{path && (
					<div className='dc-act'>
						<a className='dc-btn p' href={path} target='_blank' rel='noopener noreferrer'>
							<DownloadIcon />
							{t('common.download')}
						</a>
						{onPreview && isPdf(path) && (
							<button type='button' className='dc-btn g' onClick={onPreview}>
								<EyeIcon />
								{t('common.preview')}
							</button>
						)}
					</div>
				)}
			</div>
		</article>
	)
}

export default DocCard
