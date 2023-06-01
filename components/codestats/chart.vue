<template>
    <div class="hello" ref="chartdiv"></div>
</template>
<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Tooltip } from "@amcharts/amcharts5";

export default {
    props: {
        data: {
            type: Array,
        },
    },
    mounted() {
        let root = am5.Root.new(this.$refs.chartdiv);
        root._logo.dispose();
        root.setThemes([am5themes_Animated.new(root)]);

        let chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panY: false,
                layout: root.verticalLayout,
            })
        );
        const min = Math.min(
            ...this.data
                .map((item) =>
                    Object.keys(item)
                        .filter((key) => key !== "date")
                        .map((key) => item[key])
                )
                .flat()
        );
        const max = Math.max(
            ...this.data
                .map((item) =>
                    Object.keys(item)
                        .filter((key) => key !== "date")
                        .map((key) => item[key])
                )
                .flat()
        );
        var yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                min: min,
                max: max,
                calculateTotals: true,
                numberFormat: "#.#",
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
        let transformedData = this.data.map((item) => {
            let transformedItem = {
                date: item.date,
            };

            for (let key in item) {
                if (key !== "date") {
                    transformedItem[key] = item[key];
                }
            }

            return transformedItem;
        });

        xAxis.data.setAll(transformedData);

        xAxis.get("renderer").labels.template.setAll({
            fill: root.interfaceColors.get("alternativeText"),
        });

        // Create series
        var series = chart.series.push(
            am5xy.LineSeries.new(root, {
                xAxis: xAxis,
                yAxis: yAxis,

                categoryXField: "date",
            })
        );
        series.data.setAll(transformedData);

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
