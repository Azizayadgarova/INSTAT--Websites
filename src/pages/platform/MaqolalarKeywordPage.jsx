import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { reviewsApi } from '@/api/resources.api'
import { useApiResource } from '@/hooks/useApiResource'
import { Button2 } from '@/components/shared/Button2'
import AsyncBoundary from '@/components/shared/AsyncBoundary'
import Skeleton from '@/components/shared/Skeleton'

const textStyle = { color: '#fff', fontSize: '14px', lineHeight: 1.6, fontFamily: 'var(--font-display)', margin: 0 }
const mutedStyle = { ...textStyle, color: 'rgba(150,160,180,1)', fontSize: '13px' }

const authorNames = review =>
	(review.review_authors ?? [])
		.map(a => [a.first_name, a.last_name].filter(Boolean).join(' '))
		.filter(Boolean)
		.join(', ')

const pagerButton = disabled => ({
	padding: '8px 16px',
	borderRadius: '8px',
	border: 'none',
	background: 'rgba(255,255,255,0.06)',
	color: '#fff',
	fontSize: '13px',
	fontFamily: 'var(--font-display)',
	cursor: disabled ? 'default' : 'pointer',
	opacity: disabled ? 0.4 : 1,
})

/** Kalit so'z bo'yicha maqolalar — GET /reviews/?keyword={keyword} */
const MaqolalarKeywordPage = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const keyword = searchParams.get('keyword') ?? ''
	const [page, setPage] = useState(1)

	const { data, loading, error, retry } = useApiResource(
		() => reviewsApi.getAll({ keyword, page }),
		[keyword, page],
	)
	const items = data?.items ?? []
	const lastPage = data?.meta?.last_page ?? 1

	return (
		<section style={{ width: '100%', background: 'rgba(var(--bg-rgb),1)', minHeight: '100vh', padding: '24px 16px 100px' }}>
			<div style={{ maxWidth: '900px', margin: '0 auto' }}>
				<button
					onClick={() => navigate(-1)}
					style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', marginBottom: '24px', display: 'inline-block' }}
				>
					<Button2 text={t('pages.maqolaDetail.orqaga', 'Orqaga')} />
				</button>

				<div style={{ background: 'rgba(var(--card-rgb),1)', borderRadius: '22px', padding: '24px' }}>
					<h1 style={{ color: '#fff', fontSize: '20px', fontWeight: 600, fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
						{t('pages.maqolaDetail.kalit_soz', "Kalit so'z")}: {keyword}
					</h1>

					<AsyncBoundary loading={loading} error={error} onRetry={retry} isEmpty={false} skeleton={<Skeleton height={160} radius={16} />}>
						{items.length === 0 ? (
							<p style={mutedStyle}>{t('pages.maqolaDetail.maqola_topilmadi', 'Maqolalar topilmadi')}</p>
						) : (
							items.map(r => (
								<div
									key={r.id}
									style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
								>
									<div style={{ flex: 1, minWidth: 0 }}>
										<p style={{ ...textStyle, fontWeight: 500, marginBottom: '4px' }}>
											{r.title || t('pages.jurnalDetail.nomsiz_maqola', 'Nomsiz maqola')}
										</p>
										<p style={mutedStyle}>{authorNames(r)}</p>
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

					{lastPage > 1 && (
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '20px' }}>
							<button type='button' disabled={page <= 1} onClick={() => setPage(p => p - 1)} style={pagerButton(page <= 1)}>‹</button>
							<span style={mutedStyle}>{page} / {lastPage}</span>
							<button type='button' disabled={page >= lastPage} onClick={() => setPage(p => p + 1)} style={pagerButton(page >= lastPage)}>›</button>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default MaqolalarKeywordPage
