import { useTranslation } from 'react-i18next'
import { memo, useEffect } from 'react'
import logoImg from '@/assets/icons/InstatIcon.png'
import menuIcon from '@/assets/menu-line.png'
import { useContacts } from '../hooks/useContacts'
import { useSocialLinks } from '../hooks/useSocialLinks'
import { useMenu } from '../hooks/useMenu'
import { useExternalMenuLink } from '../hooks/useExternalMenuLink'
import { useMenuNav } from '../hooks/useMenuNav'
import { useMenuState } from '../context/MenuContext'
import LanguageSwitcher from './shared/LanguageSwitcher'
import MenuLink from './shared/MenuLink'
import useSectionText from "@/hooks/useSectionText.js";
import { openCabinet } from '@/utils/cabinet'

const Navbar = () => {
	const contacts = useContacts()
	const socials = useSocialLinks()
    const {
        t
    } = useTranslation();

    const menuConfig = useMenu()
    const externalHref = useExternalMenuLink()

    // Ochiq/yopiq holat kontekstda — sahifadagi "Ortga" tugmasi ham menyuni ochadi
    const { isOpen, toggle: toggleMenu, close: closeMenu } = useMenuState()
    const { activeMenu, pickMenu, activeLinkIndex, setActiveLinkIndex, current, isCurrentLink } = useMenuNav(menuConfig, isOpen)
	const st = useSectionText('all')

    useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : ''
	}, [isOpen])

	function handleLogin()
	{
		openCabinet()
	}


	return (
        <>
            {/* NAVBAR */}
            {/* z-1000: sahifa kontentida zIndex 999 gacha qatlamlar bor (jurnal
                kartochkalari, filtr dropdown'lari) — navbar ularning hammasidan
                tepada turishi kerak. 9990+ esa global overlay'lar (intro,
                scroll progress, kursor) uchun bo'sh qoladi. */}
            <nav className='fixed w-full z-[1000] bg-[rgba(18,14,27,0.2)] backdrop-blur-[40px]'>
				<div className='max-w-[1440px] mx-auto flex items-center justify-between py-[20px] px-5 md:px-[100px]'>
					<img
						src={logoImg}
						alt='INSTAT'
						fetchpriority='high'
						width={208}
						height={30}
						className='w-52 h-7.5 md:h-auto'
						style={{ paddingLeft: '10px', paddingRight: '10px', opacity: 1, objectFit: 'contain' }} decoding='async' />
					<div className='flex items-center gap-4'>

						<LanguageSwitcher compact />
						<div  						onClick={handleLogin}
													className='hidden md:block text-[14px] text-white' style={{ textDecoration: 'none' }}>{t("components.navbar.tizimga_kirish")}</div>
						<div className="hidden lg:block w-[1px] h-[22px] bg-white/40" />
						<button
							onClick={toggleMenu}
							className='flex items-center justify-center gap-2 rounded-[10px]
							bg-gradient-to-b from-[#3E8BE6] to-[#2B6FC4]
							border border-[#5FA2F0] text-white
							w-10 h-10 md:w-auto md:h-auto md:px-4 md:py-2'
						>
							<img src={menuIcon} alt={t('components.navbar.menu')} width={16} loading='lazy' decoding='async' />
							<span className='hidden md:inline'>{t("components.navbar.menyu")}</span>
						</button>
					</div>
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
												onClick={() => pickMenu(key)}
												className={`text-[28px] md:text-[32px] font-inter font-semibold cursor-pointer transition-colors duration-200 ${
													activeMenu === key
														? 'text-cyan-300'
														: 'text-[rgba(90,98,117,1)] hover:text-white'
												}`}
											>
												{item.title}
												{/* Ochiq sahifa shu bo'limda, lekin boshqa bo'lim ko'rilayotgan bo'lsa — belgi */}
												{current?.section === key && activeMenu !== key && (
													<span aria-hidden='true' className='ml-3 inline-block h-[8px] w-[8px] rounded-full bg-cyan-300 align-middle' />
												)}
											</div>

											{/* Mobile: active bo'lganda ichki bo'limlar inline */}
											{activeMenu === key && (
												<ul className='md:hidden mt-[12px] mb-[4px] space-y-[10px] pl-[2px]'>
													{item.links.map((link, i) => (
														<li
															key={link.path}
															onClick={() => setActiveLinkIndex(i)}
															style={{
																color: activeLinkIndex === i || isCurrentLink(key, i) ? 'white' : 'rgba(90,98,117,1)',
															}}
															className={`cursor-pointer text-[14px] font-inter hover:text-white transition-colors duration-200 ${isCurrentLink(key, i) ? 'font-semibold' : ''}`}
														>
															<MenuLink
																href={externalHref(key, link.path)}
																to={`${menuConfig[activeMenu].base}/${link.path}`}
																onClick={closeMenu}
																aria-current={isCurrentLink(key, i) ? 'page' : undefined}
															>
																{isCurrentLink(key, i) && <span aria-hidden='true' className='mr-2 inline-block h-[6px] w-[6px] rounded-full bg-cyan-300 align-middle' />}
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
												color: activeLinkIndex === i || isCurrentLink(activeMenu, i) ? 'white' : 'rgba(90,98,117,1)',
											}}
											className={`cursor-pointer text-[15px] font-inter hover:text-white transition-colors duration-200 ${isCurrentLink(activeMenu, i) ? 'font-semibold' : ''}`}
										>
											<MenuLink
												href={externalHref(activeMenu, link.path)}
												to={`${menuConfig[activeMenu].base}/${link.path}`}
												onClick={closeMenu}
												aria-current={isCurrentLink(activeMenu, i) ? 'page' : undefined}
											>
												{isCurrentLink(activeMenu, i) && <span aria-hidden='true' className='mr-2 inline-block h-[6px] w-[6px] rounded-full bg-cyan-300 align-middle' />}
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
							{socials.length > 0 && (
							<div>
								<div className='flex gap-4 mt-1'>
										{socials.map(({ key, label, href, Icon }) => (
										<a key={key} href={href} target='_blank' rel='noopener noreferrer' aria-label={label} title={label} className='text-white hover:opacity-70 transition'>
											<Icon size={24} aria-hidden='true' />
										</a>
									))}
								</div>
							</div>
						)}
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
							{socials.length > 0 && (
							<div>
								<p className='mb-3 whitespace-nowrap text-[rgba(var(--muted-rgb),1)]'>{t("components.navbar.ijtimoiy_tarmoqlar")}</p>
								<div className='flex gap-4'>
									{socials.map(({ key, label, href, Icon }) => (
										<a key={key} href={href} target='_blank' rel='noopener noreferrer' aria-label={label} title={label} className='text-white hover:opacity-70 transition'>
											<Icon size={24} aria-hidden='true' />
										</a>
									))}
								</div>
							</div>
						)}
						</div>
					</div>
				</div>
			</div>
        </>
    );
}

export default memo(Navbar)