<template>
    <div class="app-header">
        <nuxt-link
            to="/"
            class="app-header__link"
            exact-active-class="active-link"
        >
            <Icon name="material-symbols:home-rounded" />
        </nuxt-link>
        <div class="links">
            <a
                target="_blank"
                class="app-header__link"
                v-if="userInfo.github"
                :href="userInfo.github"
            >
                <Icon name="mdi:github" />
            </a>
            <a target="_blank" class="app-header__link" v-if="userInfo.discord">
                <Icon name="ic:baseline-discord" />
            </a>
            <a
                target="_blank"
                class="app-header__link"
                v-if="userInfo.telegram"
                :href="userInfo.telegram"
            >
                <Icon name="mdi:telegram" />
            </a>
            <a
                target="_blank"
                class="app-header__link"
                v-if="userInfo.vk"
                :href="userInfo.vk"
            >
                <Icon name="mdi:vk" />
            </a>
        </div>
    </div>
</template>
<script setup>
import { userInfo } from "@/info";
</script>
<style lang="scss" scoped>
.app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    &__link {
        display: flex;
        align-items: center;
        padding: 8px;
        border-radius: 8px;
        transition: all 0.2s ease;
        svg {
            width: 2rem;
            height: 2rem;
            font-size: 1.5rem;
            color: $text-color;
        }
        &:hover {
            background-color: $text-color;
            svg {
                color: $main-bg;
            }
        }
    }

    .links {
        display: flex;
        flex-grow: 1;
        justify-content: flex-end;
        gap: 10px;
    }
}
</style>
