import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import './i18n'
import ErrorBoundary from './components/shared/ErrorBoundary'
import { router } from './app/router'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ErrorBoundary>
			<HelmetProvider>
				<RouterProvider router={router} />
			</HelmetProvider>
		</ErrorBoundary>
	</React.StrictMode>,
)
