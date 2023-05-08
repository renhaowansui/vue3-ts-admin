<template>
  <div ref="nGridRef">
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps, ref, computed, onMounted } from 'vue'
const props = defineProps({
  xGap: {
    type: String,
    default: '12'
  },
  cols: {
    type: String,
    default: '5'
  }
})
const nGridRef = ref()

const colWidth = computed(() => {
  return 100 / props.cols
})

const initColStyle = () => {
  const averageSuperWidth = props.xGap / props.cols
  const slotsRefList = nGridRef.value.children
  console.log('slotsRefList', slotsRefList)
  if (slotsRefList.length) {
    for (let i = 0; i < slotsRefList.length; i++) {
      const domEl = slotsRefList[i]
      console.log('domEl', domEl)
      domEl.style.width = `calc(${colWidth.value}% - ${props.xGap}px + ${averageSuperWidth}px)`
      if ((i + 1) % props.cols !== 0) {
        domEl.style.marginRight = `${props.xGap}px`
      }
      if (i + 1 > props.cols) {
        domEl.style.marginTop = `${props.xGap}px`
      }
    }
  }
}

onMounted(() => {
  console.log('nGridRef', nGridRef.value.children)
  initColStyle()
})
</script>

<style lang="less" scoped>
.n-grid {
  display: flex;
  flex-wrap: wrap;
}
</style>
