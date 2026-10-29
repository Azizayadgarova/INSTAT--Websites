import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

let social = {}
// Faqat useContacts mock qilinadi — filtrlash mantiqi useSocialLinks da
vi.mock('../hooks/useContacts', () => ({
	useContacts: () => ({ social }),
	default: () => ({ social }),
}))

import SocialLinks from '../components/shared/SocialLinks'

beforeEach(() => {
	social = {}
})

describe('SocialLinks — API qiymatiga qarab ko‘rsatiladi', () => {
	it('qiymati bor tarmoqlar Remix ikonka bilan, havola sifatida chiqadi', () => {
		social = {
			telegram: 'https://t.me/instatuz1',
			facebook: 'https://www.facebook.com/InstatNews',
			youtube: 'https://youtube.com/@instat',
		}
		render(<SocialLinks />)

		const links = screen.getAllByRole('link')
		expect(links.map(a => a.getAttribute('aria-label'))).toEqual(['Telegram', 'Facebook', 'YouTube'])
		expect(links[0]).toHaveAttribute('href', 'https://t.me/instatuz1')
		// ikonka — Remix'ning inline SVG'si, <img> emas
		expect(links[0].querySelector('svg')).not.toBeNull()
		expect(links[0].querySelector('img')).toBeNull()
	})

	it('null / bo‘sh / http bo‘lmagan qiymatli tarmoq ko‘rsatilmaydi', () => {
		social = {
			telegram: null,
			instagram: '',
			facebook: '   ',
			twitter: 'x.com/instat',
			linkedin: 'https://linkedin.com/company/instat',
			youtube: undefined,
		}
		render(<SocialLinks />)

		const links = screen.getAllByRole('link')
		expect(links).toHaveLength(1)
		expect(links[0]).toHaveAttribute('aria-label', 'LinkedIn')
	})

	it('hech qaysisida qiymat bo‘lmasa blok umuman chizilmaydi', () => {
		social = { telegram: null, instagram: '', facebook: '', twitter: '', linkedin: '', youtube: '' }
		const { container } = render(<SocialLinks />)

		expect(container).toBeEmptyDOMElement()
	})
})
