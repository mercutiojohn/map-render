<template>
  <div ref="map" class="map"></div>
</template>

<script>
import L from "leaflet";
import echarts from "echarts";

import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";

export default {
  name: "Map",

  props: {
    tileUrl: {
      type: String,
      default: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    },
    center: {
      type: Array,
      default: [0, 0],
    },
    zoom: {
      type: Number,
      default: 1,
    },
    data: {
      type: Array,
      default: () => [],
    },
  },

  mounted() {
    // 创建地图
    const map = L.map(this.$refs.map).setView(this.center, this.zoom);

    // 添加瓦片图层
    L.tileLayer(this.tileUrl, {
      maxZoom: 18,
    }).addTo(map);

    // 创建 Echarts 图表
    const chart = echarts.init(this.$refs.map);

    // 配置 Echarts 图表
    const option = {
      xAxis: {},
      yAxis: {},
      series: [
        {
          type: "scatter",
          data: this.data,
        },
      ],
    };
    chart.setOption(option);
  },
};
</script>

<style>
.map {
  height: 500px;
}
</style>