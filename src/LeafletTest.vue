<template>
  <div ref="map" class="map"></div>
</template>

<script>
import L from "leaflet";
// import echarts from "echarts";

// import "echarts/lib/chart/bar";
// import "echarts/lib/component/tooltip";
// import "echarts/lib/component/title";

export default {
  name: "Map",

  props: {
    key: {
      type: String,
      default: "88f3c1aa7e87a1daa0176fe655a92030",
    },
    tileUrl: {
      type: String,
      default: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    },
    markTileUrl: { 
      type: String,
      default: `https://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=88f3c1aa7e87a1daa0176fe655a92030`,
    },
    center: {
      type: Array,
      default: () => [117.12, 36.65],
    },
    zoom: {
      type: Number,
      default: 14,
    },
    data: {
      type: Array,
      default: () => [],
    },
  },

  mounted() {
    // 创建地图
    const map = L.map(this.$refs.map).setView(
      [this.center[1], this.center[0]],
      this.zoom
    );

    // 添加瓦片图层
    this.firstLayer = L.tileLayer(this.tileUrl, {
      maxZoom: 18,
      attribution: "Mercutio",
    }).addTo(map);

    this.secondLayer = L.tileLayer(this.markTileUrl, {
      maxZoom: 18,
      attribution: "Mercutio2",
    }).addTo(map);

    let marker = L.marker([36.642555,117.044702]).addTo(map);

    let circle = L.circle([36.642555,117.044702], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.4,
        radius: 200
    }).addTo(map);

    let polygon = L.polygon([
        [36.643209, 117.044607],
        [36.642529, 117.045594],
        [36.641293, 117.044204]
    ]).addTo(map);

    map.on('click', this.onMapClick);


    // 创建 Echarts 图表
    // const chart = echarts.init(this.$refs.map);

    // 配置 Echarts 图表
    // const option = {
    //   xAxis: {},
    //   yAxis: {},
    //   series: [
    //     {
    //       type: "scatter",
    //       data: this.data,
    //     },
    //   ],
    // };
    // chart.setOption(option);
  },

  methods: {
    onMapClick(e) {
      alert("You clicked the map at " + e.latlng);
    },
  },
  data() {
    return {
      firstLayer: null,
      secondLayer: null
    }
  }
};
</script>

<style>
.map {
  height: 100%;
  width: 100%;
}
</style>