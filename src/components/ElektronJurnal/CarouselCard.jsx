import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import Particle from './Particle'
import { C_H, C_W, PCOLORS } from './constants'

const CarouselCard = memo(function CarouselCard({
	card,
	i,
	tf,
	isH,
	isFlip,
	tilt,
	shimmer,
	ripple,
	particles,
	cardRef,
	onMove,
	onEnter,
	onLeave,
	onClick,
	removePart,
}) {
    const {
        t
    } = useTranslation();

    const cardTransform = isH
		? `translateX(calc(-50% + ${tf.transX}px)) translateY(${tf.transY * 0.3}px) translateZ(${tf.transZ + 60}px) rotateY(0deg) scale(${tf.scale * 1.1})`
		: `translateX(calc(-50% + ${tf.transX}px)) translateY(${tf.transY}px) translateZ(${tf.transZ}px) rotateY(${tf.rotY}deg) scale(${tf.scale})`

    const borderBg = isH
		? 'linear-gradient(270deg,#00e6fc,#2b75cc,#7b8fff,#00e6fc)'
		: tf.abs < 0.5
			? 'linear-gradient(270deg,rgba(var(--cyan-rgb),.6),rgba(var(--blue-rgb),.5),rgba(var(--cyan-rgb),.6))'
			: 'linear-gradient(270deg,rgba(var(--blue-rgb),.35),rgba(var(--cyan-rgb),.2),rgba(var(--blue-rgb),.35))'

    const boxShadow = isH
		? '0 60px 140px rgba(0,0,0,.95), 0 0 90px rgba(var(--cyan-rgb),.35)'
		: tf.abs < 0.5
			? '0 30px 80px rgba(0,0,0,.75), 0 0 40px rgba(var(--cyan-rgb),.15)'
			: '0 20px 50px rgba(0,0,0,.6)'

    return (
        <div
			style={{
				position: 'absolute',
				top: 0,
				left: '50%',
				width: C_W,
				transform: cardTransform,
				transformStyle: 'preserve-3d',
				zIndex: isH ? 999 : tf.zIdx,
				opacity: isH ? 1 : tf.opac,
				willChange: 'transform, opacity',
			}}
		>
            {/* Floor glow */}
            <div
				style={{
					position: 'absolute',
					bottom: '-22px',
					left: '50%',
					width: isH ? '210px' : `${140 * tf.scale}px`,
					height: '22px',
					borderRadius: '50%',
					background: isH
						? 'radial-gradient(ellipse,rgba(var(--cyan-rgb),.75) 0%,transparent 70%)'
						: 'radial-gradient(ellipse,rgba(var(--blue-rgb),.38) 0%,transparent 70%)',
					filter: 'blur(10px)',
					transform: 'translateX(-50%)',
					animation: 'ej_glow 3s ease-in-out infinite',
					animationDelay: `${i * 0.35}s`,
					transition: 'width .3s, background .3s',
					pointerEvents: 'none',
				}}
			/>
            {/* Neon border */}
            <div
				style={{
					padding: '2px',
					borderRadius: '22px',
					backgroundImage: borderBg,
					backgroundSize: '400% 400%',
					animation: 'ej_border 2.5s ease infinite',
					boxShadow: isH
						? '0 0 40px rgba(var(--cyan-rgb),.55)'
						: tf.abs < 0.5
							? '0 0 20px rgba(var(--cyan-rgb),.25)'
							: 'none',
					transition: 'box-shadow .3s',
				}}
			>
				<div
					ref={cardRef}
					onMouseMove={onMove}
					onMouseEnter={onEnter}
					onMouseLeave={onLeave}
					onClick={onClick}
					style={{
						width: C_W,
						height: C_H,
						borderRadius: '20px',
						cursor: 'pointer',
						position: 'relative',
						transformStyle: 'preserve-3d',
						transform: `perspective(700px) rotateX(${isFlip ? 0 : tilt.rx}deg) rotateY(${isFlip ? 180 : tilt.ry}deg)`,
						transition: isFlip
							? 'transform .7s cubic-bezier(.22,1,.36,1)'
							: isH
								? 'transform .09s linear, box-shadow .3s'
								: 'transform .5s, box-shadow .3s',
						boxShadow,
					}}
				>
					{/* Front */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							borderRadius: '20px',
							overflow: 'hidden',
							backfaceVisibility: 'hidden',
						}}
					>
						<img
							src={card.src}
							alt=''
							loading='lazy'
							decoding='async'
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
								display: 'block',
								transform: isH && !isFlip ? 'scale(1.08)' : 'scale(1)',
								transition: 'transform .5s cubic-bezier(.22,1,.36,1)',
							}}
						/>
						{(isH || tf.abs < 0.5) && !isFlip && (
							<div
								style={{
									position: 'absolute',
									inset: 0,
									backgroundImage:
										'linear-gradient(135deg,rgba(var(--cyan-rgb),.1) 0%,rgba(123,143,255,.08) 50%,rgba(var(--blue-rgb),.1) 100%)',
									backgroundSize: '200% 200%',
									animation: 'ej_holo 3s linear infinite',
									mixBlendMode: 'screen',
									pointerEvents: 'none',
								}}
							/>
						)}
						{shimmer && !isFlip && (
							<div
								style={{
									position: 'absolute',
									top: '-60%',
									width: '70px',
									height: '280%',
									background:
										'linear-gradient(105deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.42) 50%,rgba(255,255,255,0) 100%)',
									transform: 'skewX(-16deg)',
									animation: 'ej_shimmer .8s cubic-bezier(.22,1,.36,1) both',
									pointerEvents: 'none',
								}}
							/>
						)}
						{ripple && !isFlip && (
							<div
								key={ripple.id}
								style={{
									position: 'absolute',
									left: ripple.x - 30,
									top: ripple.y - 30,
									width: 60,
									height: 60,
									borderRadius: '50%',
									border: '2px solid rgba(var(--cyan-rgb),.85)',
									animation: 'ej_ripple .7s ease-out both',
									pointerEvents: 'none',
								}}
							/>
						)}
						{particles.map(p => (
							<Particle key={p.id} {...p} onDone={() => removePart(p.id)} />
						))}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								borderRadius: '20px',
								boxShadow: isH
									? 'inset 0 0 0 1.5px rgba(var(--cyan-rgb),.75)'
									: 'none',
								transition: 'box-shadow .3s',
								pointerEvents: 'none',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								bottom: 0,
								left: 0,
								right: 0,
								height: '45%',
								background:
									'linear-gradient(to top,rgba(10,15,28,.65) 0%,transparent 100%)',
								pointerEvents: 'none',
							}}
						/>
					</div>

					{/* Back */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							borderRadius: '20px',
							overflow: 'hidden',
							backfaceVisibility: 'hidden',
							transform: 'rotateY(180deg)',
							background:
								'linear-gradient(145deg,rgba(var(--bg-rgb),1) 0%,rgba(22,34,58,1) 60%,rgba(10,30,50,1) 100%)',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							padding: '32px 24px',
							gap: '18px',
							textAlign: 'center',
						}}
					>
						<div
							style={{
								position: 'absolute',
								top: '18%',
								left: '50%',
								transform: 'translateX(-50%)',
								width: '170px',
								height: '170px',
								borderRadius: '50%',
								background:
									'radial-gradient(circle,rgba(var(--cyan-rgb),.2) 0%,transparent 70%)',
								pointerEvents: 'none',
							}}
						/>
						<div
							style={{
								width: '62px',
								height: '62px',
								borderRadius: '14px',
								zIndex: 1,
								background: 'rgba(var(--cyan-rgb),.08)',
								border: '1px solid rgba(var(--cyan-rgb),.3)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<svg width='26' height='26' viewBox='0 0 24 24' fill='none'>
								<path
									d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
									stroke='rgba(var(--cyan-rgb),1)'
									strokeWidth='1.8'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</div>
						<h3
							style={{
								fontFamily: 'var(--font-display)',
								fontWeight: 700,
								fontSize: '19px',
								lineHeight: 1.2,
								color: '#fff',
								margin: 0,
								zIndex: 1,
							}}
						>
							{card.backTitle}
						</h3>
						<p
							style={{
								fontFamily: 'Inter,sans-serif',
								fontWeight: 400,
								fontSize: '13px',
								lineHeight: 1.6,
								color: 'rgba(var(--text-rgb),1)',
								margin: 0,
								zIndex: 1,
							}}
						>
							{card.backDesc}
						</p>
						<div
							style={{
								padding: '9px 20px',
								borderRadius: '100px',
								zIndex: 1,
								background:
									'linear-gradient(90deg,rgba(var(--cyan-rgb),.15),rgba(var(--blue-rgb),.15))',
								border: '1px solid rgba(var(--cyan-rgb),.35)',
								color: 'rgba(var(--cyan-rgb),1)',
								fontSize: '13px',
								fontWeight: 600,
								fontFamily: 'var(--font-display)',
							}}
						>{t("components.carouselCard.batafsil")}</div>
					</div>
				</div>
			</div>
        </div>
    );
})

export default CarouselCard
