import '@testing-library/jest-dom/vitest'

// jsdom'da mavjud bo'lmagan, lekin komponentlar kutadigan API'lar
class IO {
	observe() {}
	unobserve() {}
	disconnect() {}
}
globalThis.IntersectionObserver = IO
globalThis.ResizeObserver = IO
window.matchMedia ??= () => ({
	matches: false,
	addEventListener() {},
	removeEventListener() {},
	addListener() {},
	removeListener() {},
})
window.scrollTo = () => {}

// jsdom'da <canvas> konteksti yo'q. Uni mock qilamiz, LEKIN addColorStop'ni
// haqiqiy brauzerdagidek qat'iy qilamiz: var(--...) yoki noto'g'ri rang -> xato.
// Shu tarzda "canvas'ga CSS var()" xatosi testda ham ushlanadi.
const isValidColor = v =>
	typeof v === 'string' &&
	!v.includes('var(') &&
	/^(#|rgba?\(|hsla?\(|[a-z]+$)/i.test(v.trim())

HTMLCanvasElement.prototype.getContext = function () {
	const gradient = {
		addColorStop(_stop, color) {
			if (!isValidColor(color))
				throw new SyntaxError(
					`addColorStop: '${color}' rang sifatida yaroqsiz (canvas var() ni tushunmaydi)`,
				)
		},
	}
	return new Proxy(
		{},
		{
			get(_t, prop) {
				if (prop === 'createLinearGradient' || prop === 'createRadialGradient') return () => gradient
				if (prop === 'getImageData') return () => ({ data: new Uint8ClampedArray(4) })
				if (prop === 'canvas') return { width: 300, height: 150 }
				if (typeof prop === 'string') return () => {}
				return undefined
			},
			set() {
				return true
			},
		},
	)
}
