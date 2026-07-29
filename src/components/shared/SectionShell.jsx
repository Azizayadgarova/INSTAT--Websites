import { Link, NavLink, useOutlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Seo from './Seo'

/**
 * Bo'lim sahifalari uchun umumiy qobiq: chapda sidebar, o'ngda <Outlet />.
 * Science / MediaServise / InfoResurses'da takrorlangan markup shu yerda birlashtirilgan.
 */
const SectionShell = ({ title, description, links = [], children }) => {
	const outlet = useOutlet()
	const { t } = useTranslation()

	return (
		<div style={{ background: 'rgba(var(--card-rgb),1)', minHeight: '100vh' }}>
			<Seo title={title} description={description} />

			<div className='mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-8 md:flex-row md:gap-0 md:px-[60px] lg:px-[130px]'>
				<aside className='w-full flex-shrink-0 md:sticky md:top-20 md:h-[calc(100vh-80px)] md:w-[320px] lg:w-[365px]'>
					<div className='flex h-full flex-col overflow-y-auto pb-6 md:pt-[35px] md:pb-10'>
						<Link
							to='/'
							className='mb-6 flex h-10 w-[88px] items-center justify-center gap-2 rounded-[10px] px-[10px] text-[14px] font-medium text-white no-underline transition-all duration-300 md:mb-9'
							style={{
								background: 'rgba(var(--blue-rgb),0.05)',
								backdropFilter: 'blur(16px)',
								boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.25), 0 0 0 1px rgba(255,255,255,0.08)',
							}}
						>
							<svg width='18' height='18' viewBox='0 0 16 16' fill='none' aria-hidden='true'>
								<path d='M10 12L6 8L10 4' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
							</svg>
							<span>{t('common.back')}</span>
						</Link>

						<h1 className='mb-4 px-1 text-[22px] font-semibold text-white'>{title}</h1>

						<nav aria-label={title} className='flex w-full flex-col self-start'>
							{links.map(link => (
								<NavLink key={link.path} to={link.path} style={{ textDecoration: 'none', display: 'block' }}>
									{({ isActive }) => (
										<div className='flex items-stretch'>
											<span
												aria-hidden='true'
												style={{
													width: 4,
													minHeight: 40,
													flexShrink: 0,
													alignSelf: 'stretch',
													borderRadius: isActive ? 999 : 0,
													background: isActive ? 'rgba(74,144,226,1)' : 'rgba(34,37,48,1)',
												}}
											/>
											<span
												className='ml-2 w-full rounded px-3 py-2 text-[16px] leading-6 transition-colors duration-200'
												style={{
													color: isActive ? 'rgba(var(--cyan-rgb),1)' : '#fff',
													fontWeight: isActive ? 600 : 500,
													letterSpacing: '-0.02em',
												}}
											>
												{link.name}
											</span>
										</div>
									)}
								</NavLink>
							))}
						</nav>
					</div>
				</aside>

				<main className='min-w-0 flex-1 pb-[60px] md:pl-[30px] md:pr-[60px]'>
					{outlet ?? children}
				</main>
			</div>
		</div>
	)
}

export default SectionShell
