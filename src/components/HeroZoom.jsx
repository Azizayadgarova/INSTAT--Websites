import {useTranslation} from 'react-i18next'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useEffect, useRef} from 'react'

import studentWebp from '@/assets/bg1.webp'
import phoneImg from '@/assets/phone.png'
import useSectionText from "@/hooks/useSectionText.js";
import useSectionStats from "@/hooks/useSectionStats.js";
import useSectionPath from "@/hooks/useSectionPath.js";

gsap.registerPlugin(ScrollTrigger)

const HeroZoom = () => {
    const {
        t
    } = useTranslation();

    const containerRef = useRef(null)
    const zoomWrapperRef = useRef(null)
    const phoneFrameRef = useRef(null)

    const titleRef = useRef(null)
    const descRef = useRef(null)
    const bottomTextRef = useRef(null)
    const st = useSectionText('main')
    const stImg = useSectionPath('main')

    useEffect(() => {
        document.body.style.overflowX = 'hidden'

        const ctx = gsap.context(() => {
            const screenElement = zoomWrapperRef.current?.querySelector('.screen-box')

            const wrapperW = zoomWrapperRef.current.offsetWidth
            const initialScale = window.innerWidth / (wrapperW * 0.82)

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=80%',
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onRefresh: () => {
                        const w = zoomWrapperRef.current?.offsetWidth
                        if (w)
                            gsap.set(zoomWrapperRef.current, {
                                scale: window.innerWidth / (w * 0.82),
                            })
                    },
                },
            })

            tl.fromTo(
                zoomWrapperRef.current,
                {scale: initialScale},
                {scale: 1, ease: 'none', duration: 1},
            )

                .fromTo(
                    screenElement,
                    {borderRadius: '0rem'},
                    {borderRadius: '7rem', ease: 'power2.out', duration: 0.3},
                    '<',
                )

                .fromTo(
                    phoneFrameRef.current,
                    {opacity: 0},
                    {opacity: 1, ease: 'power2.out', duration: 0.35},
                    '<',
                )

                .to(
                    titleRef.current,
                    {
                        y: -80,
                        opacity: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                    },
                    0,
                )

                .to(
                    descRef.current,
                    {
                        y: -60,
                        opacity: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                    },
                    0.1,
                )

                .fromTo(
                    bottomTextRef.current,
                    {opacity: 0, y: 80},
                    {opacity: 1, y: 0, duration: 0.8, ease: 'power2.out'},
                    0.3,
                )
        }, containerRef)

        return () => {
            ctx.revert()
            document.body.style.overflowX = ''
        }
    }, [])

    return (
        <>
            {/* MOBILE: statik, animatsiyasiz */}
            <section
                className='md:hidden relative w-full bg-[rgba(var(--bg-rgb),1)] flex flex-col items-center py-10 px-4 gap-6'>
                <div className='relative w-full' style={{aspectRatio: '16/9'}}>
                    <div
                        className='absolute overflow-hidden'
                        style={{
                            top: '8%',
                            left: '1%',
                            width: '98%',
                            height: '84%',
                            borderRadius: '8% / 14%',
                        }}
                    >
                        <img
                            src={stImg('main_title4')}
                            alt='content'
                            loading='lazy'
                            decoding='async'
                            className='w-full h-full object-cover'
                        />
                        <div
                            className='absolute inset-0'
                            style={{background: 'linear-gradient(0deg, rgba(var(--bg-rgb),0.7) 0%, rgba(var(--bg-rgb),0.3) 50%, rgba(var(--bg-rgb),0) 100%)'}}
                        />
                    </div>
                    <img
                        src={phoneImg}
                        alt=''
                        className='absolute inset-0 w-full h-full object-contain pointer-events-none z-10'
                        loading='lazy' decoding='async'/>
                </div>

                <p className='text-center text-white leading-relaxed px-2'
                   style={{fontSize: 'clamp(14px, 4vw, 16px)'}}>{t("components.heroZoom.zamonaviy_platforma_asosida_ishlab")}{' '}
                    <span
                        className='text-[rgba(var(--cyan-rgb),1)]'>{t("components.heroZoom.onlayn_kurslar")}</span>{' '}{t("components.heroZoom.talabalarga_yuqori_sifatli_talim")}
                </p>
            </section>
            {/* DESKTOP: GSAP animatsiya, o'zgarishsiz */}
            <section
                ref={containerRef}
                className='max-md:hidden relative w-full mt-[100px] mb-[40px] h-screen bg-[rgba(var(--bg-rgb),1)] flex items-center justify-center overflow-y-hidden z-[30]'
                style={{isolation: 'isolate'}}
            >
                <div
                    ref={zoomWrapperRef}
                    className='relative w-full max-w-[95vw] md:max-w-[85vw] lg:max-w-[850px] aspect-[16/9] flex items-center justify-center'
                >
                    {/* SCREEN */}
                    <div
                        className='screen-box absolute top-[5%] left-[1%] w-[98%] h-[90%] overflow-hidden shadow-2xl z-10'>
                        <img
                            src={stImg('main_title4')}
                            alt='content'
                            loading='lazy'
                            decoding='async'
                            className='absolute inset-0 w-full h-[92%] mt-[20px] object-cover'
                        />

                        <div
                            className='absolute inset-0 z-10'
                            style={{
                                background:
                                    'linear-gradient(0deg, rgba(var(--bg-rgb),0.9) 0%, rgba(var(--bg-rgb),0.5) 46.15%, rgba(var(--bg-rgb),0) 100%)',
                            }}
                        />

                        {/* TOP TEXT */}
                        <div
                            className='relative z-20 flex flex-col items-center justify-center mt-[15px] h-full text-center text-white px-4 max-w-5xl mx-auto'>
                            <h1
                                ref={titleRef}
                                className='text-[32px] font-bold leading-[1.1] tracking-tight'
                            >{st('main_title4', t("components.heroZoom.zamonaviy_kasblarni") + t("components.heroZoom.organishni") + t("components.heroZoom.bugun_boshlang")).split(" ").slice(0, -2).join(" ")}<br/><span
                                className='hero-shimmer'>{st('main_title4', t("components.heroZoom.zamonaviy_kasblarni") + t("components.heroZoom.organishni") + t("components.heroZoom.bugun_boshlang")).split(" ").slice(-2).join(" ")}</span>
                            </h1>

                            <p
                                ref={descRef}
                                className='mt-6 text-[#BCBCBC] text-[10px] max-w-2xl font-normal mx-auto leading-relaxed opacity-80'
                            >
                                {st('main_description4', t("components.heroZoom.zamonaviy_platforma_asosida_ishlab_2") + t("components.heroZoom.talabalarga_yuqori_sifatli_talim_2")).split(" ").slice(0, -st('main_description4', t("components.heroZoom.zamonaviy_platforma_asosida_ishlab_2") + t("components.heroZoom.talabalarga_yuqori_sifatli_talim_2")).split(" ")?.length / 2).join(" ")}
                                <br/>
                                {st('main_description4', t("components.heroZoom.zamonaviy_platforma_asosida_ishlab_2") + t("components.heroZoom.talabalarga_yuqori_sifatli_talim_2")).split(" ").slice( -st('main_description4', t("components.heroZoom.zamonaviy_platforma_asosida_ishlab_2") + t("components.heroZoom.talabalarga_yuqori_sifatli_talim_2")).split(" ")?.length / 2).join(" ")}

                            </p>
                        </div>
                    </div>

                    {/* PHONE FRAME */}
                    <img
                        ref={phoneFrameRef}
                        src={phoneImg}
                        alt='iPhone Frame'
                        className='relative z-30 w-full h-full object-contain pointer-events-none' loading='lazy'
                        decoding='async'/>
                </div>

                {/* BOTTOM TEXT OUTSIDE PHONE */}
                <div
                    ref={bottomTextRef}
                    className='absolute top-[90%] text-center text-white  text-[20px]  opacity-0'
                >{t("components.heroZoom.zamonaviy_platforma_asosida_ishlab")}{' '}
                    <span
                        className='text-[rgba(var(--cyan-rgb),1)]'>{t("components.heroZoom.onlayn_kurslar")}</span>{' '}{t("components.heroZoom.talabalarga_yuqori")}<br/>{t("components.heroZoom.sifatli_talim_va_qulay")}
                </div>
            </section>
        </>
    );
}

export default HeroZoom
