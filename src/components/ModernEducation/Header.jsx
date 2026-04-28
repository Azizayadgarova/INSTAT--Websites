import bg from '../../assets/bgImg/Background (1).png'
import AnimatedSection from '../shared/AnimatedSection'
import ParticleBackground from '../shared/ParticleBackground'
import Text from '../shared/Text'

export default function ModernEducationHeader() {
	return (
		<section
			className='relative w-full flex flex-col items-center justify-start font-sans text-white'
			style={{
				overflow: 'hidden',
				paddingTop: '360px',
				paddingBottom: 0,
				minHeight: '360px',
				backgroundColor: 'rgba(14,18,27,1)',
				backgroundImage: `url(${bg})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<ParticleBackground
				count={100}
				height={650}
				opacity={0.8}
				color='255, 255, 255'
				zIndex={2}
			/>
			<AnimatedSection
				style={{
					position: 'relative',
					zIndex: 50,
					width: '100%',
					bottom: '295px',
					marginBottom: '-295px',
				}}
			>
				<div className='text-center'>
					<Text
						buttonText='Bizning platformalar'
						title='Barcha imkoniyatlar'
						highlight='bir joyda'
						subtitle={
							<>
								Beshta platforma orqali o'qish, tadqiqot qilish, bilim olish va
								professional <br />
								rivojlanish imkoniyatlari.
							</>
						}
					/>
				</div>
			</AnimatedSection>
		</section>
	)
}
