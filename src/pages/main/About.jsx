import { useTranslation } from 'react-i18next'
import { useLocation, useOutlet } from 'react-router-dom'
import Home from '@/components/home/Home'
import SectionShell from '@/components/shared/SectionShell'
import { GENERAL_INFO } from '@/data/generalInfo.data'
import { useMenu } from '@/hooks/useMenu'

/**
 * Index route ("/") — bosh sahifa. `/about/*` bola marshrutlari esa "Institut haqida"
 * bo'limi sifatida ichki sahifa qobig'ida ochiladi.
 */
const About = () => {
  const { t, i18n } = useTranslation()
  const outlet = useOutlet()
  const { pathname } = useLocation()
  const section = useMenu().about

  if (!outlet) return <Home />

  const links = section.links.map(l => ({ ...l, path: `${section.base}/${l.path}` }))
  // "Umumiy ma'lumotlar" sahifasi hero'sida qisqa tavsif chiqadi (statik matn)
  const lead = pathname.endsWith('/umumiy-malumot') ? (GENERAL_INFO[i18n.resolvedLanguage] ?? GENERAL_INFO.uz).l : undefined

  return (
    <SectionShell sectionKey='about' title={section.title} description={t('seo.defaultDescription')} lead={lead} links={links} />
  )
}

export default About
