import { useEffect, useRef, useState } from 'react'

/**
 * Har qanday resources.api.js / siteContent.api.js klientini yuklaydigan
 * umumiy hook. useSiteData bilan bir xil shakl: { data, loading, error, retry }.
 *
 *   const { data, loading, error, retry } = useApiResource(() => coursesApi.getAll({ per_page: 6 }))
 *
 * `data` — getAll() natijasi: { items, meta, links }
 * `deps` — [] bo'lsa bir marta yuklanadi; params o'zgarganda qayta yuklash
 *   uchun deps massivini bering.
 */
export const useApiResource = (fetcher, deps = []) => {
	const [state, setState] = useState({ data: null, loading: true, error: null })
	const fetcherRef = useRef(fetcher)
	fetcherRef.current = fetcher
	const [tick, setTick] = useState(0)

	useEffect(() => {
		let active = true
		setState(s => ({ ...s, loading: true, error: null }))
		fetcherRef
			.current()
			.then(result => {
				if (active) setState({ data: result, loading: false, error: null })
			})
			.catch(err => {
				if (active) setState({ data: null, loading: false, error: err })
			})
		return () => {
			active = false
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tick, ...deps])

	return { ...state, retry: () => setTick(t => t + 1) }
}

export default useApiResource
