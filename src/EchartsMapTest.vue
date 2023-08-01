<template>
  <div id="main" style="width: 100%; height: 400px"></div>
</template>

<script>
import * as echarts from "echarts";
import "echarts/extension/bmap/bmap";
import axios from "axios";

export default {
  props: {
    tileUrl: {
      type: String,
      default: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    },
    center: {
      type: Array,
      default: () => [30.240018034923, 120.13066322374],
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
    const ROOT_PATH = "https://echarts.apache.org/examples";

    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    var option;

    axios
      .get(ROOT_PATH + "/data/asset/data/hangzhou-tracks.json")
      .then((response) => {
        const data = response.data;
        const lines = data.map((track) => {
          return {
            coords: track.map((seg) => {
              return seg.coord;
            }),
          };
        });
        myChart.setOption(
          (option = {
            bmap: {
              center: this.center,
              zoom: 14,
              roam: true,
              mapStyle: {
                styleJson: [
                  {
                    featureType: "water",
                    elementType: "all",
                    stylers: {
                      color: "#d1d1d1",
                    },
                  },
                  // ... 省略其余地图样式配置
                ],
              },
            },
            series: [
              {
                type: "lines",
                coordinateSystem: "bmap",
                data: lines,
                polyline: true,
                lineStyle: {
                  color: "purple",
                  opacity: 0.6,
                  width: 1,
                },
              },
            ],
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    option && myChart.setOption(option);
  },
};
</script>

<style>
/* 可以根据需要添加样式 */
</style>
