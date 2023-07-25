<template>
    <div class="project-container">
        <div class="project">
            <div class="project-head">
                <img
                    class="project-head-image"
                    :src="project.head"
                    :alt="project.title"
                    v-if="project.head"
                />
                <div class="project-head-content">
                    <div class="project-head-content-row">
                        <div class="project-head-title">
                            {{ project.title }}
                        </div>
                        <div class="links">
                            <a
                                target="_blank"
                                class="project-head-link"
                                :href="project.url"
                                v-if="project.url"
                            >
                                <Icon name="mdi:link" />
                            </a>
                            <a
                                target="_blank"
                                class="project-head-link"
                                :href="project.git"
                                v-if="project.git"
                            >
                                <Icon name="mdi:github" />
                            </a>
                        </div>
                    </div>
                    <div class="project-head-tags">
                        <div
                            v-for="tag in project.tags"
                            :key="tag"
                            class="project-head-tag"
                        >
                            {{ tag }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="project-content">
                <ContentRendererMarkdown :value="readme" />
            </div>
            <div class="project-images" v-if="screenshotsExist">
                <div
                    v-for="(screenshot, index) in project.screenshots"
                    class="project-image"
                >
                    <el-image
                        :src="screenshot"
                        :preview-src-list="project.screenshots"
                        :initial-index="index"
                        fit="cover"
                        hide-on-click-modal
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { projects } from "@/projects";
const { params } = useRoute();
const id = ref(params.id);

const project = projects.find((project) => project.id === id.value);
if (!project) {
    throw { statusCode: 404, message: "Проект не найден" };
}
const { data: readme } = await useFetch("/api/github/repo", {
    method: "GET",
    params: {
        project: id.value,
    },
});

const screenshotsExist = computed(() => {
    return project.screenshots.length > 0;
});
</script>
<style lang="scss" scoped>
.project-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 10px;
    flex: 1;
    align-items: center;
    .project {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        flex: 1;
        align-items: center;
        gap: 10px;

        .project-head {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 10px;

            .project-head-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 10px;
            }
            .project-head-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 5px;
                .project-head-content-row {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    width: 100%;
                    @include md(true) {
                        flex-direction: column;
                        gap: 30px;
                    }

                    .project-head-title {
                        font-size: 2rem;
                        font-weight: 600;
                        white-space: nowrap;
                        color: $text-color-secondary;
                    }
                    .links {
                        display: flex;
                        flex-grow: 1;
                        @include md(true) {
                            width: 100%;
                        }
                        align-items: center;
                        justify-content: flex-end;
                        height: min-content;
                        gap: 5px;
                        .project-head-link {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background-color: rgba($color: white, $alpha: 0.1);
                            padding: 3px 20px;
                            border-radius: 10px;
                            cursor: pointer;
                            transition: background-color 0.2s;
                            @include md(true) {
                                flex-grow: 1;
                            }
                            svg {
                                width: 30px;
                                height: 30px;
                                color: white;
                                transition: color 0.2s;
                            }
                            &:hover {
                                background-color: $accent-color;
                                svg {
                                    color: black;
                                }
                            }
                        }
                    }
                }
                .project-head-tags {
                    display: flex;
                    width: 100%;
                    flex-wrap: wrap;
                    gap: 5px;

                    .project-head-tag {
                        @include md(true) {
                            flex-grow: 1;
                        }

                        display: flex;
                        justify-content: center;
                        padding: 3px 20px;
                        border-radius: 10px;
                        white-space: nowrap;
                        background-color: $accent-color;
                        color: black;
                    }
                }
            }
        }
        .project-content {
            width: 100%;
            display: flex;
            flex-direction: column;
            color: $text-color-secondary;
        }
        .project-images {
            display: grid;
            width: 100%;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            grid-auto-rows: min-content;
            gap: 10px;
            height: min-content;

            @include sm(true) {
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            }
            .project-image {
                width: 100%;
                height: 100%;
                flex: 1;
                border-radius: 10px;
                overflow: hidden;

                .el-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    min-width: 200px;
                }
            }
        }
    }
}
</style>
