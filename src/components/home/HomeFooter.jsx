import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import logoImg from '@/assets/icons/InstatIcon.png'
import { useContacts } from '@/hooks/useContacts'
import useSectionText from '@/hooks/useSectionText'
import { useSocialLinks } from '@/hooks/useSocialLinks'
import { useInView } from './hooks'

const SITES = [
	{ to: '/platform/onlayn-talim', key: 'd1' },
	{ to: '/platform/raqamli-kutubxona', key: 'd3' },
	{ to: '/platform/elektron-jurnal', key: 'd4' },
	{ to: '/platform/mikro-malumotlar', key: 'd2' },
]

/** Bosh sahifa footer'i: harakatlanuvchi yozuv + katta kontaktlar. */
export default function HomeFooter() {
	const { t } = useTranslation()
	const contacts = useContacts()
	const st = useSectionText('all')
	const socials = useSocialLinks()
	const [ref, inView] = useInView({ threshold: 0.15 })

	const phone = st('phone_number', contacts.phone)
	const email = st('email', contacts.email)
	const address = st('address', '') || contacts.address.full
	const toTop = e => {
		e.preventDefault()
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<footer className={`ft${inView ? ' in' : ''}`} id='ftr' ref={ref}>
			<div className='ft-mq' aria-hidden='true'>
				<div className='tr' id='ftMq'>
					{[0, 1, 2, 3].map(i => (
						<span key={i}>{i % 2 ? t('home.ft_mq') : 'INSTAT'}</span>
					))}
				</div>
			</div>
			<div className='ft-in'>
				<div className='ft-main'>
					<div className='ft-big'>
						<span className='ft-mono'>{t('home.ft_call')}</span>
						<a href={contacts.phoneHref}>{phone}</a>
						<span className='ft-mono'>{t('home.ft_write')}</span>
						<a href={contacts.emailHref}>{email}</a>
						<span className='ft-mono'>{t('home.ct_adr')}</span>
						<p>{address}</p>
					</div>
					<div className='ft-cols'>
						<div className='ft-lnk'>
							<h4 className='ft-mono'>{t('home.ft_s')}</h4>
							{SITES.map(s => (
								<Link key={s.to} to={s.to}>{t(`home.${s.key}`)}</Link>
							))}
						</div>
						<div className='ft-lnk'>
							<h4 className='ft-mono'>{t('home.ft_l')}</h4>
							<a href='#ftr' onClick={e => e.preventDefault()}>{t('home.ft_p')}</a>
							<a href='#ftr' onClick={e => e.preventDefault()}>{t('home.ft_t')}</a>
							<a href='#ftr' onClick={e => e.preventDefault()}>{t('home.ft_c')}</a>
						</div>
						{socials.length > 0 && (
							<div style={{ gridColumn: '1/-1' }}>
								<h4 className='ft-mono'>{t('home.ft_sn')}</h4>
								<div className='ft-soc'>
									{socials.map(({ key, label, href }) => (
										<a key={key} href={href} target='_blank' rel='noopener noreferrer'>{label}</a>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
				<div className='ft-bot'>
					<span className='l'>
						<img className='logo-img' src={logoImg} alt='INSTAT' />
						<span>{t('home.ft_cp')}</span>
					</span>
					<a href='#hero' onClick={toTop}>
						<span>{t('home.ft_top')}</span> ↑
					</a>
				</div>
			</div>
		</footer>
	)
}
