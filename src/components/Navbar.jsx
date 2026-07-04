import { memo, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logoImg from '@/assets/icons/InstatIcon.png'
import menuIcon from '@/assets/menu-line.png'
import { menuConfig } from '../config/menuConfig'
const SocialLinkedin = () => (
	<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
		<rect width='24' height='24' rx='5' fill='#0A66C2' />
		<circle cx='8.5' cy='8.5' r='1.2' fill='#fff' />
		<rect x='7.5' y='11' width='2' height='6' rx='0.6' fill='#fff' />
		<path d='M12 11h1.8v1c.3-.6 1-1.1 2-1.1 1.8 0 2.4 1.1 2.4 2.8V17h-2v-3c0-.8-.3-1.4-1-1.4-.8 0-1.2.6-1.2 1.4v3H12V11z' fill='#fff' />
	</svg>
)

const SocialX = () => (
	<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
		<rect width='24' height='24' rx='5' fill='#000' />
		<path d='M14 6.5h2l-4.3 4.9L17 17.5h-4l-2.8-3.6-3.2 3.6H5l4.6-5.3L7 6.5h4.1l2.5 3.4L14 6.5zm-.7 9.7h1.1L10.5 7.7H9.3l4 8.5z' fill='#fff' />
	</svg>
)

const SocialFacebook = () => (
	<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
		<rect width='24' height='24' rx='5' fill='#1877F2' />
		<path d='M13.5 12.5h1.4l.4-2H13.5v-1.1c0-.5.3-1 1-1H15V6.5s-.7-.1-1.3-.1c-1.4 0-2.3.9-2.3 2.4V10.5H9.5v2H11.5v4.5h2v-4.5z' fill='#fff' />
	</svg>
)

const SocialInstagram = () => (
	<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
		<rect width='24' height='24' rx='5' fill='url(#ig-nav)' />
		<defs>
			<linearGradient id='ig-nav' x1='24' y1='0' x2='0' y2='24' gradientUnits='userSpaceOnUse'>
				<stop stopColor='#833AB4' />
				<stop offset='0.5' stopColor='#C13584' />
				<stop offset='1' stopColor='#FD1D1D' />
			</linearGradient>
		</defs>
		<rect x='6.5' y='6.5' width='11' height='11' rx='3' stroke='#fff' strokeWidth='1.3' />
		<circle cx='12' cy='12' r='2.8' stroke='#fff' strokeWidth='1.3' />
		<circle cx='15.5' cy='8.5' r='0.8' fill='#fff' />
	</svg>
)

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
			<nav className='fixed w-full z-50 bg-[rgba(18,14,27,0.2)] backdrop-blur-[40px]'>
				<div className='max-w-[1440px] mx-auto flex items-center justify-between py-[20px] px-5 md:px-[100px]'>
					<img
						src={logoImg}
						alt='Logo'
						fetchPriority='high'
						width={208}
						height={30}
						className='w-52 h-7.5 md:h-auto'
						style={{ paddingLeft: '10px', paddingRight: '10px', opacity: 1, objectFit: 'contain' }}
					/>
					<div className='flex items-center gap-4'>
						<Link to='/about/umumiy-malumot' className='hidden md:block text-[14px] text-white' style={{ textDecoration: 'none' }}>Tizimga kirish</Link>
						<div className="hidden lg:block w-[1px] h-[22px] bg-white/40" />
						<button
							onClick={toggleMenu}
							className='flex items-center justify-center gap-2 rounded-[10px]
							bg-gradient-to-b from-[#3E8BE6] to-[#2B6FC4]
							border border-[#5FA2F0] text-white
							w-10 h-10 md:w-auto md:h-auto md:px-4 md:py-2'
						>
							<img src={menuIcon} alt='Menu' width={16} />
							<span className='hidden md:inline'>Meni</span>
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
				{/* LEFT OVERLAY — faqat desktop */}
				<div
					onClick={closeMenu}
					className={`absolute left-0 top-0 h-full hidden md:block w-[35%]
					bg-[rgba(39,45,59,0.2)]
					backdrop-blur-[10px]
					transition-all duration-500
					${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
				/>

				{/* RIGHT PANEL — mobile: full width, desktop: 65% */}
				<div
					className={`absolute right-0 top-0 h-screen w-full md:w-[65%]
					bg-[rgba(14,18,27,1)]
					transition-transform duration-500
					flex flex-col justify-between overflow-y-auto
					${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
				>
					{/* MOBILE HEADER: Menu + X bitta qatorda */}
					<div className='flex md:hidden items-center justify-between px-[8%] pt-6 pb-2'>
						<span
							style={{
								fontFamily: 'var(--font-display)',
								fontWeight: 500,
								fontSize: '24px',
								lineHeight: '32px',
								letterSpacing: '-0.02em',
								color: '#fff',
							}}
						>
							Menu
						</span>
						<button onClick={closeMenu} className='text-white text-2xl leading-none'>
							✕
						</button>
					</div>

					{/* DESKTOP CLOSE BUTTON */}
					<button
						onClick={closeMenu}
						className='hidden md:block absolute top-10 right-10 text-white text-2xl z-10'
					>
						✕
					</button>

					{/* MAIN CONTENT */}
					<div className='flex-1 flex items-start md:items-center px-[8%] pt-4 md:pt-[10px]'>
						<div className='flex flex-col md:flex-row md:gap-[80px] w-full'>

							{/* Menu ro'yxati */}
							<div className='md:min-w-[220px]'>
								{/* Desktop "Menu" label */}
								<p className='hidden md:block text-white mb-[20px] font-inter font-medium text-[16px] tracking-wide'>
									Menu
								</p>
								<ul className='space-y-[12px]'>
									{Object.entries(menuConfig).map(([key, item]) => (
										<li key={key}>
											<div
												onClick={() => {
													setActiveMenu(key)
													setActiveLinkIndex(null)
												}}
												className={`text-[28px] md:text-[32px] font-inter font-semibold cursor-pointer transition-colors duration-200 ${
													activeMenu === key
														? 'text-cyan-300'
														: 'text-[rgba(90,98,117,1)] hover:text-white'
												}`}
											>
												{item.title}
											</div>

											{/* Mobile: active bo'lganda ichki bo'limlar inline */}
											{activeMenu === key && (
												<ul className='md:hidden mt-[12px] mb-[4px] space-y-[10px] pl-[2px]'>
													{item.links.map((link, i) => (
														<li
															key={i}
															onClick={() => setActiveLinkIndex(i)}
															style={{
																color: activeLinkIndex === i ? 'white' : 'rgba(90,98,117,1)',
															}}
															className='cursor-pointer text-[14px] font-inter hover:text-white transition-colors duration-200'
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
											)}
										</li>
									))}
								</ul>
							</div>

							{/* Desktop: alohida o'ng ustun */}
							<div className='hidden md:block flex-1'>
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
												color: activeLinkIndex === i ? 'white' : 'rgba(90,98,117,1)',
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
					<div className='px-[8%] text-[14px] font-inter border-t border-white/10 pt-[24px] pb-[40px] md:pb-[60px]'>
						{/* Mobile: vertikal stack */}
						<div className='flex flex-col gap-[18px] md:hidden'>
							<div>
								<p className='mb-1 text-[rgba(138,145,163,1)]'>Telefon raqam</p>
								<p className='text-white'>+44 207 112 82 85</p>
							</div>
							<div>
								<p className='mb-1 text-[rgba(138,145,163,1)]'>Elektron pochta</p>
								<p className='text-white'>hello@lecalc.io</p>
							</div>
							<div>
								<p className='mb-1 text-[rgba(138,145,163,1)]'>Manzil</p>
								<p className='text-white'>508 Bridle Avenue Newnan, GA 30263</p>
							</div>
							<div>
								<div className='flex gap-4 mt-1'>
									<SocialLinkedin />
									<SocialX />
									<SocialFacebook />
									<SocialInstagram />
								</div>
							</div>
						</div>

						{/* Desktop: gorizontal */}
						<div className='hidden md:flex justify-between items-start'>
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
									<SocialLinkedin />
									<SocialX />
									<SocialFacebook />
									<SocialInstagram />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default memo(Navbar)