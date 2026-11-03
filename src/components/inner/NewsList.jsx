import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Block from '@/components/home/Block'
import { formatPostDate, htmlToExcerpt } from '@/components/news/NewsParts'
import AsyncBoundary from '@/components/shared/AsyncBoundary'
import { SkeletonText } from '@/components/shared/Skeleton'
import { useNewsPosts } from '@/hooks/useNewsPosts'

/** Bir sahifadagi yangiliklar soni (birinchi sahifada — bitta katta + qolganlari kartochka) */
const PER_PAGE = 9

export const newsHref = post => `/media-servises/yangiliklar/${post.id}`

/** Ro'yxatdagi kichik kartochka (shuningdek "Boshqa yangiliklar" bo'limida ishlatiladi). */
export const NewsCard = ({ post }) => {
	const date = formatPostDate(post.createdAt)
	const excerpt = htmlToExcerpt(post.body)
	return (
		<Link className='nwc' to={newsHref(post)}>
			<span className='im'>{post.thumbnail && <img src={post.thumbnail} alt='' loading='lazy' decoding='async' />}</span>
			<span className='bd'>
				{date && <span className='nw-mt'>{date}</span>}
				<h4>{post.title}</h4>
				{excerpt && <p>{excerpt}</p>}
			</span>
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
			minWidth: 34,
			height: 34,
			padding: '0 8px',
			borderRadius: 10,
			border: active ? '1px solid var(--blue)' : '1px solid transparent',
			background: active ? 'var(--blue)' : 'transparent',
			color: active ? '#fff' : 'var(--muted)',
			font: `${active ? 600 : 500} 14px var(--f-mono)`,
			cursor: disabled ? 'default' : 'pointer',
			opacity: disabled ? 0.4 : 1,
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
		<nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 26 }}>
			<PageBtn onClick={() => onChange(page - 1)} disabled={page === 1} label='Previous'>
				‹
			</PageBtn>
			{pages.map((p, i) =>
				p === '...' ? (
					<span key={`gap-${i}`} style={{ minWidth: 30, textAlign: 'center', color: 'var(--muted)' }}>
						…
					</span>
				) : (
					<PageBtn key={p} active={p === page} onClick={() => onChange(p)}>
						{p}
					</PageBtn>
				),
			)}
			<PageBtn onClick={() => onChange(page + 1)} disabled={page === total} label='Next'>
				›
			</PageBtn>
		</nav>
	)
}

/**
 * "Yangiliklar": eng yangi yangilik katta kartada, qolganlari kartochkalar panjarasida.
 * Prototip: INSTAT/page.html (`p30`). Ma'lumot backend'dan (site-posts, useNewsPosts).
 */
export default function NewsList() {
	const { t } = useTranslation()
	const { posts, loading, error, retry } = useNewsPosts()
	const [page, setPage] = useState(1)

	const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE))
	const safePage = Math.min(page, totalPages)
	const items = posts.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE)
	const featured = safePage === 1 ? items[0] : null
	const rest = featured ? items.slice(1) : items
	const excerpt = featured ? htmlToExcerpt(featured.body, 240) : ''

	return (
		<AsyncBoundary loading={loading} error={error} onRetry={retry} isEmpty={posts.length === 0} skeleton={<SkeletonText lines={8} />}>
			<Block instant>
				{featured && (
					<Link className='nwf' to={newsHref(featured)}>
						<span className='im'>{featured.thumbnail && <img src={featured.thumbnail} alt='' />}</span>
						<span className='bd'>
							<span className='nw-mt'>
								<span className='nw'>{t('newsPage.nw')}</span>
								{formatPostDate(featured.createdAt)}
							</span>
							<h3>{featured.title}</h3>
							{excerpt && <p>{excerpt}</p>}
							<span className='nw-more'>
								{t('newsPage.more')}
								<i>→</i>
							</span>
						</span>
					</Link>
				)}
				<div className='nwg'>
					{rest.map(post => (
						<NewsCard key={post.id} post={post} />
					))}
				</div>
				<Pagination page={safePage} total={totalPages} onChange={setPage} />
				<p className='nw-cnt'>{`${posts.length} ${t('newsPage.of')}`}</p>
			</Block>
		</AsyncBoundary>
	)
}
