import { getSiteData } from "./siteData.api";

export const getContactData = async () => {
    const data = await getSiteData();

    return data.filter(item => item.module === "all");
};