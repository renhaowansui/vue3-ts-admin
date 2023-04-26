<template>
  <div class="component-pie-echart">
    <Base-echart :option="option" />
  </div>
</template>

<script setup>
import BaseEchart from './base-echart'
import { computed, defineProps } from 'vue'
import { coordinateData } from './config/coordinate-data.ts'

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

const convertData = (arr) => {
  let map = []
  for (let item of arr) {
    const coordinate = coordinateData[item.name]
    console.log('coordinate', coordinate)
    if (coordinate) {
      map.push({
        name: item.name,
        value: coordinate.concat(item.value)
      })
    }
  }
  console.log('map', map)
  return map
}
const option = computed(() => {
  return {
    title: {
      text: props.text || '',
      subtext: props.subtext || '',
      left: 'left'
    },
    visualMap: {
      min: 0,
      max: 60000,
      left: 20,
      bottom: 20,
      calculable: true,
      text: ['高', '低'],
      inRange: {
        color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)']
      },
      textStyle: {
        color: '#fff'
      }
    },
    geo: [
      {
        map: 'china',
        roam: true,
        emphasis: {
          areaColor: '#f4cccc',
          borderColor: 'rgb(9, 54, 95)',
          itemStyle: {
            areaColor: '#f4cccc'
          }
        }
      }
    ],
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        return params.name + ' : ' + params.value[2]
      }
    },
    series: [
      {
        type: 'map',
        map: 'china',
        geoIndex: 0,
        aspectScale: 0.75,
        tooltip: {
          show: false
        }
      },
      {
        name: '销量',
        type: 'scatter',
        data: convertData(props.value), //配置散点的坐标数据
        coordinateSystem: 'geo',
        rippleEffect: {
          scale: 2
        },
        symbolSize: 12,
        emphasis: {
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      }
    ]
  }
})
</script>
<style lang="less" scoped></style>
