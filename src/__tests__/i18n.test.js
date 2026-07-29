import { describe, expect, it } from 'vitest'
import en from '../i18n/en.json'
import ru from '../i18n/ru.json'
import uz from '../i18n/uz.json'

const flatten = (obj, prefix = '') =>
	Object.entries(obj).flatMap(([k, v]) =>
		typeof v === 'object' && v !== null
			? flatten(v, `${prefix}${k}.`)
			: [`${prefix}${k}`],
	)

const uzKeys = flatten(uz)

describe('i18n to‘liqligi', () => {
	it.each([
		['ru', ru],
		['en', en],
	])('%s tarjimasida barcha kalitlar bor', (lang, dict) => {
		const keys = new Set(flatten(dict))
		const missing = uzKeys.filter(k => !keys.has(k))
		expect(missing, `${lang} da yetishmaydigan kalitlar:\n${missing.join('\n')}`).toEqual([])
	})

	it('ortiqcha (uz da yo‘q) kalit qolmagan', () => {
		const uzSet = new Set(uzKeys)
		for (const [lang, dict] of [['ru', ru], ['en', en]]) {
			const extra = flatten(dict).filter(k => !uzSet.has(k))
			expect(extra, `${lang} da ortiqcha kalitlar: ${extra.join(', ')}`).toEqual([])
		}
	})
})
