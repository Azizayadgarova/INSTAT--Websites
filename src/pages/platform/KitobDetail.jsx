import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getBookById, bookCommentsApi } from '@/api/resources.api'
import { useApiResource } from '@/hooks/useApiResource'
import { pickField } from '@/utils/siteContent'
import { Button2 } from '@/components/shared/Button2'
import AsyncBoundary from '@/components/shared/AsyncBoundary'
import RichContent from '@/components/shared/RichContent'
import Skeleton from '@/components/shared/Skeleton'
import StarIcon from '@/assets/Star.png'

const STARS = [0, 1, 2, 3, 4]

const TABS = [
	{ key: 'tarif', label: "Mahsulot ta'rifi" },
	{ key: 'sharhlar', label: 'Sharhlar' },
]

const API_ORIGIN = (() => {
	try {
		return new URL(import.meta.env.VITE_API_URL ?? 'https://api1.instat.uz/api').origin
	} catch {
		return ''
	}
})()

const formatDate = iso => {
	const d = new Date(iso)
	if (Number.isNaN(d.getTime())) return ''
	const dd = String(d.getDate()).padStart(2, '0')
	const mm = String(d.getMonth() + 1).padStart(2, '0')
	return `${dd}.${mm}.${d.getFullYear()}`
}

const StarsRow = ({ filled, size = 16 }) => (
	<div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
		{STARS.map(starIdx => (
			<img
				key={starIdx}
				src={StarIcon}
				alt=''
				style={{ width: size, height: size, opacity: starIdx < filled ? 1 : 0.25 }}
				loading='lazy'
				decoding='async'
			/>
		))}
	</div>
)

const InfoRow = ({ label, value }) => (
	<div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
		<span style={{ color: 'rgba(150,160,180,1)', fontSize: '13px', fontFamily: 'var(--font-display)' }}>{label}</span>
		<span style={{ color: '#fff', fontSize: '13px', fontWeight: 500, fontFamily: 'var(--font-display)', textAlign: 'right' }}>{value}</span>
	</div>
)

const Avatar = ({ src, name }) => (
	src ? (
		<img src={src} alt={name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} loading='lazy' decoding='async' />
	) : (
		<div style={{
			width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
			background: 'rgba(var(--blue-rgb),0.25)', color: '#fff', fontSize: '14px', fontWeight: 600,
			display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)',
		}}>
			{(name?.[0] ?? '?').toUpperCase()}
		</div>
	)
)

const DetailSkeleton = () => (
	<div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 16px' }}>
		<Skeleton width={160} height={28} radius={100} style={{ marginBottom: 24 }} />
		<div style={{ background: 'rgba(var(--card-rgb),1)', borderRadius: 22, padding: 24, marginBottom: 24 }}>
			<Skeleton height={220} radius={16} />
		</div>
		<Skeleton height={200} radius={22} />
	</div>
)

const KitobDetail = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const [tab, setTab] = useState('tarif')

	const { data: book, loading, error, retry } = useApiResource(() => getBookById(id), [id])
	const { data: comments } = useApiResource(() => bookCommentsApi.getByBook(id), [id])
	const commentList = comments ?? []

	const title = book ? pickField(book, 'name', lang) : ''
	const description = book ? pickField(book, 'description', lang) : ''
	const categoryName = book?.category ? pickField(book.category, 'name', lang) : ''
	const authorName = book?.author?.name ?? ''
	const image = book?.book_thumbnails?.length
		? `${import.meta.env.VITE_API_STORAGE_URL}/${book.book_thumbnails[0].file}`
		: null
	const priceLabel = book && Number(book.price) > 0
		? `${Number(book.price).toLocaleString('uz-UZ')} ${t('components.coursesSection.uzs', "so'm")}`
		: t('components.coursesSection.0_uzs')
	const rating = book?.comments_count > 0 ? book.stars_sum / book.comments_count : 0
	const filledStars = Math.round(rating)

	const handleStart = () => window.open(import.meta.env.VITE_API_CABINET_URL, '_blank')

	return (
		<section style={{ width: '100%', background: 'rgba(var(--bg-rgb),1)', minHeight: '100vh', padding: '24px 16px 100px' }}>
			<div style={{ maxWidth: '1100px', margin: '0 auto' }}>
				<button
					onClick={() => navigate('/platform/kutubxona-katalogi')}
					style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', marginBottom: '24px', display: 'inline-block' }}
				>
					<Button2 text='Kutubxona katalogi' />
				</button>

				<AsyncBoundary loading={loading} error={error} onRetry={retry} isEmpty={!loading && !error && !book} skeleton={<DetailSkeleton />}>
					{book && (
						<>
							{/* Asosiy kitob kartasi */}
							<div
								className='flex flex-col md:flex-row'
								style={{ background: 'rgba(var(--card-rgb),1)', borderRadius: '22px', padding: '20px', gap: '24px', marginBottom: '24px' }}
							>
								<div className='w-full md:w-[220px]' style={{ borderRadius: '16px', overflow: 'hidden', flexShrink: 0, background: '#fff' }}>
									{image && (
										<img src={image} alt={title} className='w-full h-[260px] md:h-full object-cover' loading='lazy' decoding='async' />
									)}
								</div>

								<div className='flex-1'>
									<h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 600, fontFamily: 'var(--font-display)', marginBottom: '6px' }}>
										{title}
									</h1>
									{authorName && (
										<p style={{ color: 'rgba(150,160,180,1)', fontSize: '14px', fontFamily: 'var(--font-display)', marginBottom: '18px' }}>
											{authorName}
										</p>
									)}

									<div style={{ maxWidth: '420px' }}>
										{categoryName && <InfoRow label='Kotegoriya' value={categoryName} />}
										{book.created_at && <InfoRow label='Tizimga yuklangan sana:' value={formatDate(book.created_at)} />}
									</div>
								</div>

								<div className='flex md:flex-col items-center md:items-end justify-between md:justify-start gap-4'>
									<div style={{ color: '#fff', fontSize: '28px', fontWeight: 600, fontFamily: 'var(--font-display)', whiteSpace: 'nowrap' }}>
										{priceLabel}
									</div>
									<button
										onClick={handleStart}
										style={{
											padding: '12px 24px',
											borderRadius: '12px',
											background: 'rgba(var(--blue-rgb),1)',
											color: '#fff',
											fontWeight: 600,
											fontSize: '14px',
											border: 'none',
											cursor: 'pointer',
											whiteSpace: 'nowrap',
											fontFamily: 'var(--font-display)',
										}}
									>
										O'qishni boshlash
									</button>
								</div>
							</div>

							{/* Kitob ma'lumotlari */}
							<div style={{ marginBottom: '24px' }}>
								<p style={{ color: 'rgba(150,160,180,1)', fontSize: '13px', fontFamily: 'var(--font-display)', marginBottom: '10px' }}>
									Kitob ma'lumotlari
								</p>
								<div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
									<StarsRow filled={filledStars} />
									{book.comments_count > 0 && (
										<span style={{ color: '#fff', fontSize: '14px', fontWeight: 500, fontFamily: 'var(--font-display)' }}>{rating.toFixed(1)}</span>
									)}
									<span style={{ color: '#8a94a6' }}>•</span>
									<span style={{ color: '#BCBCBC', fontSize: '14px', fontFamily: 'var(--font-display)' }}>{book.orders_count ?? 0} ta sotuv</span>
									<span style={{ color: '#8a94a6' }}>•</span>
									<span style={{ color: '#BCBCBC', fontSize: '14px', fontFamily: 'var(--font-display)' }}>{book.comments_count ?? 0} ta izoh</span>
								</div>
							</div>

							{/* Tabs + kontent */}
							<div style={{ background: 'rgba(var(--card-rgb),1)', borderRadius: '22px', padding: '24px' }}>
								<div
									className='flex flex-wrap'
									style={{ gap: '10px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '16px' }}
								>
									{TABS.map(tb => (
										<button
											key={tb.key}
											onClick={() => setTab(tb.key)}
											style={{
												padding: '8px 16px',
												borderRadius: '10px',
												fontSize: '13px',
												fontWeight: 500,
												fontFamily: 'var(--font-display)',
												border: 'none',
												cursor: 'pointer',
												whiteSpace: 'nowrap',
												background: tab === tb.key ? 'rgba(var(--blue-rgb),1)' : 'rgba(255,255,255,0.04)',
												color: tab === tb.key ? '#fff' : 'rgba(202,202,206,1)',
												transition: 'background .2s, color .2s',
											}}
										>
											{tb.label}
										</button>
									))}
								</div>

								{tab === 'tarif' ? (
									description ? (
										<>
											<h3 style={{ color: '#fff', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-display)', marginBottom: '12px' }}>
												Description
											</h3>
											<RichContent html={description} />
										</>
									) : (
										<p style={{ color: 'rgba(150,160,180,1)', fontSize: '14px', fontFamily: 'var(--font-display)' }}>
											{t('common.comingSoonHint')}
										</p>
									)
								) : commentList.length > 0 ? (
									<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
										{commentList.map(c => {
											const fullName = [c.user?.first_name, c.user?.last_name].filter(Boolean).join(' ') || 'Foydalanuvchi'
											const avatarSrc = c.user?.avatar ? `${API_ORIGIN}${c.user.avatar}` : null
											return (
												<div key={c.id} style={{ display: 'flex', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
													<Avatar src={avatarSrc} name={fullName} />
													<div style={{ flex: 1 }}>
														<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
															<span style={{ color: '#fff', fontSize: '13px', fontWeight: 500, fontFamily: 'var(--font-display)' }}>{fullName}</span>
															<span style={{ color: '#8a94a6', fontSize: '12px', fontFamily: 'var(--font-display)' }}>{formatDate(c.created_at)}</span>
														</div>
														<div style={{ marginBottom: '6px' }}>
															<StarsRow filled={c.stars ?? 0} size={12} />
														</div>
														<p style={{ color: 'rgba(202,202,206,1)', fontSize: '13px', fontFamily: 'var(--font-display)', margin: 0 }}>{c.text}</p>
													</div>
												</div>
											)
										})}
									</div>
								) : (
									<p style={{ color: 'rgba(150,160,180,1)', fontSize: '14px', fontFamily: 'var(--font-display)' }}>
										{t('common.comingSoonHint')}
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

export default KitobDetail
