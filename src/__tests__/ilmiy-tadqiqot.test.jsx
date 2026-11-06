import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// /api/site-science-programs/items/all/ javobiga o'xshash namunalar (fayl `file` maydonida)
const RESEARCHES = [
	{ id: 1, label_uz: 'Dastur A', label_ru: 'Программа А', label_en: null, file: 'https://x/media/a.pdf', created_at: '2026-11-06T09:58:19' },
	{ id: 2, label_uz: 'Dastur B', label_ru: null, label_en: 'Trade research', file: 'https://x/media/b.pdf', created_at: '2026-11-07T09:58:19' },
	{ id: 3, label_uz: 'Faylsiz dastur', label_ru: null, label_en: null, file: null, created_at: '2026-11-08T09:58:19' },
]

let data = RESEARCHES
const get = vi.fn(() => Promise.resolve({ data }))
vi.mock('../api/axios', () => {
	const client = { get: (...args) => get(...args) }
	return {
		default: client,
		newsApi: client,
		createApi: () => client,
		infoResourceApi: { get: () => Promise.resolve({ data: [] }) },
	}
})

import { resetSiteListCache } from '../hooks/useSiteList'
import i18n from '../i18n'
import IlmiyTadqiqot from '../pages/IlmFan/IlmiyTadqiqot'

const setup = () =>
	render(
		<HelmetProvider>
			<MemoryRouter>
				<IlmiyTadqiqot />
			</MemoryRouter>
		</HelmetProvider>,
	)

beforeEach(async () => {
	resetSiteListCache()
	get.mockClear()
	data = RESEARCHES
	await i18n.changeLanguage('uz')
})

describe('Ilmiy tadqiqot dasturi — site-science-programs API', () => {
	it('barcha yozuvlar ro‘yxat bo‘lib chiqadi, `file` yuklab olish havolasi bo‘ladi', async () => {
		setup()

		await screen.findByText('Dastur A')
		expect(screen.getByText('Dastur B')).toBeInTheDocument()
		expect(screen.getByText('Faylsiz dastur')).toBeInTheDocument()
		expect(get).toHaveBeenCalledWith('/site-science-programs/items/all/', expect.anything())

		const links = [...document.querySelectorAll('a[href$=".pdf"]')].map(a => a.getAttribute('href'))
		expect(links).toEqual(['https://x/media/a.pdf', 'https://x/media/b.pdf'])
	})

	it('label joriy tilda chiqadi (bo‘sh bo‘lsa boshqa tilga qaytadi)', async () => {
		await i18n.changeLanguage('ru')
		setup()

		await screen.findByText('Программа А')
		// label_ru bo'sh -> keyingi tillar tartibida (uz, en): label_uz olinadi
		expect(screen.getByText('Dastur B')).toBeInTheDocument()
	})

	it('"Oldindan ko‘rish" PDF ni panelda (iframe) ochadi', async () => {
		setup()

		await screen.findByText('Dastur A')
		const previewButtons = screen.getAllByText(i18n.t('common.preview'))
		// faqat fayli bor 2 ta yozuvda tugma bor
		expect(previewButtons).toHaveLength(2)

		fireEvent.click(previewButtons[0])
		await waitFor(() => expect(document.querySelector('aside[role=dialog] iframe')).toHaveAttribute('src', 'https://x/media/a.pdf'))
	})

	it('API bo‘sh bo‘lsa bo‘sh holat ko‘rsatiladi', async () => {
		data = []
		setup()

		await waitFor(() => expect(screen.getByText(i18n.t('common.comingSoonHint'))).toBeInTheDocument())
	})
})
