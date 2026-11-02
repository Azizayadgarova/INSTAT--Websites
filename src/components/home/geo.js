// Xarita ma'lumotlari: 14 hudud markazi [lon, lat] va O'zbekiston kontur nuqtalari.
export const REG = [[69.24,41.31],[69.9,41.05],[72.34,40.78],[71.4,41.05],[71.6,40.4],[68.75,40.45],[67.8,40.1],[66.6,39.7],[65.9,38.7],[67.5,38.0],[63.9,39.9],[64.6,41.2],[60.7,41.45],[59.2,43.2]]

export const UZ = [[56,45],[58.6,45.6],[59.9,44.6],[61.1,44.2],[62.1,43.5],[64.4,43.6],[65.5,43.4],[66.1,42.9],[66,42],[67.9,41.2],[68.6,40.6],[69.1,41.4],[70,41.5],[70.6,42.3],[71,42.2],[70.9,41.6],[71.9,41.4],[72.9,41],[73.1,40.8],[72.6,40.4],[71.7,40.2],[70.6,40.2],[70.4,40.5],[69.5,40.1],[69.1,39.6],[68,39.5],[67.4,39.5],[68.1,38.9],[68.4,38.2],[67.8,37.2],[67,37.4],[66.5,37.4],[66.6,38],[65.6,38.2],[64.2,38.9],[63.5,39.4],[62.4,40],[61.9,41.1],[60.5,41.2],[60,42],[58.9,42.6],[58.2,42.5],[57.9,42.2],[56.9,41.3],[56,41.3]]

/**
 * Konturni (UZ) berilgan o'lchamga joylab proyeksiya funksiyasini va kontur ichidagi
 * nuqtalar to'rini (step oralig'i bilan) qaytaradi.
 */
export function buildDotMap(W, H, { pad = [60, 56], step = 7, yShift = -8, withRandom = false } = {}) {
	const sx = (73.1 - 56) * 0.755
	const sy = 45.6 - 37.2
	const sc = Math.min((W - pad[0]) / sx, (H - pad[1]) / sy)
	const ox = (W - sx * sc) / 2
	const oy = (H - sy * sc) / 2 + yShift
	const proj = (lo, la) => [ox + (lo - 56) * 0.755 * sc, oy + (45.6 - la) * sc]

	const off = document.createElement('canvas')
	off.width = W
	off.height = H
	const o = off.getContext('2d')
	o.beginPath()
	UZ.forEach((p, i) => {
		const [x, y] = proj(p[0], p[1])
		i ? o.lineTo(x, y) : o.moveTo(x, y)
	})
	o.closePath()
	o.fill()
	const data = o.getImageData(0, 0, W, H).data

	const dots = []
	for (let y = 0; y < H; y += step) {
		for (let x = 0; x < W; x += step) {
			if (data[(y * W + x) * 4 + 3] > 0) dots.push(withRandom ? [x, y, Math.random()] : [x, y])
		}
	}
	return { proj, dots }
}

/** Joriy canvas'ni devicePixelRatio (max 2) bilan sozlaydi, CSS o'lchamini qaytaradi. */
export function fitCanvas(canvas) {
	const d = Math.min(window.devicePixelRatio || 1, 2)
	const W = canvas.clientWidth
	const H = canvas.clientHeight
	canvas.width = W * d
	canvas.height = H * d
	const ctx = canvas.getContext('2d')
	ctx.setTransform(d, 0, 0, d, 0, 0)
	return { ctx, W, H }
}
