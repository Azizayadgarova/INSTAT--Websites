import { useTranslation } from 'react-i18next'
import { useSiteData } from '@/hooks/useSiteData'
import { pickLink } from '@/utils/siteContent'
import AsyncBoundary from './AsyncBoundary'
import Seo from './Seo'
import Skeleton from './Skeleton'

const LinkResourcePage = ({ itemKey, title, showTitle = false }) => {
	const { t, i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const { data: item, loading, error, retry } = useSiteData(
		d => d.byModuleKey.info_resource?.[itemKey] ?? null,
	)
	const { href, text } = pickLink(item, lang)

	return (
		<section>
			<Seo title={title} />
			{showTitle && <h1 className='mb-4 text-[26px] font-semibold text-white md:text-[32px]'>{title}</h1>}
			<AsyncBoundary loading={loading} error={error} onRetry={retry} isEmpty={!href}
				skeleton={<Skeleton height={56} radius={12} />}>
				<p style={{ color: 'rgba(var(--text-rgb),1)', fontSize: 16, marginBottom: 24, lineHeight: 1.7 }}>
					{(text || title || '').replace(/\s+/g, ' ').trim()}
				</p>
				<a href={href} target='_blank' rel='noopener noreferrer'
					style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 26px', borderRadius: 12, background: 'linear-gradient(180deg,#3E8BE6,#2B6FC4)', color: '#fff', textDecoration: 'none', fontSize: 16, fontWeight: 500 }}>
					{t('common.openResource', 'Resursga o‘tish')}
					<svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
						<path d='M7 17L17 7M17 7H8M17 7v9' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
					</svg>
				</a>
			</AsyncBoundary>
		</section>
	)
}
export default LinkResourcePage
