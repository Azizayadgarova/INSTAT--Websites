import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
	globalIgnores(['dist', 'node_modules']),
	{
		files: ['**/*.{js,jsx}'],
		extends: [
			js.configs.recommended,
			react.configs.flat.recommended,
			react.configs.flat['jsx-runtime'],
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
		],
		settings: { react: { version: 'detect' } },
		languageOptions: {
			ecmaVersion: 2022,
			globals: { ...globals.browser, ...globals.node },
			parserOptions: {
				ecmaVersion: 'latest',
				ecmaFeatures: { jsx: true },
				sourceType: 'module',
			},
		},
		rules: {
			'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' }],
			// prop-types loyihada ishlatilmaydi (TS ga o'tilganda shart emas)
			'react/prop-types': 'off',
			// O'zbek matnida apostrof (o‘, g‘) har joyda uchraydi — bu xato emas
			'react/no-unescaped-entities': 'off',
			'react/display-name': 'warn',
			// React 18 `fetchpriority` ni kichik harfda kutadi (camelCase ogohlantirish beradi)
			'react/no-unknown-property': ['error', { ignore: ['fetchpriority'] }],
			// HMR bilan bog'liq, xatolik emas — ogohlantirish yetarli
			'react-refresh/only-export-components': 'warn',
		},
	},
])
