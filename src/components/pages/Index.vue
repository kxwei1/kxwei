<template>
  <div>
    <h1>首页</h1>
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      charts: "",
    };
  },
  methods: {
    drawLine() {
      this.charts = echarts.init(document.getElementById('main'));
      this.charts.setOption(option)
    }
  }
};
</script>

<style>
</style>