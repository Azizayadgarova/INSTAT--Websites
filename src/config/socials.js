import {
	RiFacebookCircleFill,
	RiInstagramFill,
	RiLinkedinBoxFill,
	RiTelegramFill,
	RiTwitterXFill,
	RiYoutubeFill,
} from '@remixicon/react'

/**
 * Ijtimoiy tarmoqlar — sayt bo'ylab YAGONA ro'yxat. `key` — site-data
 * (module="all") dagi kalit; ikonkalar Remix Icon'dan (@remixicon/react).
 * Tartib shu yerda belgilanadi.
 */
export const SOCIALS = [
	{ key: 'telegram', label: 'Telegram', Icon: RiTelegramFill },
	{ key: 'instagram', label: 'Instagram', Icon: RiInstagramFill },
	{ key: 'facebook', label: 'Facebook', Icon: RiFacebookCircleFill },
	{ key: 'twitter', label: 'X (Twitter)', Icon: RiTwitterXFill },
	{ key: 'linkedin', label: 'LinkedIn', Icon: RiLinkedinBoxFill },
	{ key: 'youtube', label: 'YouTube', Icon: RiYoutubeFill },
]
