<template>
    <div class="app-header-container">
        <div class="app-header">
            <nuxt-link
                to="/"
                class="app-header__link"
                exact-active-class="active-link"
            >
                <Icon name="material-symbols:home-rounded" />
            </nuxt-link>
            <nuxt-link to="/" class="app-header__title">
                {{ userInfo.name }}
            </nuxt-link>
            <div class="app-header__link">
                <Icon name="ph:list" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { userInfo } from "@/info";
</script>
<style lang="scss" scoped>
.app-header-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 16px;
    background-color: rgba($main-bg, 0.5);
    z-index: 2;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    left: 0;
    top: 0;
    height: 60px;
    position: fixed;
}
.app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: $screen-md-min;
    &__link {
        display: flex;
        align-items: center;
        padding: 8px;
        border-radius: 8px;
        transition: all 0.2s ease;
        cursor: pointer;
        svg {
            width: 2rem;
            height: 2rem;
            font-size: 1.5rem;
            color: $text-color;
        }
        @include has-hover {
            background-color: $text-color;
            svg {
                color: $main-bg;
            }
        }
    }

    &__title {
        // font-weight: 600;
        color: $text-color;
        font-size: 20px;
    }
    .links {
        display: flex;

        // justify-content: flex-end;
        gap: 10px;
    }
}
</style>
