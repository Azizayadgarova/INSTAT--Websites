import { books } from '@/data/books.data'
import { pickField } from '@/utils/siteContent'

// /books/ muqova rasmini bermaydi — statik kitoblardagi rasmlar navbat bilan
// o'rin egallaydi (MikroMalumotlar'dagi PLACEHOLDER_IMAGES bilan bir xil yondashuv).
export const COVER_PLACEHOLDERS = books.map(b => b.image)

/**
 * Book (backend: /books/) -> BookCard shakli.
 * Reyting, sharh va izoh soni endpointda yo'q, shuning uchun `undefined` qoladi
 * — BookCard bunday maydonlarni umuman chizmaydi (soxta raqam ko'rsatilmasin).
 */
export const toBook = (book, i, lang) => ({
	id: book.id,
	title: pickField(book, 'name', lang),
	category: pickField(book.category ?? {}, 'name', lang),
	image: book.book_thumbnails?.length ? import.meta.env.VITE_API_STORAGE_URL + '/' + book.book_thumbnails[0]?.file : COVER_PLACEHOLDERS[i % COVER_PLACEHOLDERS.length],
	stars_sum: book.stars_sum,
	comments_count: book.comments_count,
})
