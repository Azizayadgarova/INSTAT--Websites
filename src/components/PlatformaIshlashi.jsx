import { motion } from 'framer-motion'
import BlurWords from './shared/BlurWords'
import { Button2 } from './shared/Button2'
import dotImg from '@/assets/Group 1707483848.png'
import icon01 from '@/assets/icons/Vector (8).png'
import icon02 from '@/assets/icons/search-line.png'
import icon03 from '@/assets/icons/Vector (9).png'
import icon04 from '@/assets/icons/Vector (10).png'
import ellipseImg from '@/assets/icons/Ellipse 2.png'

const vp = { once: true, amount: 0.25 }
const BG = 'rgba(var(--card-rgb),1)'

const ROW_H = 220
const GAP_H = 120
const CX = 600
const TOTAL_H = 4 * ROW_H + 4 * GAP_H + ROW_H
const R_PEAK = 980
const L_PEAK = 120

const steps = [
	{
		id: '01', badgeRight: true, icon: icon01,
		title: "Ro'yxatdan o'tish va tizimga kirish",
		description: "Foydalanuvchi platformada ro'yxatdan o'tadi va shaxsiy kabinetiga kiradi. Bu orqali tizimning barcha statistik ma'lumotlari va tahlil vositalaridan foydalanish imkoniyati ochiladi.",
	},
	{
		id: '02', badgeRight: false, icon: icon02,
		title: "Kerakli ma'lumotlarni topish",
		description: "Platformadagi statistik ma'lumotlar katalogi orqali foydalanuvchi o'ziga kerakli ma'lumotlar to'plamini topadi. Ma'lumotlar turi va kategoriyalar bo'yicha tasniflanib, qidirish jarayoni oson amalga oshiriladi.",
	},
	{
		id: '03', badgeRight: true, icon: icon03,
		title: "Ma'lumotlarni tahlil qilish",
		description: "Tanlangan ma'lumotlar platformaning tahlil vositalari yordamida ko'rib chiqiladi. Grafiklar va diagrammalar orqali ma'lumotlar vizual tarzda tahlil qilinadi va chuqurroq tushunish imkoniyati yaratiladi.",
	},
	{
		id: '04', badgeRight: false, icon: icon04,
		title: "Natijalarni tayyorlash va eksport qilish",
		description: "Foydalanuvchi o'z tahlil natijalari asosida hisobot tayyirlaydi va ularni turli formatlarda eksport qilib, kerakli joyda foydalanishi mumkin.",
	},
]

const ICON_YS = steps.map((_, i) => i * (ROW_H + GAP_H) + ROW_H / 2)

const buildSnake = () => {
	let d = `M ${CX} ${ICON_YS[0]}`
	// 3 ta connector (step 0→1, 1→2, 2→3)
	for (let i = 0; i < steps.length - 1; i++) {
		const y1   = ICON_YS[i]
		const y2   = ICON_YS[i + 1]
		const peak = steps[i].badgeRight ? R_PEAK : L_PEAK
		d += ` C ${peak} ${y1} ${peak} ${y2} ${CX} ${y2}`
	}
	// 4-chi dum egri
	const tailY1   = ICON_YS[steps.length - 1]
	const tailY2   = tailY1 + ROW_H + GAP_H
	const tailPeak = steps[steps.length - 1].badgeRight ? R_PEAK : L_PEAK
	d += ` C ${tailPeak} ${tailY1} ${tailPeak} ${tailY2} ${CX} ${tailY2}`
	return d
}
const SNAKE = buildSnake()

// Badge har bir bezier o'rta nuqtasida (4 ta)
const BADGE_POS = steps.map((step, i) => {
	const peak = step.badgeRight ? R_PEAK : L_PEAK
	// Steplar 0–2: mos connector midpoint
	if (i < steps.length - 1) {
		const y1 = ICON_YS[i], y2 = ICON_YS[i + 1]
		return {
			id: step.id,
			xPct: (0.25 * CX + 0.75 * peak) / 1200 * 100,
			y: (y1 + y2) / 2,
			alignRight: step.badgeRight,
		}
	}
	// Step 3 (oxirgi): dum egri midpoint
	const tailY1 = ICON_YS[i], tailY2 = tailY1 + ROW_H + GAP_H
	return {
		id: step.id,
		xPct: (0.25 * CX + 0.75 * peak) / 1200 * 100,
		y: (tailY1 + tailY2) / 2,
		alignRight: step.badgeRight,
	}
})

const SnakeDot = ({ top }) => (
	<div style={{
		position: 'absolute',
		left: '50%',
		top,
		transform: 'translate(-50%, -50%)',
		zIndex: 5,
		pointerEvents: 'none',
	}}>
		<motion.div
			animate={{ scale: [1, 1.08, 1] }}
			transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
		>
			<img src={ellipseImg} alt="" style={{ width: 42, height: 42, display: 'block' }} />
		</motion.div>
	</div>
)

const IconCircle = ({ icon, floatDelay = 0, noFloat = false }) => (
	<motion.div
		initial={{ opacity: 0, scale: 0.65 }}
		whileInView={{ opacity: 1, scale: 1 }}
		viewport={vp}
		transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
	>
		<motion.div
			animate={noFloat ? {} : { y: [0, -8, 0] }}
			transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
			style={{
				width: 140, height: 140, borderRadius: '333px',
				background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)',
				display: 'flex', alignItems: 'center', justifyContent: 'center',
				flexShrink: 0,
			}}
		>
			<img src={icon} alt="" style={{ width: 60.94, height: 60.94, objectFit: 'contain' }} />
		</motion.div>
	</motion.div>
)

const QadamBadge = ({ id, alignRight, delay = 0 }) => (
	<motion.div
		initial={{ opacity: 0, x: alignRight ? 50 : -50 }}
		whileInView={{ opacity: 1, x: 0 }}
		viewport={vp}
		transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
		style={{
			display: 'flex', flexDirection: 'column',
			alignItems: alignRight ? 'flex-start' : 'flex-end',
			justifyContent: 'center',
		}}
	>
		<span style={{
			fontFamily: '"Belgro", var(--font-display)',
			fontWeight: 900,
			fontStyle: 'normal',
			fontSize: 96,
			lineHeight: '85px',
			letterSpacing: '0%',
			verticalAlign: 'bottom',
			color: 'rgba(var(--blue-rgb),1)',
			display: 'block',
		}}>
			{id}
		</span>
		<span style={{
			fontFamily: '"Belgro", var(--font-display)',
			fontWeight: 900,
			fontStyle: 'normal',
			fontSize: 32,
			lineHeight: '28px',
			letterSpacing: '0%',
			verticalAlign: 'bottom',
			color: 'rgba(var(--muted-rgb),1)',
			textTransform: 'uppercase',
			marginTop: 4,
			display: 'block',
		}}>
			QADAM
		</span>
	</motion.div>
)

const TextCard = ({ title, description, fromLeft, delay = 0, icon }) => (
	<motion.div
		initial={{ opacity: 0, x: fromLeft ? -50 : 50 }}
		whileInView={{ opacity: 1, x: 0 }}
		viewport={vp}
		transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
		style={{
			background: 'rgba(var(--bg-rgb),1)',
			borderRadius: 298,
			padding: '28px 32px 28px 48px',
			boxSizing: 'border-box',
			minHeight: 160,
		}}
	>
		<div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
			{icon && !fromLeft && <IconCircle icon={icon} floatDelay={0} />}
			<div style={{ flex: 1 }}>
				<h3 style={{
					fontFamily: 'var(--font-display)',
					fontWeight: 700, fontSize: 20, lineHeight: 1.35,
					color: 'rgba(225, 225, 232, 1)',
					margin: '0 0 12px 0',
				}}>
					{title}
				</h3>
				<p style={{
					fontFamily: 'var(--font-inter)',
					fontWeight: 400, fontSize: 14, lineHeight: 1.7,
					color: 'rgba(140, 140, 158, 1)',
					margin: 0,
				}}>
					{description}
				</p>
			</div>
			{icon && fromLeft && <IconCircle icon={icon} floatDelay={0} />}
		</div>
	</motion.div>
)

const PlatformaIshlashi = () => (
	<section style={{ width: '100%', background: BG, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

		{/* Header */}
		<div style={{
			display: 'flex', flexDirection: 'column', alignItems: 'center',
			textAlign: 'center', padding: '40px 24px 0',
			gap: 20, maxWidth: 700, margin: '0 auto',
		}}>
			<motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.5 }}>
				<Button2 text="Qanday ishlaydi?" />
			</motion.div>

			<BlurWords
				text="Platforma qanday ishlaydi"
				delay={0.1}
				style={{
					fontFamily: 'var(--font-display)',
					fontWeight: 600, fontSize: 52, lineHeight: 1.08,
					color: '#ffffff', display: 'block',
				}}
			/>

			<motion.p
				initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
				viewport={vp} transition={{ duration: 0.6, delay: 0.45 }}
				style={{
					fontFamily: 'var(--font-inter)', fontWeight: 400,
					fontSize: 16, lineHeight: 1.65,
					color: 'rgba(140, 140, 158, 1)', maxWidth: 540, margin: '0 auto',
				}}
			>
				Platformadan foydalanish jarayoni oddiy va qulay bo&apos;lib, foydalanuvchilar bir
				necha qadam orqali kerakli statistik ma&apos;lumotlarga ega bo&apos;lishlari mumkin.
			</motion.p>
		</div>

		{/* Steps */}
		<div style={{ width: '100%', maxWidth: 1440, padding: '0 120px 0', boxSizing: 'border-box' }}>
			<div style={{ position: 'relative', width: '100%', minHeight: ICON_YS[steps.length - 1] + ROW_H + GAP_H + 60 }}>

				{/* Snake start dot */}
				<SnakeDot top={ICON_YS[0]} />

				{/* Snake end dot */}
				<SnakeDot top={ICON_YS[steps.length - 1] + ROW_H + GAP_H} />

				{/* Uzluksiz ilon izi — icon markazlarini bog'laydi */}
				<svg
					style={{
						position: 'absolute', top: 0, left: 0,
						width: '100%', height: TOTAL_H,
						pointerEvents: 'none', zIndex: 0, overflow: 'visible',
					}}
					viewBox={`0 0 1200 ${TOTAL_H}`}
					preserveAspectRatio="none"
				>
					{/* Soya qatlam */}
					<motion.path
						d={SNAKE}
						stroke="rgba(255,255,255,0.08)"
						strokeWidth="3"
						strokeDasharray="32 32"
						fill="none"
						strokeLinecap="round"
						animate={{ strokeDashoffset: [0, -64] }}
						transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
					/>
					{/* Asosiy chiziq */}
					<motion.path
						d={SNAKE}
						stroke="rgba(255,255,255,0.55)"
						strokeWidth="2"
						strokeDasharray="32 32"
						fill="none"
						strokeLinecap="round"
						animate={{ strokeDashoffset: [0, -64] }}
						transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
					/>
				</svg>

				{/* Peak nuqtadagi dot rasm + yonidagi badge */}
				{BADGE_POS.map((bp, i) => (
					<div key={bp.id}>
						{/* Dot — peak nuqtasida markazlangan */}
						<div style={{
							position: 'absolute',
							left: `${bp.xPct}%`,
							top: bp.y,
							transform: 'translate(-50%, -50%)',
							zIndex: 4,
						}}>
							<img src={dotImg} alt="" style={{ width: 28, height: 28, display: 'block' }} />
						</div>
						{/* Badge — dot yonida (o'ng peaklar uchun o'ngga, chap uchun chapga) */}
						<div style={{
							position: 'absolute',
							left: `${bp.xPct}%`,
							top: bp.y,
							transform: bp.alignRight
								? 'translateX(24px) translateY(-50%)'
								: 'translateX(calc(-100% - 24px)) translateY(-50%)',
							zIndex: 3,
						}}>
							<QadamBadge id={bp.id} alignRight={bp.alignRight} delay={0.15 * i} />
						</div>
					</div>
				))}

				{steps.map((step, index) => (
					<div
						key={step.id}
						style={{
							position: 'relative',
							zIndex: 1,
							height: ROW_H,
							marginBottom: index < steps.length - 1 ? GAP_H : 0,
						}}
					>
						{step.badgeRight ? (
							<div style={{
								position: 'absolute',
								left: '40px',
								right: '370px',
								top: 'calc(50% + 170px)',
								transform: 'translateY(-50%)',
							}}>
								<TextCard title={step.title} description={step.description} fromLeft delay={0.05} icon={step.icon} />
							</div>
						) : (
							<div style={{
								position: 'absolute',
								left: 'calc(50% - 290px)',
								right: '100px',
								top: 'calc(50% + 170px)',
								transform: 'translateY(-50%)',
							}}>
								<TextCard title={step.title} description={step.description} fromLeft={false} delay={0.05} icon={step.icon} />
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	</section>
)

export default PlatformaIshlashi
