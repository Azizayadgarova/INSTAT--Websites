import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { routes } from '../app/router'
import { allRoutes } from '../config/menuConfig'

describe('har bir sahifa xatosiz render bo‘ladi', () => {
	for (const path of allRoutes) {
		it(path, async () => {
			const errors = []
			const orig = console.error
			console.error = (...a) => errors.push(a.join(' '))
			try {
				const router = createMemoryRouter(routes, { initialEntries: [path] })
				render(
					<HelmetProvider>
						<RouterProvider router={router} />
					</HelmetProvider>,
				)
				await new Promise(r => setTimeout(r, 400)) // lazy chunk yuklansin
			} finally {
				console.error = orig
			}
			const real = errors.filter(e => !/not wrapped in act|fetchpriority|Warning: React does not recognize/.test(e))
			expect(real, `${path}:\n${real.join('\n---\n')}`).toHaveLength(0)
		})
	}
})
