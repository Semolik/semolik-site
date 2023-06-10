<template>
    <div class="codestats-chart" v-if="data">
        <div class="label">Code::Stats</div>
        <CodestatsChart :data="data" />
        <a class="more-info" target="_blank" :href="codestatsUrl">
            Подробнее
        </a>
    </div>
</template>
<script setup>
const { CODESTATS_USERNAME } = useRuntimeConfig().public;
const codestatsUrl = `https://codestats.net/users/${CODESTATS_USERNAME}`;
const { data } = await useFetch("/api/codestats");
</script>
<style lang="scss" scoped>
.codestats-chart {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: $secondary-bg;
    border-radius: 10px;
    padding: 10px;
    gap: 10px;

    .label {
        font-weight: 600;
        color: $text-color-secondary;
        text-align: center;
        font-size: 1.2rem;
    }

    .more-info {
        text-decoration: none;
        color: $text-color-secondary;
        padding: 10px;
        border-radius: 5px;
        background-color: $tetriary-bg;
        text-align: center;

        &:hover {
            color: $text-color;
            background-color: $quaternary-bg;
        }
    }
}
</style>
