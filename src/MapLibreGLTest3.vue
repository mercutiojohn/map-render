<template>
  <div ref="map" class="map"></div>
</template>

<script>
import maplibregl from "maplibre-gl";

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
    pitch: {
      type: Number,
      default: 45
    },
    data: {
      type: Array,
      default: () => [],
    },
  },

  mounted() {
    // 创建地图
    const map = new maplibregl.Map({
      container: this.$refs.map,
      style: "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json",
      center: [this.center[0], this.center[1]],
      zoom: this.zoom,
      pitch: this.pitch
    });

    // 添加瓦片图层
    map.on("load", () => {
      map.addSource("firstLayer", {
        type: "raster",
        tiles: [this.tileUrl],
        tileSize: 256,
        maxzoom: 18,
      });

      map.addSource("secondLayer", {
        type: "raster",
        tiles: [this.markTileUrl],
        tileSize: 256,
        maxzoom: 18,
      });

      map.addLayer({
        id: "firstLayer",
        type: "raster",
        source: "firstLayer",
        paint: {},
      });

      map.addLayer({
        id: "secondLayer",
        type: "raster",
        source: "secondLayer",
        paint: {},
      });

      map.on('click', this.onMapClick);

      let marker = new maplibregl.Marker()
        .setLngLat([117.044702,36.642555])
        .addTo(map);

      let circle = new maplibregl.Circle({
        center: [117.044702,36.642555],
        radius: 200,
        color: 'red',
        opacity: 0.4
      }).addTo(map);

      let polygon = new maplibregl.Popup()
        .setLngLat([117.044607,36.643209])
        .setHTML("<h1>Hello world!</h1>")
        .addTo(map);
    });

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
      alert("You clicked the map at " + e.lngLat);
    },
  },
};
</script>

<style>
.map {
  height: 100%;
  width: 100%;
}
</style>