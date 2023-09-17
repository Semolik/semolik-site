<template>
    <div class="chart">
        <Bar :data="data" :options="chartOptions" />
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
                    return `${context.dataset.label}: ${context.parsed.y} XP`;
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
}
</style>
