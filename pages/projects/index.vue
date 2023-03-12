<template>
    <div class="projects-container">
        <ProjectCard
            v-for="project in projects"
            :key="project.id"
            :project="project"
        />
    </div>
</template>
<script setup>
import { projects } from "@/projects";
</script>
<style lang="scss" scoped>
.projects-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;
    height: 100%;
    margin: auto;
}
</style>
