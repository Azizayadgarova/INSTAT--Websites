import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { useSiteData } from '@/hooks/useSiteData'
import { useSiteList } from '@/hooks/useSiteList'
import { siteMainManagersApi, siteManagersApi } from '@/api/siteContent.api'
import { pickField, pickLang, toPerson } from '@/utils/siteContent'
import iconPhone from '@/assets/icons/Frame 2147238356.png'
import iconEmail from '@/assets/icons/Frame 2147238356 (1).png'
import iconClock from '@/assets/icons/Frame 2147238356 (2).png'
import photo1 from '@/assets/Image (2).webp'
import photo2 from '@/assets/Image (3).webp'

/**
 * Rahbarlar. Ism va lavozim API'dan (module="corruption") olinadi,
 * qolgan maydonlar (rasm, telefon, email, qabul vaqti) statik.
 * apiKey — backenddagi kalit; qiymat "Ism - Lavozim" ko'rinishida keladi.
 */
const leaders = [
  {
    id: 1,
    apiKey: 'corruption_chairman',
    name: 'Shukurov Shuxrat Zokirjanovich',
    position:
      "O'zbekiston Respublikasi Milliy Statistika qo'mitasining Kadrlar malakasini oshirish va statistik tadqiqotlar instituti direktori",
    photo: photo1,
    phones: ['(71) 202-81-86', '(71) 267-16-03'],
    email: '',
    receptionDays: 'Chorshanba - Juma,',
  receptionTime: ' 15:00 - 16:00',
  },
  {
    id: 2,
    apiKey: 'corruption_deputy_chairman',
    name: 'Abduvaliyev Abdulaziz Abduvaliyevich',
    position:
      "O'zbekiston Respublikasi Milliy Statistika qo'mitasining Kadrlar malakasini oshirish va statistik tadqiqotlar instituti direktorining ilmiy ishlar, innovatsiyalar va xalqaro aloqalar bo'yicha o'rinbosari",
    photo: photo2,
    phones: ['(71) 202-81-87'],
    email: 'a.abduvaliyev@instat.uz',
    receptionDays: 'Chorshanba - Juma,',
  receptionTime: ' 15:00 - 16:00',
  },
]

/**
 * site-managers yozuvini LeaderCard kutadigan ko'rinishga o'tkazadi.
 * `acceptance` "Chorshanba - Juma, 15:00 - 16:00" ko'rinishida keladi —
 * kartochkada kun va vaqt turli rangda chiqadi, shuning uchun vergulda ajratamiz.
 */
const toLeader = (item, lang) => {
  const acceptance = (item.acceptance ?? '').trim()
  const comma = acceptance.indexOf(',')
  return {
    id: item.id,
    name: (item.full_name ?? '').trim(),
    position: pickField(item, 'description', lang),
    photo: item.path || null,
    phones: (item.phone_number ?? '').trim() ? [item.phone_number.trim()] : [],
    email: (item.email ?? '').trim(),
    receptionDays: comma === -1 ? acceptance : acceptance.slice(0, comma + 1),
    receptionTime: comma === -1 ? '' : acceptance.slice(comma + 1),
  }
}

/** "Ism Sh.Z. - Lavozim" -> { name, position }. Ajratkich topilmasa hammasi ism. */
const splitNamePosition = raw => {
  const text = (raw ?? '').trim()
  const i = text.search(/\s[-–—]\s/)
  if (i === -1) return { name: text, position: '' }
  return { name: text.slice(0, i).trim(), position: text.slice(i).replace(/^\s[-–—]\s/, '').trim() }
}


const AvatarPlaceholder = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: 'rgba(225, 227, 235, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '24px',
    }}
  >
    <svg width='64' height='64' viewBox='0 0 24 24' fill='none'>
      <circle cx='12' cy='8' r='4' fill='rgba(255,255,255,0.2)' />
      <path d='M4 20c0-4 3.6-7 8-7s8 3 8 7' stroke='rgba(255,255,255,0.2)' strokeWidth='1.5' strokeLinecap='round' />
    </svg>
  </div>
)

const TEXT_STYLE = {
  fontFamily: 'Inter Display, sans-serif',
  fontWeight: 500,
  fontSize: '18px',
  lineHeight: '24px',
  letterSpacing: '-0.01em',
  color: 'rgba(255, 255, 255, 1)',
}

const LeaderCard = ({ leader }) => {
  const {
    t
  } = useTranslation();

  return (
    <div
      className='flex flex-col gap-4 sm:flex-row sm:gap-6'
      style={{
        background: 'rgba(31, 37, 51, 1)',
        borderRadius: '24px',
        padding: '16px',
      }}
    >
      {/* Photo */}
      <div
        style={{
          width: '210px',
          minWidth: '210px',
          height: '267px',
          borderRadius: '24px',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {leader.photo ? (
          <img
            src={leader.photo}
            alt={leader.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px' }} loading='lazy' decoding='async' />
        ) : (
          <AvatarPlaceholder />
        )}
      </div>
      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
        <h3
          style={{
            fontFamily: 'Inter Display, sans-serif',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '28px',
            letterSpacing: '-0.01em',
            color: 'rgba(255, 255, 255, 1)',
            margin: 0,
          }}
        >
          {leader.name}
        </h3>

        <p
          style={{
            fontFamily: 'Inter Display, sans-serif',
            fontWeight: 500,
            fontSize: '18px',
            lineHeight: '24px',
            letterSpacing: '-0.01em',
            color: 'rgba(var(--text-rgb),1)',
            margin: 0,
          }}
        >
          {leader.position}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '4px' }}>
          {leader.phones.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src={iconPhone} alt='' style={{ width: '24px', height: '24px', objectFit: 'contain', flexShrink: 0 }} loading='lazy' decoding='async' />
              <span style={{ ...TEXT_STYLE, fontSize: '18px' }}>{t("pages.rahbariyat.tel")}</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {leader.phones.map(phone => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\D/g, '')}`}
                    style={{
                      fontFamily: 'Inter Display, sans-serif',
                      fontWeight: 500,
                      fontSize: '18px',
                      lineHeight: '24px',
                      letterSpacing: '-0.01em',
                      color: 'rgba(var(--blue-rgb),1)',
                      textDecoration: 'underline',
                    }}
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src={iconEmail} alt='' style={{ width: '24px', height: '24px', objectFit: 'contain', flexShrink: 0 }} loading='lazy' decoding='async' />
            <span style={{ ...TEXT_STYLE, fontSize: '18px' }}>{t("pages.rahbariyat.e_mail")}</span>
            {leader.email && (
              <a
                href={`mailto:${leader.email}`}
                style={{
                  fontFamily: 'Inter Display, sans-serif',
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '24px',
                  letterSpacing: '-0.01em',
                  color: 'rgba(var(--blue-rgb),1)',
                  textDecoration: 'underline',
                }}
              >
                {leader.email}
              </a>
            )}
          </div>

          {leader.receptionDays && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src={iconClock} alt='' style={{ width: '24px', height: '24px', objectFit: 'contain', flexShrink: 0 }} loading='lazy' decoding='async' />
              <span style={{ ...TEXT_STYLE, fontSize: '18px' }}>{t("pages.rahbariyat.fuqarolarni_qabul_qilish")}{' '}
                <span style={{ color: 'rgba(var(--blue-rgb),1)' }}>{leader.receptionDays}</span>
                <span style={{ color: 'rgba(255, 255, 255, 1)' }}>{leader.receptionTime}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * site-main-managers kartochkasi — qo'mita darajasidagi rahbar.
 * Bu endpoint LeaderCard kutadigan telefon/email/qabul vaqtini bermaydi
 * (faqat ism, lavozim, rasm), shuning uchun soddaroq ko'rinish.
 */
const TopManagerCard = ({ person }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      background: 'rgba(var(--card-rgb),1)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '16px',
      padding: '20px 24px',
    }}
  >
    {person.image && (
      <img
        src={person.image}
        alt=''
        loading='lazy'
        decoding='async'
        style={{ width: 88, height: 88, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
      />
    )}
    <div>
      <p style={{ ...TEXT_STYLE, fontSize: '20px', fontWeight: 600, color: '#fff', margin: 0 }}>
        {person.name}
      </p>
      {person.direction && (
        <p style={{ ...TEXT_STYLE, fontSize: '16px', margin: '6px 0 0' }}>{person.direction}</p>
      )}
    </div>
  </div>
)

const Rahbariyat = () => {
  const {
    t, i18n
  } = useTranslation();

  const lang = i18n.resolvedLanguage ?? 'uz'
  const { data: corruption } = useSiteData(d => d.byModuleKey.corruption ?? {})
  const { items: apiLeaders } = useSiteList('site-managers', siteManagersApi, toLeader, [])
  // Qo'mita rahbariyati — alohida endpoint, bo'sh bo'lsa blok ko'rinmaydi
  const { items: topManagers } = useSiteList('site-main-managers', siteMainManagersApi, toPerson)

  // 1-navbatda site-managers (to'liq ma'lumot beradi). U bo'sh bo'lsa —
  // statik ro'yxat, ism/lavozimi site-data (module="corruption") dan olinadi.
  const resolvedLeaders = useMemo(() => {
    if (apiLeaders.length) {
      return apiLeaders.map((l, i) => ({
        ...l,
        photo: l.photo || leaders[i % leaders.length].photo,
      }))
    }
    return leaders.map(leader => {
      const raw = pickLang(corruption?.[leader.apiKey], lang)
      if (!raw) return leader
      const { name, position } = splitNamePosition(raw)
      return { ...leader, name: name || leader.name, position: position || leader.position }
    })
  }, [apiLeaders, corruption, lang])

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '59px 0 80px 0' }}>
      {/* Heading badge */}
      <div style={{ marginBottom: '20px', display: 'inline-flex' }}>
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
        >{t("pages.rahbariyat.rahbariyat_haqida")}</span>
      </div>
      {/* General info */}
      <p style={{ ...TEXT_STYLE, marginBottom: '16px' }}>{t("pages.rahbariyat.institut_faoliyati_ozbekiston_respublika")}</p>
      <p style={{ ...TEXT_STYLE, marginBottom: '48px' }}>{t("pages.rahbariyat.institut_ozbekiston_respublikasi_milliy")}</p>
      {/* Qo'mita rahbariyati (site-main-managers) */}
      {topManagers.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          {topManagers.map(person => (
            <TopManagerCard key={person.id} person={person} />
          ))}
        </div>
      )}
      {/* Leader cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {resolvedLeaders.map(leader => (
          <LeaderCard key={leader.id} leader={leader} />
        ))}
      </div>
    </div>
  );
}

export default Rahbariyat
