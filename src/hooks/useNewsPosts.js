import { useMemo } from 'react'

import { sitePostsApi } from '@/api/siteContent.api'
import { DEMO_POSTS } from '@/data/posts.data'
import { toPost } from '@/utils/siteContent'
import { useSiteList } from './useSiteList'

/**
 * Backend `site-posts` hozircha deyarli bo'sh. Maketni lokal ko'rish uchun DEV
 * rejimida demo ro'yxat ishlatiladi; prod build'da bo'sh qoladi va sahifa
 * "materiallar tayyorlanmoqda" holatini ko'rsatadi. API'da post paydo bo'lishi
 * bilan useSiteList o'zi haqiqiy ma'lumotga o'tadi.
 */
const FALLBACK = import.meta.env.DEV && !import.meta.env.TEST ? DEMO_POSTS : []

/**
 * Yangiliklar ro'yxati (ro'yxat va alohida sahifa bir xil manbadan oladi — bitta
 * so'rov, useSiteList keshi orqali).
 *
 * Adminda sarlavhasiz qoralamalar ham bor (title_uz=null) — ular chiqmasin.
 * Backend tartiblamaydi, shuning uchun yangi yozuv yuqorida.
 */
export const useNewsPosts = () => {
	const { items, loading, error, retry } = useSiteList('site-posts', sitePostsApi, toPost, FALLBACK)

	const posts = useMemo(
		() => items.filter(p => p.title).sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? '')),
		[items],
	)

	return { posts, loading, error, retry }
}

export default useNewsPosts
