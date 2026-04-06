import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
	plugins: [
		react(),
		imagetools(),
		ViteImageOptimizer({
			jpg: { quality: 75 },
			jpeg: { quality: 75 },
			png: { quality: 75, compressionLevel: 8 },
			svg: { multipass: true },
		}),
	],
	build: {
		target: 'es2020',
		cssCodeSplit: true,
		assetsInlineLimit: 8192,
		reportCompressedSize: false,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules/three') || id.includes('@react-three')) {
						return 'three'
					}
					if (id.includes('node_modules/framer-motion')) {
						return 'framer'
					}
					if (id.includes('node_modules/gsap')) {
						return 'gsap'
					}
					if (
						id.includes('node_modules/react/') ||
						id.includes('node_modules/react-dom/') ||
						id.includes('node_modules/react-router-dom/')
					) {
						return 'react-vendor'
					}
				},
			},
		},
	},
})
