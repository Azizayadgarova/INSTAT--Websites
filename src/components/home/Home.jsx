import HomeApp from './HomeApp'
import HomeContact from './HomeContact'
import HomeCourses from './HomeCourses'
import HomeFaq from './HomeFaq'
import HomeFeatures from './HomeFeatures'
import HomeHero from './HomeHero'
import HomeIntegrations from './HomeIntegrations'
import HomeNews from './HomeNews'
import PageFrame from './PageFrame'

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
					<HomeFeatures />
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
