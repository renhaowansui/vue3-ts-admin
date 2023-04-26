<template>
  <div class="component-pie-echart">
    <Base-echart :option="option" />
  </div>
</template>

<script setup>
import BaseEchart from './base-echart'
import { computed, defineProps } from 'vue'

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
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        type: 'pie',
        radius: [20, 80],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.value
      }
    ]
  }
})
</script>
<style lang="less" scoped></style>
