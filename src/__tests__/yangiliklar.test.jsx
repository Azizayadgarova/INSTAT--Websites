import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// /api/site-posts/items/all/ javobiga o'xshash namunalar
const POSTS = Array.from({ length: 12 }, (_, i) => ({
	id: i + 1,
	title_uz: `Yangilik ${i + 1}`,
	title_ru: null,
	title_en: null,
	body_uz: `<p>Yangilik ${i + 1} matni</p>`,
	body_ru: null,
	body_en: null,
	thumbnail: `https://api1.instat.uz/media/post-images/${i + 1}.png`,
	// eng yangisi — id 12 (2026-01-23)
	created_at: `2026-01-${String(i + 12).padStart(2, '0')}T10:00:00`,
}))

let posts = POSTS
const get = vi.fn(() => Promise.resolve({ data: posts }))
// Yangiliklar alohida axios nusxasidan (newsApi) keladi — ikkalasi ham mock qilinadi
vi.mock('../api/axios', () => {
	const client = { get: (...args) => get(...args) }
	return {
		default: client,
		newsApi: client,
		createApi: () => client,
		// Alohida instance — `get` spy'iga qo'shimcha chaqiruv qo'shmaydi
		infoResourceApi: { get: () => Promise.resolve({ data: [] }) },
	}
})

import { resetSiteListCache } from '../hooks/useSiteList'
import i18n from '../i18n'
import Yangiliklar from '../pages/matbuot/Yangiliklar'
import YangilikDetail from '../pages/matbuot/YangilikDetail'

const setup = (path = '/media-servises/yangiliklar') =>
	render(
		<HelmetProvider>
			<MemoryRouter initialEntries={[path]}>
				<Routes>
					<Route path='/media-servises/yangiliklar' element={<Yangiliklar />} />
					<Route path='/media-servises/yangiliklar/:id' element={<YangilikDetail />} />
				</Routes>
			</MemoryRouter>
		</HelmetProvider>,
	)

beforeEach(async () => {
	resetSiteListCache()
	get.mockClear()
	posts = POSTS
	await i18n.changeLanguage('uz')
})

describe('Yangiliklar — ro‘yxat (site-posts API)', () => {
	it('har bir yangilik alohida kartochka, alohida sahifaga havola bo‘ladi', async () => {
		setup()

		const card = await screen.findByRole('link', { name: /Yangilik 12/ })
		expect(card).toHaveAttribute('href', '/media-servises/yangiliklar/12')
		// matn to'liq chiqmaydi, faqat qisqa tavsif
		expect(screen.getByText('Yangilik 12 matni')).toBeInTheDocument()
		expect(get).toHaveBeenCalledWith('/site-posts/items/all/', expect.anything())
		// created_at -> 23.01.2026 ko'rinishi
		expect(screen.getByText('23.01.2026')).toBeInTheDocument()
	})

	it('yangiliklar sahifalanadi (sahifasiga 9 ta)', async () => {
		setup()

		await screen.findByText('Yangilik 12')
		// getByRole jsdom'da CSS o'zgaruvchili `background` ni klonlashda yiqiladi — havolalarni DOM orqali sanaymiz
		const cards = () => [...document.querySelectorAll('a[href^="/media-servises/yangiliklar/"]')].map(a => a.getAttribute('href'))
		// 12 ta yangilik -> 9 + 3
		expect(cards()).toHaveLength(9)
		expect(cards()).not.toContain('/media-servises/yangiliklar/3')

		fireEvent.click(screen.getByText('2'))
		expect(cards()).toHaveLength(3)
		expect(cards()).toContain('/media-servises/yangiliklar/3')
	})

	it('API bo‘sh bo‘lsa bo‘sh holat ko‘rsatiladi', async () => {
		posts = []
		setup()

		await waitFor(() =>
			expect(screen.getByText(i18n.t('common.comingSoonHint'))).toBeInTheDocument(),
		)
	})
})

describe('YangilikDetail — alohida sahifa', () => {
	it('id bo‘yicha yangilikning to‘liq matni ko‘rinadi', async () => {
		setup('/media-servises/yangiliklar/5')

		await waitFor(() => expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Yangilik 5'))
		expect(screen.getByText('Yangilik 5 matni')).toBeInTheDocument()
		expect(screen.getByRole('link', { name: /Barcha yangiliklar/ })).toHaveAttribute('href', '/media-servises/yangiliklar')
	})

	it('kartochkani bosish alohida sahifani ochadi', async () => {
		setup()

		fireEvent.click(await screen.findByRole('link', { name: /Yangilik 11/ }))

		await waitFor(() => expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Yangilik 11'))
	})

	it('mavjud bo‘lmagan id uchun "topilmadi" ko‘rsatiladi', async () => {
		setup('/media-servises/yangiliklar/999')

		await waitFor(() => expect(screen.getByText('Yangilik topilmadi')).toBeInTheDocument())
	})
})
