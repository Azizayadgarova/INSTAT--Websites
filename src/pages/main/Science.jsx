import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Link, NavLink, useOutlet } from 'react-router-dom'

import ShareLinks from '@/components/shared/ShareLinks'

const INFO_LINKS = [
	{
		label: 'Ilmiy tadqiqot',
		path: '/science/ilmiy-tadqiqot',
	},
	{
		label: "Oliy ta'lim",
		path: '/science/oliy-talim',
	},
]

const NavItem = ({ link }) => {
	const [hovered, setHovered] = useState(false)

	return (
		<NavLink
			to={link.path}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={{ textDecoration: 'none', display: 'block' }}
		>
			{({ isActive }) => (
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<div
						style={{
							width: '4px',
							height: '40px',
							borderRadius: isActive ? '999px' : '0',
							background: isActive
								? 'rgba(74, 144, 226, 1)'
								: 'rgba(34, 37, 48, 1)',
							flexShrink: 0,
						}}
					/>

					<div
						style={{
							marginLeft: '8px',
							padding: '8px 12px',
							borderRadius: '4px',
							background:
								hovered && !isActive ? 'rgba(var(--bg-rgb),1)' : 'transparent',
							color: isActive ? 'rgba(var(--cyan-rgb),1)' : '#fff',
							fontFamily: 'Inter Display, sans-serif',
							fontWeight: isActive ? 600 : 500,
							fontSize: '16px',
							lineHeight: '24px',
							letterSpacing: '-0.02em',
							width: '100%',
							transition: '0.2s',
						}}
					>
						{link.label}
					</div>
				</div>
			)}
		</NavLink>
	)
}

const Science = () => {
    const {
        t
    } = useTranslation();

    const outlet = useOutlet()

    return (
        <div
			style={{
				background: 'rgba(var(--card-rgb),1)',
				minHeight: '100vh',
			}}
		>
            <div className='mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-8 md:flex-row md:gap-0 md:px-[60px] lg:px-[130px]'>
				<aside
					className='w-full flex-shrink-0 md:sticky md:top-20 md:h-[calc(100vh-80px)] md:w-[320px] lg:w-[365px]'
					style={{ background: 'rgba(var(--card-rgb),1)' }}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							height: '100%',
							overflowY: 'auto',
							paddingTop: '35px',
							paddingBottom: '40px',
							boxSizing: 'border-box',
						}}
					>
						<div>
							<Link
								to='/'
								className='w-[88px] h-[40px] flex items-center justify-center gap-2 rounded-[10px] px-[10px] mb-9 text-white no-underline text-[14px] font-medium bg-[rgba(var(--blue-rgb),0.05)] backdrop-blur-[16px] shadow-[inset_0_2px_6px_rgba(255,255,255,0.25),inset_0_-2px_4px_rgba(var(--bg-rgb),0.3),0_16px_24px_-8px_rgba(var(--bg-rgb),0.1),0_0_0_1px_rgba(255,255,255,0.08)] hover:text-white hover:scale-[1.02] transition-all duration-300'
							>
								<svg width='18' height='18' viewBox='0 0 16 16' fill='none'>
									<path
										d='M10 12L6 8L10 4'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>

								<span>{t("pages.science.ortga")}</span>
							</Link>
						</div>

						<nav
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: 0,
								alignSelf: 'flex-start',
								width: '100%',
							}}
						>
							{INFO_LINKS.map(link => (
								<NavItem key={link.path} link={link} />
							))}
						</nav>

						<ShareLinks label={t("pages.science.share_this_blog")} />
					</div>
				</aside>

				<main className='min-w-0 flex-1 pb-[60px] md:pl-[30px] md:pr-[60px]'>
					{outlet}
				</main>
			</div>
        </div>
    );
}

export default Science
