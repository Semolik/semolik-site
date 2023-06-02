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
        type: Array,
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

const chartData = ref({
    ...data,
    datasets: data.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: "#f87979",
        minHeight: 500,
    })),
});
const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,

    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
});
</script>
<style scoped>
.chart {
    width: 100%;
    height: 400px;
}
</style>
