import { lazy, Suspense } from 'react'
import { useOutlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageIntro from '../../components/shared/PageIntro'
import AnimatedSection from '../../components/shared/AnimatedSection'
import ParticleCanvas from '../../components/shared/ParticleCanvas'
import AboutCard from '../../components/shared/AboutCard'
import LazyLoad from '../../components/shared/LazyLoad'
import mainbg from '../../assets/bgImg/Group2.png'
import bg from '../../assets/bgImg/Vektor.svg'
import glowImg from '../../assets/Glow (6).png'
import instanIcon from '../../assets/logoInstat.png'
import { Button } from '../../components/shared/Button'

const ModernEducation = lazy(() => import('../../components/ModernEducation'))
const HeroZoom = lazy(() => import('../../components/HeroZoom'))
const StatisticComponent = lazy(() => import('../../components/StatisticComponent'))
const MentorsSection = lazy(() => import('../../components/MentorsSection'))
const Testimonials = lazy(() => import('../../components/Testimonial'))
const IntegrationSection = lazy(() => import('../../components/IntegrationSection'))
const FAQSection = lazy(() => import('../../components/FAQSection'))
const AppPromoSection = lazy(() => import('../../components/AppPromoSection'))
const TopFooter = lazy(() => import('../../components/TopFooter'))
const Footer = lazy(() => import('../../components/Footer'))

const LC = 'rgba(43, 117, 204, 0.4)'
const SW = '1.8'
const FALLBACK_MD = <div style={{ minHeight: '400px', background: 'rgba(14,18,27,1)' }} />

const About = () => {
  const outlet = useOutlet()
  if (outlet) return outlet

  return (
    <div className='relative flex items-center flex-col min-h-screen w-full bg-[rgba(14,18,27,1)]'>
      <PageIntro />
      <img
        src={bg}
        alt=''
        aria-hidden='true'
        width={1440}
        height={700}
        fetchpriority='high'
        decoding='async'
        className='absolute inset-0 w-full md:w-[80%] h-[600px] md:h-[969px] mx-auto -z-0 object-cover md:object-fill'
      />
      <div className='absolute inset-0 bg-[rgba(14,18,27,1)] opacity-40 -z-0' />

      <div className='pt-[40px] z-30 flex flex-col items-center px-4 w-full'>
        <motion.div
          className='pt-[40px] px-2 text-center'
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button text="O'zbekiston Respublikasi Prezidenti huzuridagi Statistika agentligi" />
        </motion.div>

        <div className='text-center mt-[24px] px-4'>
          <h1 className='font-poppins text-[32px] sm:text-[48px] md:text-[64px] font-semibold pt-[15px] text-[rgba(188,188,188,1)]'>
            "Ma'lumotlar va tahlil ilmi"
            <br />
            <span className='text-[rgba(0,230,252,1)]'>
              Raqamli ta'lim platformasi
            </span>
          </h1>
          <motion.p
            className='text-[rgba(188,188,188,1)] text-[15px] md:text-[18px]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Ta'lim, ilm-fan va karyera uchun yagona raqamli platforma
          </motion.p>
        </div>
      </div>

      <motion.div
        className='relative w-full max-w-[1200px] mt-[50px] md:mt-[90px] px-4 md:px-0'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <ParticleCanvas />

        <div
          className='absolute inset-0 rounded-[40px] blur-[60px] md:blur-[80px] opacity-50 md:opacity-70'
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
            decoding='async'
            className='absolute inset-0 w-full h-full object-cover'
          />

          <div className="hidden md:block relative w-full h-[550px]">
            <svg className='absolute inset-0 w-full h-full pointer-events-none z-10' viewBox='0 0 1200 550'>
              <g fill='none' stroke={LC} strokeWidth={SW}>
                <path d='M 600 275 C 500 275, 450 110, 355 110' />
                <path d='M 600 275 L 355 275' />
                <path d='M 600 275 C 500 275, 450 440, 355 440' />
                <path d='M 600 275 C 700 275, 750 110, 845 110' />
                <path d='M 600 275 L 845 275' />
                <path d='M 600 275 C 700 275, 750 440, 845 440' />
              </g>
            </svg>

            <motion.div
              className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20'
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '280px',
                  height: '280px',
                  borderRadius: '50%',
                  padding: '2.33px',
                  background: 'linear-gradient(180deg, rgba(43,117,204,0.6) 0%, rgba(43,117,204,0) 60%)',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'rgba(22, 27, 38, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'inset 0px 5px 20px rgba(255, 255, 255, 0.05), 0px -10px 40px rgba(43, 117, 204, 0.2)',
                  }}
                >
                  <img src={instanIcon} alt='logo' className='w-[220px] h-[220px] object-contain relative z-10' />
                </div>
              </div>
            </motion.div>

            <AboutCard label="Onlayn ta'lim" style={{ left: '75px', top: '85px' }} xFrom={-30} delay={0.65} />
            <AboutCard label="Bo'sh ish o'rinlari" style={{ left: '75px', top: '250px' }} xFrom={-30} delay={0.72} />
            <AboutCard label="Mikro ma'lumotlar" style={{ left: '75px', top: '415px' }} xFrom={-30} delay={0.79} />
            <AboutCard label='Raqamli kutubxona' style={{ right: '75px', top: '85px' }} xFrom={30} delay={0.65} />
            <AboutCard label='Samaradorlik tizimi' style={{ right: '75px', top: '250px' }} xFrom={30} delay={0.72} />
            <AboutCard label='Elektron jurnal' style={{ right: '75px', top: '415px' }} xFrom={30} delay={0.79} />
          </div>

          <div className="md:hidden relative w-full pt-10 pb-12 px-5 flex flex-col items-center">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(43,117,204,0.15) 0%, transparent 65%)',
              }}
            />

            <div className="flex flex-col gap-3 w-full z-20">
              {[
                { label: "Onlayn ta'lim", delay: 0.3 },
                { label: "Bo'sh ish o'rinlari", delay: 0.35 },
                { label: "Mikro ma'lumotlar", delay: 0.4 },
              ].map(({ label, delay }) => (
                <AboutCard key={label} label={label} mobile delay={delay} />
              ))}
            </div>

            <div className="flex flex-col items-center my-4 z-10">
              <div className="w-[2px] h-8 bg-gradient-to-b from-[rgba(43,117,204,0.2)] to-[rgba(43,117,204,0.7)]" />
              <div className="w-2 h-2 rounded-full bg-[rgba(43,117,204,0.7)]" />
            </div>

            <motion.div
              className='relative z-20'
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  padding: '2.5px',
                  background: 'linear-gradient(180deg, rgba(43,117,204,0.7) 0%, rgba(43,117,204,0.1) 100%)',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'rgba(22, 27, 38, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'inset 0px 5px 20px rgba(255,255,255,0.05), 0px 0px 40px rgba(43,117,204,0.3)',
                  }}
                >
                  <img src={instanIcon} alt='logo' className='w-[110px] h-[110px] object-contain' />
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col items-center my-4 z-10">
              <div className="w-2 h-2 rounded-full bg-[rgba(43,117,204,0.7)]" />
              <div className="w-[2px] h-8 bg-gradient-to-b from-[rgba(43,117,204,0.7)] to-[rgba(43,117,204,0.2)]" />
            </div>

            <div className="flex flex-col gap-3 w-full z-20">
              {[
                { label: 'Raqamli kutubxona', delay: 0.5 },
                { label: 'Samaradorlik tizimi', delay: 0.55 },
                { label: 'Elektron jurnal', delay: 0.6 },
              ].map(({ label, delay }) => (
                <AboutCard key={label} label={label} mobile delay={delay} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 0 }}>
        <Suspense fallback={<div style={{ minHeight: '400px', background: 'rgba(14,18,27,1)' }} />}>
          <AnimatedSection style={{ width: '100%' }}>
            <StatisticComponent />
          </AnimatedSection>
        </Suspense>
        <Suspense fallback={<div style={{ minHeight: '100vh', background: 'rgba(14,18,27,1)' }} />}>
          <ModernEducation />
        </Suspense>
        <Suspense fallback={<div style={{ minHeight: '100vh', background: 'rgba(14,18,27,1)' }} />}>
          <HeroZoom />
        </Suspense>
        <LazyLoad fallback={<div style={{ minHeight: '850px', background: 'rgba(14,18,27,1)' }} />}>
          <Suspense fallback={<div style={{ minHeight: '850px', background: 'rgba(14,18,27,1)' }} />}>
            <MentorsSection />
          </Suspense>
        </LazyLoad>
        <LazyLoad fallback={<div style={{ minHeight: '700px', background: 'rgba(14,18,27,1)' }} />}>
          <Suspense fallback={<div style={{ minHeight: '600px', background: 'rgba(14,18,27,1)' }} />}>
            <Testimonials />
          </Suspense>
        </LazyLoad>
        <LazyLoad fallback={<div style={{ minHeight: '850px', background: 'rgba(14,18,27,1)' }} />}>
          <Suspense fallback={<div style={{ minHeight: '600px', background: 'rgba(14,18,27,1)' }} />}>
            <IntegrationSection />
          </Suspense>
        </LazyLoad>
        <LazyLoad fallback={<div style={{ minHeight: '600px', background: 'rgba(14,18,27,1)' }} />}>
          <Suspense fallback={<div style={{ minHeight: '600px', background: 'rgba(14,18,27,1)' }} />}>
            <FAQSection />
          </Suspense>
        </LazyLoad>
        <div style={{ height: '40px' }} />
        <LazyLoad fallback={<div style={{ minHeight: '550px', background: 'rgba(14,18,27,1)' }} />}>
          <Suspense fallback={<div style={{ minHeight: '550px', background: 'rgba(14,18,27,1)' }} />}>
            <AppPromoSection />
          </Suspense>
        </LazyLoad>
        <LazyLoad fallback={<div style={{ minHeight: '400px', background: 'rgba(14,18,27,1)' }} />}>
          <Suspense fallback={FALLBACK_MD}>
            <TopFooter />
          </Suspense>
        </LazyLoad>
        <LazyLoad fallback={<div style={{ minHeight: '400px', background: 'rgba(14,18,27,1)' }} />}>
          <Suspense fallback={FALLBACK_MD}>
            <Footer />
          </Suspense>
        </LazyLoad>
      </div>
    </div>
  )
}

export default About;