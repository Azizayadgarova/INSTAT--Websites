import { getSiteData } from './siteData.api'

export const getScienceData = async () => {
	const data = await getSiteData()

	return data.filter(item => item.module === 'science')
}
