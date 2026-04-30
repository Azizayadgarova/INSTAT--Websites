import bg from '@/assets/bgImg/Background (1).png'
import AnimatedSection from '../shared/AnimatedSection'
import ParticleBackground from '../shared/ParticleBackground'
import Text from '../shared/Text'

export default function ModernEducationHeader() {
	return (
		<section
			className='relative w-full flex flex-col items-center justify-start font-sans text-white'
			style={{
				overflow: 'hidden',
				minHeight: 'auto',
				backgroundColor: 'rgba(14,18,27,1)',
			}}
		>
			<img
				src={bg}
				alt=''
				style={{
					position: 'absolute',
					top: 0,
					left: '50%',
					transform: 'translateX(-50%)',
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					objectPosition: 'center top',
					zIndex: 0,
					pointerEvents: 'none',
				}}
			/>

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
					paddingTop: '40px',
					paddingBottom: '0',
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
