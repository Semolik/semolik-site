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
const data = ref([]);
const fetch = async () => {
    const {
        data: { value: fetchedData },
    } = await useFetch("/api/codestats");

    data.value = fetchedData;
};
await fetch();
onMounted(() => {
    setInterval(fetch, 60 * 1000);
});
</script>
<style lang="scss" scoped>
.codestats-chart {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: $secondary-bg;
    border-radius: 16px;
    padding: 16px;
    gap: 10px;
    border: 1px solid $tetriary-bg;

    .label {
        color: $text-color-secondary;
        text-align: center;
        font-size: 1.2rem;
    }

    .more-info {
        text-decoration: none;
        color: $text-color-secondary;
        padding: 10px;
        border-radius: 8px;
        background-color: $tetriary-bg;
        text-align: center;

        &:hover {
            color: $text-color;
            background-color: $quaternary-bg;
        }
    }
}
</style>
