import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { sitePostsApi } from '@/api/siteContent.api'
import { useApiResource } from '@/hooks/useApiResource'
import { pickField, mediaUrl } from '@/utils/siteContent'
import AsyncBoundary from '@/components/shared/AsyncBoundary'
import Seo from '@/components/shared/Seo'
import { SkeletonText } from '@/components/shared/Skeleton'

const PAGE_SIZE = 9

/** HTML teglarni olib tashlab, qisqa matn (excerpt) hosil qiladi. */
const stripHtml = html =>
	(html || '')
		.replace(/<[^>]*>/g, ' ')
		.replace(/&[a-z]+;/gi, ' ')
		.replace(/\s+/g, ' ')
		.trim()

/** ISO sanani DD.MM.YYYY ko'rinishiga o'giradi. */
const formatDate = iso => {
	if (!iso) return ''
	const d = new Date(iso)
	if (Number.isNaN(d.getTime())) return ''
	const pad = n => String(n).padStart(2, '0')
	return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`
}

const ImagePlaceholder = () => (
	<div
		style={{
			width: '100%',
			height: '100%',
			display: 'grid',
			placeItems: 'center',
			background: 'linear-gradient(135deg, rgba(62,139,230,0.25), rgba(31,37,51,1))',
		}}
	>
		<svg width='40' height='40' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
			<rect x='3' y='5' width='18' height='14' rx='2' stroke='rgba(255,255,255,0.35)' strokeWidth='1.5' />
			<circle cx='8.5' cy='10' r='1.5' fill='rgba(255,255,255,0.35)' />
			<path d='M5 17l4-4 3 3 3-3 4 4' stroke='rgba(255,255,255,0.35)' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
		</svg>
	</div>
)

const NewsCard = ({ post, lang }) => {
	const title = pickField(post, 'title', lang)
	const excerpt = stripHtml(pickField(post, 'body', lang))
	const thumb = mediaUrl(post.thumbnail)
	const date = formatDate(post.created_at)
	const [imgOk, setImgOk] = useState(Boolean(thumb))

	return (
		<article
			style={{
				background: 'rgba(255, 255, 255, 0.04)',
				border: '1px solid rgba(31,37,51,1)',
				borderRadius: '16px',
				overflow: 'hidden',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', background: 'rgba(31,37,51,1)' }}>
				{imgOk ? (
					<img
						src={thumb}
						alt=''
						onError={() => setImgOk(false)}
						style={{ width: '100%', height: '100%', objectFit: 'cover' }}
						loading='lazy'
						decoding='async'
					/>
				) : (
					<ImagePlaceholder />
				)}
				{date && (
					<span
						style={{
							position: 'absolute',
							top: '8px',
							right: '8px',
							padding: '4px 10px',
							borderRadius: '8px',
							background: 'rgba(0,0,0,0.55)',
							backdropFilter: 'blur(4px)',
							fontSize: '12px',
							fontWeight: 500,
							color: '#fff',
						}}
					>
						{date}
					</span>
				)}
			</div>

			<div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
				<h3
					style={{
						margin: 0,
						fontFamily: 'Inter Display, sans-serif',
						fontWeight: 600,
						fontSize: '15px',
						lineHeight: 1.4,
						color: 'rgba(225, 227, 234, 1)',
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
					}}
				>
					{title}
				</h3>
				{excerpt && (
					<p
						style={{
							margin: 0,
							fontSize: '13px',
							lineHeight: 1.6,
							color: 'rgba(var(--muted-rgb),1)',
							display: '-webkit-box',
							WebkitLineClamp: 2,
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden',
						}}
					>
						{excerpt}
					</p>
				)}
			</div>
		</article>
	)
}

/** Sahifa raqamlari ro'yxati: 1 … n ellipsis bilan. */
const getPages = (current, total) => {
	if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
	const pages = [1]
	const start = Math.max(2, current - 1)
	const end = Math.min(total - 1, current + 1)
	if (start > 2) pages.push('…')
	for (let i = start; i <= end; i++) pages.push(i)
	if (end < total - 1) pages.push('…')
	pages.push(total)
	return pages
}

const PageButton = ({ children, active, disabled, onClick }) => (
	<button
		onClick={onClick}
		disabled={disabled}
		style={{
			minWidth: '36px',
			height: '36px',
			padding: '0 8px',
			borderRadius: '8px',
			border: '1px solid rgba(31,37,51,1)',
			background: active ? 'rgba(var(--blue-rgb),1)' : 'transparent',
			color: active ? '#fff' : disabled ? 'rgba(90,98,117,1)' : 'rgba(225,227,234,1)',
			fontFamily: 'Inter Display, sans-serif',
			fontSize: '14px',
			cursor: disabled ? 'default' : 'pointer',
		}}
	>
		{children}
	</button>
)

const Pagination = ({ page, totalPages, onChange }) => {
	if (totalPages <= 1) return null
	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '32px', flexWrap: 'wrap' }}>
			<PageButton disabled={page === 1} onClick={() => onChange(page - 1)}>‹</PageButton>
			{getPages(page, totalPages).map((p, i) =>
				p === '…' ? (
					<span key={`e${i}`} style={{ color: 'rgba(90,98,117,1)', padding: '0 4px' }}>…</span>
				) : (
					<PageButton key={p} active={p === page} onClick={() => onChange(p)}>{p}</PageButton>
				)
			)}
			<PageButton disabled={page === totalPages} onClick={() => onChange(page + 1)}>›</PageButton>
		</div>
	)
}

const Yangiliklar = () => {
	const { t, i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const { data, loading, error, retry } = useApiResource(() => sitePostsApi.getAllFlat(), [])
	const posts = Array.isArray(data) ? data : []

	const [page, setPage] = useState(1)
	const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE))
	const current = Math.min(page, totalPages)
	const pagePosts = posts.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

	return (
		<section style={{ width: '100%', padding: '59px 0 80px 0' }}>
			<Seo title={t('menu.media.yangiliklar')} />

			<div style={{ marginBottom: '20px', display: 'inline-flex' }}>
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
					{t('menu.media.title')}
				</span>
			</div>

			<h1 className='gradient-heading' style={{ marginBottom: '32px' }}>
				{t('menu.media.yangiliklar')}
			</h1>

			<AsyncBoundary
				loading={loading}
				error={error}
				onRetry={retry}
				isEmpty={posts.length === 0}
				skeleton={<SkeletonText lines={8} />}
			>
				<div className='grid gap-6' style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
					{pagePosts.map(post => (
						<NewsCard key={post.id} post={post} lang={lang} />
					))}
				</div>
				<Pagination page={current} totalPages={totalPages} onChange={setPage} />
			</AsyncBoundary>
		</section>
	)
}

export default Yangiliklar
