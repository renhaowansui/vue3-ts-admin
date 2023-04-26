<template>
  <div class="compoent-baseEchart">
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watchEffect } from 'vue'
import { useEcharts } from './hooks/useEcharts.ts'

const props = defineProps({
  option: {
    type: Object,
    default: () => ({})
  }
})

const chartRef = ref()

onMounted(() => {
  const { setOptions } = useEcharts(chartRef)
  watchEffect(() => {
    setOptions(props.option)
  })
})
</script>

<style lang="less" scoped>
.compoent-baseEchart {
  height: 100%;
  .chart {
    height: 300px;
  }
}
</style>
