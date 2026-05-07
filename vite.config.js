import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	plugins: [
		react(),
	],
	build: {
		target: 'es2020',
		cssCodeSplit: true,
		assetsInlineLimit: 4096,
		reportCompressedSize: false,
		minify: 'esbuild',
		cssMinify: 'esbuild',
		modulePreload: { polyfill: false },
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
					if (id.includes('@fontsource')) {
						return 'fonts'
					}
				},
			},
		},
	},
})
