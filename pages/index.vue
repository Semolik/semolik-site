<template>
    <div class="index-page">
        <div class="activities"></div>
        <Codestats />
        <!-- <Technologies />
     -->
        <!-- <Matter :words="words" /> -->
        <!-- <div class="projects-container" id="projects">
            <ProjectCard
                v-for="project in projects"
                :key="project.id"
                :project="project"
            />
        </div> -->
    </div>
</template>
<script setup>
import { projects } from "@/projects";
useHead({
    title: "Главная",
});
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
    gap: 10px;
    flex: 1;
    .activities {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
    }
    .projects-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        height: 100%;
        margin: auto;
    }
}
</style>
