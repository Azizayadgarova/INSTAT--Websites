import { createResourceApi } from './resources.api'

/**
 * DIQQAT: quyidagi endpoint'lar hozircha backendda autentifikatsiya talab
 * qiladi (token'siz so'rov 401 qaytaradi):
 *   site-managers, site-vacancies, site-posts, site-events, site-faqs,
 *   site-corruption-videos, site-corruption-docs, site-corruption-works
 *
 * Frontendda hali login/token oqimi yo'q (bu loyihada faqat ochiq
 * ma'lumotlar — site-data, courses, categories va h.k. ishlaydi).
 * Token mavjud bo'lganda (@/api/axios.js -> setAuthToken) bu chaqiruvlar
 * avtomatik ishlaydi. Token bo'lmasa .getAll() 401 xatosi bilan reject
 * bo'ladi — chaqiruvchi tomon buni AsyncBoundary orqali ko'rsatishi kerak.
 *
 * Istisno: site-faqs uchun `/site-faqs/items/all/` (getAllFlat) token'siz
 * ochiq — FAQ bo'limi shundan foydalanadi (@/hooks/useFaqs).
 */
export const siteManagersApi = createResourceApi('site-managers')
export const siteVacanciesApi = createResourceApi('site-vacancies')
export const sitePostsApi = createResourceApi('site-posts')
export const siteEventsApi = createResourceApi('site-events')
export const siteFaqsApi = createResourceApi('site-faqs')
export const siteCorruptionVideosApi = createResourceApi('site-corruption-videos')
export const siteCorruptionDocsApi = createResourceApi('site-corruption-docs')
export const siteCorruptionWorksApi = createResourceApi('site-corruption-works')
