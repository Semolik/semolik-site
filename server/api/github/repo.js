import NodeCache from "node-cache";
import { Octokit } from "@octokit/rest";
import markdownParser from "@nuxt/content/transformers/markdown";
const octokit = new Octokit();
const cache = new NodeCache();
import { projects } from "@/projects";
export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const projectName = query.project;
    const path = query.path || "README.md";
    const chacheName = `github-${projectName}-${path}`;
    const cachedData = cache.get(chacheName);
    if (cachedData) {
        return cachedData;
    }

    const project = projects.find(
        (project) => project.id === projectName && project.repo
    );

    if (!project) {
        throw createError({
            statusCode: 404,
            statusMessage: "Not Found",
        });
    }
    const data = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
            owner: project.repo.owner,
            repo: project.repo.name,
            path: path,
        }
    );
    const base64 = data.data.content;
    const readme = Buffer.from(base64, "base64").toString("utf-8");
    const parsedMarkdown = await markdownParser.parse(chacheName, readme);
    cache.set(chacheName, parsedMarkdown.body, 60 * 60 * 5);
    return parsedMarkdown.body;
});
