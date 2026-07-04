import { lazy } from 'react'
import IshOrinlariHero from '../../components/IshOrinlariHero'
import LazyOnScroll from '../../components/shared/LazyOnScroll'

const BoshIshStatistika        = lazy(() => import('../../components/BoshIshStatistika'))
const IshOrinlariKategoriyalar = lazy(() => import('../../components/IshOrinlariKategoriyalar'))
const IshOrinlariJarayon       = lazy(() => import('../../components/IshOrinlariJarayon'))
const IshOrinlariAfzalliklar   = lazy(() => import('../../components/IshOrinlariAfzalliklar'))
const IshOrinlariRasmlar       = lazy(() => import('../../components/IshOrinlariRasmlar'))
const IshOrinlariVakansiyalar  = lazy(() => import('../../components/IshOrinlariVakansiyalar'))
const LiquideSlider            = lazy(() => import('../../components/Liquide'))
const FAQSection               = lazy(() => import('../../components/FAQSection'))

const SliderFallback = () => {
	const mobile = window.innerWidth < 768
	return <div style={{ width: '100%', aspectRatio: mobile ? '375 / 840' : '1440 / 900', background: '#000' }} />
}

const BoshIshOrinlariPage = () => (
	<div>
		<IshOrinlariHero />
		<LazyOnScroll rootMargin='100px'>
			<BoshIshStatistika />
		</LazyOnScroll>
		<LazyOnScroll rootMargin='200px'>
			<IshOrinlariKategoriyalar />
		</LazyOnScroll>
		<LazyOnScroll rootMargin='200px'>
			<IshOrinlariJarayon />
		</LazyOnScroll>
		<LazyOnScroll rootMargin='200px'>
			<IshOrinlariAfzalliklar />
		</LazyOnScroll>
		<LazyOnScroll rootMargin='200px'>
			<IshOrinlariRasmlar />
		</LazyOnScroll>
		<LazyOnScroll fallback={<SliderFallback />} rootMargin='400px'>
			<LiquideSlider />
		</LazyOnScroll>
		<LazyOnScroll rootMargin='200px'>
			<IshOrinlariVakansiyalar />
		</LazyOnScroll>
		<LazyOnScroll rootMargin='200px'>
			<FAQSection platformStyle hideParticles />
		</LazyOnScroll>
	</div>
)

export default BoshIshOrinlariPage
