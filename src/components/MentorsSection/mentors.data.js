import { toPerson } from '@/utils/siteContent'

const UP = '&auto=format&q=75&fm=webp'

/**
 * PERSON shaklidagi yozuvni (site-education-mentors, site-article-editors,
 * site-main-managers) MentorCard kutadigan ko'rinishga o'tkazadi.
 * Backend rasm bermasa — ism bosh harflaridan avatar generatsiya qilinadi.
 */
export const toMentor = (item, lang) => {
	const p = toPerson(item, lang)
	return {
		name: p.name,
		role: p.direction,
		exp: p.experience ? `${p.experience}+ yil tajriba` : '',
		photo:
			p.image ||
			`https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=1F2533&color=fff&size=400&bold=true`,
	}
}

export const mentors = [
	{
		name: 'James Turner',
		role: 'Senior Frontend Developer',
		exp: '8+ yil tajriba',
		photo: `https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop${UP}`,
	},
	{
		name: 'Sarah Connor',
		role: 'UI/UX Designer',
		exp: '5+ yil tajriba',
		photo: `https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop${UP}`,
	},
	{
		name: 'Michael Chen',
		role: 'Backend Developer',
		exp: '6+ yil tajriba',
		photo: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop${UP}`,
	},
	{
		name: 'Elena Rodriguez',
		role: 'Frontend Developer',
		exp: '4+ yil tajriba',
		photo: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop${UP}`,
	},
	{
		name: 'Alex Rivers',
		role: 'DevOps Engineer',
		exp: '7+ yil tajriba',
		photo: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop${UP}`,
	},
	{
		name: 'Emma Wilson',
		role: 'Mobile Developer',
		exp: '5+ yil tajriba',
		photo: `https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop${UP}`,
	},
	{
		name: 'Olivia Brown',
		role: 'Full Stack Developer',
		exp: '5+ yil tajriba',
		photo: `https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop${UP}`,
	},
]

export const CONFIGS = [
	{ offset: -3, scale: 0.38, z: 1,  opacity: 1 },
	{ offset: -2, scale: 0.55, z: 2,  opacity: 1 },
	{ offset: -1, scale: 0.75, z: 3,  opacity: 1 },
	{ offset:  0, scale: 1.0,  z: 10, opacity: 1 },
	{ offset:  1, scale: 0.75, z: 3,  opacity: 1 },
	{ offset:  2, scale: 0.55, z: 2,  opacity: 1 },
	{ offset:  3, scale: 0.38, z: 1,  opacity: 1 },
]

export const BASE_W = 330
export const BASE_H = 364
export const GAP = 20

export const mod = (n, m) => ((n % m) + m) % m

export const getCenterX = (cfg, trackCenterX, dimScale = 1) => {
	if (cfg.offset === 0) return trackCenterX
	const direction = cfg.offset > 0 ? 1 : -1
	const steps = Math.abs(cfg.offset)
	let pos = trackCenterX
	for (let i = 0; i < steps; i++) {
		const fromCfg = CONFIGS.find(c => c.offset === direction * i)
		const toCfg = CONFIGS.find(c => c.offset === direction * (i + 1))
		pos += direction * ((BASE_W * fromCfg.scale * dimScale) / 2 + GAP + (BASE_W * toCfg.scale * dimScale) / 2)
	}
	return pos
}
