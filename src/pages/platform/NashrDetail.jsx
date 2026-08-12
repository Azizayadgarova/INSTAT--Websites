import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getDataReportById } from '@/api/resources.api'
import { useApiResource } from '@/hooks/useApiResource'
import { pickField } from '@/utils/siteContent'
import { Button2 } from '@/components/shared/Button2'
import AsyncBoundary from '@/components/shared/AsyncBoundary'
import RichContent from '@/components/shared/RichContent'
import Skeleton from '@/components/shared/Skeleton'

const UZ_MONTHS = [
	'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
	'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr',
]

const formatMonthYear = (iso, lang) => {
	if (!iso) return ''
	const d = new Date(iso)
	if (Number.isNaN(d.getTime())) return ''
	if (lang === 'uz') return `${d.getFullYear()} yil ${UZ_MONTHS[d.getMonth()]}`
	return d.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', { year: 'numeric', month: 'long' })
}

const formatDate = iso => {
	const d = new Date(iso)
	if (Number.isNaN(d.getTime())) return ''
	const dd = String(d.getDate()).padStart(2, '0')
	const mm = String(d.getMonth() + 1).padStart(2, '0')
	return `${dd}.${mm}.${d.getFullYear()}`
}

const InfoRow = ({ label, value }) => (
	<div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
		<span style={{ color: 'rgba(150,160,180,1)', fontSize: '13px', fontFamily: 'var(--font-display)' }}>{label}</span>
		<span style={{ color: '#fff', fontSize: '13px', fontWeight: 500, fontFamily: 'var(--font-display)', textAlign: 'right' }}>{value}</span>
	</div>
)

const DetailSkeleton = () => (
	<div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 16px' }}>
		<Skeleton width={160} height={28} radius={100} style={{ marginBottom: 24 }} />
		<Skeleton height={220} radius={22} />
	</div>
)

const NashrDetail = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'

	const { data: report, loading, error, retry } = useApiResource(() => getDataReportById(id), [id])

	const title = report ? pickField(report, 'name', lang) : ''
	const description = report ? pickField(report, 'description', lang) : ''
	const categoryName = report?.category ? pickField(report.category, 'name', lang) : ''
	const categoryDescription = report?.category ? pickField(report.category, 'description', lang) : ''
	const options = report?.options ?? []

	return (
		<section style={{ width: '100%', background: 'rgba(var(--bg-rgb),1)', minHeight: '100vh', padding: '24px 16px 100px' }}>
			<div style={{ maxWidth: '900px', margin: '0 auto' }}>
				<button
					onClick={() => navigate('/platform/mikro-malumotlar')}
					style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', marginBottom: '24px', display: 'inline-block' }}
				>
					<Button2 text={t('pages.nashrDetail.nashrlar', 'Nashrlar')} />
				</button>

				<AsyncBoundary loading={loading} error={error} onRetry={retry} isEmpty={!loading && !error && !report} skeleton={<DetailSkeleton />}>
					{report && (
						<div style={{ background: 'rgba(var(--card-rgb),1)', borderRadius: '22px', padding: '24px' }}>
							<h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 600, fontFamily: 'var(--font-display)', marginBottom: '6px' }}>
								{title}
							</h1>
							{categoryName && (
								<p style={{ color: 'rgba(150,160,180,1)', fontSize: '14px', fontFamily: 'var(--font-display)', marginBottom: '20px' }}>
									{categoryName}
								</p>
							)}

							<div style={{ maxWidth: '420px', marginBottom: '20px' }}>
								{categoryName && <InfoRow label={t('pages.nashrDetail.kategoriya', 'Kategoriya')} value={categoryName} />}
								{report.created_at && <InfoRow label={t('pages.nashrDetail.nashr_etilgan_sana', 'Nashr etilgan sana')} value={formatMonthYear(report.created_at, lang)} />}
							</div>

							{description && (
								<div style={{ marginBottom: '20px' }}>
									<h3 style={{ color: '#fff', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-display)', marginBottom: '10px' }}>
										{t('pages.nashrDetail.tavsif', 'Tavsif')}
									</h3>
									<RichContent html={description} />
								</div>
							)}

							{categoryDescription && (
								<div style={{ marginBottom: '20px' }}>
									<h3 style={{ color: '#fff', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-display)', marginBottom: '10px' }}>
										{t('pages.nashrDetail.kategoriya_haqida', 'Kategoriya haqida')}
									</h3>
									<RichContent html={categoryDescription} />
								</div>
							)}

							{options.length > 0 && (
								<div>
									<h3 style={{ color: '#fff', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-display)', marginBottom: '10px' }}>
										{t('pages.nashrDetail.mavjud_davrlar', 'Mavjud davrlar')}
									</h3>
									<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
										{options.map(o => (
											<div
												key={o.id}
												style={{
													display: 'flex', alignItems: 'center', justifyContent: 'space-between',
													padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)',
												}}
											>
												<span style={{ color: '#fff', fontSize: '13px', fontFamily: 'var(--font-display)' }}>
													{formatDate(o.date_from)} — {formatDate(o.date_to)}
												</span>
												{o.file_extension && (
													<span style={{ color: 'rgba(150,160,180,1)', fontSize: '12px', fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}>
														{o.file_extension}
													</span>
												)}
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					)}
				</AsyncBoundary>
			</div>
		</section>
	)
}

export default NashrDetail
