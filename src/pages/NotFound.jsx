import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Seo from '../components/shared/Seo'

const NotFound = () => {
	const { t } = useTranslation()

	return (
		<div
			className='flex min-h-screen flex-col items-center justify-center bg-[rgba(var(--bg-rgb),1)]'
			style={{ fontFamily: 'var(--font-inter)' }}
		>
			<Seo title='404' noindex />
			<p className='text-[120px] font-bold leading-none text-[rgba(var(--cyan-rgb),1)]' aria-hidden='true'>
				404
			</p>
			<h1 className='mt-4 text-[20px] text-[rgba(var(--text-rgb),1)]'>{t('error.notFound')}</h1>
			<Link
				to='/'
				className='mt-8 rounded-[10px] border border-[#5FA2F0] bg-gradient-to-b from-[#3E8BE6] to-[#2B6FC4] px-6 py-3 text-[16px] text-white'
			>
				{t('common.home')}
			</Link>
		</div>
	)
}

export default NotFound
