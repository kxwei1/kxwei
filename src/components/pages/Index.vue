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
      orderData: ["313", "340", "121", "154", "158", "478", "875"]
    };
  },
  methods: {
    drawLine() {
      this.charts = echarts.init(document.getElementById('main'));
      var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
    this.charts.setOption(option)

    }
  }
};
</script>

<style>
</style>