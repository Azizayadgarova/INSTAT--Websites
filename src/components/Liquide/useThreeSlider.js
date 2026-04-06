import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { slides, sliderConfig, zeroPad } from './slides'

export function useThreeSlider(s) {
	const canvasRef = useRef(null)
	const counterRef = useRef(null)
	const overlayRefs = useRef([])

	useEffect(() => {
		const canvas = canvasRef.current
		const renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: window.devicePixelRatio < 2,
			alpha: true,
			powerPreference: 'high-performance',
		})

		let vpWidth = window.innerWidth
		let vpHalfWidth = vpWidth / 2
		let vpHeight = window.innerHeight

		renderer.setSize(vpWidth, vpHeight)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

		const scene = new THREE.Scene()
		const camera = new THREE.PerspectiveCamera(45, vpWidth / vpHeight, 0.1, 10)
		camera.position.z = 3

		const vFOV = (camera.fov * Math.PI) / 180
		const screenHeight = 2 * Math.tan(vFOV / 2) * camera.position.z
		let screenWidth = screenHeight * (vpWidth / vpHeight)
		let halfScreen = screenWidth / 2
		let screenWidth15 = screenWidth / 1.5

		const totalSlides = slides.length
		let maxScroll = (totalSlides - 1) * screenWidth

		const meshes = []
		const textureLoader = new THREE.TextureLoader()

		slides.forEach((slide, i) => {
			const geometry = new THREE.PlaneGeometry(screenWidth, screenHeight, 48, 24)
			const material = new THREE.MeshBasicMaterial({ transparent: true })
			const mesh = new THREE.Mesh(geometry, material)

			// Precompute ox values and oy² to avoid recalculation every frame
			const raw = geometry.attributes.position.array
			const count = geometry.attributes.position.count
			const ox = new Float32Array(count)
			const oy2 = new Float32Array(count)
			for (let v = 0; v < count; v++) {
				ox[v] = raw[v * 3]
				const oy = raw[v * 3 + 1]
				oy2[v] = oy * oy
			}

			mesh.userData = { ox, oy2, count, offset: i * screenWidth, index: i }
			textureLoader.load(slide.img, t => {
				t.colorSpace = THREE.SRGBColorSpace
				t.generateMipmaps = false
				t.minFilter = THREE.LinearFilter
				material.map = t
				material.needsUpdate = true
			})
			scene.add(mesh)
			meshes.push(mesh)
		})

		// Cache DOM references once — avoid querySelectorAll every frame
		const overlayCache = slides.map((_, i) => {
			const overlay = overlayRefs.current[i]
			if (!overlay) return null
			const spans = Array.from(overlay.querySelectorAll('.anim-char'))
			const rots = spans.map(span => span.getAttribute('data-rot'))
			return { overlay, spans, rots }
		})

		function applyDistortion(mesh, positionX, strength) {
			const positions = mesh.geometry.attributes.position
			const { ox, oy2, count } = mesh.userData
			const arr = positions.array
			for (let i = 0; i < count; i++) {
				const d = positionX + ox[i]
				const dist = Math.sqrt(oy2[i] + d * d)
				const falloff = Math.max(0, 1 - dist / 2.5)
				const s = Math.sin((falloff * Math.PI) / 2)
				arr[i * 3 + 2] = s * s * strength
			}
			positions.needsUpdate = true
		}

		const _projVec = new THREE.Vector3()

		let scrollPosition = 0,
			scrollTarget = 0,
			lastFrameTime = 0,
			distortionAmount = 0,
			scrollDirection = 0,
			activeSlideIndex = -1
		let snapTimeout, rafId = null
		let wasMoving = false
		let needsRender = true

		function startLoop() {
			if (rafId !== null) return
			lastFrameTime = 0
			rafId = requestAnimationFrame(animate)
		}

		function stopLoop() {
			if (rafId !== null) {
				cancelAnimationFrame(rafId)
				rafId = null
			}
		}

		const animate = time => {
			const deltaTime = lastFrameTime ? (time - lastFrameTime) / 1000 : 0.016
			lastFrameTime = time
			const previousScroll = scrollPosition

			scrollPosition += (scrollTarget - scrollPosition) * sliderConfig.smoothing

			const frameDelta = scrollPosition - previousScroll
			if (Math.abs(frameDelta) > 0.0001) scrollDirection = Math.sign(frameDelta)

			const velocity = Math.abs(frameDelta) / deltaTime
			distortionAmount +=
				(Math.min(1.5, velocity * 0.12) - distortionAmount) *
				sliderConfig.distortionSmoothing
			const signedDistortion = distortionAmount * scrollDirection
			const isMoving =
				Math.abs(signedDistortion) > 0.002 ||
				Math.abs(scrollPosition - scrollTarget) > 0.001

			if (isMoving || wasMoving || needsRender) {
				meshes.forEach(mesh => {
					const { offset, index } = mesh.userData
					const x = -(offset - scrollPosition)
					mesh.position.x = x

					const cached = overlayCache[index]
					if (cached) {
						const { overlay, spans, rots } = cached
						const absX = Math.abs(x)
						const isVisible = absX <= screenWidth
						overlay.style.visibility = isVisible ? 'visible' : 'hidden'

						if (isVisible) {
							_projVec.set(x, 0, 0).project(camera)
							const screenX = (_projVec.x + 1) * 0.5 * vpWidth
							const bulge = Math.max(0, 1 - absX / halfScreen)
							const charScale = 1 + bulge * 0.25 + Math.abs(signedDistortion) * 0.15
							const charSkew = signedDistortion * -20 * bulge
							const charY = bulge * -15 * s
							// Set opacity once on overlay instead of N times on each span
							overlay.style.opacity = Math.max(0.1, 1 - absX / screenWidth15)
							overlay.style.transform = `translate3d(${screenX - vpHalfWidth}px, -50%, 0)`

							for (let j = 0; j < spans.length; j++) {
								spans[j].style.transform = `rotate(${rots[j]}deg) translateY(${charY}px) scale(${charScale}) skewX(${charSkew}deg)`
							}

							if (isMoving || wasMoving) {
								applyDistortion(mesh, x, sliderConfig.distortionStrength * signedDistortion)
							}
						}
					}
				})

				renderer.render(scene, camera)
				needsRender = false
			}

			wasMoving = isMoving

			const currentIndex = Math.max(
				0,
				Math.min(Math.round(scrollPosition / screenWidth), totalSlides - 1),
			)
			if (currentIndex !== activeSlideIndex) {
				activeSlideIndex = currentIndex
				if (counterRef.current)
					counterRef.current.textContent = zeroPad(activeSlideIndex + 1)
			}

			// Stop RAF loop when fully idle — restart on next user interaction
			if (!isMoving && !wasMoving && !needsRender) {
				rafId = null
				return
			}
			rafId = requestAnimationFrame(animate)
		}

		const onWheel = e => {
			const atEnd = scrollTarget >= maxScroll && e.deltaY > 0
			const atStart = scrollTarget <= 0 && e.deltaY < 0
			if (atEnd || atStart) return // sahifa scrolliga ruxsat ber
			e.preventDefault()
			const nextTarget = scrollTarget + e.deltaY * sliderConfig.wheelSpeed
			scrollTarget = Math.max(0, Math.min(nextTarget, maxScroll))
			needsRender = true
			clearTimeout(snapTimeout)
			snapTimeout = setTimeout(() => {
				const closestIndex = Math.round(scrollTarget / screenWidth)
				scrollTarget = closestIndex * screenWidth
			}, 150)
			startLoop()
		}

		let resizeTimer
		const onResize = () => {
			clearTimeout(resizeTimer)
			resizeTimer = setTimeout(() => {
				vpWidth = window.innerWidth
				vpHalfWidth = vpWidth / 2
				vpHeight = window.innerHeight
				renderer.setSize(vpWidth, vpHeight)
				camera.aspect = vpWidth / vpHeight
				camera.updateProjectionMatrix()
				screenWidth = screenHeight * (vpWidth / vpHeight)
				halfScreen = screenWidth / 2
				screenWidth15 = screenWidth / 1.5
				maxScroll = (totalSlides - 1) * screenWidth
				needsRender = true
				startLoop()
			}, 100)
		}

		const onVisibilityChange = () => {
			if (document.hidden) {
				stopLoop()
			} else {
				needsRender = true
				startLoop()
			}
		}

		canvas.addEventListener('wheel', onWheel, { passive: false })
		window.addEventListener('resize', onResize)
		document.addEventListener('visibilitychange', onVisibilityChange)
		startLoop()

		return () => {
			stopLoop()
			clearTimeout(snapTimeout)
			clearTimeout(resizeTimer)
			canvas.removeEventListener('wheel', onWheel)
			window.removeEventListener('resize', onResize)
			document.removeEventListener('visibilitychange', onVisibilityChange)
			meshes.forEach(m => {
				m.geometry.dispose()
				m.material.map?.dispose()
				m.material.dispose()
			})
			renderer.dispose()
		}
	}, [s])

	return { canvasRef, counterRef, overlayRefs }
}
