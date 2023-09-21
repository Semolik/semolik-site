<template>
    <div class="user-info">
        <img src="avatar.webp" class="avatar" />
        <div class="links">
            <InfoItem :link="userInfo.github" icon="akar-icons:github-fill" />
            <InfoItem
                :link="userInfo.telegram"
                icon="akar-icons:telegram-fill"
            />
            <InfoItem :link="userInfo.steam" icon="bi:steam" />
            <InfoItem
                :link="userInfo.discord"
                icon="akar-icons:discord-fill"
                copy
            />
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
    }
}
</style>
