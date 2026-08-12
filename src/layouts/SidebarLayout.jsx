import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, useOutlet } from 'react-router-dom'

import SocialLinks from '@/components/shared/SocialLinks'

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
							width: 4,
							height: 40,
							borderRadius: isActive ? 999 : 0,
							background: isActive ? 'rgba(74,144,226,1)' : 'rgba(34,37,48,1)',
							flexShrink: 0,
						}}
					/>

					<div
						style={{
							marginLeft: 8,
							padding: '8px 12px',
							borderRadius: 4,
							background:
								hovered && !isActive ? 'rgba(var(--bg-rgb),1)' : 'transparent',
							color: isActive ? 'rgba(var(--cyan-rgb),1)' : '#fff',
							fontWeight: isActive ? 600 : 500,
							fontSize: 16,
							lineHeight: '24px',
							width: '100%',
							transition: '.2s',
						}}
					>
						{link.label}
					</div>
				</div>
			)}
		</NavLink>
	)
}

const SidebarLayout = ({ links }) => {
	const { t } = useTranslation()

	const outlet = useOutlet()

	return (
		<div
			style={{
				background: 'rgba(var(--card-rgb),1)',
				minHeight: '100vh',
			}}
		>
			<div
				className='max-w-[1440px] mx-auto px-5 md:px-[100px]'
				style={{
					display: 'flex',
				}}
			>
				<aside
					style={{
						width: 365,
						flexShrink: 0,
						position: 'sticky',
						top: 80,
						height: 'calc(100vh - 80px)',
						background: 'rgba(var(--card-rgb),1)',
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							height: '100%',
							overflowY: 'auto',
							paddingTop: 35,
							paddingBottom: 40,
						}}
					>
						<Link
							to='/'
							className='w-[88px] h-[40px] flex items-center justify-center gap-2 rounded-[10px] px-[10px] mb-9 text-white no-underline text-[14px] font-medium bg-[rgba(var(--blue-rgb),0.05)] backdrop-blur-[16px] shadow-[inset_0_2px_6px_rgba(255,255,255,0.25),inset_0_-2px_4px_rgba(var(--bg-rgb),0.3),0_16px_24px_-8px_rgba(var(--bg-rgb),0.1),0_0_0_1px_rgba(255,255,255,0.08)]'
						>
							{t('components.sidebarLayout.ortga')}
						</Link>

						<nav>
							{links.map(item => (
								<NavItem key={item.path} link={item} />
							))}
						</nav>

						<div
							style={{
								marginTop: 32,
								paddingLeft: 6,
							}}
						>
							<p
								style={{
									color: 'rgba(153,160,174,1)',
									marginBottom: 12,
								}}
							>
								{t('components.sidebarLayout.share_this_blog')}
							</p>

							<SocialLinks />
						</div>
					</div>
				</aside>

				<main
					style={{
						flex: 1,
						paddingLeft: 30,
						paddingRight: 60,
						paddingBottom: 60,
					}}
				>
					{outlet}
				</main>
			</div>
		</div>
	)
}

export default SidebarLayout
