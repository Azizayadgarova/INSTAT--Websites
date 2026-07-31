import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { lazy, Suspense, useState } from 'react'
import { Link, NavLink, useOutlet } from 'react-router-dom'
import AnimatedSection from '../../components/shared/AnimatedSection'
import ParticleCanvas from '../../components/shared/ParticleCanvas'
import AboutCard from '../../components/shared/AboutCard'
import LazyLoad from '../../components/shared/LazyLoad'
import mainbg from '@/assets/bgImg/Group2.png'
import bg from '@/assets/bgImg/Vektor.svg'
import glowImg from '@/assets/Glow (6).png'
import instanIcon from '@/assets/logoInstat.png'
import { Button } from '../../components/shared/Button'
import sIconInsta from '@/assets/Major Brand Logos [1.1] (1).png'
import sIconX from '@/assets/Major Brand Logos [1.1].png'
import sIconFb from '@/assets/Vector (14).png'
import sIconLn from '@/assets/Vector (15).png'
import { EASE_SMOOTH } from '../../constants/animations'
import useSectionText from "@/hooks/useSectionText.js";

const ModernEducation = lazy(() => import('../../components/ModernEducation'))
const HeroZoom = lazy(() => import('../../components/HeroZoom'))
const StatisticComponent = lazy(() => import('../../components/StatisticComponent'))
const MentorsSection = lazy(() => import('../../components/MentorsSection'))
const Testimonials = lazy(() => import('../../components/Testimonial'))
const IntegrationSection = lazy(() => import('../../components/IntegrationSection'))
const FAQSection = lazy(() => import('../../components/FAQSection'))

const INFO_LINKS = [
  { label: "Umumiy ma'lumotlar", path: '/about/umumiy-malumot' },
  { label: 'Tuzilma', path: '/about/tuzilma' },
  { label: 'Rahbariyat', path: '/about/rahbariyat' },
  { label: 'Korrupsiyaga qarshi kurashish', path: '/about/qarshi-kurash' },
  { label: "Bo'sh ish o'rinlari", path: '/about/ish-orinlar' },
  { label: 'Mehmonhona turidagi yotoqhona', path: '/about/yotoqhona' },
  { label: 'Odob axloq qoidalari', path: '/about/odob-axloq' },
]

const LINE_COLOR = 'rgba(var(--blue-rgb),0.4)'
const STROKE_WIDTH = '1.8'

// `id` — barqaror React key. Ilgari `height + Component.name` ishlatilgan edi,
// lekin lazy() komponentida `.name` = undefined bo'lib, ikki seksiya bir xil
// kalit ("100vhundefined") olardi va React ularni chalkashtirardi.
const HOME_SECTIONS = [
  { id: 'statistics',  Component: StatisticComponent, height: '400px', animated: true },
  { id: 'education',   Component: ModernEducation,    height: '100vh' },
  { id: 'hero-zoom',   Component: HeroZoom,           height: '100vh' },
  { id: 'mentors',     Component: MentorsSection,     height: '850px' },
  { id: 'testimonials',Component: Testimonials,       height: '700px', suspenseHeight: '600px' },
  { id: 'integration', Component: IntegrationSection, height: '850px', suspenseHeight: '600px' },
  { id: 'faq',         Component: FAQSection,         height: '600px' },
]

const NavItem = ({ link }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <NavLink
      to={link.path}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      {({ isActive }) => (
        <div style={{ display: 'flex', alignItems: 'center', padding: '0', position: 'relative' }}>
          {/* Indicator line */}
          <div style={{
            width: '4px',
            height: '40px',
            borderRadius: isActive ? '999px' : '0',
            background: isActive ? 'rgba(74, 144, 226, 1)' : 'rgba(34, 37, 48, 1)',
            flexShrink: 0,
            transition: 'background 0.2s',
          }} />
          <div style={{
            marginLeft: '8px',
            padding: '8px 12px',
            borderRadius: '4px',
            background: hovered && !isActive ? 'rgba(var(--bg-rgb),1)' : 'transparent',
            color: isActive ? 'rgba(var(--cyan-rgb),1)' : 'rgba(255, 255, 255, 1)',
            fontFamily: 'Inter Display, sans-serif',
            fontWeight: isActive ? 600 : 500,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '-0.02em',
            transition: 'background 0.2s, color 0.2s',
            width: '100%',
          }}>
            {link.label}
          </div>
        </div>
      )}
    </NavLink>
  )
}

const SectionFallback = ({ height }) => (
  <div style={{ minHeight: height, background: 'var(--bg-primary)' }} />
)

const About = () => {
  const {
    t
  } = useTranslation();

  const outlet = useOutlet()
    const st = useSectionText('main')

  if (outlet) {
    return (
      <div style={{ background: 'rgba(var(--card-rgb),1)', minHeight: '100vh' }}>
        <div className='mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-8 md:flex-row md:gap-0 md:px-[60px] lg:px-[130px]'>
          <aside
            className='w-full flex-shrink-0 md:sticky md:top-20 md:h-[calc(100vh-80px)] md:w-[320px] lg:w-[365px]'
            style={{ background: 'rgba(var(--card-rgb),1)' }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              overflowY: 'auto',
              paddingTop: '35px',
              paddingRight: '0px',
              paddingBottom: '40px',
              boxSizing: 'border-box',
            }}>
              {/* Ortga button */}
              <div>
                <Link
                  to="/"
                  className="w-[88px] h-[40px] flex items-center justify-center gap-2 rounded-[10px] px-[10px] mb-9 text-white no-underline text-[14px] font-medium bg-[rgba(var(--blue-rgb),0.05)] backdrop-blur-[16px] shadow-[inset_0_2px_6px_rgba(255,255,255,0.25),inset_0_-2px_4px_rgba(var(--bg-rgb),0.3),0_16px_24px_-8px_rgba(var(--bg-rgb),0.1),0_0_0_1px_rgba(255,255,255,0.08)] hover:text-white hover:scale-[1.02] transition-all duration-300"
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{t("pages.about.ortga")}</span>
                </Link>
              </div>

              {/* Nav — har bir link border orqali uzluksiz chiziq hosil qiladi */}
              <nav style={{ display: 'flex', flexDirection: 'column', gap: 0, alignSelf: 'flex-start', width: '100%' }}>
                {INFO_LINKS.map(link => (
                  <NavItem key={link.path} link={link} />
                ))}
              </nav>

              {/* Share section */}
              <div style={{ marginTop: '32px', paddingLeft: '6px' }}>
                <p style={{
                  fontFamily: 'Inter Display, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '28px',
                  letterSpacing: '-0.02em',
                  color: 'rgba(153, 160, 174, 1)',
                  marginBottom: '12px',
                }}>{t("pages.about.share_this_blog")}</p>
                <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                  {[
                    { src: sIconInsta, alt: 'Instagram' },
                    { src: sIconX,     alt: 'X' },
                    { src: sIconFb,    alt: 'Facebook' },
                    { src: sIconLn,    alt: 'LinkedIn' },
                  ].map(({ src, alt }) => (
                    <div key={alt} style={{ width: 24, height: 24, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} loading='lazy' decoding='async' />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          <main className='min-w-0 flex-1 pb-[60px] md:pl-[30px] md:pr-[60px]'>
            {outlet}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className='relative flex items-center flex-col min-h-screen w-full bg-[rgba(var(--bg-rgb),1)]'>
      <img
        src={bg}
        alt=''
        aria-hidden='true'
        width={1440}
        height={700}
        fetchpriority='high'
       
        className='absolute inset-0 w-full md:w-[80%] h-[600px] md:h-[969px] mx-auto -z-0 object-cover md:object-fill' decoding='async' />
      <div className='absolute inset-0 bg-[rgba(var(--bg-rgb),1)] opacity-40 -z-0' />
      <div className='pt-[40px] z-30 flex flex-col items-center px-4 w-full'>
        <motion.div
          className='pt-[40px] px-2 text-center'
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_SMOOTH }}
        >
          <Button text={t("pages.about.head_line")} />
        </motion.div>

        <div className='text-center mt-[24px] px-4'>
          <h1 className='font-poppins text-[32px] sm:text-[48px] md:text-[64px] font-semibold pt-[15px] text-[rgba(var(--text-rgb),1)]'>{ st('main_title1', t("pages.about.malumotlar_va_tahlil_ilmi"))}<br />
            <span className='text-[rgba(var(--cyan-rgb),1)]'>{st('main_title2', t("pages.about.raqamli_talim_platformasi"))}</span>
          </h1>
          <motion.p
            className='text-[rgba(var(--text-rgb),1)] text-[15px] md:text-[18px]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_SMOOTH }}
          >{st('main_description1', t("pages.about.talim_ilm_fan_va"))}</motion.p>
        </div>
      </div>
      <motion.div
        className='relative w-full max-w-[1200px] mt-[50px] md:mt-[90px] px-4 md:px-0'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: EASE_SMOOTH }}
      >
        <ParticleCanvas />

        <div
          className='absolute inset-0 rounded-[40px] blur-xl md:blur-2xl opacity-50 md:opacity-70'
          style={{
            background: `
              radial-gradient(circle at top, rgba(56,160,255,0.8), transparent 70%),
              radial-gradient(circle at 20% 40%, rgba(56,160,255,0.4), transparent 40%),
              radial-gradient(circle at 80% 40%, rgba(56,160,255,0.4), transparent 40%)
            `,
          }}
        />

        <img
          src={glowImg}
          alt=''
          aria-hidden='true'
          loading='lazy'
          decoding='async'
          className='absolute left-1/2 -translate-x-1/2 pointer-events-none select-none z-[1] w-[95%] md:w-[65%] -top-[25px] md:-top-[55px]'
          style={{ height: 'auto' }}
        />

        <div
          className='relative w-full h-auto md:h-[550px] rounded-[40px] border z-10 overflow-hidden'
          style={{ borderColor: 'rgba(47, 58, 68, 0.5)' }}
        >
          <img
            src={mainbg}
            alt=''
            aria-hidden='true'
            fetchpriority='high'
           
            className='absolute inset-0 w-full h-full object-cover' decoding='async' />

          <div className="hidden md:block relative w-full h-[550px]">
            <svg className='absolute inset-0 w-full h-full pointer-events-none z-10' viewBox='0 0 1200 550'>
              <g fill='none' stroke={LINE_COLOR} strokeWidth={STROKE_WIDTH}>
                <path d='M 600 275 C 500 275, 450 110, 355 110' />
                <path d='M 600 275 C 500 275, 450 440, 355 440' />
                <path d='M 600 275 C 700 275, 750 110, 845 110' />
                <path d='M 600 275 C 700 275, 750 440, 845 440' />
              </g>
            </svg>

            <motion.div
              className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20'
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.6, ease: EASE_SMOOTH }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '280px',
                  height: '280px',
                  borderRadius: '50%',
                  padding: '2.33px',
                  background: 'linear-gradient(180deg, rgba(var(--blue-rgb),0.6) 0%, rgba(var(--blue-rgb),0) 60%)',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'var(--card-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'inset 0px 5px 20px rgba(255,255,255,0.05), 0px -10px 40px rgba(var(--blue-rgb),0.2)',
                  }}
                >
                  <img src={instanIcon} alt='logo' className='w-[220px] h-[220px] object-contain relative z-10' loading='lazy' decoding='async' />
                </div>
              </div>
            </motion.div>

            <AboutCard label="Onlayn ta'lim" style={{ left: '75px', top: '85px' }} xFrom={-30} delay={0.65} to='/platform/onlayn-talim' />
            <AboutCard label="Mikro ma'lumotlar" style={{ left: '75px', top: '415px' }} xFrom={-30} delay={0.79} to='/platform/mikro-malumotlar' />
            <AboutCard label='Raqamli kutubxona' style={{ right: '75px', top: '85px' }} xFrom={30} delay={0.65} to='/platform/raqamli-kutubxona' />
            <AboutCard label='Elektron jurnal' style={{ right: '75px', top: '415px' }} xFrom={30} delay={0.79} to='/platform/elektron-jurnal' />
          </div>

          <div className="md:hidden relative w-full pt-8 pb-10 px-5 flex flex-col items-center">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 40%, rgba(var(--blue-rgb),0.12) 0%, transparent 65%)',
              }}
            />

            <div className="flex flex-col gap-3 w-full z-20">
              {[
                { label: "Onlayn ta'lim", delay: 0.25, to: '/platform/onlayn-talim' },
                { label: "Mikro ma'lumotlar", delay: 0.35, to: '/platform/mikro-malumotlar' },
              ].map(({ label, delay, to }) => (
                <AboutCard key={label} label={label} mobile delay={delay} to={to} />
              ))}
            </div>

            <div className="flex flex-col items-center z-10" style={{ margin: '6px 0' }}>
              <div className="w-[1.5px] h-6" style={{ background: 'linear-gradient(to bottom, rgba(var(--blue-rgb),0.3), rgba(var(--blue-rgb),0.8))' }} />
              <div className="w-[6px] h-[6px] rounded-full" style={{ background: 'rgba(var(--blue-rgb),0.9)' }} />
              <div className="w-[1.5px] h-6" style={{ background: 'linear-gradient(to bottom, rgba(var(--blue-rgb),0.8), rgba(var(--blue-rgb),0.3))' }} />
            </div>

            <motion.div
              className='relative z-20'
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  padding: '2.5px',
                  background: 'linear-gradient(180deg, rgba(var(--blue-rgb),0.7) 0%, rgba(var(--blue-rgb),0.1) 100%)',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'var(--card-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'inset 0px 5px 20px rgba(255,255,255,0.05), 0px 0px 40px rgba(var(--blue-rgb),0.3)',
                  }}
                >
                  <img src={instanIcon} alt='logo' className='w-[110px] h-[110px] object-contain' loading='lazy' decoding='async' />
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col items-center z-10" style={{ margin: '6px 0' }}>
              <div className="w-[1.5px] h-6" style={{ background: 'linear-gradient(to bottom, rgba(var(--blue-rgb),0.8), rgba(var(--blue-rgb),0.3))' }} />
              <div className="w-[6px] h-[6px] rounded-full" style={{ background: 'rgba(var(--blue-rgb),0.9)' }} />
              <div className="w-[1.5px] h-6" style={{ background: 'linear-gradient(to bottom, rgba(var(--blue-rgb),0.3), rgba(var(--blue-rgb),0.8))' }} />
            </div>

            <div className="flex flex-col gap-3 w-full z-20">
              {[
                { label: 'Raqamli kutubxona', delay: 0.5, to: '/platform/raqamli-kutubxona' },
                { label: 'Elektron jurnal', delay: 0.6, to: '/platform/elektron-jurnal' },
              ].map(({ label, delay, to }) => (
                <AboutCard key={label} label={label} mobile delay={delay} to={to} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 0 }}>
        {HOME_SECTIONS.map(({ id, Component, height, suspenseHeight, animated }) => {
          const sh = suspenseHeight || height
          const content = animated
            ? <AnimatedSection style={{ width: '100%' }}><Component /></AnimatedSection>
            : <Component />
          return (
            <LazyLoad key={id} fallback={<SectionFallback height={height} />}>
              <Suspense fallback={<SectionFallback height={sh} />}>
                {content}
              </Suspense>
            </LazyLoad>
          )
        })}
      </div>
    </div>
  );
}

export default About