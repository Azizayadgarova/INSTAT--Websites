import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { sitePostsApi } from '@/api/siteContent.api'
import AsyncBoundary from '@/components/shared/AsyncBoundary'
import RichContent from '@/components/shared/RichContent'
import Seo from '@/components/shared/Seo'
import { SkeletonText } from '@/components/shared/Skeleton'
import { useSiteList } from '@/hooks/useSiteList'
import { toPost } from '@/utils/siteContent'

/** created_at (ISO) -> joriy tildagi sana. Sana bo'lmasa bo'sh qator. */
const formatDate = (iso, lang) => {
	if (!iso) return ''
	const d = new Date(iso)
	if (Number.isNaN(d.getTime())) return ''
	const locale = lang === 'ru' ? 'ru-RU' : lang === 'en' ? 'en-US' : 'uz-UZ'
	return d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
}

const cardStyle = {
	background: 'rgba(var(--card-rgb),1)',
	border: '1px solid rgba(255,255,255,0.05)',
	borderRadius: 16,
	overflow: 'hidden',
}

const PostCard = ({ post, lang, isOpen, onToggle }) => {
	const { t } = useTranslation()
	const date = formatDate(post.createdAt, lang)

	return (
		<article style={cardStyle}>
			{post.thumbnail && (
				<img
					src={post.thumbnail}
					alt=''
					loading='lazy'
					decoding='async'
					style={{ width: '100%', maxHeight: 320, objectFit: 'cover', display: 'block' }}
				/>
			)}
			<div style={{ padding: '20px 22px' }}>
				{date && <p style={{ color: 'rgba(var(--muted-rgb),1)', fontSize: 13, margin: '0 0 8px' }}>{date}</p>}
				<h2 style={{ color: '#fff', fontSize: 18, fontWeight: 600, lineHeight: 1.45, margin: 0 }}>
					{post.title}
				</h2>

				{post.body && (
					<>
						<div
							style={{
								marginTop: 14,
								overflow: 'hidden',
								maxHeight: isOpen ? 'none' : 120,
								// yopiq holatda matn pastga qarab so'nadi
								maskImage: isOpen ? 'none' : 'linear-gradient(180deg,#000 55%,transparent)',
								WebkitMaskImage: isOpen ? 'none' : 'linear-gradient(180deg,#000 55%,transparent)',
							}}
						>
							<RichContent html={post.body} />
						</div>
						<button
							type='button'
							onClick={onToggle}
							aria-expanded={isOpen}
							style={{
								marginTop: 12,
								padding: '9px 18px',
								borderRadius: 10,
								border: '1px solid rgba(var(--blue-rgb),0.4)',
								background: 'rgba(var(--blue-rgb),0.1)',
								color: '#fff',
								cursor: 'pointer',
								fontSize: 14,
							}}
						>
							{isOpen ? t('common.collapse', 'Yopish') : t('common.readMore', "To'liq o'qish")}
						</button>
					</>
				)}
			</div>
		</article>
	)
}

const Yangiliklar = () => {
	const { t, i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const [openId, setOpenId] = useState(null)

	const { items, loading, error, retry } = useSiteList('site-posts', sitePostsApi, toPost)

	// Yangi yozuv yuqorida — backend tartiblab bermaydi
	const posts = [...items].sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''))

	return (
		<section>
			<Seo title={t('menu.media.yangiliklar')} />
			<h1 className='mb-6 text-[26px] font-semibold text-white md:text-[32px]'>
				{t('menu.media.yangiliklar')}
			</h1>
			<AsyncBoundary
				loading={loading}
				error={error}
				onRetry={retry}
				isEmpty={posts.length === 0}
				skeleton={<SkeletonText lines={8} />}
			>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
					{posts.map(post => (
						<PostCard
							key={post.id}
							post={post}
							lang={lang}
							isOpen={openId === post.id}
							onToggle={() => setOpenId(prev => (prev === post.id ? null : post.id))}
						/>
					))}
				</div>
			</AsyncBoundary>
		</section>
	)
}

export default Yangiliklar
