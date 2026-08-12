import { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { sitePostsApi } from '@/api/siteContent.api'
import AsyncBoundary from '@/components/shared/AsyncBoundary'
import RichContent from '@/components/shared/RichContent'
import Seo from '@/components/shared/Seo'
import { SkeletonText } from '@/components/shared/Skeleton'
import { DEMO_POSTS } from '@/data/posts.data'
import { useSiteList } from '@/hooks/useSiteList'
import { toPost } from '@/utils/siteContent'

/** "Boshqa yangiliklar" panjarasida bir sahifaga sig'adigan kartochkalar soni */
const PER_PAGE = 8

/**
 * Backend `site-posts` hozircha bo'sh. Maketni lokal ko'rish uchun DEV rejimida
 * demo ro'yxat ishlatiladi; prod build'da bo'sh qoladi va AsyncBoundary
 * "materiallar tayyorlanmoqda" holatini ko'rsatadi. API'da post paydo bo'lishi
 * bilan useSiteList o'zi haqiqiy ma'lumotga o'tadi.
 */
const FALLBACK = import.meta.env.DEV && !import.meta.env.TEST ? DEMO_POSTS : []

/** created_at (ISO) -> maketdagi ko'rinish: 23.01.2026. Sana bo'lmasa bo'sh qator. */
const formatDate = iso => {
	if (!iso) return ''
	const d = new Date(iso)
	if (Number.isNaN(d.getTime())) return ''
	const p = n => String(n).padStart(2, '0')
	return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`
}

/* --- Maketdagi kichik qismlar ------------------------------------------ */

/** Sahifa boshidagi "Yangiliklar" yorlig'i */
const Badge = ({ children }) => (
	<span
		style={{
			display: 'inline-block',
			padding: '6px 14px',
			borderRadius: 8,
			background: 'rgba(255,255,255,0.05)',
			border: '1px solid rgba(255,255,255,0.08)',
			color: '#fff',
			fontFamily: 'var(--font-display)',
			fontSize: 13,
			lineHeight: '20px',
			letterSpacing: '-0.01em',
		}}
	>
		{children}
	</span>
)

/** Rasm bo'lmaganda ham panjara buzilmasin — o'sha o'lchamdagi neytral joy */
const Thumb = ({ src, radius = 12, aspect = '16 / 10' }) => (
	<div
		style={{
			width: '100%',
			aspectRatio: aspect,
			borderRadius: radius,
			overflow: 'hidden',
			background: 'rgba(255,255,255,0.04)',
			flexShrink: 0,
		}}
	>
		{src && (
			<img
				src={src}
				alt=''
				loading='lazy'
				decoding='async'
				style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
			/>
		)}
	</div>
)

/** Yuqoridagi asosiy yangilik: chapda rasm, o'ngda sarlavha, ostida matn */
const FeaturedPost = ({ post }) => (
	<article>
		<div className='flex flex-col gap-5 md:flex-row md:gap-7'>
			<div className='w-full md:w-60 md:shrink-0'>
				<Thumb src={post.thumbnail} />
			</div>
			<h2
				className='text-[20px] md:text-[24px]'
				style={{
					color: '#fff',
					fontFamily: 'var(--font-display)',
					fontWeight: 600,
					lineHeight: 1.4,
					letterSpacing: '-0.02em',
					margin: 0,
					alignSelf: 'flex-start',
				}}
			>
				{post.title}
			</h2>
		</div>

		{post.body && (
			<div style={{ marginTop: 28 }}>
				<RichContent html={post.body} style={{ fontSize: 15, lineHeight: 1.8 }} />
			</div>
		)}
	</article>
)

/** "Boshqa yangiliklar" panjarasidagi kartochka — bosilganda yuqoriga chiqadi */
const NewsCard = ({ post, onSelect }) => {
	const date = formatDate(post.createdAt)

	return (
		<button
			type='button'
			onClick={onSelect}
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: 10,
				padding: 0,
				border: 'none',
				background: 'none',
				textAlign: 'left',
				cursor: 'pointer',
				width: '100%',
			}}
		>
			<Thumb src={post.thumbnail} radius={10} />
			{date && (
				<span
					style={{
						color: 'rgba(var(--muted-rgb),1)',
						fontFamily: 'var(--font-display)',
						fontSize: 12,
						lineHeight: '16px',
					}}
				>
					{date}
				</span>
			)}
			<span
				style={{
					color: '#fff',
					fontFamily: 'var(--font-display)',
					fontSize: 14,
					fontWeight: 500,
					lineHeight: '20px',
					letterSpacing: '-0.01em',
					display: '-webkit-box',
					WebkitLineClamp: 2,
					WebkitBoxOrient: 'vertical',
					overflow: 'hidden',
				}}
			>
				{post.title}
			</span>
		</button>
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

/** Maketdagi ixcham sahifalash: ‹ 1 2 3 … 16 › */
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
		<nav
			style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 28 }}
		>
			<PageBtn onClick={() => onChange(page - 1)} disabled={page === 1} label='Oldingi sahifa'>
				‹
			</PageBtn>
			{pages.map((p, i) =>
				p === '...' ? (
					<span
						key={`gap-${i}`}
						style={{
							minWidth: 32,
							textAlign: 'center',
							color: 'rgba(100,110,130,1)',
							fontFamily: 'var(--font-display)',
							fontSize: 14,
						}}
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

/* --- Sahifa ------------------------------------------------------------- */

const Yangiliklar = () => {
	const { t } = useTranslation()
	const topRef = useRef(null)

	const { items, loading, error, retry } = useSiteList('site-posts', sitePostsApi, toPost, FALLBACK)

	// Adminda sarlavhasiz qoralamalar ham bor (title_uz=null) — ular bosh yangilik
	// bo'lib chiqib qolmasin. Qolganida yangi yozuv yuqorida (backend tartiblamaydi).
	const posts = useMemo(
		() =>
			items
				.filter(p => p.title)
				.sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? '')),
		[items],
	)

	const [activeId, setActiveId] = useState(null)
	const [page, setPage] = useState(1)

	// Ochiq yangilik: tanlanmagan bo'lsa (yoki API ro'yxati yangilansa) — eng so'nggisi
	const active = posts.find(p => p.id === activeId) ?? posts[0] ?? null

	const others = posts.filter(p => p.id !== active?.id)
	const totalPages = Math.max(1, Math.ceil(others.length / PER_PAGE))
	// Ro'yxat qisqarsa (API kech keldi, boshqa yangilik ochildi) sahifa
	// chegaradan chiqmasin — state'ni tuzatish o'rniga render paytida cheklaymiz
	const safePage = Math.min(page, totalPages)
	const pageItems = others.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE)

	const openPost = id => {
		setActiveId(id)
		setPage(1)
		// jsdom'da scrollIntoView yo'q — testlar yiqilmasin
		topRef.current?.scrollIntoView?.({ behavior: 'smooth', block: 'start' })
	}

	return (
		<section ref={topRef}>
			<Seo title={t('menu.media.yangiliklar')} />
			<AsyncBoundary
				loading={loading}
				error={error}
				onRetry={retry}
				isEmpty={posts.length === 0}
				skeleton={<SkeletonText lines={8} />}
			>
				{active && (
					<>
						<div style={{ marginBottom: 24 }}>
							<Badge>{t('pages.yangiliklar.badge')}</Badge>
						</div>

						<FeaturedPost post={active} />

						{others.length > 0 && (
							<div style={{ marginTop: 44 }}>
								<h3
									style={{
										color: '#fff',
										fontFamily: 'var(--font-display)',
										fontSize: 16,
										fontWeight: 600,
										letterSpacing: '-0.01em',
										margin: '0 0 18px',
									}}
								>
									{t('pages.yangiliklar.other')}
								</h3>

								<div className='grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4'>
									{pageItems.map(post => (
										<NewsCard key={post.id} post={post} onSelect={() => openPost(post.id)} />
									))}
								</div>

								<Pagination page={safePage} total={totalPages} onChange={setPage} />
							</div>
						)}
					</>
				)}
			</AsyncBoundary>
		</section>
	)
}

export default Yangiliklar
