import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/shared/ScrollToTop'
import { menuConfig } from '../config/menuConfig'
import { MenuProvider } from '../context/MenuContext'
import Seo from '../components/shared/Seo'

const CursorRing    = lazy(() => import('../components/shared/CursorRing'))
const Footer        = lazy(() => import('../components/Footer'))

const MainLayout = () => {
	const { pathname } = useLocation()
	// Bosh sahifa va menyu bo'limlari (/about, /science ...) yangi dizaynda: o'z navigatsiya va footer'i bor
	const isHome = pathname === '/'
	const isMenuPage = Object.values(menuConfig).some(({ base }) => pathname === base || pathname.startsWith(`${base}/`))
	const ownFrame = isHome || isMenuPage
	const progressRef = useRef(null)
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

	useEffect(() => {
		const bar = progressRef.current
		if (!bar) return
		const onScroll = () => {
			const { scrollY } = window
			const max = document.documentElement.scrollHeight - window.innerHeight
			bar.style.width = max > 0 ? `${(scrollY / max) * 100}%` : '0%'
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [ownFrame])

	return (
		<MenuProvider>
		<div className='bg-[rgba(var(--bg-rgb),1)] min-h-screen'>
			{/* Standart (tilga mos) title/meta — sahifaning o'z <Seo/> si bo'lsa, u ustun turadi */}
			<Seo />
			<ScrollToTop />
			{!ownFrame && mountCursor && <Suspense fallback={null}><CursorRing /></Suspense>}

			{/* Global scroll progress (bosh sahifa o'zining navigatsiya/footer'iga ega — components/home) */}
			{!ownFrame && <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', zIndex: 9999, background: 'rgba(255,255,255,0.05)' }}>
				<div
					ref={progressRef}
					style={{
						height: '100%',
						width: '0%',
						background: 'rgba(var(--cyan-rgb),1)',
						boxShadow: '0 0 12px 2px rgba(var(--cyan-rgb),0.7), 0 0 30px 4px rgba(var(--cyan-rgb),0.4)',
						borderRadius: '0 2px 2px 0',
						position: 'relative',
					}}
				>
					<div
						style={{
							position: 'absolute',
							right: 0,
							top: '50%',
							transform: 'translateY(-50%)',
							width: '10px',
							height: '10px',
							borderRadius: '50%',
							background: 'rgba(var(--cyan-rgb),1)',
							boxShadow: '0 0 8px 3px rgba(var(--cyan-rgb),0.9), 0 0 20px 6px rgba(var(--cyan-rgb),0.4)',
						}}
					/>
				</div>
			</div>}

			{ownFrame ? (
				<Outlet />
			) : (
				<>
					<Navbar />
					<main className='pt-20 relative'>
						<Outlet />
					</main>
					<Suspense fallback={null}><Footer /></Suspense>
				</>
			)}
		</div>
		</MenuProvider>
	)
}

export default MainLayout
