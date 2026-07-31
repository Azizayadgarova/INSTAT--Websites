import FAQSection from '../FAQSection'
import JurnalStatistika from '../JurnalStatistika'
import MaqolaTalablari from '../MaqolaTalablari'
import TahririyatAzolari from '../TahririyatAzolari'
import Testimonial from '../Testimonial'
import HeroSection from './HeroSection'
import JurnallarSection from './JurnallarSection'

export default function ElektronJurnal() {
	return (
		<>
			<HeroSection />
			<JurnallarSection />
			<MaqolaTalablari />
			<TahririyatAzolari />
			<JurnalStatistika />
			<FAQSection hideParticles platformStyle module='articles' />
			<Testimonial hideParticles platformStyle />
		</>
	)
}
