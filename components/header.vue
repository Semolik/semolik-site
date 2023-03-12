<template>
    <div class="app-header">
        <nuxt-link to="/" class="home-link" exact-active-class="active-link">
            <Icon name="material-symbols:home-rounded" />
        </nuxt-link>

        <div class="links" @mouseleave="hoveredLink = null">
            <nuxt-link
                v-for="(link, index) in links"
                :key="link.name"
                :to="link.link"
                @mouseenter="hoveredLink = index"
                :class="{ active: hoveredLink === index }"
                :id="`link-${index}`"
                exact-active-class="active-link"
            >
                {{ link.name }}
            </nuxt-link>

            <div
                :class="[
                    'link-highlight',
                    {
                        transitionActive: linkHighlightActive,
                        active: hoveredLink !== null,
                    },
                ]"
                :style="{
                    width: `${linkHighlightWidth}px`,
                    left: `${linkHighlightLeft}px`,
                }"
            ></div>
        </div>
    </div>
</template>
<script setup>
const links = [
    {
        name: "Проекты",
        link: "/projects",
    },
    {
        name: "Контакты",
        link: "/contact",
    },
    {
        name: "Обо мне",
        link: "/about",
    },
];
const hoveredLink = ref(null);
const linkHighlightWidth = ref(0);
const linkHighlightLeft = ref(0);
const linkHighlightActive = ref(false);
const linkTransition = 150;
const linkTransitionMs = `${linkTransition}ms`;
const timer = ref(null);

watch(hoveredLink, (newVal) => {
    if (newVal !== null) {
        timer.value = setTimeout(() => {
            linkHighlightActive.value = true;
        }, linkTransition);
    } else {
        clearTimeout(timer.value);
        linkHighlightActive.value = false;
    }
});
watchEffect(() => {
    if (hoveredLink.value !== null) {
        const link = document.getElementById(`link-${hoveredLink.value}`);
        linkHighlightWidth.value = link.offsetWidth;
        linkHighlightLeft.value = link.offsetLeft;
    }
});
</script>
<style lang="scss" scoped>
.app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    width: 100%;
    max-width: 1200px;
    $hover-color: rgba(
        $color: $text-color,
        $alpha: 0.2,
    );
    .home-link {
        display: flex;
        align-items: center;
        padding: 8px;
        border-radius: 8px;
        &.active-link {
            svg {
                color: $accent-color;
            }
            &:hover {
                background-color: $text-color;
                svg {
                    color: $main-bg;
                }
            }
        }
        svg {
            width: 2rem;
            height: 2rem;
            color: $text-color;

            font-size: 1.5rem;
        }
        &:hover {
            background-color: $hover-color;
        }
    }
    .links {
        display: flex;
        align-items: center;
        gap: 1rem;
        position: relative;
        isolation: isolate;

        a {
            padding: 8px;
            border-radius: 8px;
            color: $text-color-secondary;
            text-decoration: none;
            z-index: 1;
            position: relative;
            min-width: 100px;
            text-align: center;
            &.active {
                color: $text-color;
            }

            &::after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background-color: $accent-color;
                border-radius: 5px;
                opacity: 0;
                transition: background-color v-bind(linkTransitionMs);
            }
            &.active-link {
                color: $text-color;
                &::after {
                    opacity: 1;
                }
            }
        }

        .link-highlight {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 100%;
            z-index: 0;
            background-color: transparent;
            border-radius: 5px;

            &.transitionActive {
                transition: all v-bind(linkTransitionMs) ease;
            }

            &.active {
                background-color: $hover-color;
            }
        }
    }
}
</style>
