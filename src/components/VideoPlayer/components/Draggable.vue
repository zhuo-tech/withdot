<script lang="ts" setup>
import { DraggableContext } from '@/components/VideoPlayer/context/DraggableContext'
import { CoreDot } from '@/model/entity/CoreDot'
import { inject, onMounted, onUnmounted, reactive } from 'vue'
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

const prop = defineProps({
    item: {
        type: CoreDot,
        required: false,
        default: () => ({}),
    },
    index: {
        type: Number,
        default: 0,
    },
})

const context = reactive(new DraggableContext())

onMounted(() => {
    const listenerKey = service.eventCenter
        .addEventListener('PlayerResizeEvent', context.resizeRelocate)

    onUnmounted(() => {
        service.eventCenter.removeEventListener('PlayerResizeEvent', listenerKey)
    })
})

</script>
<template>
<div :ref="el => context.divRef = el"
     class="draggable"
     @mousemove="event => context.dragReLocate(event)"
     @mouseup="context.closeAdsorption()"
     @mousedown.prevent="event => context.onMouseDown(event)">

    <div v-show="context.rightClickMenuIsShow" :ref="el => context.rightMenuRef = el" class="draggable-right-menu">
        <ul>
            <li>上移一层</li>
            <li>下移一层</li>
            <li>置于顶层</li>
            <li>置于底层</li>
        </ul>
    </div>
    {{ item }}
</div>
</template>

<style lang="sass" scoped>
.draggable
    pointer-events: auto
    display: inline-block
    background-color: rgba(65, 71, 77, 0.47)
    border: 1px solid

    width: 300px
    height: 300px

    cursor: pointer

    .draggable-right-menu
        position: absolute
        width: 100px
        height: auto
        list-style: none
        background-color: rgba(65, 71, 77, .7)

        box-shadow: 0 0 5px rgba(65, 71, 77, .7)

        li
            padding: 3px 10px
            border-bottom: 1px solid rgba(16, 16, 16, .5)

        li:last-child
            border: none
</style>
