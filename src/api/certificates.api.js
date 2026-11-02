import api from './axios'

/**
 * Kurs sertifikati — /api/courses/certificates/{id}/generate/
 * Javob fayl (odatda PDF) bo'lgani uchun blob sifatida olinadi. Backend JSON
 * (masalan { url } yoki { file }) qaytarsa, fayl manzili ajratib beriladi.
 * @returns {Promise<{ blob?: Blob, url?: string }>}
 */
export const generateCertificate = async (id, signal) => {
	const { data } = await api.get(`/courses/certificates/${encodeURIComponent(id)}/generate/`, {
		responseType: 'blob',
		signal,
		timeout: 60000,
	})
	if (data.type.includes('json')) {
		const json = JSON.parse(await data.text())
		const url = json.url ?? json.file ?? json.certificate ?? json.pdf ?? json.download_url
		if (!url) throw new Error('Sertifikat fayli topilmadi')
		return { url }
	}
	return { blob: data }
}
