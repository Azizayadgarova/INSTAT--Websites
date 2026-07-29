import { getSiteData } from "./siteData.api";

export const getEducationData = async () => {
    const data = await getSiteData();

    return data.filter(item => item.module === "education");
};