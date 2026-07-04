import bottomBg from '@/assets/bgImg/Background (1).png'
import WaterCanvas from './shared/WaterCanvas'
import RippleButton from './shared/RippleButton'
import { Button } from './shared/Button'
import { useHeroPhase } from '../hooks/useHeroPhase'

export default function MikroMalumotlarHero() {
	const { show } = useHeroPhase()

	return (
		<section style={{
			width: '100%',
			display: 'flex', flexDirection: 'column',
			alignItems: 'center',
			position: 'relative', overflow: 'hidden',
			paddingTop: '100px',
			paddingBottom: '85px',
			background: '#0a0f1a',
		}}>
			<WaterCanvas />

			<img src={bottomBg} alt='' style={{
				position: 'absolute', bottom: 0, left: 0,
				width: '100%', height: '800px', objectFit: 'cover', display: 'block',
				zIndex: 4, pointerEvents: 'none',
			}} />

			<div style={{
				position: 'absolute', bottom: 0, left: 0, right: 0,
				height: '220px',
				background: 'linear-gradient(to bottom, transparent 0%, #0a0f1a 100%)',
				zIndex: 3, pointerEvents: 'none',
			}} />

			<div style={{
				display: 'flex', flexDirection: 'column',
				alignItems: 'center', textAlign: 'center',
				gap: '28px', zIndex: 10, position: 'relative',
				maxWidth: '820px', width: '100%',
			}}>
				<div style={show(1)}>
					<Button text='Platforma haqida' variant='dark' />
				</div>

				<div style={show(2)}>
					<h1 style={{
						fontFamily: 'var(--font-display)',
						fontWeight: 700,
						fontSize: 'clamp(32px, 8.33vw, 64px)',
						lineHeight: 1.1, letterSpacing: '-.03em',
						color: '#fff', margin: 0,
					}}>
						Rasmiy statistika uchun
						<br />
						<span style={{ color: 'rgba(var(--cyan-rgb),1)' }}>raqamli platforma</span>
					</h1>
				</div>

				<div style={show(3)}>
					<p style={{
						fontFamily: 'var(--font-display)',
						fontWeight: 400, fontSize: '16px', lineHeight: 1.75,
						color: 'rgba(var(--text-rgb),1)', maxWidth: '500px', margin: 0,
					}}>
						Mikro-ma'lumotlar laboratoriyasi foydalanuvchilarga O'zbekiston
						Respublikasining rasmiy statistik ma'lumotlariga xavfsiz va qulay kirish.
					</p>
				</div>

				<div style={{ display: 'flex', gap: '12px', ...show(4) }}>
					<RippleButton
						style={{
							width: '124px', height: '48px',
							borderRadius: '12px', padding: '14px',
							background: 'rgba(var(--blue-rgb),1)',
							border: '1px solid rgba(255,255,255,0.2)',
							boxShadow: [
								'0px 2px 6px 0px rgba(255,255,255,0.25) inset',
								'0px -2px 4px 0px rgba(var(--bg-rgb),0.3) inset',
								'0px 16px 24px -8px rgba(var(--bg-rgb),0.1)',
								'0px 0px 0px 1px rgba(28,84,148,1)',
							].join(', '),
							color: '#fff', fontSize: '14px', fontWeight: 500,
							fontFamily: 'var(--font-display)',
							cursor: 'pointer', transition: 'transform .2s, filter .2s',
							display: 'flex', alignItems: 'center', justifyContent: 'center',
						}}
						onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.07)'; e.currentTarget.style.filter = 'brightness(1.18)' }}
						onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.filter = 'brightness(1)' }}
					>
						Ariza yuborish
					</RippleButton>

					<RippleButton
						style={{
							height: '48px', borderRadius: '12px', padding: '14px 20px',
							background: 'rgba(31,37,51,1)',
							border: '1px solid rgba(var(--card-rgb),1)',
							boxShadow: [
								'0px 2px 6px 0px rgba(255,255,255,0.2) inset',
								'0px -2px 4px 0px rgba(var(--bg-rgb),1) inset',
								'0px 16px 24px -8px rgba(24,27,37,0.1)',
								'0px 0px 0px 1px rgba(31,37,51,1)',
							].join(', '),
							color: '#fff', fontSize: '16px', fontWeight: 500,
							fontFamily: 'var(--font-display)',
							cursor: 'pointer', transition: 'transform .2s, background .2s',
							display: 'flex', alignItems: 'center', justifyContent: 'center',
							whiteSpace: 'nowrap',
						}}
						onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; e.currentTarget.style.background = 'rgba(43,55,80,1)' }}
						onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.background = 'rgba(31,37,51,1)' }}
					>
						Statistik shablonlar
					</RippleButton>
				</div>
			</div>
		</section>
	)
}
