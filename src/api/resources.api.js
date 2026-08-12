import api from './axios'

/**
 * Generic client for INSTAT's public DRF list endpoints.
 *
 * Every endpoint below (siteData/site-* content endpoints excluded — see
 * siteData.api.js and siteContent.api.js) responds with the same shape:
 *
 *   { links: { next, previous }, data: [...], meta: { total, per_page, current_page, from, to, last_page } }
 *
 * createResourceApi() wraps that convention once so each resource file
 * doesn't have to re-implement pagination/param handling.
 */
/**
 * @param {string} path - resurs yo'li, masalan 'books'
 * @param {object} [client] - axios nusxasi. Standart — asosiy backend (API_URL);
 *   boshqa serverdagi bo'lim uchun @/api/axios dan mos nusxa beriladi.
 */
const createResourceApi = (path, client = api) => {
	/**
	 * @param {object} params - query params: page, per_page, search, ordering,
	 *   plus any endpoint-specific filters (e.g. category, type).
	 */
	const getAll = async (params = {}) => {
		const { data } = await client.get(`/${path}/`, { params })
		// Ko'pchilik endpoint {links, data, meta} shaklida javob beradi, lekin
		// ba'zilari (masalan review-authors) to'g'ridan-to'g'ri array qaytaradi —
		// ikkalasini ham qo'llab-quvvatlaymiz.
		if (Array.isArray(data)) {
			return { items: data, meta: null, links: null }
		}
		return {
			items: Array.isArray(data?.data) ? data.data : [],
			meta: data?.meta ?? null,
			links: data?.links ?? null,
		}
	}

	/** Some endpoints expose a non-paginated "all" action: /<path>/items/all/ */
	const getAllFlat = async (params = {}) => {
		const { data } = await client.get(`/${path}/items/all/`, { params })
		return Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : [])
	}

	const getById = async id => {
		const { data } = await client.get(`/${path}/${id}/`)
		return data
	}

	return { getAll, getAllFlat, getById }
}

// --- Ta'lim / kitob tizimi ---------------------------------------------
export const groupsApi = createResourceApi('groups')
export const authorsApi = createResourceApi('authors')
/**
 * DIQQAT: ro'yxat uchun GET /books/ emas — /books/items/active/ ishlatiladi
 * (faqat faol kitoblarni qaytaradi, xuddi shu {links,data,meta} shaklda).
 */
export const booksApi = {
	...createResourceApi('books'),
	getAll: async (params = {}) => {
		const { data } = await api.get('/books/items/active/', { params })
		return {
			items: Array.isArray(data?.data) ? data.data : [],
			meta: data?.meta ?? null,
			links: data?.links ?? null,
		}
	},
}
/**
 * DIQQAT: GET /books/{id}/ backendda anonim foydalanuvchi bilan 500 qaytaradi
 * (AnonymousUser xatosi) — shu sabab bitta kitobni ro'yxatdan qidiramiz.
 */
export const getBookById = async id => {
	const { items } = await booksApi.getAll({ per_page: 100 })
	return items.find(b => String(b.id) === String(id)) ?? null
}
/** Kitob sharhlari — /books/{id}/comments/ (flat array). */
export const bookCommentsApi = {
	getByBook: async bookId => {
		const { data } = await api.get(`/books/${bookId}/comments/`)
		return Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : [])
	},
}
export const permissionsApi = createResourceApi('permissions')
export const categoriesApi = createResourceApi('categories')
/**
 * DIQQAT: ro'yxat uchun GET /courses/ emas — /courses/items/active/ ishlatiladi
 * (faqat faol kurslarni qaytaradi, xuddi shu {links,data,meta} shaklda).
 * getById va boshqa metodlar standart /courses/{id}/ orqali ishlayveradi.
 */
export const coursesApi = {
	...createResourceApi('courses'),
	getAll: async (params = {}) => {
		const { data } = await api.get('/courses/items/active/', { params })
		return {
			items: Array.isArray(data?.data) ? data.data : [],
			meta: data?.meta ?? null,
			links: data?.links ?? null,
		}
	},
}
/** Bitta kursning "Nimalarni o'rganasiz" bandlari — /courses/{id}/course_features/ (flat array). */
export const courseFeaturesApi = {
	getByCourse: async courseId => {
		const { data } = await api.get(`/courses/${courseId}/course_features/`)
		return Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : [])
	},
}
/** "O'quv reja" — kurs bloklari va ularning darslari (flat array'lar). */
export const courseBlocksApi = {
	getByCourse: async courseId => {
		const { data } = await api.get(`/courses/${courseId}/course_blocks/items/all-active/`)
		return Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : [])
	},
}
export const courseBlockLessonsApi = {
	getByBlock: async (courseId, blockId) => {
		const { data } = await api.get(`/courses/${courseId}/course_blocks/${blockId}/lessons/items/all-active/`)
		return Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : [])
	},
}
export const courseGroupsApi = createResourceApi('course-groups')
export const bookCasesApi = createResourceApi('book-cases')
export const udkCodesApi = createResourceApi('udk-codes')
export const academicDegreesApi = createResourceApi('academic-degrees')

// --- Jurnal / nashr tizimi ----------------------------------------------
export const articleTypesApi = createResourceApi('article-types')
export const journalSectionsApi = createResourceApi('journal-sections')
export const reviewsApi = createResourceApi('reviews')
export const reviewAuthorsApi = createResourceApi('review-authors')
/**
 * DIQQAT: ro'yxat uchun GET /editions/ emas — /editions/items/active/ ishlatiladi
 * (faqat faol nashrlarni qaytaradi, xuddi shu {links,data,meta} shaklda).
 * getById va boshqa metodlar standart /editions/{id}/ orqali ishlayveradi.
 */
export const editionsApi = {
	...createResourceApi('editions'),
	getAll: async (params = {}) => {
		const { data } = await api.get('/editions/items/active/', { params })
		return {
			items: Array.isArray(data?.data) ? data.data : [],
			meta: data?.meta ?? null,
			links: data?.links ?? null,
		}
	},
}
/** Bitta nashrdagi maqolalar — /editions/{id}/articles/ (flat array). */
export const editionArticlesApi = {
	getByEdition: async editionId => {
		const { data } = await api.get(`/editions/${editionId}/articles/`)
		return Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : [])
	},
}

// --- Umumiy sayt ma'lumotlari ---------------------------------------------
export const bannersApi = createResourceApi('banners')
export const dataReportsApi = createResourceApi('data-reports')
/**
 * DIQQAT: GET /data-reports/{id}/ ro'yxatdagidan KAMROQ maydon qaytaradi
 * (category nested obyekt emas — faqat id, `options` va `file_size` umuman yo'q).
 * Shu sabab ro'yxatdan qidiramiz — xuddi getBookById kabi.
 */
export const getDataReportById = async id => {
	const { items } = await dataReportsApi.getAll({ per_page: 100 })
	return items.find(r => String(r.id) === String(id)) ?? null
}
export const dataRequestsApi = createResourceApi('data-requests')
export const microDataDepartmentsApi = createResourceApi('micro-data-departments')

export { createResourceApi }
