import bgGlow from '@/assets/bgImg/Background (1).png'
import { Button2 } from './shared/Button2'
import AnimatedSection from './shared/AnimatedSection'

const IshOrinlariAfzalliklar = () => (
	<section
		style={{
			width: '100%',
			maxWidth: '1440px',
			margin: '0 auto',
			background: 'rgba(var(--bg-rgb),1)',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			padding: '40px 24px 0',
			position: 'relative',
			boxSizing: 'border-box',
		}}
	>
		<img
			src={bgGlow}
			alt=''
			aria-hidden='true'
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

		<AnimatedSection style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
				<Button2 text='Bizning afzalliklarimiz' />

				<h2
					style={{
						fontFamily: 'var(--font-display)',
						fontWeight: 600,
						fontSize: 'clamp(28px,4vw,48px)',
						lineHeight: 1.1,
						color: '#fff',
						margin: 0,
						letterSpacing: '-0.02em',
					}}
				>
					Platforma orqali ish topish endi oson va samarali
				</h2>

				<p
					style={{
						fontFamily: 'var(--font-display)',
						fontWeight: 400,
						fontSize: '16px',
						lineHeight: '140%',
						color: 'rgba(202,202,206,1)',
						maxWidth: '600px',
						margin: 0,
					}}
				>
					Platforma sizning qiziqishlaringiz va ko&apos;nikmalaringizga mos keladigan
					firma vakansiyalarini tez topishga yordam beradi. Bir necha klik bilan
					ariza yuboring,
				</p>
			</div>
		</AnimatedSection>
	</section>
)

export default IshOrinlariAfzalliklar
