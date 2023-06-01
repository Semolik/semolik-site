import NodeCache from "node-cache";
const { CODESTATS_USERNAME } = useRuntimeConfig().public;
import { GraphQLClient, gql } from "graphql-request";
const client = new GraphQLClient("https://codestats.net/profile-graphiql");
const cache = new NodeCache();
export default defineEventHandler(async (event) => {
    const cachedData = cache.get("codestats");
    // if (cachedData) {
    //     return cachedData;
    // }
    try {
        const today = new Date();
        var weekAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
        const year = weekAgo.getFullYear();
        const month = String(weekAgo.getMonth() + 1).padStart(2, "0");
        const day = String(weekAgo.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        const data = await client.request(gql`{
            profile(username: "${CODESTATS_USERNAME}") {
                dayLanguageXps(since: "${formattedDate}") {
                date
                language
                xp
                }
            }
            }`);
        if (!data?.profile?.dayLanguageXps) {
            return null;
        }
        const dates = new Set(
            data.profile.dayLanguageXps.map((item) => item.date)
        );
        const sortedDates = [...dates].sort().reverse();
        const days = sortedDates.map((date) => ({
            date,
            languages: convertLanguages(
                data.profile.dayLanguageXps.filter((item) => item.date === date)
            ),
        }));
        const languages = [
            ...new Set(
                data.profile.dayLanguageXps.map((item) => item.language)
            ),
        ].sort();
        const responce = {
            labels: sortedDates,
            datasets: languages.map((language) => ({
                label: language,
                data: days.map((day) => day.languages[language] || 0),
                color: "#4a5568",
            })),
        };

        // cache.set("codestats", responce, 30);
        return responce;
    } catch (error) {
        return null;
    }
});

function convertLanguages(languages) {
    const result = {};

    for (const language of languages.sort((a, b) => b.xp - a.xp)) {
        result[language.language] = language.xp;
    }
    return result;
}
