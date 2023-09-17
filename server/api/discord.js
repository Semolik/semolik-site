import Discord from "discord.js";
import NodeCache from "node-cache";
const {
    DISCORD_BOT_TOKEN,
    DISCORD_SERVER_ID,
    DISCORD_USER_ID,
    DISCORD_SKIP_APPLICATIONS_IDS,
} = useRuntimeConfig();
const cache = new NodeCache();
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildPresences,
    ],
});
client.login(DISCORD_BOT_TOKEN);
export default defineEventHandler(async (event) => {
    const cachedData = cache.get("activities");
    if (cachedData) {
        return cachedData;
    }
    try {
        const guild = await client.guilds.fetch(DISCORD_SERVER_ID, {
            chache: true,
            cacheMaxAge: 6000,
        });
        const member = await guild.members.fetch(DISCORD_USER_ID);
        if (
            !member?.presence?.activities ||
            !member.presence.activities.length
        ) {
            cache.set("activities", null, 30);
            return null;
        }

        const activities = member.presence.activities.filter(
            (activity) =>
                !DISCORD_SKIP_APPLICATIONS_IDS.includes(activity.applicationId)
        );
        if (!activities.length) {
            cache.set("activities", null, 30);
            return null;
        }
        let activity = activities[0];
        for (let imageKey of ["largeImage", "smallImage"]) {
            if (activity.assets[imageKey]) {
                activity.assets[imageKey] = activity.assets[imageKey].includes(
                    "http"
                )
                    ? activity.assets[imageKey]
                    : `https://cdn.discordapp.com/app-assets/${activity.applicationId}/${activity.assets[imageKey]}`;
            }
        }
        cache.set("activities", activity, 30);
        return activity;
    } catch (e) {
        console.log("Discord error", e);
        cache.set("activities", null, 30);
        return null;
    }
});
