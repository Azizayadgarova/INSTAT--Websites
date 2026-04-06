// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar' // Navbar joylashgan papkaga qarab pathni o'zgartiring

const MainLayout = () => {
	return (
		<div className='bg-[rgba(14,18,27,1)] min-h-screen'>
			{/* Navbar har doim yuqorida */}
			<Navbar />

			{/* Routing orqali yuklanadigan sahifalar */}
			<main className='pt-[80px]'>
				<Outlet />
				
			</main>
		</div>
	)
}

export default MainLayout
