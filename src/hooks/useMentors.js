import { useMemo } from 'react'

import { teachersApi } from '@/api/resources.api'
import { mentors as fallbackMentors } from '@/components/MentorsSection/mentors.data'
import { useApiResource } from './useApiResource'

/**
 * Mentorlar (o'qituvchilar) ro'yxatini backenddan yuklaydi (/api/teachers).
 *
 * DIQQAT: bu endpoint faqat `first_name`, `last_name`, `avatar` qaytaradi —
 * lavozim (role), tajriba (exp) va ijtimoiy tarmoq havolalari backendda
 * hozircha YO'Q. Shuning uchun API'dan kelgan mentorlarda bu maydonlar bo'sh
 * bo'ladi va MentorCard ularni ko'rsatmaydi. Backend bu maydonlarni qo'shsa,
 * quyidagi map() ichida ochib qo'yish kifoya.
 *
 * API bo'sh qaytarsa yoki xato bersa — mentors.data.js dagi statik ro'yxat.
 */
export const useMentors = () => {
	const { data, loading, error, retry } = useApiResource(() => teachersApi.getAll({ per_page: 50 }), [])

	const items = useMemo(() => {
		const mapped = (data?.items ?? [])
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
	}, [data])

	return { items, loading, error, retry }
}

export default useMentors
