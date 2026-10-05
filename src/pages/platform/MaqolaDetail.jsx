import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { reviewsApi } from '@/api/resources.api'
import { useApiResource } from '@/hooks/useApiResource'
import { Button2 } from '@/components/shared/Button2'
import AsyncBoundary from '@/components/shared/AsyncBoundary'
import Skeleton from '@/components/shared/Skeleton'
import { API_URL } from '@/config/api'

const labelStyle = { color: 'rgba(150,160,180,1)', fontSize: '13px', fontFamily: 'var(--font-display)', marginBottom: '6px' }
const textStyle = { color: '#fff', fontSize: '14px', lineHeight: 1.6, fontFamily: 'var(--font-display)', margin: 0 }

/** Joriy til bo'yicha annotatsiya; topilmasa uz → boshqa tillar. */
const pickAnnotation = (review, lang) => {
	const code = (lang || 'uz').slice(0, 2)
	return review[`annotation_${code}`] || review.annotation_uz || review.annotation_ru || review.annotation_en || ''
}

/** React child sifatida xavfsiz: string/number bo'lmasa `name` yoki bo'sh qator. */
const toText = v => {
	if (v == null) return ''
	if (typeof v === 'string' || typeof v === 'number') return String(v)
	return typeof v.name === 'string' ? v.name : ''
}

/** `keywords` JSON qator ('["a","b"]') yoki massiv bo'lib kelishi mumkin. */
const parseKeywords = value => {
	let list = value
	if (typeof value === 'string') {
		try {
			list = JSON.parse(value)
		} catch {
			list = []
		}
	}
	return (Array.isArray(list) ? list : []).map(toText).filter(Boolean)
}

const Field = ({ label, children }) => (
	<div style={{ marginBottom: '20px' }}>
		<p style={labelStyle}>{label}</p>
		{children}
	</div>
)

/** O'ngdan chiqadigan keng panel: fayl sahifadan chiqmasdan iframe ichida ochiladi. */
const FileDrawer = ({ open, onClose, title, src }) => {
	const { t } = useTranslation()

	useEffect(() => {
		if (!open) return
		const onKey = e => e.key === 'Escape' && onClose()
		const prevOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		window.addEventListener('keydown', onKey)
		return () => {
			document.body.style.overflow = prevOverflow
			window.removeEventListener('keydown', onKey)
		}
	}, [open, onClose])

	return (
		<>
			<div
				onClick={onClose}
				style={{
					position: 'fixed',
					inset: 0,
					background: 'rgba(0,0,0,0.6)',
					opacity: open ? 1 : 0,
					pointerEvents: open ? 'auto' : 'none',
					transition: 'opacity .25s',
					zIndex: 1000,
				}}
			/>
			<aside
				role='dialog'
				aria-modal='true'
				aria-hidden={!open}
				style={{
					position: 'fixed',
					top: 0,
					right: 0,
					bottom: 0,
					width: 'min(1100px, 100%)',
					background: 'rgba(var(--card-rgb),1)',
					transform: open ? 'translateX(0)' : 'translateX(100%)',
					transition: 'transform .3s ease',
					zIndex: 1001,
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
					<p style={{ ...textStyle, flex: 1, minWidth: 0, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</p>
					<a
						href={src}
						target='_blank'
						rel='noopener noreferrer'
						style={{ color: 'rgba(var(--blue-rgb),1)', fontSize: '13px', fontFamily: 'var(--font-display)', textDecoration: 'none', whiteSpace: 'nowrap' }}
					>
						{t('pages.maqolaDetail.yangi_tabda', 'Yangi tabda ochish')}
					</a>
					<button
						type='button'
						onClick={onClose}
						aria-label={t('pages.maqolaDetail.yopish', 'Yopish')}
						style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', border: 'none', borderRadius: '8px', width: '32px', height: '32px', cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}
					>
						×
					</button>
				</div>
				{open && <iframe src={src} title={title} style={{ flex: 1, width: '100%', border: 'none', background: '#fff' }} />}
			</aside>
		</>
	)
}

const authorNames = review =>
	(review.review_authors ?? [])
		.map(a => [a.first_name, a.last_name].filter(Boolean).join(' '))
		.filter(Boolean)
		.join(', ')

/** Tab ichidagi maqolalar ro'yxati; faqat tab ochilganda yuklanadi. */
const RelatedList = ({ id, fetcher, emptyText }) => {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const { data, loading, error, retry } = useApiResource(() => fetcher(id), [id])
	const items = (data ?? []).map(i => i.review ?? i).filter(r => r?.id != null)

	return (
		<AsyncBoundary loading={loading} error={error} onRetry={retry} isEmpty={false} skeleton={<Skeleton height={120} radius={16} />}>
			{items.length === 0 ? (
				<p style={{ ...textStyle, color: 'rgba(150,160,180,1)' }}>{emptyText}</p>
			) : (
				items.map(r => (
					<div
						key={r.id}
						style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
					>
						<div style={{ flex: 1, minWidth: 0 }}>
							<p style={{ ...textStyle, fontWeight: 500, marginBottom: '4px' }}>{toText(r.title) || t('pages.jurnalDetail.nomsiz_maqola', 'Nomsiz maqola')}</p>
							<p style={{ ...textStyle, color: 'rgba(150,160,180,1)', fontSize: '13px' }}>{authorNames(r)}</p>
						</div>
						<button
							type='button'
							onClick={() => navigate(`/platform/maqola/${r.id}`)}
							style={{ padding: '6px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: '12px', fontWeight: 500, fontFamily: 'var(--font-display)', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
						>
							{t('pages.jurnalDetail.korish', "Ko'rish")}
						</button>
					</div>
				))
			)}
		</AsyncBoundary>
	)
}

const DetailSkeleton = () => (
	<div style={{ background: 'rgba(var(--card-rgb),1)', borderRadius: 22, padding: 24 }}>
		<Skeleton height={28} style={{ marginBottom: 16 }} />
		<Skeleton height={180} radius={16} />
	</div>
)

const QuoteIcon = () => (
	<svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
		<path d='M4 17.5V13c0-4 2-6.5 6-7.5l.5 1.5C8.5 7.7 8 9 8 11h3v6.5H4zm9 0V13c0-4 2-6.5 6-7.5l.5 1.5C17.5 7.7 17 9 17 11h3v6.5h-7z' />
	</svg>
)

const DownloadIcon = () => (
	<svg width='14' height='14' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
		<path d='M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 19h16' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
)

const actionStyle = {
	border: 'none',
	cursor: 'pointer',
	display: 'inline-flex',
	alignItems: 'center',
	padding: '8px 16px',
	borderRadius: '8px',
	background: 'rgba(var(--blue-rgb),0.12)',
	color: 'rgba(var(--blue-rgb),1)',
	fontSize: '13px',
	fontWeight: 500,
	fontFamily: 'var(--font-display)',
}

/** Iqtibos matni modali; `text` null bo'lsa yopiq. */
const QuoteModal = ({ text, onClose }) => {
	const { t } = useTranslation()
	const [copied, setCopied] = useState(false)
	const open = text != null

	useEffect(() => {
		if (!open) return
		setCopied(false)
		const onKey = e => e.key === 'Escape' && onClose()
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [open, onClose])

	if (!open) return null

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(text)
			setCopied(true)
		} catch {
			/* clipboard mavjud emas */
		}
	}

	return (
		<div
			onClick={onClose}
			style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
		>
			<div
				role='dialog'
				aria-modal='true'
				onClick={e => e.stopPropagation()}
				style={{ background: 'rgba(var(--card-rgb),1)', borderRadius: '22px', padding: '24px', width: 'min(600px, 100%)', maxHeight: '80vh', overflowY: 'auto' }}
			>
				<h3 style={{ color: '#fff', fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-display)', marginBottom: '12px' }}>
					{t('pages.maqolaDetail.iqtibos', 'Iqtibos keltirish')}
				</h3>
				<p style={{ ...textStyle, whiteSpace: 'pre-wrap', marginBottom: '20px' }}>{text}</p>
				<div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
					<button type='button' onClick={copy} style={actionStyle}>
						{copied ? t('pages.maqolaDetail.nusxalandi', 'Nusxalandi') : t('pages.maqolaDetail.nusxalash', 'Nusxalash')}
					</button>
					<button type='button' onClick={onClose} style={{ ...actionStyle, background: 'rgba(255,255,255,0.06)', color: '#fff' }}>
						{t('pages.maqolaDetail.yopish', 'Yopish')}
					</button>
				</div>
			</div>
		</div>
	)
}

const MaqolaDetail = () => {
	const { t, i18n } = useTranslation()
	const { id } = useParams()
	const navigate = useNavigate()
	const [drawerOpen, setDrawerOpen] = useState(false)
	const [activeTab, setActiveTab] = useState('author')
	const tabs = [
		{
			key: 'author',
			label: t('pages.maqolaDetail.muallif_maqolalari', "Muallifning boshqa maqolalari"),
			fetcher: reviewsApi.getByAuthor,
			empty: t('pages.maqolaDetail.muallif_maqolalari_yoq', "Muallifning boshqa maqolalari yo'q"),
		},
		{
			key: 'section',
			label: t('pages.maqolaDetail.oxshash_maqolalar', "O'xshash maqolalar"),
			fetcher: reviewsApi.getBySection,
			empty: t('pages.maqolaDetail.oxshash_maqolalar_yoq', "O'xshash maqolalar topilmadi"),
		},
	]
	const { data: review, loading, error, retry } = useApiResource(() => reviewsApi.getById(id), [id])
	const [counts, setCounts] = useState({ quotes: 0, downloads: 0 })
	const [quoteText, setQuoteText] = useState(null)
	const [quoteLoading, setQuoteLoading] = useState(false)

	useEffect(() => {
		setCounts({ quotes: Number(review?.quotes_count) || 0, downloads: Number(review?.downloads_count) || 0 })
	}, [review])

	const handleQuote = async () => {
		if (quoteLoading) return
		setQuoteLoading(true)
		try {
			const res = await reviewsApi.quote(id)
			setQuoteText(toText(typeof res === 'string' ? res : res?.text) || t('pages.maqolaDetail.iqtibos_yoq', 'Iqtibos topilmadi'))
			setCounts(c => ({ ...c, quotes: c.quotes + 1 }))
		} catch {
			setQuoteText(t('pages.maqolaDetail.iqtibos_xato', 'Iqtibosni olishda xatolik yuz berdi'))
		} finally {
			setQuoteLoading(false)
		}
	}

	const authors = (review?.review_authors ?? [])
		.map(a => [a.first_name, a.last_name].filter(Boolean).join(' '))
		.filter(Boolean)
		.join(', ')
	const annotation = review ? toText(pickAnnotation(review, i18n.language)) : ''
	const language = toText(review?.language)
	const keywords = parseKeywords(review?.keywords)

	return (
		<section style={{ width: '100%', background: 'rgba(var(--bg-rgb),1)', minHeight: '100vh', padding: '24px 16px 100px' }}>
			<div style={{ maxWidth: '900px', margin: '0 auto' }}>
				<button
					onClick={() => navigate(-1)}
					style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', marginBottom: '24px', display: 'inline-block' }}
				>
					<Button2 text={t('pages.maqolaDetail.orqaga', 'Orqaga')} />
				</button>

				<AsyncBoundary loading={loading} error={error} onRetry={retry} isEmpty={!loading && !error && !review} skeleton={<DetailSkeleton />}>
					{review && (
						<div style={{ background: 'rgba(var(--card-rgb),1)', borderRadius: '22px', padding: '24px' }}>
							<h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 600, fontFamily: 'var(--font-display)', marginBottom: '20px' }}>
								{review.title || t('pages.jurnalDetail.nomsiz_maqola', 'Nomsiz maqola')}
							</h1>

							{authors && (
								<Field label={t('pages.jurnalDetail.muallif', 'Muallif')}>
									<p style={textStyle}>{authors}</p>
								</Field>
							)}

							{language && (
								<Field label={t('pages.maqolaDetail.til', 'Til')}>
									<p style={{ ...textStyle, textTransform: 'uppercase' }}>{language}</p>
								</Field>
							)}

							{annotation && (
								<Field label={t('pages.maqolaDetail.annotatsiya', 'Annotatsiya')}>
									<p style={textStyle}>{annotation}</p>
								</Field>
							)}

							{keywords.length > 0 && (
								<Field label={t('pages.maqolaDetail.kalit_sozlar', 'Kalit so\'zlar')}>
									<div className='flex flex-wrap' style={{ gap: '8px' }}>
										{keywords.map(k => (
											<button
												key={k}
												type='button'
												onClick={() => navigate(`/platform/maqolalar?keyword=${encodeURIComponent(k)}`)}
												style={{ padding: '4px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: '12px', fontFamily: 'var(--font-display)' }}
											>
												{k}
											</button>
										))}
									</div>
								</Field>
							)}

							<div className='flex flex-wrap' style={{ gap: '10px' }}>
								<button
									type='button'
									onClick={handleQuote}
									disabled={quoteLoading}
									title={t('pages.maqolaDetail.iqtibos_tooltip', 'Iqtibos keltirish')}
									aria-label={t('pages.maqolaDetail.iqtibos_tooltip', 'Iqtibos keltirish')}
									style={{ ...actionStyle, gap: '6px', opacity: quoteLoading ? 0.6 : 1 }}
								>
									<QuoteIcon />
									{counts.quotes}
								</button>
								{review.main_file && (
									<>
										<a
											href={`${API_URL}/reviews/${id}/download-main-file/`}
											target='_blank'
											rel='noopener noreferrer'
											onClick={() => setCounts(c => ({ ...c, downloads: c.downloads + 1 }))}
											title={t('pages.jurnalDetail.yuklab_olish', 'Yuklab olish')}
											aria-label={t('pages.jurnalDetail.yuklab_olish', 'Yuklab olish')}
											style={{ ...actionStyle, gap: '6px', textDecoration: 'none' }}
										>
											<DownloadIcon />
											{counts.downloads}
										</a>
										<button type='button' onClick={() => setDrawerOpen(true)} style={actionStyle}>
											{t('pages.maqolaDetail.faylni_ochish', 'Maqola faylini ochish')}
										</button>
									</>
								)}
							</div>
						</div>
					)}
				</AsyncBoundary>

				{review && (
					<div style={{ background: 'rgba(var(--card-rgb),1)', borderRadius: '22px', padding: '24px', marginTop: '24px' }}>
						<div role='tablist' className='flex flex-wrap' style={{ gap: '8px', marginBottom: '16px' }}>
							{tabs.map(tab => (
								<button
									key={tab.key}
									role='tab'
									aria-selected={activeTab === tab.key}
									type='button'
									onClick={() => setActiveTab(tab.key)}
									style={{
										padding: '8px 16px',
										borderRadius: '8px',
										border: 'none',
										cursor: 'pointer',
										fontSize: '13px',
										fontWeight: 500,
										fontFamily: 'var(--font-display)',
										background: activeTab === tab.key ? 'rgba(var(--blue-rgb),0.12)' : 'rgba(255,255,255,0.06)',
										color: activeTab === tab.key ? 'rgba(var(--blue-rgb),1)' : '#fff',
									}}
								>
									{tab.label}
								</button>
							))}
						</div>
						{tabs.map(tab => tab.key === activeTab && (
							<RelatedList key={`${tab.key}-${id}`} id={id} fetcher={tab.fetcher} emptyText={tab.empty} />
						))}
					</div>
				)}
			</div>

			<QuoteModal text={quoteText} onClose={() => setQuoteText(null)} />

			{review?.main_file && (
				<FileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={review.title} src={review.main_file} />
			)}
		</section>
	)
}

export default MaqolaDetail
