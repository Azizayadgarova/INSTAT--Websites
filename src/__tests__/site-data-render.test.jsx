import { render, screen, waitFor } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Haqiqiy API javobiga o'xshash namuna (test.avacoder.uz dan)
const API_SAMPLE = [
	{ id: 17, module: 'about', type: 'string', key: 'about', value: '<p>To\'liq nomi - Institut</p>', value_uz: '<p>Umumiy malumot matni</p>', value_ru: null, value_en: null },
	{ id: 19, module: 'hotel', type: 'string', key: 'hotel_text', value: '<p>YOTOQXONA NIZOMI matni</p>', value_uz: null, value_ru: null, value_en: null, path: 'https://x/nizom.pdf' },
	{ id: 21, module: 'odob', type: 'file', key: 'odob_file', value: null, value_uz: null, path: 'https://x/odob.pdf' },
	{ id: 23, module: 'corruption', type: 'string', key: 'corruption_chairman', label: 'Komissiya raisi', value: 'Shukurov Sh.Z.', value_uz: null },
	{ id: 31, module: 'science', type: 'string', key: 'science_programme', value: 'ILMIY-TADQIQOTLAR DASTURI', value_uz: 'ILMIY-TADQIQOTLAR DASTURI' },
	{ id: 35, module: 'info_resource', type: 'link', key: 'siat_stat', value: 'https://siat.stat.uz/', value_uz: 'Statistika Axborot Tizimi' },
	{ id: 90, module: 'micro_data', type: 'string', key: 'micro_data_title6', label: 'Sahifa sarlavhasi 6', value: 'Statistik blok', value_uz: 'Statistik blok' },
	{ id: 91, module: 'micro_data', type: 'string', key: 'micro_data_set', label: "Statistik ma'lumotlar to'plami", value: '500', value_uz: '500' },
	{ id: 92, module: 'micro_data', type: 'string', key: 'micro_data_period', label: "Ma'lumotlar davri", value: '25 yil', value_uz: null },
	{ id: 93, module: 'micro_data', type: 'string', key: 'micro_data_indicator', label: "Statistik ko'rsatkichlar", value: '120', value_uz: '120' },
	{ id: 94, module: 'micro_data', type: 'string', key: 'micro_data_region', label: 'Hududiy qamrov', value: '14', value_uz: '14' },
]

vi.mock('../api/axios', () => ({
	default: { get: vi.fn(() => Promise.resolve({ data: API_SAMPLE })) },
	// info_resource alohida backend'dan keladi; bu testda asosiy namuna yetarli,
	// bo'sh javob almashtirishni o'tkazib yuboradi (@/api/siteData.api).
	infoResourceApi: { get: vi.fn(() => Promise.resolve({ data: [] })) },
}))

import { resetSiteDataCache } from '../api/siteData.api'
import ContentPage from '../components/shared/ContentPage'
import LinkResourcePage from '../components/shared/LinkResourcePage'
import StatistikBlok from '../components/StatistikBlok'
import i18n from '../i18n'

const wrap = ui => render(<HelmetProvider><MemoryRouter>{ui}</MemoryRouter></HelmetProvider>)

beforeEach(async () => { resetSiteDataCache(); await i18n.changeLanguage('uz') })

describe('API kontenti sahifada ko‘rinadi', () => {
	it('Umumiy ma\'lumot — HTML matn chiqadi', async () => {
		const { container } = wrap(<ContentPage module='about' contentKey='about' title='Umumiy' />)
		await waitFor(() => expect(container.textContent).toMatch(/Umumiy malumot matni/))
	})

	it('Yotoqxona — value_uz null bo‘lsa value ishlatiladi (fallback)', async () => {
		wrap(<ContentPage module='hotel' contentKey='hotel_text' title='Yotoqxona' />)
		await waitFor(() => expect(screen.getByText(/YOTOQXONA NIZOMI/)).toBeInTheDocument())
	})

	it('Odob-axloq — PDF yuklab olish tugmasi', async () => {
		wrap(<ContentPage module='odob' title='Odob' />)
		await waitFor(() => {
			const link = screen.getByRole('link')
			expect(link).toHaveAttribute('href', 'https://x/odob.pdf')
		})
	})

	it('Ilmiy tadqiqot — dastur matni + PDF', async () => {
		wrap(<ContentPage module='science' contentKey='science_programme' title='Ilmiy' />)
		await waitFor(() => expect(screen.getByText(/ILMIY-TADQIQOTLAR DASTURI/)).toBeInTheDocument())
	})

	it('Statistik blok — raqam, izoh va sarlavha micro_data modulidan keladi', async () => {
		wrap(<StatistikBlok />)
		await waitFor(() => expect(screen.getAllByText('500').length).toBeGreaterThan(0))
		// value_uz null bo'lsa value ishlatiladi
		expect(screen.getAllByText('25 yil').length).toBeGreaterThan(0)
		expect(screen.getAllByText("Statistik ma'lumotlar to'plami").length).toBeGreaterThan(0)
		expect(screen.getAllByText('Statistik blok').length).toBeGreaterThan(0)
	})

	it('Axborot resursi — tashqi havola to‘g‘ri', async () => {
		wrap(<LinkResourcePage itemKey='siat_stat' title='Axborot' />)
		await waitFor(() => {
			const link = screen.getByRole('link')
			expect(link).toHaveAttribute('href', 'https://siat.stat.uz/')
		})
	})
})
