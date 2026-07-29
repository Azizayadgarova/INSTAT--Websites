/**
 * Bir martalik kodemod: JSX matn tugunlari va tarjima qilinadigan atributlarni
 * i18n kalitlariga o'tkazadi, komponentlarga `useTranslation()` ni qo'shadi va
 * uz tarjimalarini src/i18n/generated.uz.json ga yozadi.
 *
 * Ishga tushirish: node scripts/i18n-extract.mjs
 */
import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import * as recast from 'recast'
import * as babelParser from '@babel/parser'

const parser = {
	parse: source =>
		babelParser.parse(source, {
			sourceType: 'module',
			plugins: ['jsx'],
			tokens: true,
		}),
}

const b = recast.types.builders
const n = recast.types.namedTypes

const ATTRS = ['placeholder', 'aria-label', 'title']
const hasText = s => /[a-zA-ZА-Яа-я]{2,}/.test(s)

// fayl yo'lidan kalit prefiksi: src/components/FAQSection.jsx -> faqSection
const prefixFor = file => {
	const base = file.split('/').pop().replace(/\.jsx$/, '')
	const dir = file.includes('/pages/') ? 'pages' : 'components'
	return `${dir}.${base[0].toLowerCase()}${base.slice(1)}`
}

const slug = text =>
	text
		.toLowerCase()
		.replace(/[‘’'`ʻ]/g, '')
		.replace(/[^a-z0-9а-я\s]/gi, ' ')
		.trim()
		.split(/\s+/)
		.slice(0, 4)
		.join('_')
		.slice(0, 40) || 'text'

const files = execSync("find src -name '*.jsx' ! -path '*__tests__*'").toString().trim().split('\n')
const translations = {}
let replaced = 0
const touched = []

for (const file of files) {
	const code = readFileSync(file, 'utf8')
	const ast = recast.parse(code, { parser })
	const prefix = prefixFor(file)
	const used = new Set()
	let fileChanged = false

	const makeKey = text => {
		let base = `${prefix}.${slug(text)}`
		let key = base
		let i = 2
		while (used.has(key) && translations[key] !== text) key = `${base}_${i++}`
		used.add(key)
		translations[key] = text
		return key
	}

	// t('...') ifodasini yasaymiz
	const tCall = key => b.callExpression(b.identifier('t'), [b.stringLiteral(key)])

	recast.types.visit(ast, {
		visitJSXText(path) {
			const raw = path.node.value
			const text = raw.trim()
			if (!text || !hasText(text)) return false
			// atrofdagi bo'shliqlarni saqlaymiz
			const key = makeKey(text.replace(/\s+/g, ' '))
			path.replace(b.jsxExpressionContainer(tCall(key)))
			replaced++
			fileChanged = true
			return false
		},
		visitJSXAttribute(path) {
			const name = path.node.name.name
			const val = path.node.value
			if (
				ATTRS.includes(String(name)) &&
				val &&
				n.StringLiteral.check(val) &&
				hasText(val.value)
			) {
				const key = makeKey(val.value)
				path.node.value = b.jsxExpressionContainer(tCall(key))
				replaced++
				fileChanged = true
			}
			this.traverse(path)
		},
	})

	if (!fileChanged) continue

	// --- `const { t } = useTranslation()` ni JSX qaytaradigan komponentlarga qo'shamiz
	const needsHook = new Set()
	recast.types.visit(ast, {
		visitFunction(path) {
			const fn = path.node
			let usesT = false
			recast.types.visit(fn.body ?? fn, {
				visitIdentifier(p) {
					if (p.node.name === 't' && n.CallExpression.check(p.parent.node) && p.parent.node.callee === p.node)
						usesT = true
					return false
				},
			})
			if (usesT) needsHook.add(fn)
			this.traverse(path)
		},
	})

	for (const fn of needsHook) {
		// eng ichki funksiyaga qo'shamiz; body BlockStatement bo'lishi kerak
		if (!n.BlockStatement.check(fn.body)) {
			fn.body = b.blockStatement([b.returnStatement(fn.body)])
		}
		const already = fn.body.body.some(
			st =>
				n.VariableDeclaration.check(st) &&
				recast.print(st).code.includes('useTranslation()'),
		)
		if (already) continue
		const decl = b.variableDeclaration('const', [
			b.variableDeclarator(
				b.objectPattern([
					Object.assign(b.objectProperty(b.identifier('t'), b.identifier('t')), { shorthand: true }),
				]),
				b.callExpression(b.identifier('useTranslation'), []),
			),
		])
		fn.body.body.unshift(decl)
	}

	let out = recast.print(ast).code
	if (!out.includes("from 'react-i18next'")) {
		out = `import { useTranslation } from 'react-i18next'\n` + out
	}
	writeFileSync(file, out)
	touched.push(file)
}

writeFileSync('src/i18n/generated.uz.json', JSON.stringify(translations, null, 2) + '\n')
console.log(`Fayllar o'zgardi: ${touched.length}`)
console.log(`Almashtirilgan matnlar: ${replaced}`)
console.log(`Unikal kalitlar: ${Object.keys(translations).length}`)
