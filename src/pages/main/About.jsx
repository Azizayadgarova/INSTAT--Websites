import { useTranslation } from 'react-i18next'
import { useOutlet } from 'react-router-dom'
import Home from '@/components/home/Home'
import SectionShell from '@/components/shared/SectionShell'
import { useMenu } from '@/hooks/useMenu'

/**
 * Index route ("/") — bosh sahifa. `/about/*` bola marshrutlari esa "Institut haqida"
 * bo'limi sifatida ichki sahifa qobig'ida ochiladi.
 */
const About = () => {
  const { t } = useTranslation()
  const outlet = useOutlet()
  const section = useMenu().about

  if (!outlet) return <Home />

  const links = section.links.map(l => ({ ...l, path: `${section.base}/${l.path}` }))

  return (
    <SectionShell sectionKey='about' title={section.title} description={t('seo.defaultDescription')} links={links} />
  )
}

export default About
