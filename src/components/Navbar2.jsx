import { useTranslation } from 'react-i18next'
import { memo, useState, useCallback, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoImg from '@/assets/icons/InstatIcon.png'
import userIcon from '@/assets/icons/user-line.png'
import menuIcon from '@/assets/menu-line.png'
import LanguageSwitcher from "@/components/shared/LanguageSwitcher.jsx";
import useMenu from "@/hooks/useMenu.js";
import twitter from "@/assets/icons/social3.png";
import facebook from "@/assets/icons/facebook.png";
import instagram from "@/assets/icons/instaIcon.png";
import useSectionText from "@/hooks/useSectionText.js";
import useContacts from "@/hooks/useContacts.js";
import useExternalMenuLink from "@/hooks/useExternalMenuLink.js";
import MenuLink from "@/components/shared/MenuLink.jsx";
import { API_CABINET_URL } from '@/config/api'

const NAV_LINK_PATHS = [
	{ key: 'onlayn_talim',       path: '/platform/onlayn-talim' },
	{ key: 'raqamli_kutubxona',  path: '/platform/raqamli-kutubxona' },
	{ key: 'elektron_jurnal',    path: '/platform/elektron-jurnal' },
	{ key: 'mikro_malumotlar',   path: '/platform/mikro-malumotlar' },
]

function handleLogin()
{
	window.open(import.meta.env.VITE_API_CABINET_URL, '_blank')
}

const Navbar2 = () => {
    const {
        t
    } = useTranslation();
	const menuConfig = useMenu()
    const { pathname } = useLocation()
    const [isOpen, setIsOpen] = useState(false)
	const [activeMenu, setActiveMenu] = useState('axborot')
	const [activeLinkIndex, setActiveLinkIndex] = useState(null)
    const NAV_LINKS = NAV_LINK_PATHS.map(link => ({
		path: link.path,
		label: t(`components.navbar2.${link.key}`),
	}))
	const contacts = useContacts()
	const externalHref = useExternalMenuLink()

	const st = useSectionText('all')

    const closeMenu = useCallback(() => setIsOpen(false), [])
    const toggleMenu = useCallback(() => setIsOpen(!isOpen), [])

    useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : ''
		return () => { document.body.style.overflow = '' }
	}, [isOpen])

    return (
        <>
            <nav
				style={{
					position: 'fixed',
					width: '100%',
					// Sahifa kontentida zIndex 999 gacha qatlamlar bor (jurnal
					// kartochkalari, filtr dropdown'lari) — navbar ularning
					// hammasidan tepada turishi kerak. 9990+ global overlay'lar
					// (intro, scroll progress, kursor) uchun bo'sh qoladi.
					zIndex: 1000,
					backgroundColor: 'rgba(18,14,27,0.2)',
					backdropFilter: 'blur(40px)',
					WebkitBackdropFilter: 'blur(40px)',
				}}
			>
				<div className='max-w-400 mx-auto flex items-center justify-between py-5 px-5 md:px-25'>

					{/* Logo */}
					<Link to='/'>
						<img src={logoImg} alt='INSTAT' fetchpriority='high' width={208} height={30} className='w-52 h-7.5 md:h-auto' style={{ paddingLeft: '10px', paddingRight: '10px', opacity: 1, objectFit: 'contain' }} decoding='async' />
					</Link>

					{/* Pill nav — faqat desktop */}
					<div
						className='hidden md:block'
						style={{
							background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)',
							borderRadius: '999px',
							padding: '1px',
						}}
					>
						<div
							style={{
								background: 'rgba(var(--bg-rgb),0.85)',
								borderRadius: '999px',
								height: '44px',
								paddingTop: '12px',
								paddingBottom: '12px',
								paddingLeft: '22px',
								paddingRight: '22px',
								display: 'flex',
								alignItems: 'center',
								gap: '30px',
								boxSizing: 'border-box',
							}}
						>
							{NAV_LINKS.map(link => {
								const isActive = pathname === link.path || pathname.startsWith(link.path + '/')
								return (
									<Link
										key={link.path}
										to={link.path}
										style={{ textDecoration: 'none', position: 'relative' }}
									>
										{isActive ? (
											<span style={{ position: 'relative', display: 'inline-block' }}>
												<span
													style={{
														background: 'linear-gradient(180deg, #FFFFFF 0%, #00E6FC 20%, #00E6FC 100%)',
														WebkitBackgroundClip: 'text',
														WebkitTextFillColor: 'transparent',
														backgroundClip: 'text',
														fontFamily: 'var(--font-inter)',
														fontWeight: 600,
														fontSize: '15px',
														lineHeight: '20px',
														letterSpacing: '-0.02em',
														whiteSpace: 'nowrap',
													}}
												>
													{link.label}
												</span>
												<span
													style={{
														position: 'absolute',
														bottom: -3,
														left: 0,
														right: 0,
														height: '1.5px',
														background: 'var(--color-cyan)',
														borderRadius: '1px',
													}}
												/>
											</span>
										) : (
											<span
												style={{
													color: 'rgba(255,255,255,0.8)',
													fontFamily: 'var(--font-inter)',
													fontWeight: 500,
													fontSize: '15px',
													lineHeight: '20px',
													letterSpacing: '-0.02em',
													whiteSpace: 'nowrap',
												}}
											>
												{link.label}
											</span>
										)}
									</Link>
								)
							})}
						</div>
					</div>
					<div
						className='mx-5'>
					<LanguageSwitcher className='mx-4' compact />

					</div>

					{/* Desktop: Shaxsiy kabinet tugmasi */}
					<button
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: '10px',
							background: 'linear-gradient(180deg, #3E8BE6 0%, #2B6FC4 100%)',
							border: '1px solid #5FA2F0',
							color: '#fff',
							fontFamily: 'var(--font-inter)',
							fontSize: '14px',
							fontWeight: 500,
							cursor: 'pointer',
						}}
						onClick={handleLogin}
						className='hidden md:flex gap-2 px-4 py-2'
					>
						<img src={userIcon} alt='user' width={16} height={16} loading='lazy' decoding='async' />
						<span>{t("components.navbar2.shaxsiy_kabinet")}</span>
					</button>
					<button
						onClick={toggleMenu}
						className='flex items-center justify-center gap-2 rounded-[10px]
							bg-gradient-to-b from-[#3E8BE6] to-[#2B6FC4]
							border border-[#5FA2F0] text-white
							w-10 h-10 md:w-auto md:h-auto md:px-4 md:py-2'
					>
						<img src={menuIcon} alt='Menu' width={16} loading='lazy' decoding='async' />
						<span className='hidden md:inline'>{t("components.navbar.menyu")}</span>
					</button>
					{/* Mobile: hamburger tugmasi */}
					{/*<button*/}
					{/*	onClick={toggleMenu}*/}
					{/*	className='flex md:hidden items-center justify-center w-14 h-14 rounded-[10px]'*/}
					{/*	style={{*/}
					{/*		background: 'linear-gradient(180deg, #3E8BE6 0%, #2B6FC4 100%)',*/}
					{/*		border: '1px solid #5FA2F0',*/}
					{/*		cursor: 'pointer',*/}
					{/*		flexShrink: 0,*/}
					{/*	}}*/}
					{/*>*/}
					{/*	<img src={menuIcon} alt='Menu' width={22} loading='lazy' decoding='async' />*/}
					{/*</button>*/}
				</div>
			</nav>
			{/* MENU OVERLAY */}
			<div
				className={`fixed inset-0 z-[1001] transition-all duration-500 ${
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
					bg-[rgba(var(--bg-rgb),1)]
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
						>{t("components.navbar.menu")}</span>
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
								<p className='hidden md:block text-white mb-[20px] font-inter font-medium text-[16px] tracking-wide'>{t("components.navbar.menu")}</p>
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
															key={link.path}
															onClick={() => setActiveLinkIndex(i)}
															style={{
																color: activeLinkIndex === i ? 'white' : 'rgba(90,98,117,1)',
															}}
															className='cursor-pointer text-[14px] font-inter hover:text-white transition-colors duration-200'
														>
															<MenuLink
																href={externalHref(key, link.path)}
																to={`${menuConfig[activeMenu].base}/${link.path}`}
																onClick={closeMenu}
															>
																{link.name}
															</MenuLink>
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
								<p className='text-white font-medium mb-[20px] font-inter text-[16px]'>{t("components.navbar.ichki_bolimlar")}</p>
								<ul className='space-y-[14px]'>
									{menuConfig[activeMenu]?.links.map((link, i) => (
										<li
											key={link.path}
											onClick={() => setActiveLinkIndex(i)}
											style={{
												transform: isOpen ? 'translateX(0)' : 'translateX(50px)',
												opacity: isOpen ? 1 : 0,
												transition: `all 0.3s ease ${i * 0.05}s`,
												color: activeLinkIndex === i ? 'white' : 'rgba(90,98,117,1)',
											}}
											className='cursor-pointer text-[15px] font-inter hover:text-white transition-colors duration-200'
										>
											<MenuLink
												href={externalHref(activeMenu, link.path)}
												to={`${menuConfig[activeMenu].base}/${link.path}`}
												onClick={closeMenu}
											>
												{link.name}
											</MenuLink>
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
								<p className='mb-1 text-[rgba(var(--muted-rgb),1)]'>{t("components.navbar.telefon_raqam")}</p>
								<a href={st('phone_number', contacts.phoneHref)} className='text-white hover:underline'>{contacts.phone}</a>
							</div>
							<div>
								<p className='mb-1 text-[rgba(var(--muted-rgb),1)]'>{t("components.navbar.elektron_pochta")}</p>
								<a href={st('email', contacts.emailHref)} className='text-white hover:underline'>{contacts.email}</a>
							</div>
							<div>
								<p className='mb-1 text-[rgba(var(--muted-rgb),1)]'>{t("components.navbar.manzil")}</p>
								<p className='text-white'>{contacts.address.full}</p>
							</div>
							<div>
								<div className='flex gap-4 mt-1'>
									{[
										{ src: twitter, label: 'X (Twitter)', href: contacts.social.twitter },
										{ src: facebook, label: 'Facebook', href: contacts.social.facebook },
										{ src: instagram, label: 'Instagram', href: contacts.social.instagram },
									].map(({ src, label, href }) => (
										<a key={label} href={href} target='_blank' rel='noopener noreferrer' aria-label={label}>
											<img src={src} alt={label} className='w-6 h-6' loading='lazy' decoding='async' />
										</a>
									))}
								</div>
							</div>
						</div>

						{/* Desktop: gorizontal */}
						<div className='hidden md:grid grid-cols-[auto_auto_minmax(0,1fr)_auto] gap-x-12 items-start'>
							<div>
								<p className='mb-3 whitespace-nowrap text-[rgba(var(--muted-rgb),1)]'>{t("components.navbar.telefon_raqam")}</p>
								<a href={st('phone_number', contacts.phoneHref)} className='whitespace-nowrap text-white hover:underline'>{st('phone_number', contacts.phoneHref)}</a>
							</div>
							<div>
								<p className='mb-3 whitespace-nowrap text-[rgba(var(--muted-rgb),1)]'>{t("components.navbar.elektron_pochta")}</p>
								<a href={st('email', contacts.emailHref)} className='whitespace-nowrap text-white hover:underline'>{contacts.email}</a>
							</div>
							<div>
								<p className='mb-3 whitespace-nowrap text-[rgba(var(--muted-rgb),1)]'>{t("components.navbar.manzil")}</p>
								<p className='max-w-[320px] text-white'>{st('address', "")}</p>
							</div>
							<div>
								<p className='mb-3 whitespace-nowrap text-[rgba(var(--muted-rgb),1)]'>{t("components.navbar.ijtimoiy_tarmoqlar")}</p>
								<div className='flex gap-4'>
									{[
										{ src: twitter, label: 'X (Twitter)', href: st('twitter', contacts.social.twitter) },
										{ src: facebook, label: 'Facebook', href:   st('facebook', contacts.social.facebook) },
										{ src: instagram, label: 'Instagram', href: st('instagram', contacts.social.instagram) },
									].map(({ src, label, href }) => (
										<a key={label} href={href} target='_blank' rel='noopener noreferrer' aria-label={label}>
											<img src={src} alt={label} className='w-6 h-6' loading='lazy' decoding='async' />
										</a>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
        </>
    );
}

export default memo(Navbar2)
