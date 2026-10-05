import { useTranslation } from 'react-i18next'
import { siteEducationMaterialsApi } from '@/api/siteContent.api'
import AsyncBoundary from '@/components/shared/AsyncBoundary'
import Seo from '@/components/shared/Seo'
import { SkeletonText } from '@/components/shared/Skeleton'
import { useSiteList } from '@/hooks/useSiteList'
import { toEducationMaterial } from '@/utils/siteContent'

const FileLink = ({ url, label }) => (
	<a
		href={url}
		target='_blank'
		rel='noopener noreferrer'
		style={{
			display: 'inline-flex',
			alignItems: 'center',
			gap: 8,
			padding: '9px 16px',
			borderRadius: 10,
			border: '1px solid rgba(var(--blue-rgb),0.4)',
			background: 'rgba(var(--blue-rgb),0.1)',
			color: '#fff',
			textDecoration: 'none',
			fontSize: 14,
		}}
	>
		<svg width='16' height='16' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
			<path
				d='M12 3v12m0 0l-4-4m4 4l4-4M5 21h14'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
		{label}
	</a>
)

const OquvUslubiyMateriallar = () => {
	const { t } = useTranslation()
	const { items, loading, error, retry } = useSiteList('site-education-materials', siteEducationMaterialsApi, toEducationMaterial)

	return (
		<section>
			<Seo title={t('menu.oquvFaoliyati.oquv-uslubiy-materiallar')} />
			<h1 className='mb-6 text-[26px] font-semibold text-white md:text-[32px]'>
				{t('menu.oquvFaoliyati.oquv-uslubiy-materiallar')}
			</h1>
			<AsyncBoundary loading={loading} error={error} onRetry={retry} isEmpty={items.length === 0} skeleton={<SkeletonText lines={5} />}>
				<ul style={{ display: 'flex', flexDirection: 'column', gap: 14, listStyle: 'none', margin: 0, padding: 0 }}>
					{items.map(item => (
						<li
							key={item.id}
							style={{
								background: 'rgba(var(--card-rgb),1)',
								border: '1px solid rgba(255,255,255,0.05)',
								borderRadius: 14,
								padding: '18px 22px',
							}}
						>
							{item.title && (
								<p style={{ color: '#fff', fontSize: 15, lineHeight: 1.6, margin: 0 }}>{item.title}</p>
							)}
							{item.files.length > 0 && (
								<div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
									{item.files.map(f => (
										<FileLink key={f.key} url={f.url} label={t(`eduMaterials.${f.key}`)} />
									))}
								</div>
							)}
						</li>
					))}
				</ul>
			</AsyncBoundary>
		</section>
	)
}

export default OquvUslubiyMateriallar
