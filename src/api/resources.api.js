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
const createResourceApi = path => {
	/**
	 * @param {object} params - query params: page, per_page, search, ordering,
	 *   plus any endpoint-specific filters (e.g. category, type).
	 */
	const getAll = async (params = {}) => {
		const { data } = await api.get(`/${path}/`, { params })
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
		const { data } = await api.get(`/${path}/items/all/`, { params })
		return Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : [])
	}

	const getById = async id => {
		const { data } = await api.get(`/${path}/${id}/`)
		return data
	}

	return { getAll, getAllFlat, getById }
}

// --- Ta'lim / kitob tizimi ---------------------------------------------
export const groupsApi = createResourceApi('groups')
export const authorsApi = createResourceApi('authors')
export const booksApi = createResourceApi('books')
export const permissionsApi = createResourceApi('permissions')
export const categoriesApi = createResourceApi('categories')
export const coursesApi = {
	...createResourceApi('courses'),
	/** Faqat faol kurslar — server tomonda filtrlanadi (/courses/items/active/) */
	getActive: async (params = {}) => {
		const { data } = await api.get('/courses/items/active/', { params })
		if (Array.isArray(data)) return { items: data, meta: null, links: null }
		return {
			items: Array.isArray(data?.data) ? data.data : [],
			meta: data?.meta ?? null,
			links: data?.links ?? null,
		}
	},
}
export const courseGroupsApi = createResourceApi('course-groups')
/**
 * O'qituvchilar (mentorlar). DIQQAT: bu endpoint boshqalardan farqli — yo'l
 * oxirida slash YO'Q (`/api/teachers/` 404 qaytaradi), shuning uchun
 * createResourceApi ishlatilmaydi. Javob shakli odatdagidek {links, data}.
 */
export const teachersApi = {
	getAll: async (params = {}) => {
		const { data } = await api.get('/site-main-managers/items/all/', { params })
		return {
			items: Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [],
			meta: data?.meta ?? null,
			links: data?.links ?? null,
		}
	},
}
export const bookCasesApi = createResourceApi('book-cases')
export const udkCodesApi = createResourceApi('udk-codes')
export const academicDegreesApi = createResourceApi('academic-degrees')

// --- Jurnal / nashr tizimi ----------------------------------------------
export const articleTypesApi = createResourceApi('article-types')
export const journalSectionsApi = createResourceApi('journal-sections')
export const reviewsApi = createResourceApi('reviews')
export const reviewAuthorsApi = createResourceApi('review-authors')
export const editionsApi = createResourceApi('editions')

// --- Umumiy sayt ma'lumotlari ---------------------------------------------
export const bannersApi = createResourceApi('banners')
export const dataReportsApi = createResourceApi('data-reports')
export const dataRequestsApi = createResourceApi('data-requests')
export const microDataDepartmentsApi = createResourceApi('micro-data-departments')

export { createResourceApi }
