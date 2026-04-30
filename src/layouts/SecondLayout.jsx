import { Outlet } from 'react-router-dom'
import Navbar2 from '../components/Navbar2'
import CursorRing from '../components/shared/CursorRing'

const SecondLayout = () => {
	return (
		<div className='bg-[rgba(14,18,27,1)] min-h-screen'>
			<CursorRing />
			<Navbar2 />
			<main className='pt-[80px]'>
				<Outlet />
			</main>
		</div>
	)
}

export default SecondLayout
