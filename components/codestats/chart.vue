<template>
    <div class="chart">
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>
<script setup>
import { Bar } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";
const { data } = defineProps({
    data: {
        type: Object,
        required: true,
    },
});
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);
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

const isMobile = ref(false);
const checkScreenWidth = () => {
    isMobile.value = window.innerWidth < 768;
};
const chartData = computed(() => {
    return {
        labels: isMobile.value
            ? data.labels.slice(data.labels.length - 7)
            : data.labels,
        datasets: data.datasets.map((dataset) => {
            const updatedData = dataset.data
                .map((value) => (value === 0 ? null : value))
                .slice(isMobile.value ? dataset.data.length - 7 : 0);
            return {
                ...dataset,
                data: updatedData,
                minBarLength: 5,
                backgroundColor: colors[dataset.label] || "#808080",
            };
        }),
    };
});

onMounted(() => {
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
});

onUnmounted(() => {
    window.removeEventListener("resize", checkScreenWidth);
});
const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            titleColor: "#000",
            bodyColor: "#000",
            position: "nearest",
            callbacks: {
                label: (context) => {
                    return `${context.dataset.label}: ${context.parsed.y} XP`; // Скрыть значения, равные нулю
                },
            },
            itemSort: (a, b) => b.parsed.y - a.parsed.y,
            filter: (x) => x.raw > 0,
        },
        legend: {
            display: false,
        },
    },
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
            grid: {
                drawBorder: false,
            },
        },
    },
    elements: {
        bar: {
            borderRadius: 5,
        },
    },
});
</script>
<style scoped lang="scss">
.chart {
    width: 100%;
    height: 300px;

    @include lg {
        height: 400px;
    }
}
</style>
