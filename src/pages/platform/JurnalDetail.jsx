import { useParams, useNavigate } from 'react-router-dom'
import { editionsApi, editionArticlesApi } from '@/api/resources.api'
import { useApiResource } from '@/hooks/useApiResource'
import { Button2 } from '@/components/shared/Button2'
import AsyncBoundary from '@/components/shared/AsyncBoundary'
import Skeleton from '@/components/shared/Skeleton'
import img1 from '@/assets/2.webp'

const formatDate = iso => {
	const d = new Date(iso)
	if (Number.isNaN(d.getTime())) return ''
	const dd = String(d.getDate()).padStart(2, '0')
	const mm = String(d.getMonth() + 1).padStart(2, '0')
	return `${dd}.${mm}.${d.getFullYear()}`
}

const DownloadIcon = () => (
	<svg width='14' height='14' viewBox='0 0 24 24' fill='none'>
		<path d='M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 19h16' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
)

const DownloadButton = ({ reviewId }) => (
	<a
		href={`${import.meta.env.VITE_API_URL}/reviews/${reviewId}/download-main-file/`}
		target='_blank'
		rel='noopener noreferrer'
		style={{
			display: 'inline-flex',
			alignItems: 'center',
			gap: '6px',
			padding: '6px 12px',
			borderRadius: '100px',
			background: 'rgba(var(--blue-rgb),0.12)',
			color: 'rgba(var(--blue-rgb),1)',
			fontSize: '12px',
			fontWeight: 500,
			fontFamily: 'var(--font-display)',
			textDecoration: 'none',
			whiteSpace: 'nowrap',
			flexShrink: 0,
		}}
	>
		<DownloadIcon />
		Yuklab olish
	</a>
)

const ArticleRow = ({ article }) => {
	const review = article.review ?? {}
	const expert = review.expert ?? {}
	const fullName = [expert.first_name, expert.last_name].filter(Boolean).join(' ') || 'Muallif'

	return (
		<div style={{ display: 'flex', gap: '12px', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
			<div style={{ flex: 1, minWidth: 0 }}>
				<div className='flex flex-wrap' style={{ alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
					<p style={{ color: '#fff', fontSize: '14px', fontWeight: 500, fontFamily: 'var(--font-display)', margin: 0 }}>
						{review.title || 'Nomsiz maqola'}
					</p>
				</div>
				<div className='flex flex-wrap' style={{ alignItems: 'center', gap: '8px', color: 'rgba(150,160,180,1)', fontSize: '13px', fontFamily: 'var(--font-display)' }}>
					<span>{fullName}</span>
					{review.language && (
						<>
							<span style={{ color: '#8a94a6' }}>•</span>
							<span style={{ textTransform: 'uppercase' }}>{review.language}</span>
						</>
					)}
					{review.created_at && (
						<>
							<span style={{ color: '#8a94a6' }}>•</span>
							<span>{formatDate(review.created_at)}</span>
						</>
					)}
				</div>
			</div>
			{review.id != null && <DownloadButton reviewId={review.id} />}
		</div>
	)
}

const NO_SECTION_KEY = 'no-section'

/** Maqolalarni `review.journal_section` bo'yicha guruhlaydi; bo'limi yo'qlar oxirida chiqadi. */
const groupBySection = articleList => {
	const groups = new Map()
	for (const article of articleList) {
		const section = article.review?.journal_section
		const key = section?.id ?? NO_SECTION_KEY
		if (!groups.has(key)) {
			groups.set(key, { id: key, name: section?.name ?? "Bo'limsiz", items: [] })
		}
		groups.get(key).items.push(article)
	}
	return [...groups.values()].sort((a, b) =>
		a.id === NO_SECTION_KEY ? 1 : b.id === NO_SECTION_KEY ? -1 : a.name.localeCompare(b.name),
	)
}

const ArticleSection = ({ section }) => (
	<div style={{ marginBottom: '28px' }}>
		<div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
			<h4 style={{ color: '#fff', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-display)', margin: 0 }}>
				{section.name}
			</h4>
			<span style={{ color: 'rgba(150,160,180,1)', fontSize: '13px', fontFamily: 'var(--font-display)' }}>
				({section.items.length})
			</span>
		</div>
		<div>
			{section.items.map(a => <ArticleRow key={a.id} article={a} />)}
		</div>
	</div>
)

const DetailSkeleton = () => (
	<div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 16px' }}>
		<Skeleton width={160} height={28} radius={100} style={{ marginBottom: 24 }} />
		<div style={{ background: 'rgba(var(--card-rgb),1)', borderRadius: 22, padding: 24, marginBottom: 24 }}>
			<Skeleton height={220} radius={16} />
		</div>
		<Skeleton height={200} radius={22} />
	</div>
)

const JurnalDetail = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const { data: edition, loading, error, retry } = useApiResource(() => editionsApi.getById(id), [id])
	const { data: articles } = useApiResource(() => editionArticlesApi.getByEdition(id), [id])
	const articleList = articles ?? []
	const sections = groupBySection(articleList)

	const yearLabel = edition
		? [edition.year && `${edition.year} yil`, edition.number && `${edition.number}-son`].filter(Boolean).join(' ')
		: ''

	return (
		<section style={{ width: '100%', background: 'rgba(var(--bg-rgb),1)', minHeight: '100vh', padding: '24px 16px 100px' }}>
			<div style={{ maxWidth: '900px', margin: '0 auto' }}>
				<button
					onClick={() => navigate('/platform/elektron-jurnal')}
					style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', marginBottom: '24px', display: 'inline-block' }}
				>
					<Button2 text='Jurnallar' />
				</button>

				<AsyncBoundary loading={loading} error={error} onRetry={retry} isEmpty={!loading && !error && !edition} skeleton={<DetailSkeleton />}>
					{edition && (
						<>
							{/* Nashr kartasi */}
							<div
								className='flex flex-col md:flex-row'
								style={{ background: 'rgba(var(--card-rgb),1)', borderRadius: '22px', padding: '20px', gap: '24px', marginBottom: '24px' }}
							>
								<div className='w-full md:w-[220px]' style={{ borderRadius: '16px', overflow: 'hidden', flexShrink: 0, background: '#fff' }}>
									<img
										src={edition.thumbnail || img1}
										alt={edition.title}
										className='w-full h-[260px] md:h-full object-cover'
										loading='lazy'
										decoding='async'
									/>
								</div>

								<div className='flex-1'>
									<h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 600, fontFamily: 'var(--font-display)', marginBottom: '6px' }}>
										{edition.title}
									</h1>
									{yearLabel && (
										<p style={{ color: 'rgba(150,160,180,1)', fontSize: '14px', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>
											{yearLabel}
										</p>
									)}
									<div className='flex flex-wrap' style={{ alignItems: 'center', gap: '10px' }}>
										{edition.published_at && (
											<span style={{ color: '#BCBCBC', fontSize: '13px', fontFamily: 'var(--font-display)' }}>
												Nashr sanasi: {formatDate(edition.published_at)}
											</span>
										)}
									</div>
								</div>
							</div>

							{/* Maqolalar */}
							<div style={{ background: 'rgba(var(--card-rgb),1)', borderRadius: '22px', padding: '24px' }}>
								<h3 style={{ color: '#fff', fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
									Maqolalar
								</h3>
								{sections.length > 0 ? (
									<div>
										{sections.map(section => <ArticleSection key={section.id} section={section} />)}
									</div>
								) : (
									<p style={{ color: 'rgba(150,160,180,1)', fontSize: '14px', fontFamily: 'var(--font-display)' }}>
										Bu nashrda hozircha maqolalar yo'q
									</p>
								)}
							</div>
						</>
					)}
				</AsyncBoundary>
			</div>
		</section>
	)
}

export default JurnalDetail
