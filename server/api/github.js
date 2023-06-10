import NodeCache from "node-cache";
import { Octokit } from "@octokit/rest";

const {
    public: { GITHUB_USERNAME },
} = useRuntimeConfig();
const octokit = new Octokit();
const cache = new NodeCache();

export default defineEventHandler(async (event) => {
    const cachedData = cache.get("github");
    if (cachedData) {
        return cachedData;
    }
    const data = await octokit.request("GET /users/{username}/events", {
        username: GITHUB_USERNAME,
        headers: {
            "X-GitHub-Api-Version": "2022-11-28",
        },
    });
    const xPollInterval = data.headers["x-poll-interval"];
    // cache.set("github", data.data, xPollInterval);
    const pushEvents = data.data.filter((event) => event.type === "PushEvent");
    // const commits = pushEvents.map((event) => ({
    //     date: event.created_at,
    //     repo: event.repo.name,
    //     commits: event.payload.commits.
    // })

    // get all commits with repo name
    const commits = pushEvents.map((event) => {
        return event.payload.commits.map((commit) => ({
            date: event.created_at,
            repo: event.repo.name,
            commit: commit.message,
        }));
    });
    // flatten commits
    const flattenedCommits = commits.flat();
    cache.set("github", flattenedCommits, xPollInterval);

    return flattenedCommits;
});
