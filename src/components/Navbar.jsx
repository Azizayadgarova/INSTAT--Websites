import { memo, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../assets/icons/InstatIcon.png'
import menuIcon from '../assets/menu-line.png'
import { menuConfig } from '../config/menuConfig'
import icon1 from '../assets/icons/facebook.png'
import icon2 from '../assets/icons/instaIcon.png'
import icon3 from '../assets/icons/social3.png'

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [activeMenu, setActiveMenu] = useState('axborot')
	const [activeLinkIndex, setActiveLinkIndex] = useState(null)

	const toggleMenu = useCallback(() => setIsOpen(p => !p), [])
	const closeMenu = useCallback(() => setIsOpen(false), [])

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : ''
	}, [isOpen])

	return (
		<>
			{/* NAVBAR */}
			<nav className='fixed w-full z-50 backdrop-blur-[10px] bg-[rgba(18,14,27,0.2)] backdrop-blur-[40px]'>
				<div className='max-w-[1440px] mx-auto flex items-center justify-between py-[20px] px-[100px]'>
					<img src={logoImg} alt='Logo' />
					<div className='flex items-center gap-4'>
						<button className='text-[14px] text-white'>Tizimga kirish</button>
						<div className="hidden lg:block w-[1px] h-[22px] bg-white/40" />
						<button
							onClick={toggleMenu}
							className='flex items-center gap-2 px-4 py-2 rounded-[10px]
							bg-gradient-to-b from-[#3E8BE6] to-[#2B6FC4]
							border border-[#5FA2F0] text-white'
						>
							<img src={menuIcon} alt='Menu' width={16} />
							Menu
						</button>
					</div>
				</div>
			</nav>

			{/* MENU OVERLAY */}
			<div
				className={`fixed inset-0 z-[999] transition-all duration-500 ${
					isOpen ? 'visible opacity-100' : 'invisible opacity-0'
				}`}
			>
				{/* LEFT OVERLAY */}
				<div
					onClick={closeMenu}
					className={`absolute left-0 top-0 h-full w-[35%]
					bg-[rgba(39,45,59,0.2)]
					backdrop-blur-[10px]
					transition-all duration-500
					${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
				/>

				{/* RIGHT PANEL */}
				<div
					className={`absolute right-0 top-0 h-screen w-[65%]
					bg-[rgba(14,18,27,1)]
					transition-transform duration-500
					flex flex-col justify-between
					${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
				>
					{/* CLOSE BUTTON */}
					<button
						onClick={closeMenu}
						className='absolute top-10 right-10 text-white text-2xl z-10'
					>
						✕
					</button>

					{/* MAIN CONTENT - ikki ustun */}
					<div className='flex-1 flex items-center px-[8%] pt-[10px]'>
						<div className='flex gap-[80px] w-full'>

							{/* CHAP - Menu */}
							<div className='min-w-[220px]'>
								<p className='text-white mb-[20px] font-inter font-medium text-[16px] tracking-wide'>
									Menu
								</p>
								<ul className='space-y-[12px]'>
									{Object.entries(menuConfig).map(([key, item]) => (
										<li
											key={key}
											onClick={() => {
												setActiveMenu(key)
												setActiveLinkIndex(null)
											}}
											className={`text-[32px] font-inter font-semibold cursor-pointer transition-colors duration-200 ${
												activeMenu === key
													? 'text-cyan-300'
													: 'text-[rgba(90,98,117,1)] hover:text-white'
											}`}
										>
											{item.title}
										</li>
									))}
								</ul>
							</div>

							{/* O'NG - Ichki bo'limlar */}
							<div className='flex-1'>
								<p className='text-white font-medium mb-[20px] font-inter text-[16px]'>
									Ichki bo'limlar
								</p>
								<ul className='space-y-[14px]'>
									{menuConfig[activeMenu]?.links.map((link, i) => (
										<li
											key={i}
											onClick={() => setActiveLinkIndex(i)}
											style={{
												transform: isOpen ? 'translateX(0)' : 'translateX(50px)',
												opacity: isOpen ? 1 : 0,
												transition: `all 0.3s ease ${i * 0.05}s`,
												color:
													activeLinkIndex === i
														? 'white'
														: 'rgba(90,98,117,1)',
											}}
											className='cursor-pointer text-[15px] font-inter hover:text-white transition-colors duration-200'
										>
											<Link
												to={`${menuConfig[activeMenu].base}/${link.path}`}
												onClick={closeMenu}
											>
												{link.name}
											</Link>
										</li>
									))}
								</ul>
							</div>

						</div>
					</div>

					{/* FOOTER */}
					<div className='pb-[60px] px-[8%] text-[14px] font-inter flex justify-between items-start border-t border-white/10 pt-[30px]'>
						<div>
							<p className='mb-3 text-[rgba(138,145,163,1)]'>Telefon raqam</p>
							<p className='text-white'>+44 207 112 82 85</p>
						</div>
						<div>
							<p className='mb-3 text-[rgba(138,145,163,1)]'>Elektron pochta</p>
							<p className='text-white'>hello@lecalc.io</p>
						</div>
						<div>
							<p className='mb-3 text-[rgba(138,145,163,1)]'>Manzil</p>
							<p className='text-white'>508 Bridle Avenue Newnan,<br />GA 30263</p>
						</div>
						<div>
							<p className='mb-3 text-[rgba(138,145,163,1)]'>Ijtimoiy tarmoqlar</p>
							<div className='flex gap-4'>
								<img src={icon3} alt="" />
								<img src={icon1} alt="" />
								<img src={icon2} alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default memo(Navbar)