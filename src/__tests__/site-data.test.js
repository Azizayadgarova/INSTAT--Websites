import { describe, expect, it, beforeEach, vi } from 'vitest'

// axios ni mock qilamiz — tarmoqqa chiqmaymiz. `infoResourceApi` alohida
// instance: site-data'ning `info_resource` moduli boshqa backend'dan keladi.
vi.mock('../api/axios', () => ({
	default: { get: vi.fn() },
	infoResourceApi: { get: vi.fn() },
}))

import api, { infoResourceApi } from '../api/axios'
import { getSiteData, getModule, getItem, resetSiteDataCache } from '../api/siteData.api'
import { pickLang, pickLink } from '../utils/siteContent'

const SAMPLE = [
	{ id: 1, module: 'all', type: 'string', key: 'email', value: 'info@instat.uz', value_uz: 'info@instat.uz', value_ru: 'info@instat.uz', value_en: 'info@instat.uz' },
	{ id: 2, module: 'about', type: 'string', key: 'about', value: '<p>Uz</p>', value_uz: '<p>Uz</p>', value_ru: '<p>Ru</p>', value_en: '<p>En</p>' },
	{ id: 3, module: 'info_resource', type: 'link', key: 'siat_stat', value: 'https://siat.stat.uz/', value_uz: 'Matn', value_ru: 'Текст', value_en: 'Text' },
]

const INFO_RESOURCE_SAMPLE = [
	{ id: 9, module: 'info_resource', type: 'link', key: 'lib_stat', value: 'https://lib.stat.uz/uz' },
]

beforeEach(() => {
	resetSiteDataCache()
	api.get.mockReset()
	api.get.mockResolvedValue({ data: SAMPLE })
	infoResourceApi.get.mockReset()
	infoResourceApi.get.mockResolvedValue({ data: [] })
})

describe('siteData API', () => {
	it('module va key bo‘yicha indekslaydi', async () => {
		const { byModule, byModuleKey } = await getSiteData()
		expect(byModule.all).toHaveLength(1)
		expect(byModuleKey.about.about.value_ru).toBe('<p>Ru</p>')
	})

	it('keshlaydi — ikkinchi chaqiruvda tarmoqqa bormaydi', async () => {
		await getSiteData()
		await getSiteData()
		expect(api.get).toHaveBeenCalledTimes(1)
	})

	it('parallel chaqiruvlarni bitta so‘rovga birlashtiradi', async () => {
		await Promise.all([getSiteData(), getSiteData(), getSiteData()])
		expect(api.get).toHaveBeenCalledTimes(1)
	})

	it('info_resource moduli alohida manbadan almashtiriladi', async () => {
		infoResourceApi.get.mockResolvedValue({ data: INFO_RESOURCE_SAMPLE })
		const { byModuleKey } = await getSiteData()
		// Ikkilamchi manbadagi kalit keldi, asosiy manbadagi eski kalit chiqib ketdi
		expect(byModuleKey.info_resource.lib_stat.value).toBe('https://lib.stat.uz/uz')
		expect(byModuleKey.info_resource.siat_stat).toBeUndefined()
		// Boshqa modullar asosiy manbada qoladi
		expect(byModuleKey.all.email.value).toBe('info@instat.uz')
	})

	it('ikkilamchi manba yiqilsa asosiy javob buzilmaydi', async () => {
		infoResourceApi.get.mockRejectedValue(new Error('tarmoq'))
		const { byModuleKey } = await getSiteData()
		expect(byModuleKey.info_resource.siat_stat.value).toBe('https://siat.stat.uz/')
		expect(byModuleKey.about.about.value_ru).toBe('<p>Ru</p>')
	})

	it('getModule / getItem to‘g‘ri ishlaydi', async () => {
		expect(await getModule('about')).toHaveLength(1)
		expect((await getItem('all', 'email')).value).toBe('info@instat.uz')
		expect(await getItem('yoq', 'yoq')).toBeNull()
	})
})

describe('til tanlash (pickLang / pickLink)', () => {
	it('joriy tilni oladi, bo‘lmasa value ga qaytadi', () => {
		expect(pickLang(SAMPLE[1], 'ru')).toBe('<p>Ru</p>')
		expect(pickLang({ value: 'X', value_uz: null }, 'uz')).toBe('X')
		expect(pickLang(null, 'uz')).toBe('')
	})

	it('link type: value=URL, value_lang=matn', () => {
		const { href, text } = pickLink(SAMPLE[2], 'ru')
		expect(href).toBe('https://siat.stat.uz/')
		expect(text).toBe('Текст')
	})
})
