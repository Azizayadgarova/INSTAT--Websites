import image4 from '@/assets/Image (4).png'
import AsyncBoundary from '@/components/shared/AsyncBoundary'
import RichContent from '@/components/shared/RichContent'
import Seo from '@/components/shared/Seo'
import { SkeletonText } from '@/components/shared/Skeleton'
import { useSiteData } from '@/hooks/useSiteData'

import { useTranslation } from 'react-i18next'

// Statik dekorativ gradient — API'dan kelmaydi, sahifa "boshi" sifatida turadi
const HERO_GRADIENT =
	'linear-gradient(135deg, rgba(45,212,191,1) 0%, rgba(20,184,166,1) 100%)'

const HUQUQIY_ASOS = [
	"Davlat statistika qo'mitasi huzuridagi Kadrlar malakasini oshirish va statistik tadqiqotlar instituti sobiq Kadrlarni qayta tayyorlash va statistika tadqiqotlari markazining huquqiy vorisi hisoblanadi.",
	"Institut o'z faoliyatini Davlat statistika qo'mitasining 2019-yil 10-sentabrdagi 94-sonli buyrug'i bilan tasdiqlangan Ustavga (Toshkent shahar, Mirzo Ulug'bek tumani Davlat xizmatlari markazida 2019-yil 11-sentabrda ro'yxatga olingan), har yili Davlat statistika qo'mitasi tomonidan tasdiqlanadigan davlat statistika organlari xodimlarining malakasini oshirish va qayta tayyorlash dasturi hamda statistika tadqiqotlarini amalga oshirish dasturiga muvofiq amalga oshiradi.",
	"Institut faoliyatining asosiy maqsadi - davlat statistika organlari xodimlarining malakasini oshirishni tizimli asosda samarali tashkil qilish, o'qitish jarayoniga axborot-kommunikatsiya texnologiyalarini va innovatsion usullarni keng joriy etish, iqtisodiy va ijtimoiy sohalarda, shuningdek tarmoqlar va mintaqaviy muammolar bo'yicha statistik tadqiqotlarni olib borishdan iborat. Tizim xodimlarini qayta tayyorlash va malakasini oshirish bo'yicha institutda 2 ta kafedra, iqtisodiy va ijtimoiy sohalarda, hamda tarmoqlar va mintaqaviy muammolar bo'yicha statistik tadqiqotlarni olib borish bo'yicha 3 ta bo'lim tashkil etilgan.",
	"Institutda “O'zbekiston statistika axborotnomasi” choraklik elektron ilmiy jurnali (www.statmirror.uz, Axborot va ommaviy kommunikatsiyalar agentligining 2019-yil 27-avgustdagi 1309-son guvohnomasi) nashr etiladi. Oliy attestatsiya komissiyasi Rayosatining 2019-yil 30-sentabrdagi 269/2-son qaroriga asosan, “Ekonometrika va statistika” hamda “Iqtisodiyotda axborot tizimlari va texnologiyalari” ixtisosliklari bo'yicha iqtisodiyot fanlari doktori ilmiy darajasini beruvchi ilmiy kengash (DSc.30.09.2019.I.92.01 raqamli) faoliyat yuritadi. Mos ravishda, har yili ajratiladigan qabul kvotalariga asosan, ilmiy izlanuvchilar uchun mazkur ixtisosliklar bo'yicha tayanch doktorantura va doktorantura tashkil etiladi.",
]

const HuquqiyAsos = () => (
	<section style={{ maxWidth: '980px', marginTop: '40px' }}>
		<h2
			style={{
				color: '#fff',
				fontWeight: 600,
				fontSize: '20px',
				lineHeight: '28px',
				marginBottom: '16px',
			}}
		>
			Huquqiy asos
		</h2>
		<ul style={{ listStyle: 'disc', paddingLeft: '20px', margin: 0 }}>
			{HUQUQIY_ASOS.map((text, i) => (
				<li
					key={i}
					style={{
						marginBottom: '12px',
						fontFamily: 'Inter Display, sans-serif',
						fontWeight: 400,
						fontSize: '16px',
						lineHeight: '24px',
						letterSpacing: '-0.01em',
						color: 'rgba(188, 188, 188, 1)',
					}}
				>
					{text}
				</li>
			))}
		</ul>
	</section>
)

const Badge = ({ text }) => (
	<span
		style={{
			display: 'inline-flex',
			alignItems: 'center',
			gap: '8px',
			padding: '4px 16px',
			borderRadius: '8px',
			background: 'rgba(255, 255, 255, 0.04)',
			fontFamily: 'Inter Display, sans-serif',
			fontWeight: 600,
			fontSize: '16px',
			lineHeight: '28px',
			letterSpacing: '-0.02em',
			color: 'rgba(255, 255, 255, 1)',
		}}
	>
		{text}
	</span>
)

const UmumiyMalumot = () => {
	const { t } = useTranslation()
	const { data: item, loading, error, retry } = useSiteData(
		d => d.byModuleKey.about?.about ?? null,
	)

	const html = (item?.value ?? '').toString().trim()

	return (
		<div style={{ width: '100%', padding: '59px 0 80px 0' }}>
			
			<Seo title={t('menu.about.umumiy-malumot')} />

			<div style={{ marginBottom: '20px', display: 'inline-flex' }}>
				<Badge text={t('menu.about.title')} />
			</div>

			<h1 className='gradient-heading' style={{ marginBottom: '32px' }}>
				{t('menu.about.umumiy-malumot')}
			</h1>
			<img className='mb-[40px] max-w-full h-auto' src={image4} alt="" />

			{/* Chegara/fon YO'Q — matn to'g'ridan-to'g'ri fonda */}
			<AsyncBoundary
		
				loading={loading}
				error={error}
				onRetry={retry}
				isEmpty={!html}
				skeleton={<SkeletonText lines={10}  />}
			>
				<RichContent html={html} className='umumiy-malumot-text' />
			</AsyncBoundary>

			<HuquqiyAsos />
		</div>
	)
}

export default UmumiyMalumot
