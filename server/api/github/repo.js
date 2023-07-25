import NodeCache from "node-cache";
import { Octokit } from "@octokit/rest";

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
    cache.set(chacheName, readme, 60 * 60 * 5);
    return readme;
});
