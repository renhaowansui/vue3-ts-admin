import * as echarts from 'echarts'
import { Ref } from 'vue'
import $bus from '@/utils/eventBus'
import chinaMapData from '../config/china.json'

echarts.registerMap('china', chinaMapData)

export function useEcharts(elRef: Ref<HTMLDivElement>) {
  const myChart = echarts.init(elRef.value)
  const setOptions = (option: echarts.EChartsOption) => {
    myChart && myChart.setOption(option)
  }
  window.addEventListener('resize', () => {
    myChart && myChart.resize()
  })
  $bus.on('resize', () => {
    myChart && myChart.resize()
  })
  return {
    myChart,
    setOptions
  }
}
