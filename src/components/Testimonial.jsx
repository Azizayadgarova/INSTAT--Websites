import gsap from 'gsap'
import { memo, useEffect, useRef } from 'react'
import starImg from '@/assets/Star.png'
import AnimatedSection from './shared/AnimatedSection'
import SectionBackground from './shared/SectionBackground'
import Text from './shared/Text'

const testimonials = [
    { id: 1, name: 'Dilnoza Rahmonova',  user: '@dilnozrakhmonova13', text: "Online va oflayn ta'lim imkoniyatlari juda qulay. Darslarni istalgan vaqtda ko'rib chiqish va materiallarni yuklab olish imkoniyati mavjud. Platforma orqali bilimlarimni sezilarli darajada oshirdim.", img: 'https://i.pravatar.cc/150?u=1', stars: 5 },
    { id: 2, name: 'Jasmin Xolmatova',   user: '@jasminxolmatova234',  text: "Universitetda ta'lim sifati juda yuqori. Mutaxassislar tomonidan tayyorlangan kurslar va elektron kutubxona bizga katta yordam bermoqda. Bu platforma statistika sohasida professional bo'lishimga hissa qo'shdi.", img: 'https://i.pravatar.cc/150?u=2', stars: 5 },
    { id: 3, name: 'Bekzod Ismoilov',    user: '@bekzodismoilov',       text: "Bu platforma menga nafaqat bilim, balki amaliy ko'nikmalar ham berdi. Ilmiy maqolalar bazasi va tadqiqot materiallari juda foydali. Har bir dars aniq va tushunarli tarzda tuzilgan.", img: 'https://i.pravatar.cc/150?u=3', stars: 5 },
    { id: 4, name: 'Nodira Yusupova',    user: '@nodira_yusupova',      text: "Statistika agentligining bu platformasi juda qulay va zamonaviy. Elektron jurnallar, ilmiy maqolalar va o'quv materiallari bir joyda jamlangani ish samaradorligimni oshirdi.", img: 'https://i.pravatar.cc/150?u=44', stars: 5 },
]

const StarIcon = () => (
    <img src={starImg} width='16' height='16' alt='' aria-hidden='true' style={{ display: 'inline-block' }} loading='lazy' decoding='async' />
)

const Testimonials = ({ hideBackground = false, hideParticles = false, platformStyle = false }) => {
    const row1Ref = useRef(null)
    const row2Ref = useRef(null)
    const sectionRef = useRef(null)

    const row1 = [...testimonials, ...testimonials, ...testimonials]
    const reversed = [...testimonials].reverse()
    const row2 = [...reversed, ...reversed, ...reversed]

    useEffect(() => {
        const createLoop = (el, speed, direction, setLen) => {
            if (!el) return
            const itemWidth = el.children[setLen]
                ? el.children[setLen].offsetLeft
                : el.scrollWidth / 3

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

        createLoop(row1Ref.current, 25, 'left', testimonials.length)
        createLoop(row2Ref.current, 25, 'right', reversed.length)

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
    }, [])

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
                    buttonText={platformStyle ? 'Fikrlar' : 'Talabalar fikri'}
                    buttonType={platformStyle ? 'button2' : 'button1'}
                    title={platformStyle ? 'Foydalanuvchilar fikri' : "Biz bilan o'qigan talabalar"}
                    titleStyle={platformStyle ? { color: '#fff', fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.02em' } : undefined}
                    subtitleStyle={platformStyle ? { color: 'rgba(202,202,206,1)' } : undefined}
                    highlight={platformStyle ? '' : 'nimani deydi?'}
                    subtitle={
                        platformStyle
                            ? 'Platformamiz allaqachon yuzlab kitobxonlarga vaqt tejash va kerakli kitobni tez topishga yordam berdi.'
                            : <>{`Platformamiz orqali bilim olgan talabalar`} <br /> {`real natijalari va tajribasi bilan o'rtoqlashadi`}</>
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

const Card = memo(({ item }) => (
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

        <div className='flex gap-1' aria-label={`${item.stars} yulduz`}>
            {Array.from({ length: item.stars }, (_, i) => (
                <StarIcon key={i} />
            ))}
        </div>
    </div>
))

export default Testimonials
