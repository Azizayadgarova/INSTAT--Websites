/**
 * Element'dan joriy tildagi qiymat. value_<lang> bo'sh/null bo'lsa -> value.
 * MUHIM: backend ko'p joyda value_uz=null qoldiradi, asosiy matn `value` da.
 */
export const pickLang = (item, lang) => {
	if (!item) return ''
	const byLang = item[`value_${lang}`]
	const v = byLang != null && String(byLang).trim() ? byLang : item.value
	return (v ?? '').toString().trim()
}

/** link: value=URL, value_<lang>=matn */
export const pickLink = (item, lang) => ({
	href: (item?.value ?? '').toString().trim(),
	text: (item?.[`value_${lang}`] ?? item?.label ?? '').toString().trim(),
})

export const pickPath = item => item?.path ?? null

/**
 * resources.api.js orqali kelgan obyektlar uchun (courses, books, categories,
 * data-reports va h.k.) — bu yerda maydonlar `<field>_<lang>` shaklida:
 * name/name_uz/name_ru/name_en, description/description_uz/... Bo'sh bo'lsa
 * asosiy (lang-siz) maydonga qaytadi.
 *
 *   pickField(course, 'name', 'ru') // course.name_ru || course.name
 */
export const pickField = (item, field, lang) => {
	if (!item) return ''
	const byLang = item[`${field}_${lang}`]
	const v = byLang != null && String(byLang).trim() ? byLang : item[field]
	return (v ?? '').toString().trim()
}

/**
 * Backend media fayllari uchun to'liq URL quradi. API `book_thumbnails[].file`,
 * `image` kabi maydonlarni nisbiy yo'l ("book-files/xxx.png") shaklida beradi —
 * ular `<origin>/media/` ostida joylashadi.
 *
 *   mediaUrl('book-files/xxx.png') // https://test.avacoder.uz/media/book-files/xxx.png
 *
 * To'liq URL (http...) kelsa, o'zgartirmasdan qaytaradi.
 */
const MEDIA_BASE = (import.meta.env.VITE_API_URL ?? '/api').replace(/\/api\/?$/, '/media')

export const mediaUrl = path => {
	if (!path) return ''
	const p = String(path).trim()
	if (/^https?:\/\//i.test(p)) return p
	return `${MEDIA_BASE}/${p.replace(/^\/+/, '')}`
}
