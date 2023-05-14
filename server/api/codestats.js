import NodeCache from "node-cache";
const { CODESTATS_API_KEY, CODESTATS_USERNAME } = useRuntimeConfig();
const cache = new NodeCache();
export default defineEventHandler(async (event) => {
    const cachedData = cache.get("codestats");
    if (cachedData) {
        return cachedData;
    }

    try {
        const responce = await $fetch(
            `https://codestats.net/api/users/${CODESTATS_USERNAME}`,
            {
                headers: {
                    "X-API-KEY": CODESTATS_API_KEY,
                },
            }
        );
        console.log(responce);
        cache.set("codestats", responce, 30);
        return responce;
    } catch (error) {
        console.log(error);
        return {};
    }
});
