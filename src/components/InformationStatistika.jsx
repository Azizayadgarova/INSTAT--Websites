import { useTranslation } from 'react-i18next'
import { useSectionStats } from '@/hooks/useSectionStats'

// Raqam va izoh backend'dan (library moduli) keladi; tavsif frontendda qoladi
const STATS_FALLBACK = t => [
  {
    key: 'library_books_number',
    value: "50 000+",
    label: t('components.informationStatistika.kitoblar', "KITOBLAR"),
    description: t('components.informationStatistika.bizda_klassikadan_tortib', "Bizda klassikadan tortib zamonaviy bestsellerlargacha bo'lgan barcha mavzular mavjud.")
  },
  {
    key: 'library_countries_number',
    value: "120+",
    label: t('components.informationStatistika.mamlakatlar', "MAMLAKATLAR"),
    description: t('components.informationStatistika.foydalanuvchilar_butun_dunyodan', "Foydalanuvchilar butun dunyodan bilim o'rganmoqda va baham ko'rmoqda.")
  },
  {
    key: 'library_authors_number',
    value: "1 500+",
    label: t('components.informationStatistika.mualliflar', "MUALLIFLAR"),
    description: t('components.informationStatistika.nashriyotlar_va_mustaqil', "Nashriyotlar va mustaqil mualliflar bilan bevosita hamkorlik qilamiz.")
  },
  {
    key: 'library_downloads_number',
    value: "2 mln+",
    label: t('components.informationStatistika.yuklab_olishlar', "YUKLAB OLISHLAR"),
    description: t('components.informationStatistika.bizning_kitoblarimiz_millionlab', "Bizning kitoblarimiz millionlab odamlarning bilim olishiga yordam berdi.")
  }
]

const BORDER = 'linear-gradient(180deg, rgba(22,50,183,0.15) 0%, #2B75CC 50%, rgba(22,50,183,0.15) 100%)'
const BORDER_H = 'linear-gradient(90deg, rgba(22,50,183,0.15) 0%, #2B75CC 50%, rgba(22,50,183,0.15) 100%)'

const InformationStatistika = () => {
  const { t } = useTranslation()
  const stats = useSectionStats('library', STATS_FALLBACK(t))

  return (
    <section
      style={{
        width: '100%',
        maxWidth: '1440px',
        margin: '24px auto 0',
        backgroundColor: 'rgba(var(--bg-rgb),1)',
        position: 'relative',
      }}
    >
      {/* top line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: BORDER_H }} />
      {/* bottom line */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: BORDER_H }} />

      {/* DESKTOP: 4 ustun, 223px balandlik */}
      <div className="hidden md:flex items-center w-full" style={{ height: '223px', padding: '0 40px' }}>
        <div className="grid grid-cols-4 w-full h-full relative">
          {stats.map((stat, index) => (
            <div key={stat.key} className="relative px-8 flex flex-col" style={{ paddingTop: '24px', paddingBottom: '24px' }}>
              {index === 0 && (
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '1px', background: BORDER }} />
              )}
              <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '1px', background: BORDER }} />

              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '48px', lineHeight: '56px', letterSpacing: '-0.02em', color: '#ffffff', marginBottom: '20px' }}>
                {stat.value}
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '16px', lineHeight: '24px', textTransform: 'uppercase', color: 'rgba(144,157,162,1)', marginBottom: '12px' }}>
                {stat.label}
              </p>
              <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: 'rgba(90,98,117,1)', width: '220px' }}>
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE: vertikal ro'yxat */}
      <div className="flex md:hidden flex-col w-full">
        {stats.map((stat, index) => (
          <div key={stat.key} className="relative flex flex-col px-6 py-7">
            {/* har bir stat pastida chiziq (oxirgisidan tashqari) */}
            {index < stats.length - 1 && (
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: BORDER_H }} />
            )}

            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '36px', lineHeight: '44px', letterSpacing: '-0.02em', color: '#ffffff', marginBottom: '8px' }}>
              {stat.value}
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '13px', lineHeight: '20px', textTransform: 'uppercase', color: 'rgba(144,157,162,1)', marginBottom: '8px' }}>
              {stat.label}
            </p>
            <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 500, fontSize: '13px', lineHeight: '19px', color: 'rgba(90,98,117,1)' }}>
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default InformationStatistika
