import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

import AsyncBoundary from '@/components/shared/AsyncBoundary'
import RichContent from '@/components/shared/RichContent'
import Seo from '@/components/shared/Seo'
import { SkeletonText } from '@/components/shared/Skeleton'
import { Thumb, formatPostDate, htmlToExcerpt } from '@/components/news/NewsParts'
import { useNewsPosts } from '@/hooks/useNewsPosts'

const BackLink = ({ children }) => (
	<Link
		to='/media-servises/yangiliklar'
		style={{
			display: 'inline-flex',
			alignItems: 'center',
			gap: 6,
			color: 'rgba(var(--muted-rgb),1)',
			fontFamily: 'var(--font-display)',
			fontSize: 14,
			textDecoration: 'none',
			marginBottom: 24,
		}}
	>
		<span aria-hidden='true'>←</span>
		{children}
	</Link>
)

/** Bitta yangilikning to'liq ko'rinishi — /media-servises/yangiliklar/:id */
const YangilikDetail = () => {
	const { t } = useTranslation()
	const { id } = useParams()
	const { posts, loading, error, retry } = useNewsPosts()

	// URL'dagi id — qator, API id'si — son: qator sifatida solishtiramiz
	const post = posts.find(p => String(p.id) === String(id)) ?? null
	const date = formatPostDate(post?.createdAt)

	return (
		<section>
			<Seo title={post?.title ?? t('menu.media.yangiliklar')} description={post ? htmlToExcerpt(post.body, 160) || undefined : undefined} />
			<BackLink>{t('pages.yangiliklar.back')}</BackLink>

			<AsyncBoundary loading={loading} error={error} onRetry={retry} skeleton={<SkeletonText lines={8} />}>
				{post ? (
					<article>
						{post.thumbnail && (
							<div style={{ marginBottom: 24 }}>
								<Thumb src={post.thumbnail} radius={16} aspect='16 / 8' />
							</div>
						)}
						{date && (
							<p style={{ color: 'rgba(var(--muted-rgb),1)', fontFamily: 'var(--font-display)', fontSize: 13, margin: '0 0 10px' }}>
								{date}
							</p>
						)}
						<h1
							className='text-[24px] md:text-[32px]'
							style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, lineHeight: 1.3, letterSpacing: '-0.02em', margin: '0 0 24px' }}
						>
							{post.title}
						</h1>
						{post.body && <RichContent html={post.body} style={{ fontSize: 15, lineHeight: 1.8 }} />}
					</article>
				) : (
					<p style={{ color: 'rgba(var(--muted-rgb),1)', fontFamily: 'var(--font-display)', fontSize: 15, padding: '40px 0' }}>
						{t('pages.yangiliklar.not_found')}
					</p>
				)}
			</AsyncBoundary>
		</section>
	)
}

export default YangilikDetail
