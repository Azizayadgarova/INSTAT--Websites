import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoImg from '@/assets/icons/InstatIcon.png'
import userIcon from '@/assets/icons/user-line.png'

const NAV_LINKS = [
	{ label: "Onlayn ta'lim",       path: '/platform/onlayn-talim' },
	{ label: 'Raqamli kutubxona',   path: '/platform/raqamli-kutubxona' },
	{ label: 'Elektron jurnal',     path: '/platform/elektron-jurnal' },
	{ label: "Mikro ma'lumotlar",   path: '/platform/mikro-malumotlar' },
	{ label: "Bo'sh ish o'rinlari", path: '/platform/bosh-ish-orinlari' },
]

const Navbar2 = () => {
	const { pathname } = useLocation()

	return (
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
			<div
				style={{
					maxWidth: '1440px',
					margin: '0 auto',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '20px 100px',
				}}
			>
				{/* Logo */}
				<Link to='/'>
					<img src={logoImg} alt='INSTAT' />
				</Link>

				{/* Pill nav — gradient border */}
				<div
					style={{
						background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)',
						borderRadius: '999px',
						padding: '1px',
					}}
				>
					<div
						style={{
							background: 'rgba(14,18,27,0.85)',
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
											{/* Gradient text */}
											<span
												style={{
													background: 'linear-gradient(180deg, #FFFFFF 0%, #00E6FC 20%, #00E6FC 100%)',
													WebkitBackgroundClip: 'text',
													WebkitTextFillColor: 'transparent',
													backgroundClip: 'text',
													fontFamily: 'Inter, sans-serif',
													fontWeight: 600,
													fontSize: '15px',
													lineHeight: '20px',
													letterSpacing: '-0.02em',
													whiteSpace: 'nowrap',
												}}
											>
												{link.label}
											</span>
											{/* Underline */}
											<span
												style={{
													position: 'absolute',
													bottom: -3,
													left: 0,
													right: 0,
													height: '1.5px',
													background: '#00E6FC',
													borderRadius: '1px',
												}}
											/>
										</span>
									) : (
										<span
											style={{
												color: 'rgba(255,255,255,0.8)',
												fontFamily: 'Inter, sans-serif',
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

				{/* Button — 1-layout menu button stili */}
				<button
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
						padding: '8px 16px',
						borderRadius: '10px',
						background: 'linear-gradient(180deg, #3E8BE6 0%, #2B6FC4 100%)',
						border: '1px solid #5FA2F0',
						color: '#fff',
						fontFamily: 'Inter, sans-serif',
						fontSize: '14px',
						fontWeight: 500,
						cursor: 'none',
					}}
				>
					<img src={userIcon} alt='user' width={16} height={16} />
					Shaxsiy kabinet
				</button>
			</div>
		</nav>
	)
}

export default memo(Navbar2)
