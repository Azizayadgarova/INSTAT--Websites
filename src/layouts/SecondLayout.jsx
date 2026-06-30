import { Outlet } from 'react-router-dom'
import Navbar2 from '../components/Navbar2'
import CursorRing from '../components/shared/CursorRing'
import ScrollToTop from '../components/shared/ScrollToTop'
import Footer from '../components/Footer.jsx'

const SecondLayout = () => {
	return (
		<div className='bg-[rgba(14,18,27,1)] min-h-screen'>
			<ScrollToTop />
			<CursorRing />
			<Navbar2 />
			<main className='pt-[80px]'>
				<Outlet />
			</main>
			<Footer/>
		</div>
	)
}

export default SecondLayout
