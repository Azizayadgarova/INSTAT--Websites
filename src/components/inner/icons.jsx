/** Ichki sahifalar (komissiya, yotoqxona, materiallar, yangiliklar) uchun ikonkalar — prototip: INSTAT/page.html. */
const S = ({ w = 1.8, children, fill = 'none' }) => (
	<svg viewBox='0 0 24 24' fill={fill} stroke={fill === 'none' ? 'currentColor' : undefined} strokeWidth={w} aria-hidden='true'>
		{children}
	</svg>
)

export const IconDownload = () => (
	<S w={2}>
		<path d='M12 3v12m0 0-5-5m5 5 5-5M4 21h16' />
	</S>
)
export const IconClose = () => (
	<S w={2}>
		<path d='M6 6l12 12M18 6 6 18' />
	</S>
)
export const IconPhone = () => (
	<S>
		<path d='M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z' />
	</S>
)
export const IconMail = () => (
	<S>
		<rect x='2' y='4' width='20' height='16' rx='2' />
		<path d='m22 7-10 6L2 7' />
	</S>
)
export const IconZoom = () => (
	<S w={2}>
		<path d='M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7' />
	</S>
)
export const IconPrev = () => (
	<S w={2}>
		<path d='m15 18-6-6 6-6' />
	</S>
)
export const IconNext = () => (
	<S w={2}>
		<path d='m9 18 6-6-6-6' />
	</S>
)

/** Komissiya vazifalari ikonkalari (ACI) */
export const TASK_ICONS = [
	<S key='a' w={1.7}>
		<path d='M4 19.5V5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-1.5zM4 19.5A2 2 0 0 1 6 18h12' />
		<path d='M9 8h6M9 12h4' />
	</S>,
	<S key='b' w={1.7}>
		<circle cx='12' cy='12' r='9' />
		<path d='M5.6 5.6l12.8 12.8' />
	</S>,
	<S key='c' w={1.7}>
		<path d='M12 3v18M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0zM8 21h8' />
	</S>,
	<S key='d' w={1.7}>
		<path d='M3 12h4l3-8 4 16 3-8h4' />
	</S>,
]
export const IconShield = () => (
	<svg viewBox='0 0 48 48' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'>
		<path d='M24 4 8 10v12c0 10 7 18 16 22 9-4 16-12 16-22V10z' />
		<path d='m17 24 5 5 9-10' />
	</svg>
)

/** Yotoqxona: ajratilgan ko'rsatkichlar (HLI) va qoidalar turlari (RC) */
export const HIGHLIGHT_ICONS = [
	<S key='a' w={2}>
		<circle cx='12' cy='12' r='9' />
		<path d='M12 7v5l3 2' />
	</S>,
	<S key='b' w={2}>
		<path d='M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z' />
	</S>,
	<S key='c' w={2}>
		<path d='M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z' />
		<path d='m9 12 2 2 4-4' />
	</S>,
]
export const RULE_KINDS = {
	no: [
		'#ff6b6b',
		<S key='no' w={2}>
			<circle cx='12' cy='12' r='9' />
			<path d='M5.6 5.6l12.8 12.8' />
		</S>,
	],
	in: [
		'#3d8bff',
		<S key='in' w={2}>
			<circle cx='12' cy='12' r='9' />
			<path d='M12 11v6M12 7.5v.5' />
		</S>,
	],
	doc: [
		'#00E6FC',
		<S key='doc' w={2}>
			<path d='M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z' />
			<path d='M14 3v6h6M8 13h8M8 17h5' />
		</S>,
	],
	ok: [
		'#2fd39a',
		<S key='ok' w={2}>
			<circle cx='12' cy='12' r='9' />
			<path d='M12 7v5l3 2' />
		</S>,
	],
}

/** Materiallar: rang va ikonka (6 ta fayl tartibida) */
export const MATERIAL_COLORS = ['#3d8bff', '#00E6FC', '#a78bfa', '#2fd39a', '#ffb020', '#ff6b9d']
export const MATERIAL_ICONS = [
	<S key='0' w={1.8}>
		<rect x='3' y='4' width='18' height='17' rx='2' />
		<path d='M3 9h18M8 2v4M16 2v4M7 13h4M7 17h7' />
	</S>,
	<S key='1' w={1.8}>
		<path d='M4 19.5V5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-1.5zM4 19.5A2 2 0 0 1 6 18h12' />
		<path d='M9 8h6M9 12h4' />
	</S>,
	<S key='2' w={1.8}>
		<path d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2' />
		<rect x='9' y='3' width='6' height='4' rx='1' />
		<path d='m9 13 2 2 4-4' />
	</S>,
	<S key='3' w={1.8}>
		<path d='M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z' />
	</S>,
	<S key='4' w={1.8}>
		<rect x='2' y='4' width='20' height='13' rx='2' />
		<path d='M8 21h8M12 17v4M7 9l3 3-3 3' />
	</S>,
	<S key='5' w={1.8}>
		<circle cx='12' cy='12' r='9' />
		<path d='M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01' />
	</S>,
]

/** Yangiliklar: ulashish */
export const IconTelegram = () => (
	<svg viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
		<path d='M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9-8.2c.4-.3-.1-.5-.6-.2L6.3 13 1.5 11.5c-1-.3-1-1 .2-1.5L20.6 2.8c.9-.3 1.6.2 1.3 1.5z' />
	</svg>
)
export const IconFacebook = () => (
	<svg viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
		<path d='M14 8h3V4h-3c-2.8 0-4 1.8-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.7-.6z' />
	</svg>
)
export const IconLink = () => (
	<S w={2}>
		<path d='M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7' />
		<path d='M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7' />
	</S>
)
