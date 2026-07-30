import image4 from '@/assets/Image (4).png'
import AsyncBoundary from '@/components/shared/AsyncBoundary'
import RichContent from '@/components/shared/RichContent'
import Seo from '@/components/shared/Seo'
import { SkeletonText } from '@/components/shared/Skeleton'
import { useSiteData } from '@/hooks/useSiteData'

import { useTranslation } from 'react-i18next'

const Badge = ({ text }) => (
	<span
		style={{
			display: 'inline-flex',
			alignItems: 'center',
			gap: '8px',
			padding: '4px 16px',
			borderRadius: '8px',
			background: 'rgba(255, 255, 255, 0.04)',
			fontFamily: 'Inter Display, sans-serif',
			fontWeight: 600,
			fontSize: '16px',
			lineHeight: '28px',
			letterSpacing: '-0.02em',
			color: 'rgba(255, 255, 255, 1)',
		}}
	>
		{text}
	</span>
)

const UmumiyMalumot = () => {
	const { t } = useTranslation()
	const { data: item, loading, error, retry } = useSiteData(
		d => d.byModuleKey.about?.about ?? null,
	)

	const html = (item?.value ?? '').toString().trim()

	return (
		<div style={{ width: '100%', padding: '59px 0 80px 0' }}>
			
			<Seo title={t('menu.about.umumiy-malumot')} />

			<div style={{ marginBottom: '20px', display: 'inline-flex' }}>
				<Badge text={t('menu.about.title')} />
			</div>

			<h1 className='gradient-heading' style={{ marginBottom: '32px' }}>
				{t('menu.about.umumiy-malumot')}
			</h1>
			<img className='mb-[40px] max-w-full h-auto' src={image4} alt="" />

			{/* Chegara/fon YO'Q — matn to'g'ridan-to'g'ri fonda */}
			<AsyncBoundary
		
				loading={loading}
				error={error}
				onRetry={retry}
				isEmpty={!html}
				skeleton={<SkeletonText lines={10}  />}
			>
				<RichContent html={html} className='umumiy-malumot-text' />
			</AsyncBoundary>
		</div>
	)
}

export default UmumiyMalumot
