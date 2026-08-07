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
 * Maketda sarlavha ikki qismga bo'lingan (oq qism + rangli `highlight`), backend
 * esa ba'zi kalitlarda butun matnni bitta qatorda qaytaradi. Shu yerda uni
 * fallback chegarasi bo'yicha ajratamiz:
 *   1) API matni fallback sarlavhasi bilan boshlansa — aynan shu joydan;
 *   2) aks holda birinchi vergul bo'yicha;
 *   3) ikkalasi ham bo'lmasa — hammasi sarlavha, highlight bo'sh.
 * API bo'sh bo'lsa fallback juftligi o'zgarishsiz qaytadi.
 */
export const splitHeading = (full, fallbackTitle = '', fallbackHighlight = '') => {
	const text = (full ?? '').toString().trim()
	if (!text) return { title: fallbackTitle, highlight: fallbackHighlight }
	if (!fallbackHighlight) return { title: text, highlight: '' }

	const head = (fallbackTitle ?? '').toString().trim()
	if (head && text.toLowerCase().startsWith(head.toLowerCase()))
		return { title: text.slice(0, head.length), highlight: text.slice(head.length).trim() }

	const comma = text.indexOf(',')
	if (comma > 0 && comma < text.length - 1)
		return { title: text.slice(0, comma + 1), highlight: text.slice(comma + 1).trim() }

	return { title: text, highlight: '' }
}

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

/* ------------------------------------------------------------------ *
 * site-* endpoint'lari uchun normalizatorlar (@/api/siteContent.api).
 * Backend bir necha xil shakl qaytaradi — komponentlar ichida maydon
 * nomlarini takrorlamaslik uchun shu yerda bitta ko'rinishga keltiriladi.
 * ------------------------------------------------------------------ */

const LANGS = ['uz', 'ru', 'en']

/**
 * site-* endpoint'lari uchun til tanlash. pickField'dan farqi: bu yerda
 * lang-siz (`title`) maydon YO'Q, faqat `title_uz|ru|en` bor va backend
 * ularning bir qismini null qoldiradi (masalan site-vacancies faqat `_ru`ni
 * to'ldiradi). Shuning uchun joriy til bo'sh bo'lsa uz -> ru -> en tartibida
 * birinchi to'ldirilgani olinadi — bo'lim hech qachon bo'sh chiqmaydi.
 *
 *   pickI18n(vacancy, 'position', 'uz') // position_uz bo'sh -> position_ru
 */
export const pickI18n = (item, field, lang) => {
	if (!item) return ''
	for (const l of [lang, ...LANGS.filter(x => x !== lang)]) {
		const v = item[`${field}_${l}`]
		if (v != null && String(v).trim()) return String(v).trim()
	}
	return (item[field] ?? '').toString().trim()
}

/**
 * FEATURE: title_*, description_*, image, order
 * site-main-features, site-education-features, site-library-features,
 * site-library-instructions, site-article-features, site-article-instructions,
 * site-micro-data-instructions, site-vacancy-instructions
 */
export const toFeature = (item, lang) => ({
	id: item.id,
	title: pickI18n(item, 'title', lang),
	description: pickI18n(item, 'description', lang),
	image: item.image || null,
	order: item.order ?? 0,
})

/**
 * STEP: title_*, description_*, icon, image — `order` maydoni yo'q,
 * shuning uchun `id` bo'yicha saralanadi (useSiteList buni avtomatik qiladi).
 * site-library-steps
 */
export const toStep = (item, lang) => ({
	id: item.id,
	title: pickI18n(item, 'title', lang),
	description: pickI18n(item, 'description', lang),
	icon: item.icon || null,
	image: item.image || null,
	order: item.id,
})

/**
 * PERSON: name_*, direction_*, image, experience
 * site-education-mentors, site-article-editors, site-main-managers
 */
export const toPerson = (item, lang) => ({
	id: item.id,
	name: pickI18n(item, 'name', lang),
	direction: pickI18n(item, 'direction', lang),
	image: item.image || null,
	experience: Number(item.experience) || 0,
})

/**
 * FAQ: question_*, answer_*, module — /api/site-faqs/items/all/
 * `module` saqlanadi, chunki bitta endpoint barcha sahifalarning FAQ'ini
 * qaytaradi va bo'lim o'ziga tegishlisini shu maydon bo'yicha filtrlaydi
 * (@/hooks/useFaqs).
 */
export const toFaq = (item, lang) => ({
	id: item.id,
	question: pickI18n(item, 'question', lang),
	answer: pickI18n(item, 'answer', lang),
	module: item.module ?? null,
})

/**
 * VACANCY: direction_*, position_*, salary_*, shift_*, extra_salary_*,
 * requirements_* — /api/site-vacancies/items/all/
 *
 * DIQQAT: bu endpoint `id` qaytarmaydi, shuning uchun kalit sifatida
 * ro'yxatdagi tartib raqami ishlatiladi (useSiteList mapper'ga index beradi).
 */
export const toVacancy = (item, lang, index = 0) => ({
	id: item.id ?? `vacancy-${index}`,
	direction: pickI18n(item, 'direction', lang),
	position: pickI18n(item, 'position', lang),
	salary: pickI18n(item, 'salary', lang),
	shift: pickI18n(item, 'shift', lang),
	extraSalary: pickI18n(item, 'extra_salary', lang),
	requirements: pickI18n(item, 'requirements', lang),
})

/** FEEDBACK: name, user_name, comment, image, stars */
export const toFeedback = item => ({
	id: item.id,
	name: (item.name ?? '').toString().trim(),
	userName: (item.user_name ?? '').toString().trim(),
	comment: (item.comment ?? '').toString().trim(),
	image: item.image || null,
	stars: Math.max(0, Math.min(5, Number(item.stars) || 0)),
})

/**
 * POST: title_*, body_* (HTML), thumbnail, created_at — /api/site-posts/items/all/
 * Yangiliklar sahifasi. `body` — Quill HTML'i, RichContent orqali sanitizatsiya
 * qilinadi. `body_ru`/`body_en` ko'pincha null — pickI18n uz'ga qaytadi.
 */
export const toPost = (item, lang) => ({
	id: item.id,
	title: pickI18n(item, 'title', lang),
	body: pickI18n(item, 'body', lang),
	thumbnail: item.thumbnail || null,
	createdAt: item.created_at ?? null,
})

/**
 * DOC: label_*, date, number, path — bir nechta endpoint shu shaklda:
 *   site-events              (faqat label_* va path)
 *   site-corruption-docs     (label_*, date, number, path — hujjat fayli)
 *   site-corruption-works    (label_*, path)
 *
 * `path` — media faylga to'liq URL yoki null.
 */
export const toDoc = (item, lang) => ({
	id: item.id,
	label: pickI18n(item, 'label', lang),
	date: (item.date ?? '').toString().trim(),
	number: (item.number ?? '').toString().trim(),
	path: item.path || null,
})

/**
 * VIDEO: link, label_* — /api/site-corruption-videos/items/all/
 * `link` — YouTube va h.k. havolasi (backendda hozir test qiymati bor).
 */
export const toVideo = (item, lang) => ({
	id: item.id,
	label: pickI18n(item, 'label', lang),
	link: (item.link ?? '').toString().trim(),
})

/**
 * Statistika qiymatini raqam + qo'shimchaga ajratadi. site-data `*_number`
 * kalitlarini backend matn sifatida beradi ("10 000+", "2 mln+", "25 yil") —
 * sanash animatsiyasi uchun boshidagi raqam kerak.
 *
 *   parseStatValue('10 000+')  // { number: 10000, suffix: '+' }
 *   parseStatValue('2 mln+')   // { number: 2, suffix: 'mln+' }
 *   parseStatValue('Ko\'p')    // { number: null, suffix: "Ko'p" }
 *
 * Raqam bilan boshlanmasa `number: null` — chaqiruvchi animatsiyasiz chiqaradi.
 */
export const parseStatValue = value => {
	const text = (value ?? '').toString().trim()
	// \s NBSP (U+00A0) ni ham qamrab oladi — backend "10 000+" da uni ishlatadi
	const match = text.match(/^([\d\s]+)(.*)$/)
	if (!match) return { number: null, suffix: text }
	const number = Number(match[1].replace(/\s/g, ''))
	return Number.isFinite(number) ? { number, suffix: match[2].trim() } : { number: null, suffix: text }
}

/**
 * Taksonomiya endpoint'lari faqat `{ id, name }` beradi — filtr ro'yxatlari
 * uchun nomning o'zi yetarli: authors, journal-sections, article-types,
 * academic-degrees.
 */
export const toName = item => (item?.name ?? '').toString().trim()

/**
 * JOURNAL EDITION: title, year, number, thumbnail — /api/editions/items/all/
 *
 * DIQQAT: bu obyektda muallif va bo'lim (section) YO'Q, shuning uchun
 * `author`/`category` null qoladi va jurnal filtri ularni o'tkazib yuboradi
 * (@/components/ElektronJurnal). Backend bu bog'lanishlarni qo'shsa —
 * shu yerga qo'shilsa filtr avtomatik ishlaydi.
 */
export const toEdition = item => ({
	id: item.id,
	title: (item.title ?? '').toString().trim(),
	// Maketdagi ko'rinish: "2020 yil 1-son"
	year: [item.year && `${item.year} yil`, item.number && `${item.number}-son`].filter(Boolean).join(' '),
	img: item.thumbnail || null,
	author: null,
	category: null,
})

/** `order` bo'yicha barqaror tartiblash (teng bo'lsa id bo'yicha). */
export const byOrder = (a, b) => (a.order - b.order) || (a.id - b.id)
