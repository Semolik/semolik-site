import Discord from "discord.js";
import NodeCache from "node-cache";
const {
    DISCORD_BOT_TOKEN,
    DISCORD_SERVER_ID,
    DISCORD_USER_ID,
    DISCORD_SKIP_APPLICATIONS_IDS,
} = useRuntimeConfig().public;
const cache = new NodeCache();

export default defineEventHandler(async (event) => {
    const cachedData = cache.get("activities");
    if (cachedData) {
        return cachedData;
    }
    const client = new Discord.Client({
        intents: [
            Discord.GatewayIntentBits.Guilds,
            Discord.GatewayIntentBits.GuildMembers,
            Discord.GatewayIntentBits.GuildMessages,
            Discord.GatewayIntentBits.GuildMessageReactions,
            Discord.GatewayIntentBits.GuildPresences,
        ],
    });

    await client.login(DISCORD_BOT_TOKEN);
    const guild = await client.guilds.fetch(DISCORD_SERVER_ID, {
        chache: true,
        cacheMaxAge: 6000,
    });
    const member = await guild.members.fetch(DISCORD_USER_ID);
    if (!member?.presence?.activities || !member.presence.activities.length) {
        cache.set("activities", null, 60);
        return null;
    }
    const activities = member.presence.activities.filter(
        (activity) =>
            !DISCORD_SKIP_APPLICATIONS_IDS.includes(activity.applicationId)
    );
    if (!activities.length) {
        cache.set("activities", null, 60);
        return null;
    }
    let activity = activities[0];
    for (let imageKey of ["largeImage", "smallImage"]) {
        if (activity.assets[imageKey]) {
            activity.assets[
                imageKey
            ] = `https://cdn.discordapp.com/app-assets/${activity.applicationId}/${activity.assets[imageKey]}`;
        }
    }

    cache.set("activities", activity, 60);
    return activity;
});
