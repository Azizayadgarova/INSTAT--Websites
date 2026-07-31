import { createResourceApi } from './resources.api'

/**
 * Sayt kontenti endpoint'lari (public — token talab qilmaydi).
 *
 * Har biri uch xil chaqiruvni qo'llab-quvvatlaydi:
 *   .getAll({ page, per_page, ... })  -> { items, meta, links }  (sahifalangan)
 *   .getAllFlat()                     -> [...]                   (/items/all/)
 *   .getById(id)                      -> {...}
 *
 * Javob shakllari uch oilaga bo'linadi (@/utils/siteContent dagi
 * toFeature / toPerson / toFeedback normalizatorlari shu oilalarga mos):
 *
 *   FEATURE  — title_uz|ru|en, description_uz|ru|en, image, order
 *   PERSON   — name_uz|ru|en, direction_uz|ru|en, image, experience
 *   FEEDBACK — name, user_name, comment, image, stars
 */

// --- Bosh sahifa ---------------------------------------------------------
/** FEATURE — bosh sahifadagi platforma imkoniyatlari kartochkalari */
export const siteMainFeaturesApi = createResourceApi('site-main-features')
/** PERSON — rahbariyat (bosh sahifa) */
export const siteMainManagersApi = createResourceApi('site-main-managers')

// --- Onlayn ta'lim -------------------------------------------------------
/** FEATURE — "Global tajribaga ega mentorlar" va h.k. kartochkalar */
export const siteEducationFeaturesApi = createResourceApi('site-education-features')
/** PERSON — mentorlar karuseli */
export const siteEducationMentorsApi = createResourceApi('site-education-mentors')

// --- Raqamli kutubxona ---------------------------------------------------
/** FEATURE — kutubxona imkoniyatlari */
export const siteLibraryFeaturesApi = createResourceApi('site-library-features')
/** FEATURE — kutubxonadan foydalanish bosqichlari */
export const siteLibraryInstructionsApi = createResourceApi('site-library-instructions')
/** FEEDBACK — kutubxona foydalanuvchilari fikri */
export const siteLibraryFeedbacksApi = createResourceApi('site-library-feedbacks')

// --- Elektron jurnal / maqolalar ----------------------------------------
/** PERSON — tahririyat a'zolari */
export const siteArticleEditorsApi = createResourceApi('site-article-editors')
/** FEATURE — jurnal imkoniyatlari */
export const siteArticleFeaturesApi = createResourceApi('site-article-features')
/** FEATURE — maqolaga qo'yiladigan talablar */
export const siteArticleInstructionsApi = createResourceApi('site-article-instructions')
/** FEEDBACK — mualliflar fikri */
export const siteArticleFeedbacksApi = createResourceApi('site-article-feedbacks')

// --- Mikroma'lumotlar ----------------------------------------------------
/** FEATURE — mikroma'lumotlardan foydalanish bosqichlari */
export const siteMicroDataInstructionsApi = createResourceApi('site-micro-data-instructions')

// --- Bo'sh ish o'rinlari -------------------------------------------------
/** FEATURE — ishga joylashish bosqichlari */
export const siteVacancyInstructionsApi = createResourceApi('site-vacancy-instructions')

// --- Avvaldan mavjud bo'lganlar -----------------------------------------
/** full_name, phone_number, email, acceptance, description_*, path */
export const siteManagersApi = createResourceApi('site-managers')
export const siteVacanciesApi = createResourceApi('site-vacancies')
export const sitePostsApi = createResourceApi('site-posts')
export const siteEventsApi = createResourceApi('site-events')
export const siteFaqsApi = createResourceApi('site-faqs')
export const siteCorruptionVideosApi = createResourceApi('site-corruption-videos')
export const siteCorruptionDocsApi = createResourceApi('site-corruption-docs')
export const siteCorruptionWorksApi = createResourceApi('site-corruption-works')
