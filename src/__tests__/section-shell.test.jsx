import { render, waitFor } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { routes } from '../app/router'
import { menuConfig } from '../config/menuConfig'
import i18n from '../i18n'

describe('menyu bo‘limlari yangi ichki sahifa qobig‘ida o‘z bo‘limini ko‘rsatadi', () => {
	for (const [key, { base, paths }] of Object.entries(menuConfig)) {
		it(`${base}/${paths[0]}`, async () => {
			const router = createMemoryRouter(routes, { initialEntries: [`${base}/${paths[0]}`] })
			const { container } = render(
				<HelmetProvider>
					<RouterProvider router={router} />
				</HelmetProvider>,
			)

			// Yon menyu sarlavhasi va havolalari aynan shu bo'limniki bo'lishi kerak
			await waitFor(() => expect(container.querySelector('.home .side h4')).not.toBeNull())
			expect(container.querySelector('.side h4').textContent).toBe(i18n.t(`menu.${key}.title`))
			const hrefs = [...container.querySelectorAll('.side nav a')].map(a => a.getAttribute('href')).filter(Boolean)
			const internal = hrefs.filter(h => h.startsWith('/'))
			// Ichki havolalar faqat shu bo'lim base'iga tegishli (tashqi portal havolalari hisobga olinmaydi)
			expect(internal.every(h => h.startsWith(`${base}/`))).toBe(true)
			expect(container.querySelectorAll('.pg-hero h1')).toHaveLength(1)
		})
	}
})
