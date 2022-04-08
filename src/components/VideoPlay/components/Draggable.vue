<script lang="ts" setup>
import { MouseEventTool } from '@/components/VideoPlay/service/MouseEventTool'
import { getLogger } from '@/main'
import { nextTick, onMounted, reactive, Ref, ref } from 'vue'

const log = getLogger('draggable')

const prop = defineProps({
    item: {
        type: [Object],
        required: false,
        default: () => ({}),
    },
    index: {
        type: Number,
        default: 0,
    },
    parentBoxProperties: {
        type: Object,
        required: true,
    },
})

const divRef: Ref<HTMLDivElement> = ref({} as any)

const data = reactive({
    adsorption: false,
    // 父级盒子 offset 坐标
    px: 0,
    py: 0,

    // 当前值
    top: 0,
    left: 0,

    // 百分比定位
    scaleX: 0,
    scaleY: 0,

    get style() {
        const v = (prop.index + 1) * 100

        return `top: ${ v }px; left: ${ v }px`
    },
})

function onMouseMove(event: MouseEvent) {
    const {adsorption: ads} = data
    if (!ads) {
        return
    }
    const {x, y} = event
    const {px, py} = data

    const top = y - py
    const left = x - px
    divRef.value.style.top = top + 'px'
    divRef.value.style.left = left + 'px'

    const {width, height} = prop.parentBoxProperties

    data.left = left
    data.top = top
    data.scaleX = left / width
    data.scaleY = top / height
}

function onMouseDown(event: MouseEvent) {
    data.adsorption = true
    // 点击位置
    const {x, y} = event
    const {offsetTop, offsetLeft} = divRef.value
    data.px = x - offsetLeft
    data.py = y - offsetTop

    console.debug(MouseEventTool.print(event))
}

function onMouseUp(event: MouseEvent) {
    data.adsorption = false
}

</script>
<!--
可拖动的元素容器
-->
<template>
<div ref="divRef" :style="data.style" class="draggable" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp">

</div>
</template>

<style lang="sass" scoped>
.draggable
    pointer-events: auto
    display: inline-block
    background-color: red
    border: 1px solid

    width: 100px
    height: 100px
</style>
