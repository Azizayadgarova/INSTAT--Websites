import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Canvas API (fillStyle, addColorStop, ...) CSS var() ni TUSHUNMAYDI —
 * unga faqat aniq rang berish mumkin. Bir marta shu xato butun bosh sahifani
 * yiqitgan edi. Bu test canvas ishlatadigan fayllarda var(--...) rang
 * qiymati paydo bo'lsa ogohlantiradi.
 */
// Fayllarni Node bilan qidiramiz — `grep` Windows'da yo'q va shell'ga
// bog'lanish testni muhitga qarab yiqitardi.
const canvasFiles = readdirSync('src', { recursive: true, withFileTypes: true })
	.filter(entry => entry.isFile() && /\.jsx?$/.test(entry.name))
	.map(entry => join(entry.parentPath ?? entry.path, entry.name))
	.filter(file => readFileSync(file, 'utf8').includes('getContext'))

describe('canvas ranglari', () => {
	it.each(canvasFiles)('%s da CSS var() rang ishlatilmagan', file => {
		const code = readFileSync(file, 'utf8')
		// keyframes / transform ichidagi var(--dx) kabilarni hisobga olmaymiz —
		// faqat rang kontekstidagi var() ni qidiramiz
		const colorVar = code.match(/(?:fillStyle|strokeStyle|shadowColor|addColorStop\([^,]*,)\s*[`'"][^`'"]*var\(--/)
		expect(colorVar, `${file}: canvas rangida var() bor — aniq rgba/hex bering`).toBeNull()
	})
})
