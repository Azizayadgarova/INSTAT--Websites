import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

import Block from '@/components/home/Block'
import { formatPostDate, htmlToExcerpt } from '@/components/news/NewsParts'
import AsyncBoundary from '@/components/shared/AsyncBoundary'
import RichContent from '@/components/shared/RichContent'
import Seo from '@/components/shared/Seo'
import { SkeletonText } from '@/components/shared/Skeleton'
import { ShellHeroContext, useShellHero } from '@/components/shared/shellHero'
import { useNewsPosts } from '@/hooks/useNewsPosts'
import { IconFacebook, IconLink, IconTelegram } from './icons'
import { NewsCard } from './NewsList'

/**
 * Bitta yangilik: katta rasm, matn, ulashish tugmalari va "Boshqa yangiliklar".
 * Hero'da sana va yangilik sarlavhasi chiqadi (useShellHero). Prototip: INSTAT/page.html (`newsDetail`).
 */
export default function NewsArticle() {
	const { t } = useTranslation()
	const { id } = useParams()
	const { posts, loading, error, retry } = useNewsPosts()
	const [copied, setCopied] = useState(false)
	// SectionShell ichida sarlavha hero'da chiqadi; mustaqil ochilganda (shell'siz) o'zimiz chiqaramiz
	const inShell = useContext(ShellHeroContext) != null

	// URL'dagi id — qator, API id'si — son: qator sifatida solishtiramiz
	const post = posts.find(p => String(p.id) === String(id)) ?? null
	const related = posts.filter(p => p !== post).slice(0, 3)
	const date = formatPostDate(post?.createdAt)
	const url = typeof window === 'undefined' ? '' : window.location.href

	useShellHero(post ? { kicker: date, title: post.title } : null)

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(url)
			setCopied(true)
		} catch {
			/* clipboard mavjud emas */
		}
	}

	return (
		<>
			<Seo title={post?.title ?? t('menu.media.yangiliklar')} description={post ? htmlToExcerpt(post.body, 160) || undefined : undefined} />
			<AsyncBoundary loading={loading} error={error} onRetry={retry} skeleton={<SkeletonText lines={8} />}>
				{post ? (
					<>
						<Block instant>
							<Link className='nd-back' to='/media-servises/yangiliklar'>
								← {t('pages.yangiliklar.back')}
							</Link>
							{!inShell && (
								<h1 style={{ font: '600 clamp(24px,3vw,34px)/1.3 var(--f-display)', color: 'var(--white)', margin: '0 0 22px' }}>{post.title}</h1>
							)}
							{post.thumbnail && (
								<div className='nd-hero'>
									<img src={post.thumbnail} alt='' />
								</div>
							)}
							{post.body && (
								<div className='nd-tx'>
									<RichContent html={post.body} />
								</div>
							)}
							<div className='nd-sh'>
								{t('newsPage.sh')}:
								<a href={`https://t.me/share/url?url=${encodeURIComponent(url)}`} target='_blank' rel='noopener noreferrer' aria-label='Telegram'>
									<IconTelegram />
								</a>
								<a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target='_blank' rel='noopener noreferrer' aria-label='Facebook'>
									<IconFacebook />
								</a>
								<button type='button' onClick={copy} title={t('newsPage.cp')} aria-label={t('newsPage.cp')} style={copied ? { color: '#2fd39a' } : undefined}>
									<IconLink />
								</button>
							</div>
						</Block>
						{related.length > 0 && (
							<Block n='+' title={t('newsPage.rel')} instant>
								<div className='nwg'>
									{related.map(p => (
										<NewsCard key={p.id} post={p} />
									))}
								</div>
							</Block>
						)}
					</>
				) : (
					<p style={{ color: 'var(--muted)', padding: '40px 0' }}>{t('pages.yangiliklar.not_found')}</p>
				)}
			</AsyncBoundary>
		</>
	)
}
