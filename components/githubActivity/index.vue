<template>
    <div class="github-activity">
        <div class="github-activity__title">Последние коммиты</div>
        <GithubActivityItem
            v-for="item in data"
            :key="item.id"
            :itemData="item"
        />
    </div>
</template>
<script setup>
const { data } = await useFetch("/api/github");
provide("currentDate", new Date());
</script>
<style lang="scss" scoped>
.github-activity {
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: $secondary-bg;
    padding: 10px;
    border-radius: 16px;

    &__title {
        font-size: 20px;
        font-weight: 500;
        color: $text-color-secondary;
    }
}
</style>
