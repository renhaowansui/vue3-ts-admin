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
      text: props.text || '',
      subtext: props.subtext || '',
      left: 'left'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      bottom: 'bottom'
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: props.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>
<style lang="less" scoped></style>
