<template>
    <div class="index-page">
        <!-- <Technologies />
     -->
        <div class="projects-container" id="projects">
            <ProjectCard
                v-for="project in projects"
                :key="project.id"
                :project="project"
            />
        </div>
    </div>
</template>
<script setup>
import { projects } from "@/projects";
const words = [
    "Vue.js",
    "Nuxt.js",
    "JavaScript",
    "React.js",
    "fastapi",
    "Python",
    "sqlalchemy",
    "PostgreSQL",
    "Docker",
];
</script>
<style lang="scss" scoped>
.index-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    flex: 1;
    align-items: center;
    .projects-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 20px;
        height: 100%;
        margin: auto;
    }
}
</style>
