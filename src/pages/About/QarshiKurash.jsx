import { useTranslation } from 'react-i18next'
import AsyncBoundary from '@/components/shared/AsyncBoundary'
import RichContent from '@/components/shared/RichContent'
import Seo from '@/components/shared/Seo'
import { SkeletonText } from '@/components/shared/Skeleton'
import { useSiteData } from '@/hooks/useSiteData'
import { pickLang, pickPath } from '@/utils/siteContent'

const Person = ({ role, name }) =>
	name ? (
		<div style={{ background: 'rgba(var(--card-rgb),1)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 14, padding: '18px 22px' }}>
			<p style={{ color: 'rgba(var(--muted-rgb),1)', fontSize: 13, margin: '0 0 6px' }}>{role}</p>
			<p style={{ color: '#fff', fontSize: 16, fontWeight: 500, margin: 0, lineHeight: 1.5 }}>{name}</p>
		</div>
	) : null

const QarshiKurash = () => {
	const { t, i18n } = useTranslation()
	const lang = i18n.resolvedLanguage ?? 'uz'
	const { data: kv, loading, error, retry } = useSiteData(d => d.byModuleKey.corruption ?? {})

	const val = key => pickLang(kv?.[key], lang)
	const attachment = pickPath(kv?.corruption_phone)

	return (
		<section>
			<Seo title={t('menu.about.qarshi-kurash')} />
			<AsyncBoundary loading={loading} error={error} onRetry={retry}
				isEmpty={!kv || Object.keys(kv).length === 0} skeleton={<SkeletonText lines={6} />}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
					<Person role={kv?.corruption_chairman?.label} name={val('corruption_chairman')} />
					<Person role={kv?.corruption_deputy_chairman?.label} name={val('corruption_deputy_chairman')} />
					<Person role={kv?.corruption_secretary?.label} name={val('corruption_secretary')} />
				</div>
				{val('corruption_tasks') && (
					<>
						<h2 style={{ color: '#fff', fontSize: 20, fontWeight: 600, marginBottom: 12 }}>
							{kv?.corruption_tasks?.label}
						</h2>
						<RichContent html={val('corruption_tasks')} />
					</>
				)}
				{attachment && (
					<img src={attachment} alt={kv?.corruption_phone?.label ?? ''} loading='lazy' decoding='async'
						style={{ maxWidth: '100%', borderRadius: 12, marginTop: 24 }} />
				)}
			</AsyncBoundary>
		</section>
	)
}
export default QarshiKurash
