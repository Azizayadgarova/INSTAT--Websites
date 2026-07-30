import { useMemo } from 'react'

import { siteLibraryFeedbacksApi, siteArticleFeedbacksApi, siteMicroDataFeedbacksApi } from '@/api/siteContent.api'
import { mediaUrl } from '@/utils/siteContent'
import { useApiResource } from './useApiResource'

/**
 * Testimonials (foydalanuvchi fikrlari) uchun umumiy hook. Manba `source`
 * orqali tanlanadi — ikkala endpoint ham bir xil shaklda:
 *   name, user_name, comment, image, stars  (bir tilli)
 *
 *   source='library' -> /api/site-library-feedbacks/items/all/  (raqamli kutubxona)
 *   source='article' -> /api/site-article-feedbacks/items/all/  (elektron jurnal)
 *   source='micro'   -> /api/site-micro-data-feedbacks/items/all/ (mikro ma'lumotlar;
 *                        endpoint hali backendда yo'q -> statik fallback)
 *   aks holda (undefined) -> API chaqirilmaydi, faqat `presets` qaytadi.
 *
 * @param {Array}  presets - statik fikrlar (fallback)
 * @param {string} [source] - 'library' | 'article' | 'micro'
 */
const API_BY_SOURCE = {
	library: siteLibraryFeedbacksApi,
	article: siteArticleFeedbacksApi,
	micro: siteMicroDataFeedbacksApi,
}

export const useFeedbacks = (presets = [], source) => {
	const client = API_BY_SOURCE[source]

	const { data, loading, error, retry } = useApiResource(
		() => (client ? client.getAllFlat() : Promise.resolve([])),
		[source],
	)

	const items = useMemo(() => {
		if (!client) return presets

		const mapped = (Array.isArray(data) ? data : [])
			.map((f, i) => ({
				id: f.id ?? `feedback-${i}`,
				name: (f.name ?? '').trim(),
				user: f.user_name ? `@${String(f.user_name).replace(/^@/, '')}` : '',
				text: (f.comment ?? '').trim(),
				img: mediaUrl(f.image),
				stars: Number(f.stars) > 0 ? Number(f.stars) : 5,
			}))
			.filter(item => item.text)

		return mapped.length > 0 ? mapped : presets
	}, [data, client, presets])

	return { items, loading, error, retry, isFallback: items === presets }
}

export default useFeedbacks
