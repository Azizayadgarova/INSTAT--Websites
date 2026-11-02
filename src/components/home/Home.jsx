import { lazy, Suspense } from 'react'

import LazyLoad from '@/components/shared/LazyLoad'
import HomeApp from './HomeApp'
import HomeContact from './HomeContact'
import HomeCourses from './HomeCourses'
import HomeFaq from './HomeFaq'
import HomeHero from './HomeHero'
import HomeIntegrations from './HomeIntegrations'
import HomeNews from './HomeNews'
import PageFrame from './PageFrame'

// "Imkoniyatlar" bo'limi — oldingi versiya (ModernEducation), `site-main-features` API'dan.
const ModernEducation = lazy(() => import('@/components/ModernEducation'))

const FeaturesFallback = () => <div style={{ minHeight: '100vh' }} />

/**
 * Bosh sahifa (prototip: INSTAT/index.html dizayni). Ma'lumotlar mavjud hook'lar orqali
 * backenddan keladi (har bir bo'limda ko'rsatilgan).
 */
export default function Home() {
	return (
		<PageFrame>
			{({ ready }) => (
				<main>
					<HomeHero ready={ready} />
					{/* `#features` — home.css dagi yangi dizayn qoidalari (height:400vh) shu yerga ham tushadi, shuning uchun o'zimizniki */}
					<section id='features' style={{ height: 'auto', borderTop: 0 }}>
						<LazyLoad fallback={<FeaturesFallback />}>
							<Suspense fallback={<FeaturesFallback />}>
								<ModernEducation cardHeight={100} />
							</Suspense>
						</LazyLoad>
					</section>
					<HomeCourses />
					<HomeIntegrations />
					<HomeFaq />
					<HomeNews />
					<HomeApp />
					<HomeContact />
				</main>
			)}
		</PageFrame>
	)
}
