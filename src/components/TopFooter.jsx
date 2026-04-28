import { useEffect, useRef } from 'react'
import icon1 from '../assets/Group 1707483799 (5).png'
import Text from './shared/Text'

const TILE_SIZE = 80
const PALETTE = [
	'rgba(16,21,33,1)',
	'rgba(18,24,37,1)',
	'rgba(14,19,30,1)',
	'rgba(20,26,39,1)',
	'rgba(15,20,32,1)',
	'rgba(17,23,35,1)',
	'rgba(13,18,29,1)',
]

const TopFooter = () => {
	const cardRef = useRef(null)
	const gridRef = useRef(null)
	const stateRef = useRef({
		cols: 0,
		rows: 0,
		tiles: [],
		defaults: [],
		fadeTimers: {},
	})

	const buildGrid = () => {
		const card = cardRef.current
		const grid = gridRef.current
		if (!card || !grid) return
		const { cols: oc, rows: or, fadeTimers } = stateRef.current
		Object.values(fadeTimers).forEach(clearTimeout)
		const cols = Math.ceil(card.offsetWidth / TILE_SIZE)
		const rows = Math.ceil(card.offsetHeight / TILE_SIZE)
		if (cols === oc && rows === or) return
		grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`
		grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`
		grid.innerHTML = ''
		const tiles = [],
			defaults = []
		for (let i = 0; i < cols * rows; i++) {
			const color = PALETTE[(i + Math.floor(i / cols)) % PALETTE.length]
			defaults.push(color)
			const el = document.createElement('div')
			el.style.cssText = `border:1px solid rgba(255,255,255,0.05);background:${color};transition:background 0.15s,border-color 0.15s;`
			grid.appendChild(el)
			tiles.push(el)
		}
		stateRef.current = { cols, rows, tiles, defaults, fadeTimers: {} }
	}

	const handleMouseMove = e => {
		const { cols, rows, tiles, fadeTimers } = stateRef.current
		const rect = cardRef.current?.getBoundingClientRect()
		if (!rect) return
		const c = Math.floor((e.clientX - rect.left) / TILE_SIZE)
		const r = Math.floor((e.clientY - rect.top) / TILE_SIZE)
		if (c < 0 || c >= cols || r < 0 || r >= rows) return
		;[
			{ dc: 0, dr: 0, a: 1 },
			{ dc: 1, dr: 0, a: 0.5 },
			{ dc: -1, dr: 0, a: 0.5 },
			{ dc: 0, dr: 1, a: 0.5 },
			{ dc: 0, dr: -1, a: 0.5 },
		].forEach(({ dc, dr, a }) => {
			const nc = c + dc,
				nr = r + dr
			if (nc < 0 || nc >= cols || nr < 0 || nr >= rows) return
			const idx = nr * cols + nc
			if (fadeTimers[idx]) {
				clearTimeout(fadeTimers[idx])
				delete fadeTimers[idx]
			}
			tiles[idx].style.background = `rgba(43,117,204,${(0.22 * a).toFixed(2)})`
			tiles[idx].style.borderColor = `rgba(56,160,255,${(0.3 * a).toFixed(2)})`
			tiles[idx].style.transition = 'background 0.12s,border-color 0.12s'
		})
	}

	const handleMouseLeave = () => {
		const { tiles, defaults, fadeTimers } = stateRef.current
		tiles.forEach((tile, idx) => {
			if (fadeTimers[idx]) return
			tile.style.transition = 'background 0.9s,border-color 0.9s'
			tile.style.background = defaults[idx]
			tile.style.borderColor = 'rgba(255,255,255,0.05)'
			fadeTimers[idx] = setTimeout(() => delete fadeTimers[idx], 1000)
		})
	}

	useEffect(() => {
		requestAnimationFrame(buildGrid)
		const ro = new ResizeObserver(buildGrid)
		if (cardRef.current) ro.observe(cardRef.current)
		return () => ro.disconnect()
	}, [])

	return (
		<>
			<style>{`@keyframes cardSpin{to{transform:rotate(360deg)}}`}</style>
			<section className='w-full bg-[#0E121B] py-10'>
				<div className='w-full max-w-[1200px] mx-auto px-6'>
					<div
						ref={cardRef}
						className='relative w-full rounded-[24px] overflow-hidden text-center'
						style={{
							background: 'rgba(14,18,27,1)',
							minHeight: '548px',
							padding: 'clamp(40px, 6vw, 60px) clamp(20px, 5vw, 64px)',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							gap: '40px',
						}}
						onMouseMove={handleMouseMove}
						onMouseLeave={handleMouseLeave}
					>
						<div
							ref={gridRef}
							className='absolute inset-0 pointer-events-none'
							style={{ display: 'grid', zIndex: 1 }}
						/>
						<div
							className='absolute inset-0 pointer-events-none'
							style={{
								zIndex: 2,
								background:
									'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(43,117,204,0.18) 0%, transparent 70%), linear-gradient(to bottom, rgba(14,18,27,0) 55%, rgba(14,18,27,1) 100%)',
							}}
						/>

						<div className='relative z-10 px-4'>
							<div className='flex justify-center mb-8'>
								<div className='relative flex items-center justify-center'>
									<div className='absolute w-[88px] h-[88px] border border-white/15 rounded-[18px]' />
									<div className='absolute w-[104px] h-[104px] border border-white/10 rounded-[18px]' />
									<div className='absolute w-[120px] h-[120px] border border-white/[0.06] rounded-[18px]' />
									<div
										className='relative z-10 w-[72px] h-[72px] rounded-[16px] flex items-center justify-center border border-white/25 shadow-[0_0_40px_rgba(59,130,246,0.55)]'
										style={{
											background:
												'linear-gradient(180deg,#38A0FF 0%,#2D3D99 100%)',
										}}
									>
										<img
											src={icon1}
											alt=''
											className='w-10 h-10 object-contain'
										/>
									</div>
								</div>
							</div>

							<Text
								title='Savollaringiz bormi?'
								highlight="Biz bilan bog'laning"
								subtitle={
									<>
										Kurslar, ro'yxatdan o'tish yoki hamkorlik <br /> bo'yicha
										savollaringiz bo'lsa, biz bilan bog'laning
									</>
								}
							>
								<div
									className='mx-auto mt-10'
									style={{
										position: 'relative',
										width: '100%',
										maxWidth: '477px',
										height: '52px',
										display: 'flex',
										alignItems: 'center',
										borderRadius: '12px',
										background: 'rgba(22,27,38,0.85)',
										border: '1.5px solid #2F3A44',
										backdropFilter: 'blur(10px)',
										boxShadow: '0px 4px 20px 0px rgba(47,7,106,0.08)',
										overflow: 'hidden',
									}}
								>
									<svg
										style={{
											position: 'absolute',
											inset: 0,
											width: '100%',
											height: '100%',
											overflow: 'visible',
											pointerEvents: 'none',
										}}
									>
										<defs>
											<linearGradient
												id='tfFormGrad'
												x1='100%'
												y1='0%'
												x2='0%'
												y2='0%'
											>
												<stop offset='20%' stopColor='rgba(105,170,251,1)' />
												<stop
													offset='80%'
													stopColor='rgba(39,66,92,0)'
													stopOpacity='0'
												/>
											</linearGradient>
										</defs>
										<rect
											x='0.75'
											y='0.75'
											width='calc(100% - 1.5px)'
											height='calc(100% - 1.5px)'
											rx='12'
											fill='none'
											stroke='url(#tfFormGrad)'
											strokeWidth='1'
											strokeDasharray='10 45'
											pathLength='100'
											style={{
												animation: 'cardSpin 15s linear infinite',
												filter: 'drop-shadow(0 0 2px #69AAFB)',
											}}
										/>
									</svg>
									<form
										className='relative z-10 flex items-center w-full h-full px-[6px] py-[6px] gap-1'
										onSubmit={e => e.preventDefault()}
									>
										<input
											type='email'
											placeholder='Pochtangizni qoldiring'
											className='flex-1 bg-transparent border-none outline-none px-4'
											style={{
												color: 'rgba(255,255,255,1)',
												fontFamily: 'Inter Display,sans-serif',
												fontWeight: 400,
												fontSize: '16px',
												lineHeight: '140%',
												outline: 'none',
											}}
										/>
										<button
											type='submit'
											className='whitespace-nowrap transition-all duration-200 hover:brightness-110 active:scale-95'
											style={{
												color: 'rgba(255,255,255,1)',
												fontFamily: 'Inter Display,sans-serif',
												fontWeight: 400,
												fontSize: '16px',
												lineHeight: '140%',
												width: '87px',
												height: '44px',
												borderRadius: '10px',
												border: '1px solid rgba(28,84,148,1)',
												padding: '12px',
												background:
													'linear-gradient(180deg,#3E8BE6 0%,#1C5FB4 100%)',
												boxShadow:
													'0px 2px 6px 0px rgba(255,255,255,0.25) inset, 0px -2px 4px 0px rgba(14,18,27,0.3) inset, 0px 16px 24px -8px rgba(14,18,27,0.1), 0px 0px 0px 1px rgba(28,84,148,1)',
											}}
										>
											Yuborish
										</button>
									</form>
								</div>
							</Text>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default TopFooter
