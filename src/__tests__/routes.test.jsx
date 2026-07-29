import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import i18n from '../i18n'
import { routes } from '../app/router'
import { allRoutes } from '../config/menuConfig'

const renderAt = path => {
	const router = createMemoryRouter(routes, { initialEntries: [path] })
	return render(
		<HelmetProvider>
			<RouterProvider router={router} />
		</HelmetProvider>,
	)
}

describe('marshrutlar', () => {
	it('sitemap dagi har bir URL router da mavjud', () => {
		for (const route of allRoutes) {
			const matched = createMemoryRouter(routes, { initialEntries: [route] }).state.matches
			expect(matched.at(-1)?.route?.path, `${route} uchun marshrut yo‘q`).not.toBe('*')
		}
	})

	it('mavjud bo‘lmagan URL 404 sahifasini ko‘rsatadi', async () => {
		renderAt('/bunday-sahifa-yoq')
		expect(await screen.findByText(i18n.t('error.notFound'))).toBeInTheDocument()
	})

	it('/information-resurses bo‘limi sidebar va Outlet bilan render bo‘ladi', async () => {
		renderAt('/information-resurses/gender-statistika')
		// Sidebar'da bo'lim nomi + tanlangan sahifa sarlavhasi ko'rinadi
		const hits = await screen.findAllByText(i18n.t('menu.axborot.gender-statistika'))
		// sidebar link + sahifa sarlavhasi
		expect(hits.length).toBeGreaterThan(0)
		expect(await screen.findByRole('navigation', { name: i18n.t('menu.axborot.title') })).toBeInTheDocument()
	})
})

describe('i18n', () => {
	it('uchala tilda ham menyu kalitlari tarjima qilingan', async () => {
		for (const lng of ['uz', 'ru', 'en']) {
			await i18n.changeLanguage(lng)
			for (const section of ['about', 'axborot', 'science', 'media']) {
				const title = i18n.t(`menu.${section}.title`)
				expect(title, `${lng}/${section} tarjimasi yo‘q`).not.toBe(`menu.${section}.title`)
			}
		}
		await i18n.changeLanguage('uz')
	})
})
