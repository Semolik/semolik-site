<template>
    <div class="hello" ref="chartdiv"></div>
</template>
<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Tooltip } from "@amcharts/amcharts5";

// const { data } = defineProps({
//     data: {
//         type: Array,
//         default: () => [],
//     },
// });

export default {
    props: {
        data: {
            type: Array,
        },
    },
    mounted() {
        let data = this.data;

        let root = am5.Root.new(this.$refs.chartdiv);
        root._logo.dispose();
        root.setThemes([am5themes_Animated.new(root)]);

        let chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panY: false,
                layout: root.verticalLayout,
            })
        );

        var yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                min: 0,
                max: 100,
                calculateTotals: true,
                numberFormat: "#'%'",
                renderer: am5xy.AxisRendererY.new(root, {}),
            })
        );

        yAxis.get("renderer").labels.template.setAll({
            fill: root.interfaceColors.get("alternativeText"),
        });

        // Create X-Axis
        var xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                maxDeviation: 0.2,
                renderer: am5xy.AxisRendererX.new(root, {}),
                categoryField: "date",
            })
        );
        xAxis.data.setAll(data);
        xAxis.get("renderer").labels.template.setAll({
            fill: root.interfaceColors.get("alternativeText"),
        });

        // Create series
        var series = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: "Series 1",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                categoryXField: "date",
                tooltip: am5.Tooltip.new(root, {}),
            })
        );
        series.data.setAll(data);

        // Add scrollbar

        // Add cursor
        chart.set("cursor", am5xy.XYCursor.new(root, {}));

        this.root = root;
    },

    beforeDestroy() {
        if (this.root) {
            this.root.dispose();
        }
    },
};
</script>

<style scoped lang="scss">
.hello {
    width: 100%;
    height: 300px;
    background-color: $tetriary-bg;
}
</style>
