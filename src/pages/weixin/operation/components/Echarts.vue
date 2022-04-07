<script lang="ts" setup>
import { data } from 'autoprefixer'
import { reactive, toRef, onMounted } from 'vue'
import { getCurrentInstance } from 'vue'

const state = reactive({
    title: '首页',
})
const props = defineProps({
    dataIndex: {
        type: Number,
    },
})
onMounted(async () => {
    const internalInstance = getCurrentInstance()
    const echarts = internalInstance?.appContext.config.globalProperties.$echarts
    let myChart = echarts.init(document.getElementById(`chart${ props.dataIndex }`))
    // 绘制图表
    myChart.setOption({
        title: {
            text: 'ECharts示例',
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line',
            },
        ],
    })
})
</script>

<template>
    <div class="home">
        <div :id="`chart${dataIndex}`" style="width: 100%;height: 100%"></div>
    </div>
</template>

<style lang="less" scoped>
</style>
