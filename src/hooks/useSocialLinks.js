import { useMemo } from 'react'

import { SOCIALS } from '@/config/socials'
import { useContacts } from './useContacts'

/** Faqat http(s) manzil — bo'sh/null qiymat uchun o'lik <a> chiqarmaymiz. */
const isOpenable = url => /^https?:\/\/.+/i.test((url ?? '').toString().trim())

/**
 * Ko'rsatiladigan ijtimoiy tarmoqlar: `{ key, label, Icon, href }[]`.
 * Qiymati bo'sh (null) bo'lgan tarmoq ro'yxatga umuman kirmaydi, shuning uchun
 * chaqiruvchilar alohida tekshirmaydi — ro'yxat bo'sh bo'lsa blokni yashirish kifoya.
 */
export const useSocialLinks = () => {
	const { social } = useContacts()

	return useMemo(
		() =>
			SOCIALS.map(s => ({ ...s, href: (social?.[s.key] ?? '').toString().trim() })).filter(s =>
				isOpenable(s.href),
			),
		[social],
	)
}

export default useSocialLinks
