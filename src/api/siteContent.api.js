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

/**
 * Onlayn ta'lim (platform/onlayn-talim) sahifasi uchun ochiq endpoint'lar.
 * Ikkalasi ham token'siz `items/all/` orqali ochiq (getAllFlat):
 *
 *   site-education-features — "Zamonaviy ta'lim" bo'limidagi kartalar:
 *     title_(uz|ru|en), description_(uz|ru|en), image, order
 *   site-education-mentors  — onlayn mentorlar karuseli:
 *     name_(uz|ru|en), direction_(uz|ru|en), image, experience
 */
export const siteEducationFeaturesApi = createResourceApi('site-education-features')
export const siteEducationMentorsApi = createResourceApi('site-education-mentors')

/**
 * Raqamli kutubxona (platform/raqamli-kutubxona) sahifasi uchun ochiq
 * endpoint'lar — barchasi token'siz `items/all/` orqali ochiq (getAllFlat):
 *
 *   site-library-features     — "Platforma qanday ishlaydi" (FoydalanishJarayoni)
 *     title_(uz|ru|en), description_(uz|ru|en), image, order
 *   site-library-instructions — "Oflayn kutubxona" bosqichlari (Kutubxona)
 *     title_(uz|ru|en), description_(uz|ru|en), image, order
 *   site-library-feedbacks    — foydalanuvchilar fikri (Testimonials)
 *     name, user_name, comment, image, stars  (bu endpoint bir tilli)
 */
export const siteLibraryFeaturesApi = createResourceApi('site-library-features')
export const siteLibraryInstructionsApi = createResourceApi('site-library-instructions')
export const siteLibraryFeedbacksApi = createResourceApi('site-library-feedbacks')

/**
 * Elektron jurnal (platform/elektron-jurnal) sahifasi uchun ochiq
 * endpoint'lar — barchasi token'siz `items/all/` orqali ochiq (getAllFlat):
 *
 *   site-article-features     — hero karusel kartalari (HeroSection CARDS)
 *     title_(uz|ru|en), description_(uz|ru|en), image, order
 *   site-article-instructions — "Maqola nashri talablari" (MaqolaTalablari)
 *     title_(uz|ru|en), description_(uz|ru|en), image, order
 *   site-article-editors      — "Tahririyat a'zolari" (TahririyatAzolari)
 *     name_(uz|ru|en), direction_(uz|ru|en), image, experience
 *   site-article-feedbacks    — foydalanuvchilar fikri (Testimonial)
 *     name, user_name, comment, image, stars  (bir tilli)
 */
export const siteArticleFeaturesApi = createResourceApi('site-article-features')
export const siteArticleInstructionsApi = createResourceApi('site-article-instructions')
export const siteArticleEditorsApi = createResourceApi('site-article-editors')
export const siteArticleFeedbacksApi = createResourceApi('site-article-feedbacks')

/**
 * Bo'sh ish o'rinlari (platform/bosh-ish-orinlari) va mikro ma'lumotlar
 * (platform/mikro-malumotlar) sahifalari uchun ochiq "instructions" endpoint'lari
 * — title_(uz|ru|en), description_(uz|ru|en), image, order; getAllFlat orqali ochiq:
 *
 *   site-vacancy-instructions    — "Platformadan qanday foydalaniladi" (IshOrinlariJarayon)
 *   site-micro-data-instructions — "Platforma qanday ishlaydi" (PlatformaIshlashi)
 *
 * (Vakansiyalar ro'yxati site-vacancies orqali — yuqoridagi siteVacanciesApi
 * va @/hooks/useVacancies.)
 */
export const siteVacancyInstructionsApi = createResourceApi('site-vacancy-instructions')
export const siteMicroDataInstructionsApi = createResourceApi('site-micro-data-instructions')

/**
 * Mikro ma'lumotlar sahifasidagi foydalanuvchi fikrlari (Testimonial).
 * DIQQAT: bu endpoint hozircha backendда YO'Q (404) — u qo'shilgach avtomatik
 * ishlaydi; hozir useFeedbacks statik fallback'ga tushadi.
 * Shakl: name, user_name, comment, image, stars (article/library bilan bir xil).
 */
export const siteMicroDataFeedbacksApi = createResourceApi('site-micro-data-feedbacks')
