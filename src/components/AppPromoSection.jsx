import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import appstore from '../assets/icons/appstore.png'
import google from '../assets/googleplay.png'
import phone2 from '../assets/iPhone 14 Pro (1).png'
import phone1 from '../assets/iPhone 14 Pro.png'

const AppPromoSection = () => {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
        else setVisible(false)
      },
      { threshold: 0.2 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const textVariant = (delay) => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
    },
  })

  return (
    <section className='w-full bg-[#0E121B] pb-[40px] flex justify-center'>
      <div className='w-full max-w-[1200px] mx-auto px-6'>

        <div
          ref={sectionRef}
          className='relative bg-[#161B26] rounded-[24px]'
          style={{ minHeight: '480px', overflow: 'visible' }}
        >
          <div className='flex items-center px-6 md:px-[60px]' style={{ minHeight: '480px' }}>
            <div className='flex flex-col z-30 w-full md:w-[473px] md:shrink-0 py-10 md:py-[60px]'>
              <motion.h3
                initial='hidden'
                animate={visible ? 'visible' : 'hidden'}
                variants={textVariant(0.1)}
                className='font-medium text-white text-[26px] sm:text-[36px] md:text-[48px] leading-[120%] tracking-[-0.02em] m-0'
              >
                Mobil ilova bilan <br /> yanada qulayroq!
              </motion.h3>

              <motion.p
                initial='hidden'
                animate={visible ? 'visible' : 'hidden'}
                variants={textVariant(0.3)}
                className='text-[rgba(188,188,188,1)] mt-4 text-[15px] leading-[150%]'
              >
                Bizning mobil ilovamiz bilan bilim olish yanada oson. Hoziroq
                ilovamizni yuklab oling!
              </motion.p>

              <motion.div
                initial='hidden'
                animate={visible ? 'visible' : 'hidden'}
                variants={textVariant(0.5)}
                className='flex flex-row gap-4 mt-12'
              >
                <img src={google} alt='Google Play' loading='lazy' decoding='async' className='h-[52px] w-auto object-contain cursor-pointer hover:scale-105 transition-transform' />
                <img src={appstore} alt='App Store' loading='lazy' decoding='async' className='h-[52px] w-auto object-contain cursor-pointer hover:scale-105 transition-transform' />
              </motion.div>
            </div>
          </div>

          <div
            className='hidden md:block absolute right-0 bottom-0 w-[46%] pointer-events-none rounded-br-[24px]'
            style={{
              height: '130%',
              overflow: 'hidden',
              top: 'auto',
            }}
          >
            <img
              src={phone1}
              alt='Mobil ilova — old ko&#39;rinish'
              loading='lazy'
              decoding='async'
              className='absolute object-contain z-20'
              style={{
                width: '360px',
                height: '600px',
                left: '0%',
                bottom: -49,
                willChange: 'transform',
                transform: visible ? 'translateY(0px)' : 'translateY(100%)',
                transition: 'transform 1s cubic-bezier(0.16,1,0.3,1) 0s',
              }}
            />
            <img
              src={phone2}
              alt='Mobil ilova — orqa ko&#39;rinish'
              loading='lazy'
              decoding='async'
              className='absolute object-contain z-10'
              style={{
                width: '267px',
                height: '460px',
                right: '5%',
                bottom: -35,
                willChange: 'transform',
                transform: visible ? 'translateY(0px)' : 'translateY(100%)',
                transition: 'transform 1s cubic-bezier(0.16,1,0.3,1) 0.18s',
              }}
            />
          </div>
        </div>

      </div>
    </section>
  )
}

export default AppPromoSection
