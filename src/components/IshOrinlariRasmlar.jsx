import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import img1 from '@/assets/Group 1707483863.webp'
import img2 from '@/assets/icons/Union (1).png'
import imgMobileBg from '@/assets/Union (3).png'

const CARDS = [
	{
		key: 'arizani_tez_yuboring',
		title: 'Arizani tez yuboring',
		descKey: 'tanlagan_ishga_bir_necha_klik',
		desc: 'Tanlagan ishga bir necha klik bilan ariza yuboring va vaqtni tejang.',
	},
	{
		key: 'profilingizni_kuchli_qiling',
		title: 'Profilingizni kuchli qiling',
		descKey: 'profilingizni_tolik_toldiring',
		desc: "Profilingizni to'liq to'ldiring va ish beruvchiga o'zingizni eng yaxshi tarzda ko'rsating.",
	},
	{
		key: 'tezkor_bildirishnomalar',
		title: 'Tezkor bildirishnomalar',
		descKey: 'yangi_vakansiyalar_va_ariza_holati',
		desc: "Yangi vakansiyalar va ariza holati haqida darhol xabardor bo'ling.",
	},
	{
		key: 'karyerangizni_tez_rivojlantiring',
		title: 'Karyerangizni tez rivojlantiring',
		descKey: 'firma_vakansiyalari_bilan_tanishing',
		desc: "Firma vakansiyalari bilan tanishing va karyerangizni samarali rivojlantiring.",
	},
]

const IshOrinlariRasmlar = () => {
    const {
        t
    } = useTranslation();

    const sectionRef = useRef(null)
    const [visible, setVisible] = useState(false)

    const cards = CARDS.map(c => ({
        title: t(`components.ishOrinlariRasmlar.${c.key}`, c.title),
        desc: t(`components.ishOrinlariRasmlar.${c.descKey}`, c.desc),
    }))

    useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true)
					observer.disconnect()
				}
			},
			{ threshold: 0.05 },
		)
		if (sectionRef.current) observer.observe(sectionRef.current)
		return () => observer.disconnect()
	}, [])

    return (
        <section
			ref={sectionRef}
			style={{
				width: '100%',
				maxWidth: '1440px',
				margin: '0 auto',
				background: 'rgba(var(--bg-rgb),1)',
				boxSizing: 'border-box',
			}}
		>
            {/* DESKTOP */}
            <div
				className='hidden md:flex'
				style={{
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: '24px',
					padding: '40px 120px',
				}}
			>
				{/* Chap — rasm */}
				<div
					style={{
						position: 'relative',
						width: '552px',
						height: '520px',
						flexShrink: 0,
						borderRadius: '20px',
						overflow: 'hidden',
						opacity: visible ? 1 : 0,
						transform: visible ? 'translateX(0px)' : 'translateX(-50px)',
						transition: 'opacity 0.7s ease 0s, transform 0.7s ease 0s',
					}}
				>
					<img
						src={img1}
						alt=''
						fetchpriority='high'
						loading='eager'
						style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
					/>
					<div
						style={{
							position: 'absolute',
							left: 0,
							right: 0,
							bottom: 0,
							padding: '0 32px 32px',
							display: 'flex',
							flexDirection: 'column',
							gap: '12px',
						}}
					>
						<h3
							style={{
								fontFamily: 'var(--font-display)',
								fontWeight: 500,
								fontSize: '32px',
								lineHeight: '40px',
								color: 'rgba(255,255,255,1)',
								margin: 0,
							}}
						>{t("components.ishOrinlariRasmlar.mos_vakansiyalarni_tez_toping")}</h3>
						<p
							style={{
								fontFamily: 'var(--font-display)',
								fontWeight: 500,
								fontSize: '18px',
								lineHeight: '24px',
								color: 'rgba(202,202,206,1)',
								margin: 0,
							}}
						>{t("components.ishOrinlariRasmlar.sizning_qiziqishlaringiz_konikmalaringiz")}</p>
					</div>
				</div>

				{/* O'ng — 2x2 grid */}
				<div style={{ position: 'relative', width: '624px', height: '520px', flexShrink: 0 }}>
					<img
						src={img2}
						alt=''
						style={{
							position: 'absolute',
							inset: 0,
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							zIndex: 0,
							pointerEvents: 'none',
						}} loading='lazy' decoding='async' />
					<div
						style={{
							position: 'relative',
							zIndex: 1,
							width: '100%',
							height: '100%',
							display: 'grid',
							gridTemplateColumns: '1fr 1fr',
							gridTemplateRows: '1fr 1fr',
							gap: '24px',
						}}
					>
						{cards.map((c, i) => (
							<div
								key={c.title}
								style={{
									background: 'rgba(var(--card-rgb),1)',
									borderRadius: '20px',
									padding: '64px 24px 24px',
									display: 'flex',
									flexDirection: 'column',
									gap: '8px',
									boxSizing: 'border-box',
									opacity: visible ? 1 : 0,
									transform: visible ? 'translateY(0px)' : 'translateY(36px)',
									transition: `opacity 0.6s ease ${0.15 + i * 0.12}s, transform 0.6s ease ${0.15 + i * 0.12}s`,
								}}
							>
								<h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '32px', lineHeight: '40px', color: '#fff', margin: 0 }}>
									{c.title}
								</h4>
								<p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '18px', lineHeight: '24px', color: 'rgba(var(--text-rgb),1)', margin: 0 }}>
									{c.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
            {/* MOBILE */}
            <div className='block md:hidden' style={{ position: 'relative', minHeight: '1024px' }}>

				{/* Union(3).png — aniq koordinatalar */}
				<img
					src={imgMobileBg}
					alt=''
					aria-hidden='true'
					style={{
						position: 'absolute',
						top: '352px',
						left: '50%',
						transform: 'translateX(-50%)',
						width: '327px',
						height: '648px',
						borderRadius: '8px',
						opacity: 1,
						zIndex: 0,
						pointerEvents: 'none',
					}} loading='lazy' decoding='async' />

				{/* Rasm card */}
				<div style={{ padding: '20px 16px 0', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
					<div
						style={{
							position: 'relative',
							borderRadius: '20px',
							overflow: 'hidden',
							width: '327px',
							height: '308px',
							opacity: visible ? 1 : 0,
							transform: visible ? 'translateY(0px)' : 'translateY(24px)',
							transition: 'opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s',
						}}
					>
						<img
							src={img1}
							alt=''
							style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading='lazy' decoding='async' />
						<div
							style={{
								position: 'absolute',
								left: 0,
								right: 0,
								bottom: 0,
								padding: '0 20px 20px',
								display: 'flex',
								flexDirection: 'column',
								gap: '8px',
								background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)',
							}}
						>
							<h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '28px', lineHeight: '36px', letterSpacing: 0, color: '#fff', margin: 0 }}>{t("components.ishOrinlariRasmlar.mos_vakansiyalarni_tez_toping")}</h3>
							<p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: 0, color: 'rgba(202,202,206,1)', margin: 0 }}>{t("components.ishOrinlariRasmlar.sizning_qiziqishlaringiz_konikmalaringiz_2")}</p>
						</div>
					</div>
				</div>

				{/* 4 ta yozuv — Union ustida */}
				<div style={{ position: 'relative', zIndex: 1, padding: '24px 16px 32px 36px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'center' }}>
					{cards.map((c, i) => (
						<div
							key={c.title}
							style={{
								padding: '24px',
								display: 'flex',
								flexDirection: 'column',
								gap: '8px',
								position: 'relative',
								top: i < 2 ? '-20px' : '0',
								opacity: visible ? 1 : 0,
								transform: visible ? 'translateY(0px)' : 'translateY(24px)',
								transition: `opacity 0.6s ease ${0.15 + i * 0.1}s, transform 0.6s ease ${0.15 + i * 0.1}s`,
							}}
						>
							<h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '24px', lineHeight: '32px', color: '#fff', margin: 0 }}>
								{c.title}
							</h4>
							<p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '15px', lineHeight: '22px', color: 'rgba(var(--text-rgb),1)', margin: 0 }}>
								{c.desc}
							</p>
						</div>
					))}
				</div>
			</div>
        </section>
    );
}

export default IshOrinlariRasmlar
