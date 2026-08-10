import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Link, NavLink, useOutlet } from 'react-router-dom'

import sIconInsta from '@/assets/Major Brand Logos [1.1] (1).png'
import sIconX from '@/assets/Major Brand Logos [1.1].png'
import sIconFb from '@/assets/Vector (14).png'
import sIconLn from '@/assets/Vector (15).png'

const INFO_LINKS = [
	{
		label: 'pages.science.ilmiy_tadqiqot',
		fallback: 'Ilmiy tadqiqot',
		path: '/science/ilmiy-tadqiqot',
	},
	{
		label: 'pages.science.oliy_talim',
		fallback: "Oliy ta'lim",
		path: '/science/oliy-talim',
	},
]

const NavItem = ({ link }) => {
	const { t } = useTranslation()
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
						{t(link.label, link.fallback)}
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

						<div
							style={{
								marginTop: '32px',
								paddingLeft: '6px',
							}}
						>
							<p
								style={{
									fontFamily: 'Inter Display, sans-serif',
									fontWeight: 400,
									fontSize: '16px',
									lineHeight: '28px',
									letterSpacing: '-0.02em',
									color: 'rgba(153,160,174,1)',
									marginBottom: '12px',
								}}
							>{t("pages.science.share_this_blog")}</p>

							<div
								style={{
									display: 'flex',
									gap: '25px',
									alignItems: 'center',
								}}
							>
								{[
									{
										src: sIconInsta,
										alt: 'Instagram',
									},
									{
										src: sIconX,
										alt: 'X',
									},
									{
										src: sIconFb,
										alt: 'Facebook',
									},
									{
										src: sIconLn,
										alt: 'LinkedIn',
									},
								].map(({ src, alt }) => (
									<div
										key={alt}
										style={{
											width: 24,
											height: 24,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
										}}
									>
										<img
											src={src}
											alt={alt}
											style={{
												width: '100%',
												height: '100%',
												objectFit: 'contain',
											}} loading='lazy' decoding='async' />
									</div>
								))}
							</div>
						</div>
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
