import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Haqiqiy javoblarga o'xshash namunalar (test.avacoder.uz)
const REPORTS = [
	{
		id: 1,
		name: 'Erkaklar statistikasi',
		category: { id: 3, name: 'Aholi', name_uz: 'Aholi', name_ru: 'Население', type: 'micro-data' },
		options: [{ id: 2, date_from: '2015-01-01', date_to: '2024-12-31', file_extension: '.zip' }],
		is_active: true,
		created_at: '2026-07-28T11:29:02.908745',
	},
	// kategoriya turi boshqa — mikro-ma'lumotlar bo'limida ko'rinmasligi kerak
	{
		id: 2,
		name: 'Kutubxona hisoboti',
		category: { id: 4, name: 'Kitoblar', name_uz: 'Kitoblar', type: 'library' },
		options: [],
		is_active: true,
		created_at: '2026-07-28T11:29:02.908745',
	},
	// nofaol yozuv ham chiqmaydi
	{ id: 3, name: 'Arxiv hisoboti', category: null, options: [], is_active: false, created_at: '2026-01-05T10:00:00' },
]

const SITE_DATA = [
	{ id: 80, module: 'micro_data', type: 'string', key: 'micro_data_title5', value: 'Backend sarlavhasi', value_uz: 'Backend sarlavhasi' },
	{ id: 81, module: 'micro_data', type: 'string', key: 'micro_data_description5', value: 'Backend tavsifi', value_uz: null },
]

// Testlar `reports`ni almashtirib API javobini boshqaradi
let reports = REPORTS
const get = vi.fn(url =>
	Promise.resolve({ data: url.includes('site-data') ? SITE_DATA : reports }),
)
vi.mock('../api/axios', () => ({
	default: { get: (...args) => get(...args) },
	// Alohida instance — `get` spy'iga qo'shimcha chaqiruv qo'shmaydi
	infoResourceApi: { get: () => Promise.resolve({ data: [] }) },
}))

import { resetSiteDataCache } from '../api/siteData.api'
import NufuzliNashrlar from '../components/NufuzliNashrlar'
import i18n from '../i18n'

// Komponent kartochka bosilganda useNavigate() ishlatadi — Router konteksti shart
const renderSection = () => render(<MemoryRouter><NufuzliNashrlar /></MemoryRouter>)

beforeEach(async () => {
	resetSiteDataCache()
	get.mockClear()
	reports = REPORTS
	await i18n.changeLanguage('uz')
})

describe('NufuzliNashrlar — data-reports API', () => {
	it('kartochka backend hisobotidan quriladi', async () => {
		renderSection()

		await waitFor(() => expect(screen.getByText('Erkaklar statistikasi')).toBeInTheDocument())
		expect(screen.getByText('Aholi')).toBeInTheDocument()
		// options[].date_from/date_to -> yillar oralig'i
		expect(screen.getByText('2015 — 2024')).toBeInTheDocument()
		// created_at -> "2026 yil iyul"
		expect(screen.getByText('2026 yil iyul')).toBeInTheDocument()
	})

	it('boshqa turdagi va nofaol hisobotlar chiqmaydi', async () => {
		renderSection()

		await waitFor(() => expect(screen.getByText('Erkaklar statistikasi')).toBeInTheDocument())
		expect(screen.queryByText('Kutubxona hisoboti')).not.toBeInTheDocument()
		expect(screen.queryByText('Arxiv hisoboti')).not.toBeInTheDocument()
		// API ma'lumot berdi -> statik fallback ro'yxati ishlatilmaydi
		expect(screen.queryByText("Aholi soni va demografik o'sish")).not.toBeInTheDocument()
	})

	it('sarlavha va tavsif micro_data modulidan keladi', async () => {
		renderSection()

		await waitFor(() => expect(screen.getByText('Backend sarlavhasi')).toBeInTheDocument())
		// value_uz null -> value ishlatiladi
		expect(screen.getByText('Backend tavsifi')).toBeInTheDocument()
	})

	it('API bo‘sh bo‘lsa statik ro‘yxat ko‘rsatiladi', async () => {
		reports = []
		renderSection()

		await waitFor(() =>
			expect(screen.getByText("Aholi soni va demografik o'sish")).toBeInTheDocument(),
		)
	})
})
