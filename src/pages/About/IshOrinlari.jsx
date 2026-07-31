import { useTranslation } from 'react-i18next'
import Seo from '@/components/shared/Seo'
import AsyncBoundary from '@/components/shared/AsyncBoundary'
import { SkeletonText } from '@/components/shared/Skeleton'
import { useVacancies } from '@/hooks/useVacancies'

const TH = {
	textAlign: 'left',
	padding: '16px 20px',
	fontFamily: 'var(--font-display)',
	fontSize: 13,
	fontWeight: 600,
	color: 'rgba(var(--muted-rgb),1)',
	textTransform: 'uppercase',
	letterSpacing: '0.04em',
	whiteSpace: 'nowrap',
}

const TD = {
	padding: '18px 20px',
	fontFamily: 'var(--font-display)',
	fontSize: 14,
	color: '#fff',
	lineHeight: 1.5,
	verticalAlign: 'top',
}

const DT = {
	fontFamily: 'var(--font-display)',
	fontSize: 12,
	fontWeight: 500,
	color: 'rgba(var(--muted-rgb),1)',
	margin: 0,
	whiteSpace: 'nowrap',
}

const DD = {
	fontFamily: 'var(--font-display)',
	fontSize: 13,
	color: '#fff',
	lineHeight: 1.5,
	margin: 0,
}

const IshOrinlari = () => {
	const { t } = useTranslation()
	const { items, loading, error, retry } = useVacancies()

	return (
		<section>
			<Seo title={t('pages.ishOrinlari.sarlavha')} />

			<h1 style={{ color: '#fff', fontSize: 24, fontWeight: 600, margin: '0 0 8px' }}>
				{t('pages.ishOrinlari.sarlavha')}
			</h1>
			<p style={{ color: 'rgba(var(--muted-rgb),1)', fontSize: 15, lineHeight: 1.6, margin: '0 0 28px' }}>
				{t('pages.ishOrinlari.tavsif')}
			</p>

			<AsyncBoundary loading={loading} error={error} onRetry={retry} skeleton={<SkeletonText lines={6} />}>
				{items.length === 0 ? (
					<p style={{ color: 'rgba(var(--muted-rgb),1)', fontSize: 15, textAlign: 'center', padding: '40px 0' }}>
						{t('pages.ishOrinlari.bosh_orin_yoq')}
					</p>
				) : (
					<>
						{/* Desktop: jadval */}
						<div
							className='hidden md:block'
							style={{
								background: 'rgba(var(--card-rgb),1)',
								border: '1px solid rgba(255,255,255,0.05)',
								borderRadius: 16,
								overflow: 'hidden',
							}}
						>
							<table style={{ width: '100%', borderCollapse: 'collapse' }}>
								<thead>
									<tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
										<th style={TH}>{t('pages.ishOrinlari.lavozim')}</th>
										<th style={TH}>{t('pages.ishOrinlari.bolim')}</th>
										<th style={TH}>{t('pages.ishOrinlari.ish_haqi')}</th>
										<th style={TH}>{t('pages.ishOrinlari.ish_tartibi')}</th>
										<th style={TH}>{t('pages.ishOrinlari.talablar')}</th>
									</tr>
								</thead>
								<tbody>
									{items.map((job, i) => (
										<tr
											key={job.id}
											style={{
												borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
												transition: 'background .15s',
											}}
											onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
											onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
										>
											<td style={{ ...TD, fontWeight: 600 }}>{job.title}</td>
											<td style={{ ...TD, color: 'rgba(var(--muted-rgb),1)' }}>{job.place || '—'}</td>
											<td style={{ ...TD, color: 'rgba(var(--cyan-rgb),1)', fontWeight: 500, whiteSpace: 'nowrap' }}>
												{job.pay || '—'}
												{job.payIsAmount && (
													<span style={{ color: 'rgba(var(--muted-rgb),1)', fontWeight: 400 }}>
														{' '}/ {t('components.ishOrinlariVakansiyalar.oy')}
													</span>
												)}
											</td>
											<td style={{ ...TD, color: 'rgba(var(--muted-rgb),1)' }}>{job.shift || '—'}</td>
											<td style={{ ...TD, color: 'rgba(var(--muted-rgb),1)', maxWidth: 320 }}>{job.desc || '—'}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						{/* Mobil: kartochkalar — tor ekranda jadval o'qib bo'lmaydi */}
						<div className='md:hidden' style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
							{items.map(job => (
								<div
									key={job.id}
									style={{
										background: 'rgba(var(--card-rgb),1)',
										border: '1px solid rgba(255,255,255,0.05)',
										borderRadius: 14,
										padding: '18px 20px',
									}}
								>
									<p style={{ color: '#fff', fontSize: 16, fontWeight: 600, margin: '0 0 12px' }}>{job.title}</p>
									<dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', rowGap: 8, columnGap: 12, margin: 0 }}>
										{job.place && (
											<>
												<dt style={DT}>{t('pages.ishOrinlari.bolim')}</dt>
												<dd style={DD}>{job.place}</dd>
											</>
										)}
										{job.pay && (
											<>
												<dt style={DT}>{t('pages.ishOrinlari.ish_haqi')}</dt>
												<dd style={DD}>{job.pay}{job.payIsAmount ? ` / ${t('components.ishOrinlariVakansiyalar.oy')}` : ''}</dd>
											</>
										)}
										{job.shift && (
											<>
												<dt style={DT}>{t('pages.ishOrinlari.ish_tartibi')}</dt>
												<dd style={DD}>{job.shift}</dd>
											</>
										)}
										{job.desc && (
											<>
												<dt style={DT}>{t('pages.ishOrinlari.talablar')}</dt>
												<dd style={DD}>{job.desc}</dd>
											</>
										)}
									</dl>
								</div>
							))}
						</div>
					</>
				)}
			</AsyncBoundary>
		</section>
	)
}

export default IshOrinlari
