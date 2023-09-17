<template>
    <div class="codestats-chart" v-if="!isEmpty">
        <div class="label">Code::Stats</div>
        <CodestatsChart :data="chartData" />
        <a class="more-info" target="_blank" :href="codestatsUrl">
            Подробнее
        </a>
    </div>
</template>
<script setup>
const { CODESTATS_USERNAME } = useRuntimeConfig().public;
const codestatsUrl = `https://codestats.net/users/${CODESTATS_USERNAME}`;
const { data } = await useFetch("/api/codestats");
onMounted(() => {
    setInterval(async () => {
        const {
            data: { value: newData },
        } = await useFetch("/api/codestats");
        data.value = newData;
    }, 60 * 1000);
});

const isMobile = ref(false);
const checkScreenWidth = () => {
    isMobile.value = window.innerWidth < 768;
};
const colors = {
    "C++": "#f34b7d",
    DotEnv: "#315d9a",
    JSON: "#292929",
    dockercompose: "#0db7ed",
    "Plain text": "#555555",
    Docker: "#384d54",
    "TypeScript (JSX)": "#2b7489",
    XAML: "#a0c5e8",
    Ignore: "#000000",
    Properties: "#d73a49",
    "Visual Basic": "#945db7",
    "pip-requirements": "#9f3a32",
    GraphQL: "#e10098",
    SQL: "#e38c00",
    XML: "#df42f4",
    Batch: "#c1f12e",
    PHP: "#4f5d95",
    Ini: "#d1dbe0",
    "Shell Script": "#89e051",
    editorconfig: "#ffc20f",
    YAML: "#cb171e",
    prisma: "#38bdae",
    Vue: "#41b883",
    Python: "#3572A5",
    JavaScript: "#f1e05a",
    CSS: "#563d7c",
    HTML: "#e34c26",
    "JavaScript (JSX)": "#f1e05a",
    SCSS: "#c6538c",
    TypeScript: "#2b7489",
    "C#": "#178600",
    Markdown: "#083fa1",
};
const chartData = computed(() => {
    const showOnlyLast7Labels = isMobile.value && data.value.labels.length > 7;
    return {
        labels: showOnlyLast7Labels
            ? data.value.labels.slice(data.value.labels.length - 7)
            : data.value.labels,
        datasets: data.value.datasets.map((dataset) => {
            const updatedData = dataset.data.map((value) =>
                value === 0 ? null : value
            );
            return {
                ...dataset,
                data: showOnlyLast7Labels ? updatedData.slice(-7) : updatedData,
                minBarLength: 5,
                backgroundColor: colors[dataset.label] || "#808080",
            };
        }),
    };
});
const isEmpty = computed(() => {
    return chartData.value.datasets.every((dataset) =>
        dataset.data.every((value) => value === null)
    );
});
onMounted(() => {
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
});

onUnmounted(() => {
    window.removeEventListener("resize", checkScreenWidth);
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
