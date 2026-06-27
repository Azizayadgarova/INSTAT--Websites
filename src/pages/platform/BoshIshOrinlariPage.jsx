import { lazy, Suspense } from 'react'
import BoshIshStatistika from '../../components/BoshIshStatistika'
import IshOrinlariHero from '../../components/IshOrinlariHero'
import IshOrinlariKategoriyalar from '../../components/IshOrinlariKategoriyalar'
import IshOrinlariJarayon from '../../components/IshOrinlariJarayon'
import IshOrinlariAfzalliklar from '../../components/IshOrinlariAfzalliklar'
import IshOrinlariRasmlar from '../../components/IshOrinlariRasmlar'
import IshOrinlariVakansiyalar from '../../components/IshOrinlariVakansiyalar'

const LiquideSlider = lazy(() => import('../../components/Liquide'))
const FAQSection    = lazy(() => import('../../components/FAQSection'))

const SliderFallback = () => (
	<div style={{ width: '100%', aspectRatio: '1440 / 900', background: '#000' }} />
)

const BoshIshOrinlariPage = () => (
	<div>
		<IshOrinlariHero />
		<BoshIshStatistika />
		<IshOrinlariKategoriyalar />
		<IshOrinlariJarayon />
		<IshOrinlariAfzalliklar />
		<IshOrinlariRasmlar />
		<Suspense fallback={<SliderFallback />}>
			<LiquideSlider />
		</Suspense>
		<IshOrinlariVakansiyalar />
		<Suspense fallback={null}>
			<FAQSection platformStyle hideParticles />
		</Suspense>
	</div>
)

export default BoshIshOrinlariPage
