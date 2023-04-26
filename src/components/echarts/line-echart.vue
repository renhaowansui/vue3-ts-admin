<template>
  <div class="component-line-echart">
    <Base-echart :option="option" />
  </div>
</template>

<script setup>
import BaseEchart from './base-echart'
import { computed, defineProps } from 'vue'

const props = defineProps({
  xLabels: {
    type: Array,
    default: () => []
  },
  value: {
    type: Array,
    default: () => []
  },
  text: {
    type: String,
    default: ''
  },
  subtext: {
    type: String,
    default: ''
  }
})
const option = computed(() => {
  return {
    title: {
      text: props.text,
      subtext: props.subtext
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.xLabels
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '分别销量',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: props.value
      }
    ]
  }
})
</script>
<style lang="less" scoped></style>
