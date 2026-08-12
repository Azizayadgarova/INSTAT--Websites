import gsap from 'gsap'
import { memo, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import starImg from '@/assets/Star.png'
import AnimatedSection from './shared/AnimatedSection'
import SectionBackground from './shared/SectionBackground'
import Text from './shared/Text'
import { siteLibraryFeedbacksApi } from '@/api/siteContent.api'
import { useSiteList } from '@/hooks/useSiteList'
import { toFeedback } from '@/utils/siteContent'

/** FEEDBACK yozuvini shu bo'limdagi Card kutadigan ko'rinishga o'tkazadi. */
const toCard = item => {
    const f = toFeedback(item)
    return {
        id: f.id,
        name: f.name,
        user: f.userName ? `@${f.userName.replace(/^@/, '')}` : '',
        text: f.comment,
        img: f.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(f.name)}&background=272B37&color=fff&size=150&bold=true`,
        stars: f.stars,
    }
}

const CARD_GAP = 24

/** Karta kengligi CSS'dagi `clamp(280px, 75vw, 486px)` bilan bir xil hisoblanadi. */
const cardWidth = () => {
    const vw = typeof window === 'undefined' ? 1440 : window.innerWidth
    return Math.min(486, Math.max(280, vw * 0.75)) + CARD_GAP
}

/**
 * Qator ekranni har doim to'liq qoplashi uchun kerakli nusxalar soni.
 * Lenta bir "to'plam" kenglikka siljiydi, shuning uchun qolgan (n-1) to'plam
 * ekran kengligidan kam bo'lmasligi kerak — aks holda o'ngda bo'sh joy qoladi.
 */
const copiesNeeded = count => {
    if (!count) return 3
    const vw = typeof window === 'undefined' ? 1440 : window.innerWidth
    return Math.max(3, Math.ceil(vw / (count * cardWidth())) + 1)
}

const StarIcon = () => (
    <img src={starImg} width='16' height='16' alt='' aria-hidden='true' style={{ display: 'inline-block' }} loading='lazy' decoding='async' />
)

const Testimonials = ({
    hideBackground = false,
    hideParticles = false,
    platformStyle = false,
    feedbackKey = 'site-library-feedbacks',
    feedbackApi = siteLibraryFeedbacksApi,
}) => {
    const { t } = useTranslation()

    const row1Ref = useRef(null)
    const row2Ref = useRef(null)
    const sectionRef = useRef(null)

    const testimonials = [
        { id: 1, name: 'Dilnoza Rahmonova',  user: '@dilnozrakhmonova13', text: t('components.testimonial.testimonial_1', "Online va oflayn ta'lim imkoniyatlari juda qulay. Darslarni istalgan vaqtda ko'rib chiqish va materiallarni yuklab olish imkoniyati mavjud. Platforma orqali bilimlarimni sezilarli darajada oshirdim."), img: 'https://i.pravatar.cc/150?u=1', stars: 5 },
        { id: 2, name: 'Jasmin Xolmatova',   user: '@jasminxolmatova234',  text: t('components.testimonial.testimonial_2', "Universitetda ta'lim sifati juda yuqori. Mutaxassislar tomonidan tayyorlangan kurslar va elektron kutubxona bizga katta yordam bermoqda. Bu platforma statistika sohasida professional bo'lishimga hissa qo'shdi."), img: 'https://i.pravatar.cc/150?u=2', stars: 5 },
        { id: 3, name: 'Bekzod Ismoilov',    user: '@bekzodismoilov',       text: t('components.testimonial.testimonial_3', "Bu platforma menga nafaqat bilim, balki amaliy ko'nikmalar ham berdi. Ilmiy maqolalar bazasi va tadqiqot materiallari juda foydali. Har bir dars aniq va tushunarli tarzda tuzilgan."), img: 'https://i.pravatar.cc/150?u=3', stars: 5 },
        { id: 4, name: 'Nodira Yusupova',    user: '@nodira_yusupova',      text: t('components.testimonial.testimonial_4', "Statistika agentligining bu platformasi juda qulay va zamonaviy. Elektron jurnallar, ilmiy maqolalar va o'quv materiallari bir joyda jamlangani ish samaradorligimni oshirdi."), img: 'https://i.pravatar.cc/150?u=44', stars: 5 },
    ]

    // API bo'sh bo'lsa statik `testimonials` ko'rsatiladi
    const { items } = useSiteList(feedbackKey, feedbackApi, toCard, testimonials)

    // Kam fikr kelganda ham lenta bo'sh qolmasligi uchun nusxalar soni ekranga moslanadi
    const [copies, setCopies] = useState(() => copiesNeeded(items.length))

    useEffect(() => {
        const update = () => setCopies(copiesNeeded(items.length))
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [items.length])

    const repeat = arr => Array.from({ length: copies }, () => arr).flat()
    const row1 = repeat(items)
    const row2 = repeat([...items].reverse())

    useEffect(() => {
        const createLoop = (el, pxPerSecond, direction, setLen) => {
            if (!el) return
            const itemWidth = el.children[setLen]
                ? el.children[setLen].offsetLeft
                : el.scrollWidth / copies
            if (!itemWidth) return
            // Tezlik fikrlar sonidan qat'i nazar bir xil bo'lishi uchun masofadan hisoblanadi
            const speed = itemWidth / pxPerSecond

            if (direction === 'left') {
                gsap.to(el, {
                    x: -itemWidth,
                    duration: speed,
                    ease: 'none',
                    repeat: -1,
                    modifiers: {
                        x: gsap.utils.unitize(x => parseFloat(x) % itemWidth),
                    },
                })
            } else {
                gsap.set(el, { x: -itemWidth })
                gsap.to(el, {
                    x: 0,
                    duration: speed,
                    ease: 'none',
                    repeat: -1,
                    modifiers: {
                        x: gsap.utils.unitize(x => ((parseFloat(x) % itemWidth) + itemWidth) % itemWidth - itemWidth),
                    },
                })
            }
        }

        createLoop(row1Ref.current, 80, 'left', items.length)
        createLoop(row2Ref.current, 80, 'right', items.length)

        const observer = new IntersectionObserver(
            ([entry]) => {
                const els = [row1Ref.current, row2Ref.current]
                if (entry.isIntersecting) {
                    gsap.getTweensOf(els).forEach(t => t.play())
                } else {
                    gsap.getTweensOf(els).forEach(t => t.pause())
                }
            },
            { threshold: 0.1 },
        )
        if (sectionRef.current) observer.observe(sectionRef.current)

        return () => {
            gsap.killTweensOf([row1Ref.current, row2Ref.current])
            observer.disconnect()
        }
        // `items` API'dan kelgach yoki nusxalar soni o'zgarganda karusel qayta qurilishi shart
    }, [items, copies])

    return (
        <>
        <section ref={sectionRef} style={{
            backgroundColor: 'rgba(var(--bg-rgb),1)',
            padding: '40px 0 80px',
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
        }}>
            <SectionBackground hideBg={hideBackground} hideParticles={hideParticles} />

            <AnimatedSection className='relative z-10 mb-20 px-4'>
                <Text
                    buttonText={platformStyle ? t('components.testimonial.fikrlar', 'Fikrlar') : t('components.testimonial.talabalar_fikri', 'Talabalar fikri')}
                    buttonType={platformStyle ? 'button2' : 'button1'}
                    title={platformStyle ? t('components.testimonial.foydalanuvchilar_fikri', 'Foydalanuvchilar fikri') : t('components.testimonial.biz_bilan_oqigan_talabalar', "Biz bilan o'qigan talabalar")}
                    titleStyle={platformStyle ? { color: '#fff', fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.02em' } : undefined}
                    subtitleStyle={platformStyle ? { color: 'rgba(202,202,206,1)' } : undefined}
                    highlight={platformStyle ? '' : t('components.testimonial.nimani_deydi', 'nimani deydi?')}
                    subtitle={
                        platformStyle
                            ? t('components.testimonial.platformamiz_allaqachon_yuzlab', 'Platformamiz allaqachon yuzlab kitobxonlarga vaqt tejash va kerakli kitobni tez topishga yordam berdi.')
                            : <>{t('components.testimonial.platformamiz_orqali_bilim_olgan', 'Platformamiz orqali bilim olgan talabalar')} <br /> {t('components.testimonial.real_natijalari_va_tajribasi', "real natijalari va tajribasi bilan o'rtoqlashadi")}</>
                    }
                />
            </AnimatedSection>

            <div
                className='relative w-full overflow-hidden'
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                }}
            >
                <div className='flex mb-10'>
                    <div ref={row1Ref} className='flex gap-6 whitespace-nowrap will-change-transform'>
                        {row1.map((item, i) => (
                            <Card key={`row1-${i}`} item={item} />
                        ))}
                    </div>
                </div>

                <div className='flex'>
                    <div ref={row2Ref} className='flex gap-6 whitespace-nowrap will-change-transform'>
                        {row2.map((item, i) => (
                            <Card key={`row2-${i}`} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
        </>
    )

}

const Card = memo(({ item }) => {
    const { t } = useTranslation()
    return (
    <div
        className='inline-block testimonial-card'
        style={{
            width: 'clamp(280px, 75vw, 486px)',
            minHeight: '196px',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(var(--card-rgb),1)',
            background: 'linear-gradient(180deg, #272B37 0%, #181B25 24%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backdropFilter: 'blur(10px)',
            willChange: 'transform',
        }}
    >
        <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
                <span className='text-white font-semibold text-[16px]'>{item.name}</span>
                <span className='text-[14px]' style={{ color: 'rgba(225, 227, 230, 1)' }}>{item.user}</span>
            </div>
            <img
                src={item.img}
                className='w-12 h-12 rounded-full object-cover'
                alt={item.name}
                width={48}
                height={48}
                loading='lazy'
                decoding='async'
            />
        </div>

        <p
            className='text-[16px] leading-relaxed italic whitespace-normal'
            style={{
                color: 'rgba(var(--text-rgb),1)',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
            }}
        >
            "{item.text}"
        </p>

        <div className='flex gap-1' aria-label={`${item.stars} ${t('components.testimonial.yulduz', 'yulduz')}`}>
            {Array.from({ length: item.stars }, (_, i) => (
                <StarIcon key={i} />
            ))}
        </div>
    </div>
    )
})

export default Testimonials
