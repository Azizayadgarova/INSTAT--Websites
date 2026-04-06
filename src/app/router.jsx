import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './../layouts/MainLayout'
import NotFound from '../pages/NotFound'

// About pages
const IshOrinlari = lazy(() => import('../pages/About/IshOrinlari.jsx'))
const OdobAxloq = lazy(() => import('../pages/About/OdobAxloq.jsx'))
const QarshiKurash = lazy(() => import('../pages/About/QarshiKurash.jsx'))
const Rahbariyat = lazy(() => import('../pages/About/Rahbariyat.jsx'))
const Tuzilma = lazy(() => import('../pages/About/Tuzilma.jsx'))
const UmumiyMalumot = lazy(() => import('../pages/About/UmumiyMalumot.jsx'))
const Yotoqhona = lazy(() => import('../pages/About/Yotoqxona.jsx'))
const About = lazy(() => import('../pages/main/About'))

// Axborot pages
const AxborotTizimi = lazy(() => import('../pages/Axborot/AxborotTizimi'))
const GenderStatistikasi = lazy(() => import('../pages/Axborot/GenderStatistikasi'))
const OchiqMalumotlar = lazy(() => import('../pages/Axborot/OchiqMalumotlar'))
const QishloqXojaligi = lazy(() => import('../pages/Axborot/QishloqXojaligi'))
const RivojlanishMaqsadlari = lazy(() => import('../pages/Axborot/RivojlanishMaqsadlari'))
const RoyhatgaOlish = lazy(() => import('../pages/Axborot/RoyhatgaOlish'))
const StatistikaAgentligi = lazy(() => import('../pages/Axborot/StatistikaAgentligi'))
const InfoResurses = lazy(() => import('../pages/main/InfoResurses'))

// Ilm-Fan pages
const IlmiyTadqiqot = lazy(() => import('../pages/IlmFan/IlmiyTadqiqot'))
const OliyTalim = lazy(() => import('../pages/IlmFan/OliyTalim'))
const Science = lazy(() => import('../pages/main/Science'))

// Matbuot pages
const MediaServise = lazy(() => import('../pages/main/MediaServise'))
const Hamkorlik = lazy(() => import('../pages/matbuot/Hamkorlik'))
const Tadbirlar = lazy(() => import('../pages/matbuot/Tadbirlar'))
const Yangiliklar = lazy(() => import('../pages/matbuot/Yangiliklar'))

const PageFallback = () => (
	<div style={{ background: 'rgba(14,18,27,1)', minHeight: '100vh' }} />
)

const s = Component => (
	<Suspense fallback={<PageFallback />}>
		<Component />
	</Suspense>
)

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			// Default home page
			{ index: true, element: s(About) },

			// About routes
			{
				path: 'about',
				element: s(About),
				children: [
					{ path: 'ish-orinlar', element: s(IshOrinlari) },
					{ path: 'odob-axloq', element: s(OdobAxloq) },
					{ path: 'qarshi-kurash', element: s(QarshiKurash) },
					{ path: 'rahbariyat', element: s(Rahbariyat) },
					{ path: 'tuzilma', element: s(Tuzilma) },
					{ path: 'umumiy-malumot', element: s(UmumiyMalumot) },
					{ path: 'yotoqhona', element: s(Yotoqhona) },
				],
			},

			// Information/Resources routes
			{
				path: 'information-resurses',
				element: s(InfoResurses),
				children: [
					{ path: 'axborot-tizimi', element: s(AxborotTizimi) },
					{ path: 'gender-statistika', element: s(GenderStatistikasi) },
					{ path: 'ochiq-malumotlar', element: s(OchiqMalumotlar) },
					{ path: 'qishloq-xojaligi', element: s(QishloqXojaligi) },
					{ path: 'rivojlanish-maqsadlari', element: s(RivojlanishMaqsadlari) },
					{ path: 'royhatga-olish', element: s(RoyhatgaOlish) },
					{ path: 'statistika-agentligi', element: s(StatistikaAgentligi) },
				],
			},

			// Science routes
			{
				path: 'science',
				element: s(Science),
				children: [
					{ path: 'ilmiy-tadqiqot', element: s(IlmiyTadqiqot) },
					{ path: 'oliy-talim', element: s(OliyTalim) },
				],
			},

			// Media/Press routes
			{
				path: 'media-servises',
				element: s(MediaServise),
				children: [
					{ path: 'hamkorlik', element: s(Hamkorlik) },
					{ path: 'tadbirlar', element: s(Tadbirlar) },
					{ path: 'yangiliklar', element: s(Yangiliklar) },
				],
			},
		],
	},
	{
		path: '*',
		element: <NotFound />,
	},
])
