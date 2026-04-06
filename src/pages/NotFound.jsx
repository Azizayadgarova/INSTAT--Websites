import { Link } from 'react-router-dom'

const NotFound = () => {
	return (
		<div
			className='flex flex-col items-center justify-center min-h-screen bg-[rgba(14,18,27,1)]'
			style={{ fontFamily: 'Inter, sans-serif' }}
		>
			<h1 className='text-[120px] font-bold text-[rgba(0,230,252,1)] leading-none'>
				404
			</h1>
			<p className='text-[rgba(188,188,188,1)] text-[20px] mt-4'>
				Sahifa topilmadi
			</p>
			<Link
				to='/'
				className='mt-8 px-6 py-3 rounded-[10px] bg-gradient-to-b from-[#3E8BE6] to-[#2B6FC4] border border-[#5FA2F0] text-white text-[16px]'
			>
				Bosh sahifaga qaytish
			</Link>
		</div>
	)
}

export default NotFound
