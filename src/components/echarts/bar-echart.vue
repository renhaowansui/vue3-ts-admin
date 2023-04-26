<template>
  <div class="component-pie-echart">
    <Base-echart :option="option" />
  </div>
</template>

<script setup>
import BaseEchart from './base-echart'
import { computed, defineProps } from 'vue'
// import { IPieValues } from './types.ts'

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
    xAxis: {
      type: 'category',
      data: props.xLabels
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        data: props.value,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  }
})
</script>
<style lang="less" scoped></style>
