import { readFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

/**
 * Canvas API (fillStyle, addColorStop, ...) CSS var() ni TUSHUNMAYDI —
 * unga faqat aniq rang berish mumkin. Bir marta shu xato butun bosh sahifani
 * yiqitgan edi. Bu test canvas ishlatadigan fayllarda var(--...) rang
 * qiymati paydo bo'lsa ogohlantiradi.
 */
const canvasFiles = execSync("grep -rl getContext src --include=*.jsx --include=*.js")
	.toString()
	.trim()
	.split('\n')
	.filter(Boolean)

describe('canvas ranglari', () => {
	it.each(canvasFiles)('%s da CSS var() rang ishlatilmagan', file => {
		const code = readFileSync(file, 'utf8')
		// keyframes / transform ichidagi var(--dx) kabilarni hisobga olmaymiz —
		// faqat rang kontekstidagi var() ni qidiramiz
		const colorVar = code.match(/(?:fillStyle|strokeStyle|shadowColor|addColorStop\([^,]*,)\s*[`'"][^`'"]*var\(--/)
		expect(colorVar, `${file}: canvas rangida var() bor — aniq rgba/hex bering`).toBeNull()
	})
})
