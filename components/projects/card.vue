<template>
    <nuxt-link class="project-card" :to="`/projects/${project.id}`">
        <img
            class="project-card__image"
            :src="project.image"
            :alt="project.title"
        />
        <div class="project-card__content">
            <div class="project-card__content__title">{{ project.title }}</div>

            <div class="project-card__content__short-description">
                {{ project.shortDescription }}
            </div>
        </div>
    </nuxt-link>
</template>
<script setup lang="ts">
import { projectExport } from "@/projects";
interface Props {
    project: projectExport;
}
const { project } = defineProps<Props>();
</script>
<style lang="scss" scoped>
.project-card {
    display: flex;
    flex-direction: column;
    color: $text-color;
    text-decoration: none;
    align-items: center;
    justify-content: center;
    text-align: center;

    &__image {
        border-radius: 16px;
        overflow: hidden;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        user-select: none;
    }
    &__content {
        padding: 10px;
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        &__title {
            font-size: 20px;
        }

        &__short-description {
            font-size: 14px;
            color: $text-color-secondary;
        }
    }
}
</style>
