import { useTranslation } from 'react-i18next'
import { memo, useState, useCallback, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoImg from '@/assets/icons/InstatIcon.png'
import userIcon from '@/assets/icons/user-line.png'
import menuIcon from '@/assets/menu-line.png'
import LanguageSwitcher from "@/components/shared/LanguageSwitcher.jsx";

const NAV_LINKS = [
	{ label: "Onlayn ta'lim",       path: '/platform/onlayn-talim' },
	{ label: 'Raqamli kutubxona',   path: '/platform/raqamli-kutubxona' },
	{ label: 'Elektron jurnal',     path: '/platform/elektron-jurnal' },
	{ label: "Mikro ma'lumotlar",   path: '/platform/mikro-malumotlar' },
	{ label: "Bo'sh ish o'rinlari", path: '/platform/bosh-ish-orinlari' },
]

function handleLogin()
{
	window.open(import.meta.env.VITE_API_CABINET_URL, '_blank')
}

const Navbar2 = () => {
    const {
        t
    } = useTranslation();

    const { pathname } = useLocation()
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = useCallback(() => setIsOpen(p => !p), [])
    const closeMenu = useCallback(() => setIsOpen(false), [])

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
					zIndex: 50,
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

					{/* Mobile: hamburger tugmasi */}
					<button
						onClick={toggleMenu}
						className='flex md:hidden items-center justify-center w-14 h-14 rounded-[10px]'
						style={{
							background: 'linear-gradient(180deg, #3E8BE6 0%, #2B6FC4 100%)',
							border: '1px solid #5FA2F0',
							cursor: 'pointer',
							flexShrink: 0,
						}}
					>
						<img src={menuIcon} alt='Menu' width={22} loading='lazy' decoding='async' />
					</button>
				</div>
			</nav>
            {/* Mobile menu overlay */}
            <div
				className={`fixed inset-0 transition-all duration-500 md:hidden ${
					isOpen ? 'visible opacity-100' : 'invisible opacity-0'
				}`}
				style={{ zIndex: 999 }}
			>
				{/* Panel */}
				<div
					className={`absolute right-0 top-0 h-screen w-full bg-[rgba(var(--bg-rgb),1)] transition-transform duration-500 flex flex-col ${
						isOpen ? 'translate-x-0' : 'translate-x-full'
					}`}
				>
					{/* Header */}
					<div className='flex items-center justify-between px-[8%] pt-6 pb-4 border-b border-white/10'>
						<span
							style={{
								fontFamily: 'var(--font-display)',
								fontWeight: 500,
								fontSize: '24px',
								lineHeight: '32px',
								letterSpacing: '-0.02em',
								color: '#fff',
							}}
						>{t("components.navbar2.menu")}</span>
						<button onClick={closeMenu} className='text-white text-2xl leading-none'>
							✕
						</button>
					</div>

					{/* Nav links */}
					<ul className='flex flex-col px-[8%] pt-6 gap-5'>
						{NAV_LINKS.map(link => {
							const isActive = pathname === link.path || pathname.startsWith(link.path + '/')
							return (
								<li key={link.path}>
									<Link
										to={link.path}
										onClick={closeMenu}
										style={{
											textDecoration: 'none',
											fontFamily: 'var(--font-display)',
											fontWeight: 600,
											fontSize: '28px',
											lineHeight: '36px',
											letterSpacing: '-0.02em',
											color: isActive ? 'rgba(var(--cyan-rgb),1)' : 'rgba(90,98,117,1)',
										}}
									>
										{link.label}
									</Link>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
        </>
    );
}

export default memo(Navbar2)
