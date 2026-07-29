import { useEffect, useRef, useState } from 'react'
import { getSiteData } from '@/api/siteData.api'

/**
 * Backend kontentini yuklaydigan markaziy hook.
 *   const { data, loading, error, retry } = useSiteData(d => d.byModule.about)
 */
export const useSiteData = (selector = d => d) => {
	const [state, setState] = useState({ data: null, loading: true, error: null })
	const selectorRef = useRef(selector)
	selectorRef.current = selector
	const [tick, setTick] = useState(0)

	useEffect(() => {
		let active = true
		setState(s => ({ ...s, loading: true, error: null }))
		getSiteData()
			.then(full => {
				if (active) setState({ data: selectorRef.current(full), loading: false, error: null })
			})
			.catch(err => {
				if (active) setState({ data: null, loading: false, error: err })
			})
		return () => {
			active = false
		}
	}, [tick])

	return { ...state, retry: () => setTick(t => t + 1) }
}

export default useSiteData
