<template>
    <div class="user-info">
        <img src="/avatar.jpg" class="avatar" />
        <div class="links">
            <InfoItem :link="userInfo.github" icon="akar-icons:github-fill" />
            <InfoItem
                :link="userInfo.telegram"
                icon="akar-icons:telegram-fill"
            />
            <InfoItem :link="userInfo.vk" icon="mdi:vk" style="grid-column: span 2;" />
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
    grid-template-columns: repeat(2, 1fr);

    @include sm(true) {
        grid-template-columns: 1fr;
    }

    .avatar {
        object-fit: cover;
        border: 1px solid $tetriary-bg;
        border-radius: 16px;

        aspect-ratio: 1;
    }

    .links {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        @include sm(true) {
            @include xs {
                grid-template-columns: repeat(4, 1fr);
            }
        }
    }
}
</style>
