import google from '@/assets/googleplay.png'
import appstore from '@/assets/icons/appstore.png'
import phone2 from '@/assets/iPhone 14 Pro (1).png'
import phone1 from '@/assets/iPhone 14 Pro.png'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const ease = 'cubic-bezier(0.16,1,0.3,1)'

const AppPromoSection = () => {
  const [sectionRef, visible] = useIntersectionObserver(0.2)

  return (
    <section className='w-full bg-[#0E121B] pb-[20px] md:pb-[40px] mt-[40px] flex justify-center'>
      <div className='w-full max-w-[1200px] mx-auto px-6'>

        <div
          ref={sectionRef}
          className='relative bg-[#161B26] rounded-[24px] md:min-h-[480px]'
          style={{ overflow: 'visible' }}
        >
          {/* Desktop layout */}
          <div className='hidden md:flex items-center px-[60px]' style={{ minHeight: '480px' }}>
            <div className='flex flex-col z-30 w-[473px] shrink-0 py-[60px]'>
              <h3
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity 0.8s ${ease} 0.1s, transform 0.8s ${ease} 0.1s`,
                }}
                className='font-medium text-white text-[48px] leading-[120%] tracking-[-0.02em] m-0'
              >
                Mobil ilova bilan <br /> yanada qulayroq!
              </h3>
              <p
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity 0.8s ${ease} 0.3s, transform 0.8s ${ease} 0.3s`,
                }}
                className='text-[rgba(188,188,188,1)] mt-4 text-[15px] leading-[150%]'
              >
                Bizning mobil ilovamiz bilan bilim olish yanada oson. Hoziroq ilovamizni yuklab oling!
              </p>
              <div
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity 0.8s ${ease} 0.5s, transform 0.8s ${ease} 0.5s`,
                }}
                className='flex flex-row gap-4 mt-12'
              >
                <img src={google} alt='Google Play' width={160} height={52} loading='lazy' decoding='async' className='h-13 w-auto object-contain cursor-pointer hover:scale-105 transition-transform' />
                <img src={appstore} alt='App Store' width={160} height={52} loading='lazy' decoding='async' className='h-13 w-auto object-contain cursor-pointer hover:scale-105 transition-transform' />
              </div>
            </div>
          </div>

          {/* Mobile layout */}
          <div className='flex flex-col md:hidden px-6 pt-6 pb-0'>
            <h3
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.8s ${ease} 0.1s, transform 0.8s ${ease} 0.1s`,
              }}
              className='font-medium text-white text-[26px] leading-[120%] tracking-[-0.02em] m-0 text-center'
            >
              Mobil ilova bilan yanada qulayroq!
            </h3>
            <p
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.8s ${ease} 0.3s, transform 0.8s ${ease} 0.3s`,
              }}
              className='text-[rgba(188,188,188,1)] mt-3 text-[13px] leading-[150%] text-center'
            >
              Bizning mobil ilovamiz bilan bilim olish yanada oson. Hoziroq ilovamizni yuklab oling!
            </p>
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.8s ${ease} 0.5s, transform 0.8s ${ease} 0.5s`,
              }}
              className='flex flex-col gap-3 mt-6'
            >
              <img src={google} alt='Google Play' loading='lazy' decoding='async' className='w-full max-w-[280px] mx-auto h-[52px] object-contain cursor-pointer hover:scale-105 transition-transform' />
              <img src={appstore} alt='App Store' loading='lazy' decoding='async' className='w-full max-w-[280px] mx-auto h-[52px] object-contain cursor-pointer hover:scale-105 transition-transform' />
            </div>

            {/* Mobile phones */}
            <div className='relative w-full' style={{ marginTop: '34px', height: '330px' }}>
              <div style={{
                position: 'absolute',
                width: '68%',
                top: 3,
                left: '-2%',
                zIndex: 20,
                transform: visible ? 'translateY(0)' : 'translateY(60px)',
                opacity: visible ? 1 : 0,
                transition: 'transform 1s cubic-bezier(0.16,1,0.3,1) 0.2s, opacity 0.8s ease 0.2s',
              }}>
                <img src={phone1} alt='Mobil ilova' loading='lazy' decoding='async' style={{ width: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{
                position: 'absolute',
                width: '50%',
                top: 80,
                right: '-2%',
                zIndex: 10,
                transform: visible ? 'translateY(0)' : 'translateY(60px)',
                opacity: visible ? 1 : 0,
                transition: 'transform 1s cubic-bezier(0.16,1,0.3,1) 0.35s, opacity 0.8s ease 0.35s',
              }}>
                <img src={phone2} alt='Mobil ilova' loading='lazy' decoding='async' style={{ width: '100%', objectFit: 'contain' }} />
              </div>
            </div>
          </div>

          {/* Desktop phones */}
          <div
            className='hidden md:block absolute right-0 bottom-0 w-[46%] pointer-events-none rounded-br-[24px]'
            style={{ height: '130%', overflow: 'hidden', top: 'auto' }}
          >
            <div style={{
              position: 'absolute', width: '360px', height: '600px',
              left: '0%', bottom: -49, zIndex: 20,
              animation: visible ? 'phoneFloat1 3.4s ease-in-out 1.2s infinite' : 'none',
            }}>
              <img
                src={phone1}
                alt='Mobil ilova — old ko&#39;rinish'
                loading='lazy'
                decoding='async'
                className='object-contain'
                style={{
                  width: '100%', height: '100%',
                  willChange: 'transform',
                  transform: visible ? 'translateY(0px)' : 'translateY(100%)',
                  transition: 'transform 1s cubic-bezier(0.16,1,0.3,1) 0s',
                }}
              />
            </div>
            <div style={{
              position: 'absolute', width: '267px', height: '460px',
              right: '5%', bottom: -35, zIndex: 10,
              animation: visible ? 'phoneFloat2 3.9s ease-in-out 1.5s infinite' : 'none',
            }}>
              <img
                src={phone2}
                alt='Mobil ilova — orqa ko&#39;rinish'
                loading='lazy'
                decoding='async'
                className='object-contain'
                style={{
                  width: '100%', height: '100%',
                  willChange: 'transform',
                  transform: visible ? 'translateY(0px)' : 'translateY(100%)',
                  transition: 'transform 1s cubic-bezier(0.16,1,0.3,1) 0.18s',
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default AppPromoSection
