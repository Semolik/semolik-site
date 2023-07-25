<template>
    <div class="projects-container" id="projects">
        <div class="title">Мои проекты</div>
        <div class="projects-items">
            <ProjectsCard
                v-for="project in projects"
                :key="project.id"
                :project="project"
            />
        </div>
    </div>
</template>
<script setup>
import { projects } from "@/projects";
</script>
<style lang="scss" scoped>
.projects-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .projects-items {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 10px;
        @include sm(true) {
            grid-template-columns: 1fr;
        }
    }
    .title {
        font-size: 1.5rem;
        text-align: center;
        color: $text-color;
    }
}
</style>
