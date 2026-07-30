import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { teachersApi } from '@/api/resources.api'
import { siteEducationMentorsApi } from '@/api/siteContent.api'
import { mentors as fallbackMentors } from '@/components/MentorsSection/mentors.data'
import { mediaUrl } from '@/utils/siteContent'
import { useApiResource } from './useApiResource'

/**
 * Mentorlar (o'qituvchilar) ro'yxatini backenddan yuklaydi.
 *
 * Ikki manba mavjud:
 *   - variant='online' -> /api/site-education-mentors/items/all/
 *       Onlayn ta'lim sahifasi. Maydonlar: name_(uz|ru|en),
 *       direction_(uz|ru|en), image, experience. To'liq (rol + tajriba) keladi.
 *   - aks holda        -> /api/teachers
 *       Faqat first_name/last_name/avatar qaytaradi; rol (role) va tajriba (exp)
 *       backendda YO'Q, shuning uchun bo'sh qoladi va MentorCard ularni yashiradi.
 *
 * API bo'sh qaytarsa yoki xato bersa — mentors.data.js dagi statik ro'yxat.
 *
 * @param {'online'|'default'} [variant]
 */
export const useMentors = (variant = 'default') => {
	const { i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const isOnline = variant === 'online'

	const { data, loading, error, retry } = useApiResource(
		() => (isOnline ? siteEducationMentorsApi.getAllFlat() : teachersApi.getAll({ per_page: 50 })),
		[variant],
	)

	const items = useMemo(() => {
		const pick = (item, field) =>
			item[`${field}_${lang}`] || item[`${field}_uz`] || item[`${field}_ru`] || item[`${field}_en`] || ''

		const mapped = isOnline
			? // site-education-mentors — items/all/ to'g'ridan-to'g'ri massiv qaytaradi
				(Array.isArray(data) ? data : [])
					.map((m, i) => ({
						id: m.id ?? `edu-mentor-${i}`,
						name: pick(m, 'name'),
						role: pick(m, 'direction'),
						exp: m.experience ? `${m.experience}+ yil tajriba` : '',
						photo: mediaUrl(m.image) || null,
						socials: false,
					}))
					.filter(item => item.name)
			: // teachers — {items:[{first_name,last_name,avatar}]}
				(data?.items ?? [])
					.map(user => ({
						id: user.id,
						name: [user.first_name, user.last_name].filter(Boolean).join(' ').trim() || user.username || '',
						photo: user.avatar || null,
						// Backendda hozircha yo'q — bo'sh qoldiramiz, MentorCard ularni yashiradi
						role: '',
						exp: '',
						socials: false,
					}))
					.filter(item => item.name)

		return mapped.length > 0
			? mapped
			: fallbackMentors.map((m, i) => ({ id: `static-${i}`, socials: true, ...m }))
	}, [data, lang, isOnline])

	return { items, loading, error, retry }
}

export default useMentors
