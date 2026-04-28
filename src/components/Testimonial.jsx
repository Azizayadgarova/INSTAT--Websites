import gsap from 'gsap'
import { memo, useEffect, useRef } from 'react'
import starImg from '../assets/Star.png'
import AnimatedSection from './shared/AnimatedSection'
import SectionBackground from './shared/SectionBackground'
import Text from './shared/Text'

const testimonials = [
    { id: 1, name: 'Dilnoza Rahmonova', user: '@dilnozrakhmonova13', text: "Online va oflayn ta'lim imkoniyatlari juda qulay...", img: 'https://i.pravatar.cc/150?u=1', stars: 5 },
    { id: 2, name: 'Jasmin Xolmatova', user: '@jasminxolmatova234', text: "Universitetda ta'lim sifati yuqori...", img: 'https://i.pravatar.cc/150?u=2', stars: 5 },
    { id: 3, name: 'Bekzod Ismoilov', user: '@bekzodismoilov', text: 'Bu universitet menga nafaqat bilim...', img: 'https://i.pravatar.cc/150?u=3', stars: 5 },
    { id: 4, name: 'John Smith', user: '@johnsmith345', text: 'The university provides modern facilities...', img: 'https://i.pravatar.cc/150?u=4', stars: 5 },
]

const StarIcon = () => (
    <img src={starImg} width='16' height='16' alt='' aria-hidden='true' style={{ display: 'inline-block' }} />
)

const Testimonials = () => {
    const row1Ref = useRef(null)
    const row2Ref = useRef(null)

    const row1 = [...testimonials, ...testimonials, ...testimonials, ...testimonials]
    const row2 = [...testimonials, ...testimonials, ...testimonials, ...testimonials]

    useEffect(() => {
        const createLoop = (el, speed, direction) => {
            if (!el) return

            const totalWidth = el.scrollWidth
            const itemWidth = totalWidth / 4

            gsap.to(el, {
                x: direction === 'left' ? -itemWidth : itemWidth,
                duration: speed,
                ease: 'none',
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize((x) => {
                        const val = parseFloat(x)
                        return direction === 'left'
                            ? (val % itemWidth)
                            : ((val - itemWidth) % itemWidth)
                    }),
                },
            })
        }

        createLoop(row1Ref.current, 30, 'left')
        createLoop(row2Ref.current, 35, 'right')

        return () => {
            gsap.killTweensOf([row1Ref.current, row2Ref.current])
        }
    }, [])

    return (
        <section style={{
            backgroundColor: 'rgba(14,18,27,1)',
            padding: '40px 0 40px',
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
        }}>
            <SectionBackground />

            <AnimatedSection className='relative z-10 mb-20 px-4'>
                <Text
                    buttonText='Talabalar fikri'
                    title="Biz bilan o'qigan talabalar"
                    highlight='nimani deydi?'
                    subtitle={
                        <>Platformamiz orqali bilim olgan talabalar <br /> real natijalari va tajribasi bilan o'rtoqlashadi</>
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
    )
}

const Card = memo(({ item }) => (
    <div
        className='inline-block'
        style={{
            width: 'clamp(280px, 75vw, 486px)',
            minHeight: '196px',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(22, 27, 38, 1)',
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
                <span className='text-white text-[14px]'>{item.user}</span>
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

        <p className='text-gray-200 text-[16px] leading-relaxed italic'>
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
