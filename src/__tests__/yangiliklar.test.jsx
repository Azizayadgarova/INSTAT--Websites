import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
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

const setup = () =>
	render(
		<HelmetProvider>
			<MemoryRouter initialEntries={['/media-servises/yangiliklar']}>
				<Yangiliklar />
			</MemoryRouter>
		</HelmetProvider>,
	)

beforeEach(async () => {
	resetSiteListCache()
	get.mockClear()
	posts = POSTS
	await i18n.changeLanguage('uz')
})

describe('Yangiliklar — site-posts API', () => {
	it('eng so‘nggi yangilik yuqorida to‘liq ko‘rinadi', async () => {
		setup()

		await waitFor(() => expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Yangilik 12'))
		expect(screen.getByText('Yangilik 12 matni')).toBeInTheDocument()
		expect(get).toHaveBeenCalledWith('/site-posts/items/all/', expect.anything())
	})

	it('qolganlari "Boshqa yangiliklar" panjarasida sahifalanadi', async () => {
		setup()

		await waitFor(() => expect(screen.getByText('Boshqa yangiliklar')).toBeInTheDocument())
		// 11 ta qolgan yangilik, sahifasiga 8 tadan -> 2 sahifa
		expect(screen.getByText('Yangilik 11')).toBeInTheDocument()
		expect(screen.queryByText('Yangilik 3')).not.toBeInTheDocument()
		// created_at -> 23.01.2026 ko'rinishi
		expect(screen.getByText('22.01.2026')).toBeInTheDocument()

		fireEvent.click(screen.getByRole('button', { name: '2' }))
		expect(screen.getByText('Yangilik 3')).toBeInTheDocument()
		expect(screen.queryByText('Yangilik 11')).not.toBeInTheDocument()
	})

	it('kartochka bosilganda o‘sha yangilik yuqoriga chiqadi', async () => {
		setup()

		await waitFor(() => expect(screen.getByText('Yangilik 11')).toBeInTheDocument())
		fireEvent.click(screen.getByText('Yangilik 11'))

		expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Yangilik 11')
		expect(screen.getByText('Yangilik 11 matni')).toBeInTheDocument()
		// endi eng so'nggisi panjaraga tushadi
		expect(screen.getByText('Yangilik 12')).toBeInTheDocument()
	})

	it('API bo‘sh bo‘lsa bo‘sh holat ko‘rsatiladi', async () => {
		posts = []
		setup()

		await waitFor(() =>
			expect(screen.getByText(i18n.t('common.comingSoonHint'))).toBeInTheDocument(),
		)
	})
})
