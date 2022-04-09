<script lang="ts" setup>
import { getLogger } from '@/main'
import { inject, onMounted, onUnmounted, reactive, Ref, ref } from 'vue'
import { PlayerContext } from '../context/PlayerContext'

/**
 * 可拖动的盒子容器
 * 功能:
 * - 可拖动位置, 维护 {@link CoreDot.position} 中的 x y, 监听父容器变化, 按比例缩放
 * - TODO: 可缩放, 维护 {@link CoreDot.position} 中的 width height
 *
 * @inject service {@link PlayerContext}
 * @props {{item: any, index: number}}
 */
const service = inject(PlayerContext.INJECTION_KEY) as PlayerContext

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
})

const divRef: Ref<HTMLDivElement> = ref({} as any)

const data = reactive({
    adsorption: false,
    // 父级盒子 offset 坐标
    px: 0,
    py: 0,

    // 百分比定位
    scaleX: 0.5,
    scaleY: 0.5,
})

onMounted(() => {
    const listenerKey = service.eventCenter
        .addEventListener('PlayerResizeEvent', (event) => {
            const {width, height} = event
            // 使用新的容器大小计算相对位置
            const {scaleX, scaleY} = data
            const left = width * scaleX
            const top = height * scaleY
            setLocation(top, left)
            if (log.isTraceEnable()) {
                log.trace('重新计算位置, 父盒子变化: ', {width, height}, '相对位置: ', {scaleX, scaleY}, '定位: ', {top, left})
            }
        })

    onUnmounted(() => {
        service.eventCenter
            .removeEventListener('PlayerResizeEvent', listenerKey)
    })
})

function onMouseMove(event: MouseEvent) {
    const {adsorption: ads} = data
    if (!ads) {
        return
    }
    const {x, y} = event
    const {px, py} = data
    const {width, height} = service.playerBoxElement.realWidthHeight

    const top = Math.max(Math.min(y - py, height), 0)
    const left = Math.max(Math.min(x - px, width), 0)

    // 重设百分比
    data.scaleX = left / width
    data.scaleY = top / height

    setLocation(top, left)
}

function setLocation(top: number, left: number) {
    divRef.value.style.top = top + 'px'
    divRef.value.style.left = left + 'px'
}

function onMouseDown(event: MouseEvent) {
    data.adsorption = true
    // 点击位置
    const {x, y} = event
    const {offsetTop, offsetLeft} = divRef.value
    data.px = x - offsetLeft
    data.py = y - offsetTop

    log.trace('父级盒子大小', service.playerBoxElement.realWidthHeight)
}

function onMouseUp(event: MouseEvent) {
    data.adsorption = false
}

</script>
<template>
<div ref="divRef" class="draggable" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp">
    {{ item }}
</div>
</template>

<style lang="sass" scoped>
.draggable
    pointer-events: auto
    display: inline-block
    background-color: rgba(65, 71, 77, 0.47)
    border: 1px solid

    width: 100px
    height: 100px

    cursor: pointer
</style>
