const IMGS = import.meta.glob('/src/assets/pages/*', { eager: true, import: 'default' })

/** src/assets/pages/<name> dagi rasm manzili (data fayllarda faqat fayl nomi saqlanadi). */
export const pageImg = name => IMGS[`/src/assets/pages/${name}`] ?? null
