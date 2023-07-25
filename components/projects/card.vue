<template>
    <nuxt-link class="project-card" :to="`projects/${project.id}`">
        <img
            class="project-card__image"
            :src="project.image"
            :alt="project.title"
        />
        <div class="project-card__content">
            <div class="project-info">
                <div class="project-card__title">{{ project.title }}</div>
                <div class="project-card__tags">
                    <div
                        v-for="tag in project.tags"
                        :key="tag"
                        class="project-card__tag"
                    >
                        {{ tag }}
                    </div>
                </div>
            </div>
            <div class="project-card__short-description">
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
    $border-radius: 10px;
    border-radius: $border-radius;
    position: relative;
    background-color: $secondary-bg;
    transition: 0.1s ease-in-out;
    outline: 1px solid transparent;
    color: $text-color;
    text-decoration: none;

    &:hover {
        // border-color: $accent-color;
        background-color: $quaternary-bg;
    }

    &__image {
        border-radius: $border-radius $border-radius 0 0;
        overflow: hidden;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        user-select: none;
    }
    &__content {
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        flex-grow: 1;
        .project-info {
            display: flex;
            flex-direction: column;
            gap: 10px;

            height: 100%;
            .project-card__title {
                font-size: 1.3rem;
                font-weight: 600;
            }
            .project-card__tags {
                display: flex;
                flex-wrap: wrap;
                gap: 5px;
                .project-card__tag {
                    padding: 2px 20px;
                    // flex-grow: 1;
                    text-align: center;
                    border-radius: 5px;
                    border: 1px solid $accent-color-secondary;
                    color: $text-color-secondary;
                    font-size: 0.9rem;
                    cursor: pointer;

                    &:hover {
                        background-color: $accent-color;
                        color: $text-color;
                    }
                }
            }
        }
        .project-card__short-description {
            font-size: 0.9rem;
            color: $text-color-secondary;
        }
    }
}
</style>
