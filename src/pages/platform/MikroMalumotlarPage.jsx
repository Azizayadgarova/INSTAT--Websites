import MikroMalumotlarHero from '../../components/MikroMalumotlarHero'
import MikroImkoniyatlar   from '../../components/MikroImkoniyatlar'
import PlatformaIshlashi   from '../../components/PlatformaIshlashi'
import StatistikBlok       from '../../components/StatistikBlok'
import NufuzliNashrlar     from '../../components/NufuzliNashrlar'
import FAQSection          from '../../components/FAQSection'
import Testimonial         from '../../components/Testimonial'

const MikroMalumotlarPage = () => {
	return (
		<>
			<MikroMalumotlarHero />
			<MikroImkoniyatlar />
			<PlatformaIshlashi />
			<NufuzliNashrlar />
			<StatistikBlok />
			<FAQSection hideParticles platformStyle module='micro_data' />
			<Testimonial hideParticles platformStyle />
		</>
	)
}

export default MikroMalumotlarPage
