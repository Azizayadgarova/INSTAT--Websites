import api from './axios'

/**
 * Rahbariyat: GET /site-managers/items/all/
 * Maydonlar: full_name, description(_uz/_ru/_en) = lavozim, phone_number,
 * email, acceptance = qabul vaqti, path = rasm (media URL).
 * Endpoint autentifikatsiya talab qiladi (token bo'lmasa 401) — bunday holda
 * chaqiruvchi tomon statik zaxiraga qaytadi.
 */
export const getManagers = async () => {
	const { data } = await api.get('/site-managers/items/all/')
	return Array.isArray(data) ? data : (data?.results ?? [])
}
