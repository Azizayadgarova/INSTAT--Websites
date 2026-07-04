import { lazy, Suspense, useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar2 from '../components/Navbar2'
import ScrollToTop from '../components/shared/ScrollToTop'

const CursorRing = lazy(() => import('../components/shared/CursorRing'))
const Footer     = lazy(() => import('../components/Footer.jsx'))

const SecondLayout = () => {
	const [mountCursor, setMountCursor] = useState(false)
	useEffect(() => {
		const mount = () => setMountCursor(true)
		if (document.readyState === 'complete') {
			const t = setTimeout(mount, 300)
			return () => clearTimeout(t)
		}
		window.addEventListener('load', mount, { once: true })
		return () => window.removeEventListener('load', mount)
	}, [])

	return (
		<div className='bg-[rgba(14,18,27,1)] min-h-screen'>
			<ScrollToTop />
			{mountCursor && <Suspense fallback={null}><CursorRing /></Suspense>}
			<Navbar2 />
			<main className='pt-20'>
				<Outlet />
			</main>
			<Suspense fallback={null}><Footer /></Suspense>
		</div>
	)
}

export default SecondLayout
