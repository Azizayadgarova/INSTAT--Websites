import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Button } from './shared/Button'
import AnimatedSection from './shared/AnimatedSection'
import icon01 from '@/assets/user-3-line.png'
import icon02 from '@/assets/Vector (11).png'
import icon03 from '@/assets/send-plane-line.png'
import icon04 from '@/assets/Vector (12).png'
import { siteVacancyInstructionsApi } from '@/api/siteContent.api'
import { useSiteList } from '@/hooks/useSiteList'
import { toFeature } from '@/utils/siteContent'

const STEPS = [
	{
		id: '01', icon: icon01, reverse: false,
		title: 'Profil yarating',
		desc: "O'zingiz haqingizdagi muhim ma'lumotlarni kiritib, professional profilingizni shakillantiring. To'ldirilgan profil sizni ish beruvchilarga aniqroq ko'rsatadi va mos vakansiyalarni tezroq topishga yordam beradi.",
	},
	{
		id: '02', icon: icon02, reverse: true,
		title: 'Mos vakansiyani toping',
		desc: "Qiziqishlaringiz, tajribangiz va ko'nikmalaringizga mos keladigan ish o'rinlarini zamonaviy qidiruv tizimi orqali oson va tez toping. Platforma siz uchun eng dolzarb va mos vakansiyalarni tavsiya qiladi, bu esa ortiqcha vaqt sarflashsiz to'g'ri tanlov qilish imkonini beradi.",
	},
	{
		id: '03', icon: icon03, reverse: false,
		title: 'Ariza yuboring',
		desc: "Sizga mos keladigan vakansiyani tanlab, bir necha bosishda ariza yuboring. Platforma orqali profilingiz ish beruvchiga to'g'ridan-to'g'ri yetkaziladi va jarayonni soddalashtiradi.",
	},
	{
		id: '04', icon: icon04, reverse: true,
		title: 'Javobni kuting',
		desc: "Yuborgan arizangiz ish beruvchi tomonidan ko'rib chiqiladi va natijalar haqida xabardor bo'lasiz. Platforma sizga jarayonni kuzatish va o'z vaqtida javob olish imkonini beradi.",
	},
]

/* ── Variant'lar ── */
const listV = {
	hidden: {},
	show: { transition: { staggerChildren: 0.22, delayChildren: 0.1 } },
}

const cardV = {
	hidden: { opacity: 0, y: 60, scale: 0.96, filter: 'blur(8px)' },
	show: {
		opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
		transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
	},
}

const circleV = {
	hidden: { scale: 0, opacity: 0, rotate: -20 },
	show: {
		scale: 1, opacity: 1, rotate: 0,
		transition: { type: 'spring', stiffness: 220, damping: 18, delay: 0.15 },
	},
}

const iconV = {
	hidden: { opacity: 0, scale: 0.3, rotate: -45 },
	show: {
		opacity: 1, scale: 1, rotate: 0,
		transition: { type: 'spring', stiffness: 280, damping: 20, delay: 0.3 },
	},
}

const titleV  = { hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 } } }
const descV   = { hidden: { opacity: 0, x: -18 }, show: { opacity: 1, x: 0, transition: { duration: 0.6,  ease: [0.22, 1, 0.36, 1], delay: 0.32 } } }
const titleVR = { hidden: { opacity: 0, x:  24 }, show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 } } }
const descVR  = { hidden: { opacity: 0, x:  18 }, show: { opacity: 1, x: 0, transition: { duration: 0.6,  ease: [0.22, 1, 0.36, 1], delay: 0.32 } } }


/* ── Ko'k doira ── */
const NumberCircle = ({ id, reverse }) => (
	<motion.div variants={circleV}>
		<motion.div
			animate={{ y: [0, -12, 0] }}
			transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
			style={{
				width: 270, height: 270, borderRadius: '50%',
				background: 'linear-gradient(180deg, rgba(var(--blue-rgb),1) 0%, rgba(0,102,204,1) 100%)',
				boxShadow: 'inset 0 -4px 10px rgba(0,0,0,0.35), inset 0 2px 5px rgba(255,255,255,0.22), 0 0 40px rgba(var(--blue-rgb),0.22)',
				display: 'flex', alignItems: 'center', justifyContent: 'center',
				marginLeft:  reverse ? 25 : 85,
				marginRight: reverse ? 85 : 25,
				flexShrink: 0,
			}}
		>
			<span style={{
				fontFamily: '"Belgro",var(--font-display)',
				fontWeight: 900, fontSize: 96, lineHeight: '85px',
				color: 'rgba(116,178,251,0.81)', userSelect: 'none',
			}}>
				{id}
			</span>
		</motion.div>
	</motion.div>
)

/* ── Ikon ── */
const IconBox = ({ src }) => (
	<motion.div variants={iconV} style={{ flexShrink: 0 }}>
		<motion.div
			animate={{ y: [0, 9, 0], rotate: [0, 4, 0, -4, 0] }}
			transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
			style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
		>
			<img src={src} alt="" style={{ width: 80, height: 80, objectFit: 'contain' }} loading='lazy' decoding='async' />
		</motion.div>
	</motion.div>
)

/* ── Matn bloki ── */
const TextBlock = ({ title, desc, reverse }) => (
	<div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12, minWidth: 0 }}>
		<motion.h3
			variants={reverse ? titleVR : titleV}
			style={{
				fontFamily: 'var(--font-display)',
				fontWeight: 600, fontSize: 32, lineHeight: '40px',
				color: 'rgba(255,255,255,1)', margin: 0,
			}}
		>
			{title}
		</motion.h3>
		<motion.p
			variants={reverse ? descVR : descV}
			style={{
				fontFamily: 'var(--font-display)',
				fontWeight: 500, fontSize: 18, lineHeight: '28px',
				color: 'rgba(var(--text-rgb),1)', margin: 0,
			}}
		>
			{desc}
		</motion.p>
	</div>
)

/* ── Karta ── */
const StepCard = ({ step }) => {
	const circle = <NumberCircle id={step.id} reverse={step.reverse} />
	const icon   = <IconBox src={step.icon} />
	const text   = <TextBlock title={step.title} desc={step.desc} reverse={step.reverse} />

	return (
		<motion.div
			variants={cardV}
			style={{ width: '100%', maxWidth: 1200, alignSelf: 'center', boxSizing: 'border-box' }}
		>
			{/* Mobile */}
			<div className='md:hidden flex rounded-[20px] p-6'
				style={{ background: 'rgba(var(--bg-rgb),1)', alignItems: 'flex-start', gap: 16 }}>
				<div style={{
					width: 52, height: 52, borderRadius: '50%',
					background: 'linear-gradient(180deg, rgba(var(--blue-rgb),1) 0%, rgba(0,102,204,1) 100%)',
					boxShadow: 'inset 0 -4px 10px rgba(0,0,0,0.35), inset 0 2px 5px rgba(255,255,255,0.22)',
					display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
				}}>
					<span style={{ fontFamily: '"Belgro",var(--font-display)', fontWeight: 900, fontSize: 22, color: 'rgba(116,178,251,0.81)', userSelect: 'none' }}>
						{step.id}
					</span>
				</div>
				<div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
					<h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 24, lineHeight: '32px', color: 'rgba(255,255,255,1)', margin: 0, letterSpacing: 0 }}>
						{step.title}
					</h3>
					<p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 14, lineHeight: '20px', letterSpacing: 0, color: 'rgba(var(--text-rgb),1)', margin: 0 }}>
						{step.desc}
					</p>
				</div>
			</div>

			{/* Desktop */}
			<motion.div
				className='hidden md:flex'
				whileHover={{
					boxShadow: '0 0 0 1.5px rgba(var(--blue-rgb),0.5), 0 32px 80px rgba(0,0,0,0.4)',
					scale: 1.013,
					transition: { duration: 0.28, ease: 'easeOut' },
				}}
				style={{
					background: 'rgba(var(--bg-rgb),1)',
					borderRadius: 836,
					paddingTop: 40, paddingRight: 70, paddingBottom: 40, paddingLeft: 90,
					flexDirection: 'row', alignItems: 'center',
					overflow: 'visible', boxSizing: 'border-box',
					width: '100%', height: 248, cursor: 'default',
				}}
			>
				{step.reverse
					? <>{icon}{circle}{text}</>
					: <>{text}{circle}{icon}</>
				}
			</motion.div>
		</motion.div>
	)
}

/* ── Asosiy komponent ── */
const IshOrinlariJarayon = () => {
    const {
        t
    } = useTranslation();

    // Ikonka va chap/o'ng joylashuv frontendda qoladi — API matnni beradi
    const { items: apiSteps } = useSiteList(
        'site-vacancy-instructions',
        siteVacancyInstructionsApi,
        toFeature,
        [],
    )
    const steps = useMemo(
        () =>
            apiSteps.length
                ? apiSteps.map((f, i) => ({
                        ...STEPS[i % STEPS.length],
                        id: String(i + 1).padStart(2, '0'),
                        reverse: i % 2 === 1,
                        title: f.title,
                        desc: f.description,
                    }))
                : STEPS,
        [apiSteps],
    )

    return (
        <section style={{ width: '100%', background: 'rgba(var(--card-rgb),1)' }}>
            <div className='px-4 md:px-[60px] lg:px-[120px] pt-10 pb-10' style={{
                maxWidth: 1440, margin: '0 auto',
                boxSizing: 'border-box',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            }}>

                {/* Header */}
                <AnimatedSection style={{ width: '100%', marginBottom: 32 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 20 }}>
                        <Button text="Jarayon" variant="light" />

                        <h2
                            className='text-[32px] md:text-[52px]'
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 600, lineHeight: 1.08, color: '#ffffff', margin: 0,
                                letterSpacing: '-0.02em',
                            }}
                        >{t("components.ishOrinlariJarayon.platformadan_qanday_foydalaniladi")}</h2>

                        <p
                            className='text-[14px] md:text-[16px] max-w-[327px] md:max-w-[540px]'
                            style={{
                                fontFamily: 'Inter,sans-serif', fontWeight: 400,
                                lineHeight: '26px',
                                color: 'rgba(140,140,158,1)', margin: 0,
                            }}
                        >{t("components.ishOrinlariJarayon.bir_necha_oddiy_qadam")}</p>
                    </div>
                </AnimatedSection>

                {/* Steps — stagger container */}
                <motion.div
                    variants={listV}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className='gap-4 md:gap-[55px]'
                    style={{
                        width: '100%', display: 'flex', flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {steps.map((step) => (
                        <StepCard key={step.id} step={step} />
                    ))}
                </motion.div>

            </div>
        </section>
    );
}

export default IshOrinlariJarayon
