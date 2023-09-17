<template>
    <div class="user-info">
        <img src="avatar.webp" class="avatar" />
        <div class="links">
            <a
                :href="userInfo.github"
                target="_blank"
                rel="noopener noreferrer"
                v-if="userInfo.github"
                class="link"
            >
                <Icon name="akar-icons:github-fill" />
            </a>
            <a
                :href="userInfo.telegram"
                target="_blank"
                rel="noopener noreferrer"
                v-if="userInfo.telegram"
                class="link"
            >
                <Icon name="akar-icons:telegram-fill" />
            </a>
            <a
                :href="userInfo.vk"
                target="_blank"
                rel="noopener noreferrer"
                v-if="userInfo.vk"
                class="link"
            >
                <Icon name="akar-icons:vk-fill" />
            </a>
            <div
                :href="userInfo.discord"
                target="_blank"
                rel="noopener noreferrer"
                v-if="userInfo.discord"
                class="link"
            >
                <Icon name="akar-icons:discord-fill" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { userInfo } from "@/info";
</script>
<style lang="scss" scoped>
.user-info {
    display: grid;
    gap: 10px;
    width: 100%;
    grid-template-columns: 1fr 2fr;

    @include md(true) {
        grid-template-columns: repeat(2, 1fr);
    }

    .avatar {
        object-fit: cover;
        border: 1px solid $tetriary-bg;
        border-radius: 16px;
    }

    .links {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;

        .link {
            @include flex-center;
            background: $secondary-bg;
            border-radius: 16px;
            transition: 0.2s ease-in-out;
            border: 1px solid $tetriary-bg;

            svg {
                color: $text-color;
                height: 40%;
                width: 40%;
            }

            @include has-hover {
                background: $quaternary-bg;
            }
        }
    }
}
</style>
