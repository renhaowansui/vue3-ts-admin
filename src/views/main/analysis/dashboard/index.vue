<template>
  <div class="page-department">
    <el-row :gutter="20">
      <el-col :span="8">
        <card title="分类商品数量(饼图)">
          <pie-echart :value="goodsCategoryCount"></pie-echart>
        </card>
      </el-col>
      <el-col :span="8">
        <card title="不同城市商品销量">
          <china-echart :value="goodsAddressSale"></china-echart>
        </card>
      </el-col>
      <el-col :span="8">
        <card title="分类商品数量(玫瑰图)">
          <rose-echart :value="goodsCategoryCount"></rose-echart>
        </card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <card title="分类商品的销量">
          <line-echart v-bind="goodsCategorySale"></line-echart>
        </card>
      </el-col>
      <el-col :span="12">
        <card title="分类商品的收藏">
          <bar-echart v-bind="goodsCategoryFavor"></bar-echart>
        </card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  getGoodsCategoryCount,
  getGoodsCategorySale,
  getGoodsAddressSale,
  getGoodsCategoryFavor
} from '@/service/main/analysis/dashboard'
import Card from '@/components/card/index.vue'
import PieEchart from '@/components/echarts/pie-echart.vue'
import RoseEchart from '@/components/echarts/rose-echart.vue'
import LineEchart from '@/components/echarts/line-echart.vue'
import BarEchart from '@/components/echarts/bar-echart.vue'
import ChinaEchart from '@/components/echarts/china-echart.vue'

const goodsCategoryCount = ref([{ name: '123', value: 1 }])
const goodsCategorySale: any = ref({
  xLabels: [],
  value: []
})
const goodsAddressSale = ref([])
const goodsCategoryFavor: any = ref({
  xLabels: [],
  value: []
})

const getChartData = async () => {
  getGoodsCategoryCount().then(({ code, data }) => {
    if (code === 0)
      goodsCategoryCount.value = data.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
  })
  getGoodsCategorySale().then(({ code, data }) => {
    if (code === 0) {
      const xLabels: string[] = []
      const value: any[] = []
      for (const item of data) {
        xLabels.push(item.name)
        value.push(item.goodsCount)
      }
      goodsCategorySale.value.xLabels = xLabels
      goodsCategorySale.value.value = value
    }
  })
  getGoodsAddressSale().then(({ code, data }) => {
    if (code === 0) {
      goodsAddressSale.value = data.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    }
  })
  getGoodsCategoryFavor().then(({ code, data }) => {
    if (code === 0) {
      const xLabels: string[] = []
      const value: any[] = []
      for (const item of data) {
        xLabels.push(item.name)
        value.push(item.goodsFavor)
      }
      goodsCategoryFavor.value.xLabels = xLabels
      goodsCategoryFavor.value.value = value
    }
  })
}

getChartData()
</script>

<style lang="less" scoped>
.page-department {
  .el-row {
    &:not(:first-child) {
      margin-top: 20px;
    }
  }
}
</style>
