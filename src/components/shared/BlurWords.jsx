import { motion } from 'framer-motion'

const vp = { once: true, amount: 0.2 }

const BlurWords = ({ text, style, delay = 0, step = 0.07 }) => (
	<span style={style}>
		{text.split(' ').map((word, i) => (
			<motion.span
				key={i}
				initial={{ opacity: 0, filter: 'blur(14px)', y: 18 }}
				whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
				viewport={vp}
				transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: delay + i * step }}
				style={{ display: 'inline-block', marginRight: '0.28em' }}
			>
				{word}
			</motion.span>
		))}
	</span>
)

export default BlurWords
