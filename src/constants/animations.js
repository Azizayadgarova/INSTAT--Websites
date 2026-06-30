export const EASE = [0.22, 1, 0.36, 1]
export const EASE_SMOOTH = [0.16, 1, 0.3, 1]

export const VP = { once: true, amount: 0.2 }
export const VP_LOW = { once: true, amount: 0.15 }

export const fadeUp = {
	hidden: { opacity: 0, y: 32 },
	visible: (i = 0) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.55, ease: EASE, delay: i * 0.1 },
	}),
}

export const fadeLeft = {
	hidden: { opacity: 0, x: -32 },
	visible: (i = 0) => ({
		opacity: 1,
		x: 0,
		transition: { duration: 0.55, ease: EASE, delay: i * 0.15 },
	}),
}
