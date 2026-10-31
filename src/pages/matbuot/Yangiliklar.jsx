import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import AsyncBoundary from '@/components/shared/AsyncBoundary'
import Seo from '@/components/shared/Seo'
import { SkeletonText } from '@/components/shared/Skeleton'
import { Badge, Thumb, formatPostDate, htmlToExcerpt } from '@/components/news/NewsParts'
import { useNewsPosts } from '@/hooks/useNewsPosts'

/** Bir sahifadagi kartochkalar soni */
const PER_PAGE = 9

/** Ro'yxatdagi bitta yangilik kartochkasi — bosilganda alohida sahifaga o'tadi */
const NewsCard = ({ post }) => {
	const date = formatPostDate(post.createdAt)
	const excerpt = htmlToExcerpt(post.body)

	return (
		<Link
			to={`/media-servises/yangiliklar/${post.id}`}
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: 12,
				padding: 12,
				borderRadius: 16,
				background: 'rgba(var(--card-rgb),1)',
				border: '1px solid rgba(255,255,255,0.06)',
				textDecoration: 'none',
				height: '100%',
				transition: 'transform .2s, border-color .2s',
			}}
			onMouseEnter={e => {
				e.currentTarget.style.transform = 'translateY(-3px)'
				e.currentTarget.style.borderColor = 'rgba(var(--blue-rgb),0.5)'
			}}
			onMouseLeave={e => {
				e.currentTarget.style.transform = ''
				e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
			}}
		>
			<Thumb src={post.thumbnail} radius={10} />
			{date && (
				<span style={{ color: 'rgba(var(--muted-rgb),1)', fontFamily: 'var(--font-display)', fontSize: 12, lineHeight: '16px' }}>
					{date}
				</span>
			)}
			<h3
				style={{
					color: '#fff',
					fontFamily: 'var(--font-display)',
					fontSize: 15,
					fontWeight: 600,
					lineHeight: '21px',
					letterSpacing: '-0.01em',
					margin: 0,
					display: '-webkit-box',
					WebkitLineClamp: 3,
					WebkitBoxOrient: 'vertical',
					overflow: 'hidden',
				}}
			>
				{post.title}
			</h3>
			{excerpt && (
				<p
					style={{
						color: 'rgba(var(--muted-rgb),1)',
						fontFamily: 'var(--font-display)',
						fontSize: 13,
						lineHeight: '19px',
						margin: 0,
						display: '-webkit-box',
						WebkitLineClamp: 3,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
					}}
				>
					{excerpt}
				</p>
			)}
		</Link>
	)
}

const PageBtn = ({ children, onClick, active, disabled, label }) => (
	<button
		type='button'
		onClick={onClick}
		disabled={disabled}
		aria-label={label}
		aria-current={active ? 'page' : undefined}
		style={{
			minWidth: 32,
			height: 32,
			padding: '0 8px',
			borderRadius: 8,
			border: 'none',
			background: active ? 'rgba(var(--blue-rgb),1)' : 'transparent',
			color: active ? '#fff' : 'rgba(150,160,180,1)',
			fontFamily: 'var(--font-display)',
			fontSize: 14,
			fontWeight: active ? 600 : 400,
			cursor: disabled ? 'default' : 'pointer',
			opacity: disabled ? 0.4 : 1,
			transition: 'background .2s, color .2s',
		}}
	>
		{children}
	</button>
)

/** Ixcham sahifalash: ‹ 1 2 3 … 16 › */
const Pagination = ({ page, total, onChange }) => {
	if (total <= 1) return null

	const pages =
		total <= 5
			? Array.from({ length: total }, (_, i) => i + 1)
			: page <= 3
				? [1, 2, 3, '...', total]
				: page >= total - 2
					? [1, '...', total - 2, total - 1, total]
					: [1, '...', page, '...', total]

	return (
		<nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 32 }}>
			<PageBtn onClick={() => onChange(page - 1)} disabled={page === 1} label='Oldingi sahifa'>
				‹
			</PageBtn>
			{pages.map((p, i) =>
				p === '...' ? (
					<span
						key={`gap-${i}`}
						style={{ minWidth: 32, textAlign: 'center', color: 'rgba(100,110,130,1)', fontFamily: 'var(--font-display)', fontSize: 14 }}
					>
						…
					</span>
				) : (
					<PageBtn key={p} active={p === page} onClick={() => onChange(p)}>
						{p}
					</PageBtn>
				),
			)}
			<PageBtn onClick={() => onChange(page + 1)} disabled={page === total} label='Keyingi sahifa'>
				›
			</PageBtn>
		</nav>
	)
}

const Yangiliklar = () => {
	const { t } = useTranslation()
	const { posts, loading, error, retry } = useNewsPosts()
	const [page, setPage] = useState(1)

	const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE))
	// Ro'yxat qisqarsa (API kech keldi) sahifa chegaradan chiqmasin
	const safePage = Math.min(page, totalPages)
	const pageItems = posts.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE)

	return (
		<section>
			<Seo title={t('menu.media.yangiliklar')} />
			<AsyncBoundary
				loading={loading}
				error={error}
				onRetry={retry}
				isEmpty={posts.length === 0}
				skeleton={<SkeletonText lines={8} />}
			>
				<div style={{ marginBottom: 24 }}>
					<Badge>{t('pages.yangiliklar.badge')}</Badge>
				</div>

				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 xl:grid-cols-3'>
					{pageItems.map(post => (
						<NewsCard key={post.id} post={post} />
					))}
				</div>

				<Pagination page={safePage} total={totalPages} onChange={setPage} />
			</AsyncBoundary>
		</section>
	)
}

export default Yangiliklar
