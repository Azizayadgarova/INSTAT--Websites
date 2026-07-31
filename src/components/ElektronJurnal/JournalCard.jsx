import { memo } from 'react'
import { useDataText } from '@/hooks/useDataText'
import { Button2 } from '../shared/Button2'

const JournalCard = memo(function JournalCard({ j }) {
	const dt = useDataText('journals')
	return (
		<div
			className='w-[282px] md:w-full mx-auto md:mx-0'
			style={{
				height: '342px',
				borderRadius: '20px',
				backgroundColor: 'rgba(var(--card-rgb),1)',
				boxShadow: '0px 1px 5px 0px rgba(29,36,45,0.2)',
				overflow: 'hidden',
				cursor: 'pointer',
				display: 'flex',
				flexDirection: 'column',
				transition: 'transform .2s, box-shadow .2s',
			}}
			onMouseEnter={e => {
				e.currentTarget.style.transform = 'translateY(-4px)'
				e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,.5)'
			}}
			onMouseLeave={e => {
				e.currentTarget.style.transform = ''
				e.currentTarget.style.boxShadow = '0px 1px 5px 0px rgba(29,36,45,0.2)'
			}}
		>
			<div
				style={{
					height: '216px',
					flexShrink: 0,
					padding: '24px 24px 0',
					background: 'rgba(31,37,51,1)',
					boxSizing: 'border-box',
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						width: '100%',
						height: '100%',
						borderRadius: '14px 14px 0 0',
						overflow: 'hidden',
					}}
				>
					<img
						src={j.img}
						alt={dt(j, 'title')}
						loading='lazy'
						decoding='async'
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							display: 'block',
							transition: 'transform .4s',
						}}
						onMouseEnter={e =>
							(e.currentTarget.style.transform = 'scale(1.06)')
						}
						onMouseLeave={e => (e.currentTarget.style.transform = '')}
					/>
				</div>
			</div>
			<div
				style={{
					flex: 1,
					padding: '14px 16px 18px',
					background: 'rgba(var(--card-rgb),1)',
					overflow: 'hidden',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
			>
				<p
					style={{
						fontFamily: 'var(--font-display)',
						fontWeight: 500,
						fontSize: '20px',
						lineHeight: '120%',
						letterSpacing: '0%',
						color: '#fff',
						margin: '0 0 8px',
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}
				>
					{dt(j, 'title')}
				</p>
				<p
					style={{
						fontFamily: 'var(--font-display)',
						fontWeight: 400,
						fontSize: '16px',
						lineHeight: '120%',
						color: 'rgba(var(--text-rgb),1)',
						margin: 0,
					}}
				>
					{j.year}
				</p>
			</div>
		</div>
	)
})

export default JournalCard
