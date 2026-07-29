import { getSiteData } from "./siteData.api";

export const getAboutData = async () => {
    const data = await getSiteData();

    return data.filter(item => item.module === "about");
};