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
]

vi.mock('../api/axios', () => ({ default: { get: vi.fn(() => Promise.resolve({ data: API_SAMPLE })) } }))

import { resetSiteDataCache } from '../api/siteData.api'
import ContentPage from '../components/shared/ContentPage'
import LinkResourcePage from '../components/shared/LinkResourcePage'
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

	it('Axborot resursi — tashqi havola to‘g‘ri', async () => {
		wrap(<LinkResourcePage itemKey='siat_stat' title='Axborot' />)
		await waitFor(() => {
			const link = screen.getByRole('link')
			expect(link).toHaveAttribute('href', 'https://siat.stat.uz/')
		})
	})
})
